const dayjs = require("dayjs");
var weekYear = require("dayjs/plugin/weekYear");
var weekOfYear = require("dayjs/plugin/weekOfYear");
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

const getLeagueWeek = (startDate, endDate, matchDate) => {
  const _startDate = dayjs(startDate);
  const _endDate = dayjs(endDate);
  const _matchDate = dayjs(matchDate);

  if (
    _matchDate.week() < _startDate.week() &&
    _matchDate.year() === _startDate.year()
  )
    throw Error(
      `Match date ${_matchDate} cannot be before the league season start date ${_startDate}`
    );

  if (
    _matchDate.week() > _endDate.week() &&
    _matchDate.year() === _endDate.year()
  )
    throw Error(
      `Match date ${matchDate} cannot be after the league season end date ${endDate}`
    );

  const weekOne = _startDate.week();
  const weekOneYear = _startDate.year();
  let matchWeek = 0;

  if (_matchDate.year() === weekOneYear) {
    matchWeek = _matchDate.week() - weekOne + 1;
  } else {
    // get the final week of the year
    let finalWeek = 0;
    let dayFinalWeek = 31;
    do {
      finalWeek = dayjs(`12/${dayFinalWeek--}/${weekOneYear}`).week();
    } while (finalWeek < 51);

    const yearWeekOffset = finalWeek - weekOne + 1;
    matchWeek = _matchDate.week() + yearWeekOffset;
  }
  return matchWeek;
};

// in []
// player 1
// player 1 army
// player 1 score
// player 2
// player 2 army
// player 2 score
// date

// out standing[]
// rank
// leagueScore
// player
// army
// match 1 (Joe | Aeldari | 175 | 11/28/2023)
// match 2 (Joe | Aeldari | 175 | 11/28/2023)
// match 3 (Joe | Aeldari | 175 | 11/28/2023)
// match 4 (Joe | Aeldari | 175 | 11/28/2023)

// out matchesByPlayer[]
// date
// leagueWeek
// rank
// player score
// Opponent
// opponent rank
// opponent score
// opponent army

// group matches by week
// for each week:
//   determine eligible matchs
//   identify scoring matches
//   rank players on matches

const calcLeagueScore = (player, opponent) => {
  return parseFloat(player) + (100 - parseFloat(opponent));
};

