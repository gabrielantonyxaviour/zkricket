const {
  keccak256,
  encodePacked,
  encodeAbiParameters,
  parseAbiParameters,
  hexToBytes,
} = await import("npm:viem");

const matchId = args[0];

if (secrets.pinataKey == "") {
  throw Error("PINATA_API_KEY environment variable not set for Pinata API.");
}
if (secrets.cricBuzzKey == "") {
  throw Error("CRICKET_API_KEY environment variable not set for Cricbuzz API.");
}

const weightage = {
  run: 1,
  four: 4,
  six: 6,
  wicket: 25,
};

function computeMerkleRoot(points) {
  const hashedValues = points.map((point) =>
    keccak256(`0x${point.toString(16)}`)
  );

  function recursiveMerkleRoot(hashes) {
    if (hashes.length === 1) {
      return hashes[0];
    }

    const nextLevelHashes = [];

    // Combine adjacent hashes and hash them together
    for (let i = 0; i < hashes.length; i += 2) {
      const left = hashes[i];
      const right = i + 1 < hashes.length ? hashes[i + 1] : "0x";
      const combinedHash = keccak256(
        encodePacked(["bytes32", "bytes32"], [left, right])
      );
      nextLevelHashes.push(combinedHash);
    }

    // Recur for the next level
    return recursiveMerkleRoot(nextLevelHashes);
  }

  // Start the recursive computation
  return recursiveMerkleRoot(hashedValues);
}

function padArrayWithZeros(array) {
  const paddedLength = Math.pow(2, Math.ceil(Math.log2(array.length)));
  return array.concat(
    Array.from({ length: paddedLength - array.length }, () => 0)
  );
}

const playerPerformaceRequest = Functions.makeHttpRequest({
  url: "https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/91515/hscard",
  method: "GET",
  headers: {
    "X-RapidAPI-Key": secrets.cricBuzzKey,
    "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
  },
});

const [playerPerformaceResponse] = await Promise.all([playerPerformaceRequest]);

let points = [];
if (!playerPerformaceResponse.error) {
  const weightageFour = weightage.four || 0;
  const weightageSix = weightage.six || 0;
  const weightageWicket = weightage.wicket || 0;

  const scoreCards = playerPerformaceResponse.data.scoreCard;
  const playersPointsMap = new Map();

  scoreCards.forEach((scoreCard) => {
    ["batTeamDetails", "bowlTeamDetails"].forEach((teamType) => {
      const playersData =
        scoreCard[teamType].batsmenData || scoreCard[teamType].bowlersData;
      Object.values(playersData).forEach((player) => {
        const playerName =
          teamType === "batTeamDetails" ? player.batName : player.bowlName;
        if (!playersPointsMap.has(playerName)) {
          playersPointsMap.set(playerName, 0);
        }
        let playerPoints = 0;
        if (teamType === "batTeamDetails") {
          const runs = player.runs || 0;
          const fours = player.fours || 0;
          const sixes = player.sixes || 0;
          playerPoints = runs + fours * weightageFour + sixes * weightageSix;
        } else {
          const wickets = player.wickets || 0;
          playerPoints = wickets * weightageWicket;
        }
        playersPointsMap.set(
          playerName,
          playersPointsMap.get(playerName) + playerPoints
        );
      });
    });
  });

  points = Array.from(playersPointsMap.values());
}

const pinFileToPinataRequest = Functions.makeHttpRequest({
  url: `https://api.pinata.cloud/pinning/pinJSONToIPFS`,
  method: "POST",
  headers: {
    Authorization: `Bearer ${secrets.pinataKey}`,
    "Content-Type": "application/json",
  },
  data: {
    pinataMetadata: {
      name: "Gameweeek " + matchId,
    },
    pinataOptions: {
      cidVersion: 1,
    },
    pinataContent: {
      points: points,
    },
  },
});

const [pinFileToPinataResponse] = await Promise.all([pinFileToPinataRequest]);

const merkleRoot = computeMerkleRoot(padArrayWithZeros(points));
const returnDataHex = encodeAbiParameters(
  parseAbiParameters("bytes32, string"),
  [merkleRoot, pinFileToPinataResponse.data.IpfsHash]
);

return hexToBytes(returnDataHex);
