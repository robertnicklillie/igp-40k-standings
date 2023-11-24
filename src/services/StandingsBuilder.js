// Nick L	Black Templars		yes
const players = [
  {
    name: "Joe",
    army: "Tau",
    isActive: "true",
  },
  {
    name: "Tommy",
    army: "Chaos Space Marines",
    isActive: "true",
  },
  {
    name: "Bobby",
    army: "Black Templars",
    isActive: "true",
  },
  {
    name: "Lenny",
    army: "Drukhari",
    isActive: "true",
  },
];

const matches = [
  {
    playerOne: "Joe",
    playerOneScore: 25,
    playerOneArmy: "Tau",
    playerTwo: "Tommy",
    playerTwoScore: 79,
    playerTwoArmy: "Chaos Space Marines",
    matchDate: "11/25/2023",
  },
  {
    playerOne: "Joe",
    playerOneScore: 93,
    playerOneArmy: "Tau",
    playerTwo: "Bobby",
    playerTwoScore: 24,
    playerTwoArmy: "Black Templars",
    matchDate: "11/28/2023",
  },
  {
    playerOne: "Lenny",
    playerOneScore: 48,
    playerOneArmy: "Drukhari",
    playerTwo: "Tommy",
    playerTwoScore: 100,
    playerTwoArmy: "Chaos Space Marines",
    matchDate: "12/3/2023",
  },
  {
    playerOne: "Jeffry",
    playerOneScore: 73,
    playerOneArmy: "Blood Angels",
    playerTwo: "Tommy",
    playerTwoScore: 68,
    playerTwoArmy: "Chaos Space Marines",
    matchDate: "12/9/2023",
  },
];

const analyzeMatches = () => {
  let leagueSeasonStart = new Date("11/23/2023 11:59");
  let leagueSeasonEnd = new Date("3/31/2024 11:59");
  let leagueSeasonDayStart = 2; //Tuesday
  
  
  

  let playerRankings;

  players.forEach((player) => {
    if (player.isActive) {
      playerRankings[player.name] = {
        matches: [],
        army: player.army,
        leagueScore: 0.0,
      };
    }
  });

  matches.forEach(match => {
    let playerOne = playerRankings[match.playerOne];
    let playerTwo = playerRankings[match.playerTwo];


  });

  for (let x = 0; x < matches.length; x++) {
    let match = playerRankings[matches[x]];
  }
};

const StandingsBuilder = () => {
  return {
    analyzeMatches: analyzeMatches,
  };
};

export default StandingsBuilder;