const buildStandings = (players, matches) => {
  const weeklyMatches = {};
  const weeklyStandings = [];
  const playerMatches = {};

  const leagueStartDate = "11/19/2023";
  const leagueEndDate = "3/31/2024";

  for (let i = 0; i < matches.length; i++) {
    let match = matches[i];

    const matchLeagueWeek = getLeagueWeek(
      leagueStartDate,
      leagueEndDate,
      match.date
    );

    if (!weeklyMatches.hasOwnProperty(matchLeagueWeek)) {
      weeklyMatches[matchLeagueWeek] = {
        standings: [],
      };
    }

    let targetWeekMatches = weeklyMatches[matchLeagueWeek];

    !targetWeekMatches[match.player1] &&
      (targetWeekMatches[match.player1] = []);
    !targetWeekMatches[match.player2] &&
      (targetWeekMatches[match.player2] = []);

    targetWeekMatches[match.player1].push({
      isMatchEligible: true,
      leagueScore: calcLeagueScore(match.player1Score, match.player2Score),
      matchScore: match.player1Score,
      playersArmy: match.player1Army,
      opponent: match.player2,
      opponentArmy: match.player2Army,
      opponentScore: match.player2Score,
    });

    targetWeekMatches[match.player2].push({
      isMatchEligible: true,
      leagueScore: calcLeagueScore(match.player2Score, match.player1Score),
      matchScore: match.player2Score,
      playersArmy: match.player1Army,
      opponent: match.player1,
      opponentArmy: match.player1Army,
      opponentScore: match.player1Score,
    });
  }

  // out standing[]
  // rank
  // leagueScore
  // player
  // army
  // match 1 (Joe | Aeldari | 175 | 11/28/2023)
  // match 2 (Joe | Aeldari | 175 | 11/28/2023)
  // match 3 (Joe | Aeldari | 175 | 11/28/2023)
  // match 4 (Joe | Aeldari | 175 | 11/28/2023)

  let priorWeekStandings = [];
  for (
    let i = 1;
    i < getLeagueWeek(leagueStartDate, leagueEndDate, leagueEndDate) + 1;
    i++
  ) {
    console.info("league week: " + i);
    let targetWeeklyMatches = weeklyMatches[i];

    if (!targetWeeklyMatches) {
      targetWeeklyMatches = {
        standings: { ...priorWeekStandings },
      };
    } else {
      for (let key in players) {
        const player = players[key];

        let playerStanding = {
          player: player.name,
          army: player.army,
          leagueScore: (match1, match2, match3, match4) => {
            return (
              (match1?.leagueScore +
                match2?.leagueScore +
                match3?.leagueScore +
                match4?.leagueScore) /
              (match1
                ? 1
                : 0 + match2
                ? 1
                : 0 + match3
                ? 1
                : 0 + match4
                ? 1
                : 0)
            );
          },
          rank: "NR",
          match1: undefined,
          match2: undefined,
          match3: undefined,
          match4: undefined,
        };

        const targetPlayerMatches = targetWeeklyMatches[player.name];
        if (targetPlayerMatches !== undefined) {
          // add all matches to a collection for current week and
          // prior standings, then sort, then take the top 4

          let eligibleMatches = [];
          
          if (priorWeekStandings && priorWeekStandings.length > 0) {
            let playerStanding = priorWeekStandings.find(
              (s) => s.player === player.name
            );

            if (playerStanding?.match1)
              eligibleMatches.push(playerStanding.match1);
            if (playerStanding?.match2)
              eligibleMatches.push(playerStanding.match2);
            if (playerStanding?.match3)
              eligibleMatches.push(playerStanding.match3);
            if (playerStanding?.match4)
              eligibleMatches.push(playerStanding.match4);
          }

          for (let match in targetPlayerMatches) {
            // if (isEligible(match)) { }
            eligibleMatches.push(match);
          }

          eligibleMatches.sort((i, j) => i.leagueScore - j.leagueScore);

          console.info(eligibleMatches);
        }

        targetWeeklyMatches.standings.push(playerStanding);
        //console.info(players[player]);
      }
    }

    priorWeekStandings = targetWeeklyMatches.standings;

    // determine if match is eligible
    // determine each players top 4 and average league score
  }

  // for (const week in weeklyMatches) {
  //   console.info("");
  //   console.info("");
  //   console.info("");
  //   console.info("");
  //   console.info("");
  //   console.info("weekly matches for week " + week);
  //   for (const player in weeklyMatches[week]) {
  //     console.info(player + "'s matches: ");
  //     for (let i = 0; i < weeklyMatches[week][player].length; i++) {
  //       console.info(weeklyMatches[week][player][i]);
  //     }
  //   }
  // }

  // console.info(weeklyMatches);
  //console.info(playerMatches);

  // standings[week] = {
  //   rawMatches = [{ match }],
  //   armyMatches[player] = {
  //     matches = [{match}]
  //   }
  // }
};

