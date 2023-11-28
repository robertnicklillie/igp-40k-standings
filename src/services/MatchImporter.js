import { v4 as uuid } from "uuid";

const armyHashMap = {
  "Adepta Sororitas": {},
  "Adeptus Custodes": {},
  "Adeptus Mechanicus": {},
  Aeldari: {},
  "Astra Militarum": {},
  "Black Templars": {},
  "Blood Angels": {},
  "Chaos Daemons": {},
  "Chaos Knights": {},
  "Chaos Space Marines": {},
  "Dark Angels": {},
  "Death Guard": {},
  Deathwatch: {},
  Drukhari: {},
  "Genestealer Cults": {},
  "Grey Knights": {},
  "Imperial Agents": {},
  "Imperial Fists": {},
  "Imperial Knights": {},
  "Iron Hands": {},
  "Leagues of Votann": {},
  Necrons: {},
  Orks: {},
  "Raven Guard": {},
  Salamanders: {},
  "Space Marines": {},
  "Space Wolves": {},
  Tau: {},
  "Thousand Sons": {},
  Tyranids: {},
  Ultramarines: {},
  "White Scars": {},
  "World Eaters": {},
};

let playerHashMap = {};

const splitIntoRows = (data) => {
  return data.split(/\r?\n/);
};

const splitIntoColumns = (data) => {
  return data.split("\t");
};

const parsePlayers = (data) => {
  const players = [];
  splitIntoRows(data).forEach((row) => {
    const cols = splitIntoColumns(row);
    if (cols[0] !== "Player") {
      if (cols?.length > 0 && cols[0]) {
        // add player to the players set
        players.push({
          key: uuid(),
          name: cols[0],
          army: cols[1],
          isArmyValid: armyHashMap.hasOwnProperty(cols[1]),
          isActive: cols[2] === "",
        });

        // add player to the player hash map
        playerHashMap[cols[0]] = cols[0];
      }
    }
  });
  return players;
};

const parseMatches = (data) => {
  const matches = [];
  splitIntoRows(data).forEach((row) => {
    const cols = splitIntoColumns(row);
    if (cols[0] !== "Player 1") {
      if (cols?.length > 0 && cols[0] !== null && cols[0] !== "") {
        matches.push({
          key: uuid(),
          player1: cols[0],
          player1IsNameValid: playerHashMap.hasOwnProperty(cols[0]),
          player1Army: cols[1],
          player1IsArmyValid: armyHashMap.hasOwnProperty(cols[1]),
          player1Score: cols[2],
          player2: cols[3],
          player2IsNameValid: playerHashMap.hasOwnProperty(cols[3]),
          player2Army: cols[4],
          player2IsArmyValid: armyHashMap.hasOwnProperty(cols[4]),
          player2Score: cols[5],
          date: cols[6],
        });
      }
    }
  });
  return matches;
};

const MatchImporter = {
  ParsePlayers: parsePlayers,
  ParseMatches: parseMatches,
};

export default MatchImporter;
