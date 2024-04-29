import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import {
  PlayersMetadataUpdated,
  PointsClaimed,
  ResultsFetchFailed,
  ResultsFetchInitiated,
  ResultsPublished,
  SquadRegistered
} from "../generated/ZkCricket/ZkCricket"

export function createPlayersMetadataUpdatedEvent(
  playersMetadataLength: BigInt,
  playersMetadata: Array<string>
): PlayersMetadataUpdated {
  let playersMetadataUpdatedEvent = changetype<PlayersMetadataUpdated>(
    newMockEvent()
  )

  playersMetadataUpdatedEvent.parameters = new Array()

  playersMetadataUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "playersMetadataLength",
      ethereum.Value.fromUnsignedBigInt(playersMetadataLength)
    )
  )
  playersMetadataUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "playersMetadata",
      ethereum.Value.fromStringArray(playersMetadata)
    )
  )

  return playersMetadataUpdatedEvent
}

export function createPointsClaimedEvent(
  gameweek: BigInt,
  claimer: Address,
  totalPoints: BigInt
): PointsClaimed {
  let pointsClaimedEvent = changetype<PointsClaimed>(newMockEvent())

  pointsClaimedEvent.parameters = new Array()

  pointsClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "gameweek",
      ethereum.Value.fromUnsignedBigInt(gameweek)
    )
  )
  pointsClaimedEvent.parameters.push(
    new ethereum.EventParam("claimer", ethereum.Value.fromAddress(claimer))
  )
  pointsClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "totalPoints",
      ethereum.Value.fromUnsignedBigInt(totalPoints)
    )
  )

  return pointsClaimedEvent
}

export function createResultsFetchFailedEvent(
  gameweek: BigInt,
  requestId: Bytes,
  error: Bytes
): ResultsFetchFailed {
  let resultsFetchFailedEvent = changetype<ResultsFetchFailed>(newMockEvent())

  resultsFetchFailedEvent.parameters = new Array()

  resultsFetchFailedEvent.parameters.push(
    new ethereum.EventParam(
      "gameweek",
      ethereum.Value.fromUnsignedBigInt(gameweek)
    )
  )
  resultsFetchFailedEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromFixedBytes(requestId)
    )
  )
  resultsFetchFailedEvent.parameters.push(
    new ethereum.EventParam("error", ethereum.Value.fromBytes(error))
  )

  return resultsFetchFailedEvent
}

export function createResultsFetchInitiatedEvent(
  gameweek: BigInt,
  requestId: Bytes
): ResultsFetchInitiated {
  let resultsFetchInitiatedEvent = changetype<ResultsFetchInitiated>(
    newMockEvent()
  )

  resultsFetchInitiatedEvent.parameters = new Array()

  resultsFetchInitiatedEvent.parameters.push(
    new ethereum.EventParam(
      "gameweek",
      ethereum.Value.fromUnsignedBigInt(gameweek)
    )
  )
  resultsFetchInitiatedEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromFixedBytes(requestId)
    )
  )

  return resultsFetchInitiatedEvent
}

export function createResultsPublishedEvent(
  gameId: BigInt,
  pointsMerkleRoot: Bytes,
  gameResults: string
): ResultsPublished {
  let resultsPublishedEvent = changetype<ResultsPublished>(newMockEvent())

  resultsPublishedEvent.parameters = new Array()

  resultsPublishedEvent.parameters.push(
    new ethereum.EventParam("gameId", ethereum.Value.fromUnsignedBigInt(gameId))
  )
  resultsPublishedEvent.parameters.push(
    new ethereum.EventParam(
      "pointsMerkleRoot",
      ethereum.Value.fromFixedBytes(pointsMerkleRoot)
    )
  )
  resultsPublishedEvent.parameters.push(
    new ethereum.EventParam(
      "gameResults",
      ethereum.Value.fromString(gameResults)
    )
  )

  return resultsPublishedEvent
}

export function createSquadRegisteredEvent(
  gameweek: BigInt,
  squadHash: Bytes,
  registrant: Address
): SquadRegistered {
  let squadRegisteredEvent = changetype<SquadRegistered>(newMockEvent())

  squadRegisteredEvent.parameters = new Array()

  squadRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "gameweek",
      ethereum.Value.fromUnsignedBigInt(gameweek)
    )
  )
  squadRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "squadHash",
      ethereum.Value.fromFixedBytes(squadHash)
    )
  )
  squadRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "registrant",
      ethereum.Value.fromAddress(registrant)
    )
  )

  return squadRegisteredEvent
}
