const dayjs = require("dayjs");
var weekYear = require("dayjs/plugin/weekYear");
var weekOfYear = require("dayjs/plugin/weekOfYear");
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
var { v4: uuid } = require("uuid");

interface Match {
  player1: string;
  player1Army: string;
  player1Score: string;
  player2: string;
  player2Army: string;
  player2Score: string;
  date: string;

  key: string;
  player1IsNameValid: boolean;
  player1IsArmyValid: boolean;
  player2IsNameValid: boolean;
  player2IsArmyValid: boolean;
}

interface Player {
  key: string;
  name: string;
  army: string;
  isArmyValid: boolean;
  isActive: boolean;
}

interface WeeklyMatch {
  key: string;
  date: string;
  isMatchEligible: boolean;
  leagueScore: number;
  matchScore: number;
  playerArmy: string;
  playerRank?: number;
  opponent: string;
  opponentArmy: string;
  opponentRank?: number;
  opponentScore: number;
}

interface PlayerStanding {
  key: string;
  player: string;
  army: string;
  avgLeagueScore: number;
  rank?: number;
  match1?: WeeklyMatch;
  match2?: WeeklyMatch;
  match3?: WeeklyMatch;
  match4?: WeeklyMatch;
}

interface StandingsByWeek {
  [key: number]: StandingsByPlayer;
}

interface StandingsByPlayer {
  [key: string]: PlayerStanding;
}

interface LeagueStandingsByWeek {
  [key: number]: PlayerStanding[];
}

interface LeagueMatchesByWeek {
  [key: string]: WeeklyMatchesByPlayer;
}

interface WeeklyMatchesByPlayer {
  [key: string]: WeeklyMatch[];
}

const getLeagueWeek = (
  startDate: string,
  endDate: string,
  matchDate: string,
  includeFirstDayOfWeek: boolean = false
) => {
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
  let week = 0;

  if (_matchDate.year() === weekOneYear) {
    week = _matchDate.week() - weekOne + 1;
  } else {
    // get the final week of the year
    let finalWeek = 0;
    let dayFinalWeek = 31;
    do {
      finalWeek = dayjs(`12/${dayFinalWeek--}/${weekOneYear}`).week();
    } while (finalWeek < 51);

    const yearWeekOffset = finalWeek - weekOne + 1;
    week = _matchDate.week() + yearWeekOffset;
  }

  if (includeFirstDayOfWeek) {
    return {
      week,
      firstDay: new Date(
        dayjs(_matchDate).day(0).toDate()
      ).toLocaleDateString(),
    };
  }

  return { week };
};

const calcLeagueScore = (playerScore: string, opponentScore: string) => {
  return parseFloat(playerScore) + (100 - parseFloat(opponentScore));
};

const groupMatchesIntoLeagueWeeks = (
  matches: Match[],
  leagueStartDate: string,
  leagueEndDate: string
) => {
  let weeklyMatches: LeagueMatchesByWeek = {};

  for (let i = 0; i < matches.length; i++) {
    let match = matches[i];

    const leagueWeek = getLeagueWeek(
      leagueStartDate,
      leagueEndDate,
      match.date
    ).week;

    if (!weeklyMatches.hasOwnProperty(leagueWeek)) {
      weeklyMatches[leagueWeek] = {};
    }

    if (!weeklyMatches[leagueWeek].hasOwnProperty(match.player1)) {
      weeklyMatches[leagueWeek][match.player1] = [];
    }

    weeklyMatches[leagueWeek][match.player1].push({
      key: uuid(),
      date: match.date,
      isMatchEligible: true,
      leagueScore: calcLeagueScore(match.player1Score, match.player2Score),
      matchScore: parseFloat(match.player1Score),
      playerArmy: match.player1Army,
      opponent: match.player2,
      opponentArmy: match.player2Army,
      opponentScore: parseFloat(match.player2Score),
    });

    if (!weeklyMatches[leagueWeek].hasOwnProperty(match.player2)) {
      weeklyMatches[leagueWeek][match.player2] = [];
    }

    weeklyMatches[leagueWeek][match.player2].push({
      key: uuid(),
      date: match.date,
      isMatchEligible: true,
      leagueScore: calcLeagueScore(match.player2Score, match.player1Score),
      matchScore: parseFloat(match.player2Score),
      playerArmy: match.player1Army,
      opponent: match.player1,
      opponentArmy: match.player1Army,
      opponentScore: parseFloat(match.player1Score),
    });
  }

  return weeklyMatches;
};

