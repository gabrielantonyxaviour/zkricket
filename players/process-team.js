const fs = require("fs");

function assignSequentialValues(data) {
  const players = data.player.filter((player) => player.id); // Filter out non-player objects
  const playerIdMap = {};

  players.forEach((player, index) => {
    playerIdMap[player.id] = index;
  });

  return playerIdMap;
}

function writeJSONFile(filename, data) {
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
}

function processDataAndWriteToFile(inputFilePath, outputFilePath) {
  try {
    const jsonData = require(inputFilePath);
    const playerIdMap = assignSequentialValues(jsonData);
    writeJSONFile(outputFilePath, playerIdMap);
    console.log(`Data processed and written to ${outputFilePath}`);
  } catch (error) {
    console.error("Error processing data:", error);
  }
}

// Example usage:
const inputFilePath = "./input.json"; // Provide the path to your input JSON file
const outputFilePath = "./output.json"; // Provide the path where you want to save the output JSON file

processDataAndWriteToFile(inputFilePath, outputFilePath);
