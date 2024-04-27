const fs = require("fs");
const path = require("path");
const {
  SecretsManager,
  simulateScript,
  buildRequestCBOR,
  ReturnType,
  decodeResult,
  Location,
  CodeLanguage,
  SubscriptionManager,
  ResponseListener,
  FulfillmentCode,
} = require("@chainlink/functions-toolkit");
const zkCricketAbi = require("../build/artifacts/contracts/ZkCricket.sol/ZkCricket.json");
const ethers = require("ethers");
const { networks } = require("../networks");
require("@chainlink/env-enc").config();

task(
  "make-request",
  "Makes a request to the Oracle function in the contract"
).setAction(async (taskArgs) => {
  const decodedResponse = decodeResult(
    "0x45786563204572726F723A2073796E746178206572726F722C2052414D2065786365656465642C206F72206F74686572206572726F72",
    ReturnType.string
  );
  console.log(decodedResponse);
  //   const zkricketAddress = "0xDc59057716677afE37755e8aA256c8d852D62f64"; // REPLACE this with your Functions consumer address
  //   const linkTokenAddress = "0xb1D4538B4571d411F07960EF2838Ce337FE1E80E";
  //   const subscriptionId = 37; // REPLACE this with your subscription ID
  //   const donId = "fun-arbitrum-sepolia-1";
  //   const routerAddress = "0x234a5fb5Bd614a7AA2FfAB244D603abFA0Ac5C5C";

  //   const explorerUrl = "https://sepolia.arbiscan.io";

  //   const gasLimit = 300000;

  //   // Initialize ethers signer and provider to interact with the contracts onchain
  //   const privateKey = process.env.PRIVATE_KEY; // fetch PRIVATE_KEY
  //   if (!privateKey)
  //     throw new Error(
  //       "private key not provided - check your environment variables"
  //     );

  //   const rpcUrl = networks.arbitrumSepolia.url; // fetch mumbai RPC URL

  //   if (!rpcUrl)
  //     throw new Error(`rpcUrl not provided  - check your environment variables`);

  //   const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

  //   const wallet = new ethers.Wallet(privateKey);
  //   const signer = wallet.connect(provider); // create ethers signer for signing transactions

  //   //////// ESTIMATE REQUEST COSTS ////////

  //   console.log("\nEstimate request costs...");
  //   // Initialize and return SubscriptionManager
  //   const subscriptionManager = new SubscriptionManager({
  //     signer: signer,
  //     linkTokenAddress: linkTokenAddress,
  //     functionsRouterAddress: routerAddress,
  //   });
  //   await subscriptionManager.initialize();

  //   // estimate costs in Juels

  //   const gasPriceWei = await signer.getGasPrice(); // get gasPrice in wei

  //   const estimatedCostInJuels =
  //     await subscriptionManager.estimateFunctionsRequestCost({
  //       donId: donId, // ID of the DON to which the Functions request will be sent
  //       subscriptionId: subscriptionId, // Subscription ID
  //       callbackGasLimit: gasLimit, // Total gas used by the consumer contract's callback
  //       gasPriceWei: BigInt(gasPriceWei), // Gas price in gWei
  //     });

  //   console.log(
  //     `Fulfillment cost estimated to ${ethers.utils.formatEther(
  //       estimatedCostInJuels
  //     )} LINK`
  //   );

  //   //////// MAKE REQUEST ////////

  //   console.log("\nMake request...");

  //   const zkCricket = new ethers.Contract(
  //     zkricketAddress,
  //     zkCricketAbi.abi,
  //     signer
  //   );

  //   // Actual transaction call
  //   const transaction = await zkCricket.sendRequestCBOR();

  //   // Log transaction details
  //   console.log(
  //     `\n✅ Functions request sent! Transaction hash ${transaction.hash}.`
  //   );

  //   console.log(
  //     `See your request in the explorer ${explorerUrl}/tx/${transaction.hash}`
  //   );

  //   console.log(`\nWaiting for the response...`);

  //   const responseListener = new ResponseListener({
  //     provider: provider,
  //     functionsRouterAddress: routerAddress,
  //   }); // Instantiate a ResponseListener object to wait for fulfillment.

  //   try {
  //     const response = await new Promise((resolve, reject) => {
  //       responseListener
  //         .listenForResponseFromTransaction(transaction.hash)
  //         .then((response) => {
  //           resolve(response); // Resolves once the request has been fulfilled.
  //         })
  //         .catch((error) => {
  //           reject(error); // Indicate that an error occurred while waiting for fulfillment.
  //         });
  //     });

  //     const fulfillmentCode = response.fulfillmentCode;

  //     if (fulfillmentCode === FulfillmentCode.FULFILLED) {
  //       console.log(
  //         `\n✅ Request ${
  //           response.requestId
  //         } successfully fulfilled. Cost is ${ethers.utils.formatEther(
  //           response.totalCostInJuels
  //         )} LINK.Complete reponse: `,
  //         response
  //       );
  //     } else if (fulfillmentCode === FulfillmentCode.USER_CALLBACK_ERROR) {
  //       console.log(
  //         `\n⚠️ Request ${
  //           response.requestId
  //         } fulfilled. However, the consumer contract callback failed. Cost is ${ethers.utils.formatEther(
  //           response.totalCostInJuels
  //         )} LINK.Complete reponse: `,
  //         response
  //       );
  //     } else {
  //       console.log(
  //         `\n❌ Request ${
  //           response.requestId
  //         } not fulfilled. Code: ${fulfillmentCode}. Cost is ${ethers.utils.formatEther(
  //           response.totalCostInJuels
  //         )} LINK.Complete reponse: `,
  //         response
  //       );
  //     }

  //     const errorString = response.errorString;
  //     if (errorString) {
  //       console.log(`\n❌ Error during the execution: `, errorString);
  //     } else {
  //       const responseBytesHexstring = response.responseBytesHexstring;
  //       if (ethers.utils.arrayify(responseBytesHexstring).length > 0) {
  //         const decodedResponse = decodeResult(
  //           response.responseBytesHexstring,
  //           ReturnType.uint256
  //         );
  //         console.log(
  //           `\n✅ Decoded response to ${ReturnType.uint256}: `,
  //           decodedResponse
  //         );
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error listening for response:", error);
  //   }
});
