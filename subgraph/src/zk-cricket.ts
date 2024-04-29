import { BigInt } from "@graphprotocol/graph-ts";
import {
  PlayersMetadataUpdated as PlayersMetadataUpdatedEvent,
  PointsClaimed as PointsClaimedEvent,
  ResultsFetchFailed as ResultsFetchFailedEvent,
  ResultsFetchInitiated as ResultsFetchInitiatedEvent,
  ResultsPublished as ResultsPublishedEvent,
  SquadRegistered as SquadRegisteredEvent,
  GamePlayerIdRemappingSet as GamePlayerIdRemappingSetEvent,
} from "../generated/ZkCricket/ZkCricket";
import {
  game as Game,
  prediction as Prediction,
  user as User,
  claim as Claim,
} from "../generated/schema";

export function handleGamePlayerIdRemappingSet(
  event: GamePlayerIdRemappingSetEvent
): void {
  let game = Game.load(event.params.gameId.toString());
  if (game == null) {
    game = new Game(event.params.gameId.toString());
    game.playerIdRemapping = event.params.remapping;
    game.predictionsStartTime = BigInt.fromI64(Date.now());
    game.transactionHash = event.transaction.hash;
    game.save();
  }
}

export function handleSquadRegistered(event: SquadRegisteredEvent): void {
  let user = User.load(event.params.registrant.toHexString());
  if (user == null) {
    user = new User(event.params.registrant.toHexString());
    user.address = event.params.registrant;
    user.totalGamesClaimed = BigInt.fromI32(0);
    user.totalPointsWon = BigInt.fromI32(0);
    user.totalGamesPlayed = BigInt.fromI32(0);
  }
  user.totalGamesPlayed = user.totalGamesPlayed.plus(BigInt.fromI32(1));
  user.save();

  let prediction = Prediction.load(
    event.params.gameweek.toString() + "-" + event.params.registrant.toString()
  );
  if (prediction == null) {
    prediction = new Prediction(
      event.params.gameweek.toString() +
        "-" +
        event.params.registrant.toString()
    );
    prediction.game = event.params.gameweek.toString();
    prediction.user = event.params.registrant.toString();
    prediction.squadHash = event.params.squadHash;
    prediction.transactionHash = event.transaction.hash;
    prediction.save();
  }
}

export function handleResultsPublished(event: ResultsPublishedEvent): void {
  let game = Game.load(event.params.gameId.toString());
  if (game != null) {
    game.resultsPublishedTime = BigInt.fromI64(Date.now());
    game.pointsMerkleRoot = event.params.pointsMerkleRoot;
    game.gameResults = event.params.gameResults;
    game.save();
  }
}

export function handlePointsClaimed(event: PointsClaimedEvent): void {
  let user = User.load(event.params.claimer.toHexString());
  if (user != null) {
    user.totalGamesClaimed = user.totalGamesClaimed.plus(BigInt.fromI32(1));
    user.totalPointsWon = user.totalPointsWon.plus(event.params.totalPoints);
    user.save();
  }
  let claim = Claim.load(
    event.params.gameweek.toString() + "-" + event.params.claimer.toString()
  );
  if (claim == null) {
    claim = new Claim(
      event.params.gameweek.toString() + "-" + event.params.claimer.toString()
    );
    claim.game = event.params.gameweek.toString();
    claim.user = event.params.claimer.toString();
    claim.prediction = claim.id;
    claim.points = event.params.totalPoints;
    claim.transactionHash = event.transaction.hash;
    claim.save();
  }
  let prediction = Prediction.load(
    event.params.gameweek.toString() + "-" + event.params.claimer.toString()
  );
  if (prediction != null) {
    prediction.claim = claim.id;
    prediction.save();
  }
}

export function handlePlayersMetadataUpdated(
  event: PlayersMetadataUpdatedEvent
): void {}
export function handleResultsFetchFailed(
  event: ResultsFetchFailedEvent
): void {}

export function handleResultsFetchInitiated(
  event: ResultsFetchInitiatedEvent
): void {}
