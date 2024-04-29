import {
  PlayersMetadataUpdated as PlayersMetadataUpdatedEvent,
  PointsClaimed as PointsClaimedEvent,
  ResultsFetchFailed as ResultsFetchFailedEvent,
  ResultsFetchInitiated as ResultsFetchInitiatedEvent,
  ResultsPublished as ResultsPublishedEvent,
  SquadRegistered as SquadRegisteredEvent
} from "../generated/ZkCricket/ZkCricket"
import {
  PlayersMetadataUpdated,
  PointsClaimed,
  ResultsFetchFailed,
  ResultsFetchInitiated,
  ResultsPublished,
  SquadRegistered
} from "../generated/schema"

export function handlePlayersMetadataUpdated(
  event: PlayersMetadataUpdatedEvent
): void {
  let entity = new PlayersMetadataUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.playersMetadataLength = event.params.playersMetadataLength
  entity.playersMetadata = event.params.playersMetadata

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePointsClaimed(event: PointsClaimedEvent): void {
  let entity = new PointsClaimed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.gameweek = event.params.gameweek
  entity.claimer = event.params.claimer
  entity.totalPoints = event.params.totalPoints

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleResultsFetchFailed(event: ResultsFetchFailedEvent): void {
  let entity = new ResultsFetchFailed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.gameweek = event.params.gameweek
  entity.requestId = event.params.requestId
  entity.error = event.params.error

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleResultsFetchInitiated(
  event: ResultsFetchInitiatedEvent
): void {
  let entity = new ResultsFetchInitiated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.gameweek = event.params.gameweek
  entity.requestId = event.params.requestId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleResultsPublished(event: ResultsPublishedEvent): void {
  let entity = new ResultsPublished(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.gameId = event.params.gameId
  entity.pointsMerkleRoot = event.params.pointsMerkleRoot
  entity.gameResults = event.params.gameResults

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSquadRegistered(event: SquadRegisteredEvent): void {
  let entity = new SquadRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.gameweek = event.params.gameweek
  entity.squadHash = event.params.squadHash
  entity.registrant = event.params.registrant

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
