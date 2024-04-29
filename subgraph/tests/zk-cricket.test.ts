import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import { PlayersMetadataUpdated } from "../generated/schema"
import { PlayersMetadataUpdated as PlayersMetadataUpdatedEvent } from "../generated/ZkCricket/ZkCricket"
import { handlePlayersMetadataUpdated } from "../src/zk-cricket"
import { createPlayersMetadataUpdatedEvent } from "./zk-cricket-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let playersMetadataLength = BigInt.fromI32(234)
    let playersMetadata = ["Example string value"]
    let newPlayersMetadataUpdatedEvent = createPlayersMetadataUpdatedEvent(
      playersMetadataLength,
      playersMetadata
    )
    handlePlayersMetadataUpdated(newPlayersMetadataUpdatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("PlayersMetadataUpdated created and stored", () => {
    assert.entityCount("PlayersMetadataUpdated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "PlayersMetadataUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "playersMetadataLength",
      "234"
    )
    assert.fieldEquals(
      "PlayersMetadataUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "playersMetadata",
      "[Example string value]"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