const matches = [
  {
    key: "c31fd168-2a73-48b7-80f9-baefffe1e8a8",
    player1: "Nick L",
    player1IsNameValid: false,
    player1Army: "Black Templars",
    player1IsArmyValid: true,
    player1Score: "25",
    player2: "Rad",
    player2IsNameValid: false,
    player2Army: "Tau",
    player2IsArmyValid: true,
    player2Score: "46",
    date: "11/25/2023",
  },
  {
    key: "c31fd168-2a73-48b7-80f9-baefffe1e8a8",
    player1: "Nick L",
    player1IsNameValid: false,
    player1Army: "Black Templars",
    player1IsArmyValid: true,
    player1Score: "25",
    player2: "DJ",
    player2IsNameValid: false,
    player2Army: "Chaos Space Marines",
    player2IsArmyValid: true,
    player2Score: "49",
    date: "11/24/2023",
  },
  {
    key: "c24f8803-9ea8-4dc6-aa08-0ea97509c3ba",
    player1: "Will",
    player1IsNameValid: false,
    player1Army: "Tau",
    player1IsArmyValid: true,
    player1Score: "94",
    player2: "Brendan",
    player2IsNameValid: false,
    player2Army: "Aeldari",
    player2IsArmyValid: true,
    player2Score: "57",
    date: "12/3/2023",
  },
  {
    key: "ae60c472-a67d-41e8-97d8-aeabff7c5f50",
    player1: "Alex",
    player1IsNameValid: false,
    player1Army: "Chaos Knights",
    player1IsArmyValid: true,
    player1Score: "67",
    player2: "Morgan",
    player2IsNameValid: false,
    player2Army: "Grey Knights",
    player2IsArmyValid: true,
    player2Score: "36",
    date: "12/3/2023",
  },
  {
    key: "ec412e45-1a5f-4345-8723-4b7615b1916f",
    player1: "Rad",
    player1IsNameValid: false,
    player1Army: "Tau",
    player1IsArmyValid: true,
    player1Score: "85",
    player2: "DJ",
    player2IsNameValid: false,
    player2Army: "Chaos Space Marines",
    player2IsArmyValid: true,
    player2Score: "67",
    date: "12/7/2023",
  },
  {
    key: "e20cf647-f776-44fd-889c-29f43d6ad827",
    player1: "Morgan",
    player1IsNameValid: false,
    player1Army: "Grey Knights",
    player1IsArmyValid: true,
    player1Score: "83",
    player2: "Alex",
    player2IsNameValid: false,
    player2Army: "Chaos Knights",
    player2IsArmyValid: true,
    player2Score: "37",
    date: "12/10/2023",
  },
  {
    key: "71fd1853-c25e-4d8f-89dd-2f11b8dc11d1",
    player1: "Nick L",
    player1IsNameValid: false,
    player1Army: "Black Templars",
    player1IsArmyValid: true,
    player1Score: "63",
    player2: "Kai",
    player2IsNameValid: false,
    player2Army: "Blood Angels",
    player2IsArmyValid: true,
    player2Score: "38",
    date: "12/12/2023",
  },
  {
    key: "3bcf22ee-3753-461b-81bb-ce476a79574f",
    player1: "DJ",
    player1IsNameValid: false,
    player1Army: "Chaos Space Marines",
    player1IsArmyValid: true,
    player1Score: "25",
    player2: "Will",
    player2IsNameValid: false,
    player2Army: "Tau",
    player2IsArmyValid: true,
    player2Score: "37",
    date: "1/8/2024",
  },
  {
    key: "d4d92d1b-cd78-4614-b5ab-bcd39860cc88",
    player1: "Alex",
    player1IsNameValid: false,
    player1Army: "Chaos Knights",
    player1IsArmyValid: true,
    player1Score: "94",
    player2: "Brendan",
    player2IsNameValid: false,
    player2Army: "Aeldari",
    player2IsArmyValid: true,
    player2Score: "38",
    date: "2/25/2024",
  },
  {
    key: "917ef32e-4eea-4a08-8d07-38020062ede9",
    player1: "Will",
    player1IsNameValid: false,
    player1Army: "Tau",
    player1IsArmyValid: true,
    player1Score: "67",
    player2: "Rad",
    player2IsNameValid: false,
    player2Army: "Tau",
    player2IsArmyValid: true,
    player2Score: "83",
    date: "3/1/2024",
  },
  {
    key: "4c49c1bf-c18f-4eec-a780-283d45ac4dfe",
    player1: "Morgan",
    player1IsNameValid: false,
    player1Army: "Grey Knights",
    player1IsArmyValid: true,
    player1Score: "85",
    player2: "Brendan",
    player2IsNameValid: false,
    player2Army: "Aeldari",
    player2IsArmyValid: true,
    player2Score: "85",
    date: "1/15/2024",
  },
  {
    key: "771a7fb7-6eba-4ea2-8e44-eafeb46e221b",
    player1: "Kai",
    player1IsNameValid: false,
    player1Army: "Blood Angels",
    player1IsArmyValid: true,
    player1Score: "83",
    player2: "Nick L",
    player2IsNameValid: false,
    player2Army: "Black Templars",
    player2IsArmyValid: true,
    player2Score: "46",
    date: "1/19/2024",
  },
  {
    key: "f414caf6-e347-415b-83ff-cb6ca4fae321",
    player1: "DJ",
    player1IsNameValid: false,
    player1Army: "Chaos Space Marines",
    player1IsArmyValid: true,
    player1Score: "63",
    player2: "Brendan",
    player2IsNameValid: false,
    player2Army: "Aeldari",
    player2IsArmyValid: true,
    player2Score: "57",
    date: "1/6/2024",
  },
  {
    key: "e309404f-55ad-4ec0-96ee-8e3d6ca25b69",
    player1: "Kai",
    player1IsNameValid: false,
    player1Army: "Blood Angels",
    player1IsArmyValid: true,
    player1Score: "25",
    player2: "Alex",
    player2IsNameValid: false,
    player2Army: "Chaos Knights",
    player2IsArmyValid: true,
    player2Score: "36",
    date: "1/30/2024",
  },
  {
    key: "d0d2c1a8-c473-4089-aa56-93c562a92dfa",
    player1: "Brendan",
    player1IsNameValid: false,
    player1Army: "Aeldari",
    player1IsArmyValid: true,
    player1Score: "94",
    player2: "Kai",
    player2IsNameValid: false,
    player2Army: "Blood Angels",
    player2IsArmyValid: true,
    player2Score: "67",
    date: "2/14/2024",
  },
];

