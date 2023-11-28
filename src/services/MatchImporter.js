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
        players.push({
          name: cols[0],
          army: cols[1],
          isArmyValid: armyHashMap.hasOwnProperty(cols[1]),
          isActive: cols[2] === "",
        });
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
          player1: {
            name: cols[0],
            isNameValid: playerHashMap.hasOwnProperty(cols[0]),
            army: cols[1],
            isArmyValid: armyHashMap.hasOwnProperty(cols[1]),
            score: cols[2],
          },
          player2: {
            name: cols[3],
            isNameValid: playerHashMap.hasOwnProperty(cols[3]),
            army: cols[4],
            isArmyValid: armyHashMap.hasOwnProperty(cols[4]),
            score: cols[5],
          },
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
