// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./interface/hyperlane/IMailbox.sol";
import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
// import {UltraVerifier} from "./noir/plonk_vk.sol";

error NotOwner(address caller);
error NotMailbox(address caller);
error InvalidGameweek(uint256 gameweek);
error SelectSquadDisabled(uint256 gameweek);
error InadequateCrosschainFee(uint32 destinationDomain, uint256 requiredFee, uint256 sentFee);
error ZeroKnowledgeVerificationFailed();
error NotAllowedCaller(
        address caller,
        address automationRegistry,
        address owner
    );
error UnexpectedRequestID(bytes32 requestId);
error ResultsNotPublished(uint256 gameweek);

contract LuffyProtocol is FunctionsClient, ConfirmedOwner {
    // Library Imports
    using Strings for uint256;
    using FunctionsRequest for FunctionsRequest.Request;  

    // Luffy Protocol Variables
    mapping(uint256=>mapping(address=>bytes32)) public gameWeekToSquadHash;
    mapping(uint256=>string) public gameWeekResults;
    mapping(uint256=>mapping(uint256=>uint256)) public playerPoints;
    mapping(address=>uint256) public addressToNullifier;
    mapping(uint256=>address[])public nulliferToAddresses;
    mapping(uint256=>bytes32) public pointsMerkleRoot;
    uint256 public gameweekCounter;
    string[] public playersMetadata;
    bool public isSelectSquadEnabled;

    // Hyperlane Variables
    IMailbox public mailbox;
    mapping(bool=>bytes32) public destinationAddress;
    mapping(bool=>uint32) public destinationChainIds;

    // zk Variables
    // UltraVerifier public zkVerifier; 
    bool public isZkVerificationEnabled;

    // Chainlink Variables
    bytes32 public donId;
    address public functionsRouter;
    address public upkeepContract;
    bytes public request;
    string public sourceCode;
    bytes32 public s_lastRequestId;
    bytes public s_lastResponse;
    bytes public s_lastError;
    uint32 public s_callbackGasLimit=300000;
    uint64 public s_subscriptionId;
    mapping(bytes32=>uint256) public requestToGameweek;

    constructor(address _functionsRouter, IMailbox _mailbox, string[] memory _playersMetadata) 
    FunctionsClient(_functionsRouter) ConfirmedOwner(msg.sender) 
    {
        // Hyperlane Initializations
        mailbox = _mailbox;

        // Luffy Protocol Initializations
        isSelectSquadEnabled = true;
        isZkVerificationEnabled = false;
        gameweekCounter = 1;
        playersMetadata = _playersMetadata;
        emit PlayersMetadataUpdated(playersMetadata.length, _playersMetadata);

        // zk Initializations
        // zkVerifier=new UltraVerifier();

        // Chainlink Initializations
        functionsRouter=_functionsRouter;
    }

    event PlayersMetadataUpdated(uint256 playersMetadataLength, string[] playersMetadata);
    event SquadRegistered(uint256 gameweek, bytes32 squadHash, address registrant);
    event RewardsClaimed(uint256 gameweek, address claimer, uint256 totalPoints, bool isChilizOrApeCoin);
    event ResultsFetchInitiated(uint256 gameweek, bytes32 requestId);
    event ResultsPublished(bytes32 indexed requestId, bytes32 pointsMerkleRoot, string gameWeekResults);
    event ResultsFetchFailed(uint256 gameweek, bytes32 requestId, bytes error);

    modifier onlyAllowed() {
        if (msg.sender != owner() && msg.sender != upkeepContract)
            revert NotAllowedCaller(msg.sender, owner(), upkeepContract);
        _;
    }

    modifier onlyMailbox() {
        if(msg.sender != address(mailbox)) revert NotMailbox(msg.sender);
        _;
    }

    function registerMorePlayers(string[] memory _playersMetadata) public onlyOwner {
        for(uint256 i=0; i<_playersMetadata.length; i++) playersMetadata.push(_playersMetadata[i]);
        emit PlayersMetadataUpdated(playersMetadata.length, _playersMetadata);
    }

    function registerSquad(uint256 _gameWeek, bytes32 _squadHash) public {
        if(!isSelectSquadEnabled) revert SelectSquadDisabled(_gameWeek);
        if(_gameWeek > gameweekCounter) revert InvalidGameweek(_gameWeek);
 
        gameWeekToSquadHash[_gameWeek][msg.sender] = _squadHash;
        emit SquadRegistered(_gameWeek, _squadHash, msg.sender);
    }

    function claimRewards(uint256 totalPoints, bytes calldata _proof, bool isChilizOrApeCoin) public payable {
        if(gameweekCounter == 0) revert InvalidGameweek(gameweekCounter);
        if(pointsMerkleRoot[gameweekCounter] == bytes32(0)) revert ResultsNotPublished(gameweekCounter);

        if(isZkVerificationEnabled){
            bytes32[] memory _publicInputs=new bytes32[](2);
            _publicInputs[0]=pointsMerkleRoot[gameweekCounter];
            _publicInputs[1]=gameWeekToSquadHash[gameweekCounter][msg.sender];
            _publicInputs[2]= bytes32(totalPoints);
            // try zkVerifier.verify(_proof, _publicInputs)
            // {
            //    _mintRewards(isChilizOrApeCoin, totalPoints, msg.sender);
            //     emit RewardsClaimed(gameweekCounter-1, msg.sender, totalPoints, isChilizOrApeCoin);
            // }catch{
            //     revert ZeroKnowledgeVerificationFailed();
            // }
        } else{
            _mintRewards(isChilizOrApeCoin, totalPoints, msg.sender);
            emit RewardsClaimed(gameweekCounter-1, msg.sender, totalPoints, isChilizOrApeCoin);
        }
    }

    // Hyperlane Functions
    function _mintRewards(bool isChilizOrApeCoin, uint256 totalPoints, address _claimer) internal {
        uint32 destinationDomain = destinationChainIds[isChilizOrApeCoin];
        bytes32 recepientAddress = destinationAddress[isChilizOrApeCoin];
        bytes memory _data= abi.encode(gameweekCounter-1,totalPoints, _claimer);
        uint256 _requiredFee = mailbox.quoteDispatch(destinationDomain, recepientAddress, _data);
        if(msg.value < _requiredFee) revert InadequateCrosschainFee(destinationDomain, _requiredFee, msg.value);

        bytes32 messageId = mailbox.dispatch{value: msg.value}(destinationDomain,recepientAddress, _data);
    }

    // Chainlink Automation
    function setAutomationCronContract(
        address _upkeepContract
    ) external onlyOwner {
        upkeepContract = _upkeepContract;
    }

    // Chainlink Functions
    function updateRequest(
        bytes memory _request,
        uint64 _subscriptionId,
        uint32 _gasLimit,
        bytes32 _donID
    ) external onlyOwner {
        request = _request;
        s_subscriptionId = _subscriptionId;
        s_callbackGasLimit = _gasLimit;
        donId = _donID;
    }

    function sendRequestCBOR()
        external
        onlyAllowed
        returns (bytes32 requestId)
    {
        s_lastRequestId = _sendRequest(
            request,
            s_subscriptionId,
            s_callbackGasLimit,
            donId
        );
        requestToGameweek[s_lastRequestId] = gameweekCounter;
        emit ResultsFetchInitiated(gameweekCounter, s_lastRequestId);
        return s_lastRequestId;
    }

    function fulfillRequest(bytes32 requestId, bytes memory response, bytes memory err) internal override {
        s_lastResponse = response;
        s_lastError = err;
        if(s_lastResponse.length == 0) {
            emit ResultsFetchFailed(requestToGameweek[requestId], requestId, err);
        }else{
            (bytes32 _pointsMerkleRoot, string memory _gameWeekResults) = abi.decode(s_lastResponse, (bytes32, string));
            pointsMerkleRoot[requestToGameweek[requestId]] = _pointsMerkleRoot;
            gameWeekResults[requestToGameweek[requestId]] = _gameWeekResults;
            emit ResultsPublished(requestId, _pointsMerkleRoot, _gameWeekResults);
        }
        gameweekCounter+=1;
    } 


    // Testing helpers
    function setupDestinationAddresses(uint32[2] memory _destinationChainIds,  bytes32[2] memory _destinationAddresses) public onlyOwner {
        destinationChainIds[false] = _destinationChainIds[0];
        destinationChainIds[true] = _destinationChainIds[1];
        destinationAddress[false] = _destinationAddresses[0];
        destinationAddress[true] = _destinationAddresses[1];
    }
    function setSelectSquadEnabled(bool _isSelectSquadEnabled) public onlyOwner {
        isSelectSquadEnabled = _isSelectSquadEnabled;
    }

    function setGameweekCounter(uint256 _gameweekCounter) public onlyOwner {
        gameweekCounter = _gameweekCounter;
    }

    function setPointsMerkleRoot(uint256 _gameweek, bytes32 _pointsMerkleRoot) public onlyOwner {
        pointsMerkleRoot[_gameweek] = _pointsMerkleRoot;
    }

    function setZkVerificationEnabled(bool _isZkVerificationEnabled) public onlyOwner {
        isZkVerificationEnabled = _isZkVerificationEnabled;
    }
    
}