const players = [
  {
    key: "8a215fe4-55ca-4d3e-8ab0-5bf275a37310",
    name: "Nick L",
    army: "Black Templars",
    isArmyValid: true,
    isActive: true,
  },
  {
    key: "30e885f5-e905-4ee6-b7f0-35a61798fcaf",
    name: "Alex",
    army: "Chaos Knights",
    isArmyValid: true,
    isActive: true,
  },
  {
    key: "f95f1c56-1034-4f94-9524-a5cff964382d",
    name: "Rad",
    army: "Tau",
    isArmyValid: true,
    isActive: true,
  },
  {
    key: "c746592d-ebbd-475f-85e9-b8ae5ea2ff0b",
    name: "Will",
    army: "Tau",
    isArmyValid: true,
    isActive: true,
  },
  {
    key: "3113c5fb-f3d5-4d86-9b76-13784c6439e0",
    name: "Morgan",
    army: "Grey Knights",
    isArmyValid: true,
    isActive: true,
  },
  {
    key: "b54163d2-bba4-4cd8-9268-3f6ffb82c575",
    name: "DJ",
    army: "Chaos Space Marines",
    isArmyValid: true,
    isActive: true,
  },
  {
    key: "370c98e1-94a4-4a5b-9978-25e5ef2c7073",
    name: "Kai",
    army: "Blood Angels",
    isArmyValid: true,
    isActive: true,
  },
  {
    key: "1c4103c6-2802-40ca-824a-8a4ec943eb36",
    name: "Brendan",
    army: "Aeldari",
    isArmyValid: true,
    isActive: true,
  },
];

buildStandings(players, matches);

// const StandingsBuilder = {
//   BuildStandings: buildStandings,
// };

// export default StandingsBuilder;