const determineTop4Matches = (
  matches: WeeklyMatch[],
  standing?: PlayerStanding | null
) => {
  const allMatches = [...matches];
  if (standing?.match1) allMatches.push(standing.match1);
  if (standing?.match2) allMatches.push(standing.match2);
  if (standing?.match3) allMatches.push(standing.match3);
  if (standing?.match4) allMatches.push(standing.match4);

  const sortedMatches = allMatches.sort((a: WeeklyMatch, b: WeeklyMatch) => {
    if (a.leagueScore < b.leagueScore) return 1;
    if (a.leagueScore > b.leagueScore) return -1;
    return 0;
  });

  const new_standing: {
    match1?: WeeklyMatch;
    match2?: WeeklyMatch;
    match3?: WeeklyMatch;
    match4?: WeeklyMatch;
    leagueScore: number;
  } = {
    match1: undefined,
    match2: undefined,
    match3: undefined,
    match4: undefined,
    leagueScore: 0.0,
  };

  const totalMatches = sortedMatches.length;

  let totalLeagueScore = 0.0;
  if (totalMatches > 0) {
    new_standing.match1 = sortedMatches[0];
    totalLeagueScore += new_standing.match1.leagueScore;
  }
  if (totalMatches > 1) {
    new_standing.match2 = sortedMatches[1];
    totalLeagueScore += new_standing.match2.leagueScore;
  }
  if (totalMatches > 2) {
    new_standing.match3 = sortedMatches[2];
    totalLeagueScore += new_standing.match3.leagueScore;
  }
  if (totalMatches > 3) {
    new_standing.match4 = sortedMatches[3];
    totalLeagueScore += new_standing.match4.leagueScore;
  }

  const leagueScore =
    totalMatches > 0 ? totalLeagueScore / Math.min(totalMatches, 4) : 0.0;

  return { ...new_standing, leagueScore: leagueScore };
};

const build = (
  players: Player[],
  matches: Match[],
  leagueStartDate: string,
  leagueEndDate: string
) => {
  const matchesByWeek = groupMatchesIntoLeagueWeeks(
    matches,
    leagueStartDate,
    leagueEndDate
  );

  const playerStandingByWeek: StandingsByWeek = {};
  const leagueStandingsByWeek: LeagueStandingsByWeek = {};

  const finalLeagueWeek =
    getLeagueWeek(leagueStartDate, leagueEndDate, leagueEndDate).week + 1;

  for (let week = 1; week < finalLeagueWeek + 1; week++) {
    let matchesForCurrentWeek = matchesByWeek[week];
    let standingsForPriorWeek =
      week > 1 ? playerStandingByWeek[week - 1] : undefined;

    if (week > 1 && !matchesForCurrentWeek && standingsForPriorWeek) {
      // if there are no matches this week, just copy the prior week's standings
      playerStandingByWeek[week] = standingsForPriorWeek;

      leagueStandingsByWeek[week] = [];
      for (let standing in standingsForPriorWeek) {
        leagueStandingsByWeek[week].push(standingsForPriorWeek[standing]);
      }
    } else {
      //otherwise we want to traverse all standings and determine the new top 4
      for (let index = 0; index < players.length; index++) {
        // go through each player and figure out if we want last weeks standings
        // (because they have no new matches) or if we need to recalc their top 4
        let player = players[index];

        let playerStanding: PlayerStanding = {
          key: uuid(),
          player: player.name,
          army: player.army,
          avgLeagueScore: 0.0,
        };

        let priorPlayerStanding: PlayerStanding | null =
          week > 1 && standingsForPriorWeek?.hasOwnProperty(player.name)
            ? standingsForPriorWeek[player.name]
            : null;

        if (
          matchesForCurrentWeek &&
          matchesForCurrentWeek.hasOwnProperty(player.name)
        ) {
          const { match1, match2, match3, match4, leagueScore } =
            determineTop4Matches(
              matchesForCurrentWeek[player.name],
              priorPlayerStanding
            );

          playerStanding = {
            ...playerStanding,
            match1,
            match2,
            match3,
            match4,
            avgLeagueScore: leagueScore,
          };
        } else if (priorPlayerStanding) {
          playerStanding = priorPlayerStanding;
        }

        if (!playerStandingByWeek[week]) playerStandingByWeek[week] = {};

        playerStandingByWeek[week][player.name] = playerStanding;
        if (!leagueStandingsByWeek[week]) leagueStandingsByWeek[week] = [];
        leagueStandingsByWeek[week].push(playerStanding);
      } // by player
    }

    leagueStandingsByWeek[week] = leagueStandingsByWeek[week]?.sort(
      (a: PlayerStanding, b: PlayerStanding) => {
        if (a.avgLeagueScore < b.avgLeagueScore) return 1;
        if (a.avgLeagueScore > b.avgLeagueScore) return -1;
        return 0;
      }
    );

    for (let item = 0; item < leagueStandingsByWeek[week].length; item++) {
      if (leagueStandingsByWeek[week][item].avgLeagueScore > 0) {
        leagueStandingsByWeek[week][item].rank = item + 1;
      }
    }
  } // by week

  return { leagueStandingsByWeek, totalWeeksInSeason: finalLeagueWeek };
};

const getCurrentLeagueWeekFor = (
  targetDate: string,
  leagueStartDate: string,
  leagueEndDate: string
) => {
  return getLeagueWeek(leagueStartDate, leagueEndDate, targetDate, true);
};

const StandingsBuilder = {
  Build: build,
  GetCurrentLeagueWeekFor: getCurrentLeagueWeekFor,
};

export default StandingsBuilder;
