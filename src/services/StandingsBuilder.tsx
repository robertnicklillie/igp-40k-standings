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
    leagueWeek: number;
    isMatchEligible: boolean;
    leagueScore: number;
    player: string;
    playerArmy: string;
    playerScore: number;
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

const getLeagueWeek = (startDate: string, endDate: string, matchDate: string) => {
    const _startDate = dayjs(startDate);
    const _endDate = dayjs(endDate);
    const _matchDate = dayjs(matchDate);

    if (_matchDate.week() < _startDate.week() && _matchDate.year() === _startDate.year())
        throw Error(`Match date ${_matchDate} cannot be before the league season start date ${_startDate}`);

    if (_matchDate.week() > _endDate.week() && _matchDate.year() === _endDate.year())
        throw Error(`Match date ${matchDate} cannot be after the league season end date ${endDate}`);

    const weekOne = _startDate.week();
    const weekOneYear = _startDate.year();
    let week = 0;

    // moving sunday and monday to the prior week
    const isSundayOrMonday = _matchDate.day() === 0 || _matchDate.day() === 1;

    if (_matchDate.year() === weekOneYear) {
        week = _matchDate.week() - weekOne + (isSundayOrMonday ? 0 : 1);
    } else {
        // get the final week of the year
        let finalWeek = 0;
        let dayFinalWeek = 31;
        do {
            finalWeek = dayjs(`12/${dayFinalWeek--}/${weekOneYear}`).week();
        } while (finalWeek < 51);

        const yearWeekOffset = finalWeek - weekOne;
        week = _matchDate.week() + yearWeekOffset + (isSundayOrMonday ? 0 : 1);
    }

    return { week };
};

const calcLeagueScore = (playerScore: string, opponentScore: string) => {
    return parseFloat(playerScore) + (100 - parseFloat(opponentScore));
};

const groupMatchesByWeek = (matches: Match[], leagueStartDate: string, leagueEndDate: string) => {
    let matchesByWeek: LeagueMatchesByWeek = {};

    for (let i = 0; i < matches.length; i++) {
        let match = matches[i];

        const leagueWeek = getLeagueWeek(leagueStartDate, leagueEndDate, match.date).week;

        if (!matchesByWeek.hasOwnProperty(leagueWeek)) {
            matchesByWeek[leagueWeek] = {};
        }

        if (!matchesByWeek[leagueWeek].hasOwnProperty(match.player1)) {
            matchesByWeek[leagueWeek][match.player1] = [];
        }

        matchesByWeek[leagueWeek][match.player1].push({
            key: uuid(),
            date: match.date,
            leagueWeek: leagueWeek,
            isMatchEligible: true,
            leagueScore: calcLeagueScore(match.player1Score, match.player2Score),
            player: match.player1,
            playerArmy: match.player1Army,
            playerScore: parseFloat(match.player1Score),
            opponent: match.player2,
            opponentArmy: match.player2Army,
            opponentScore: parseFloat(match.player2Score),
        });

        if (!matchesByWeek[leagueWeek].hasOwnProperty(match.player2)) {
            matchesByWeek[leagueWeek][match.player2] = [];
        }

        matchesByWeek[leagueWeek][match.player2].push({
            key: uuid(),
            date: match.date,
            leagueWeek: leagueWeek,
            isMatchEligible: true,
            leagueScore: calcLeagueScore(match.player2Score, match.player1Score),
            player: match.player2,
            playerArmy: match.player2Army,
            playerScore: parseFloat(match.player2Score),
            opponent: match.player1,
            opponentArmy: match.player1Army,
            opponentScore: parseFloat(match.player1Score),
        });
    }

    return matchesByWeek;
};

const getPlayerStanding = (standingsByPlayer: StandingsByPlayer | undefined, playerName: string) => {
    return standingsByPlayer?.hasOwnProperty(playerName) ? standingsByPlayer[playerName] : null;
};

const determineTop4Matches = (
    currentWeek: number,
    playerName: string,
    matchesForPlayer: WeeklyMatch[],
    standingsByPlayer?: StandingsByPlayer
) => {
    let playerStanding: PlayerStanding | null = getPlayerStanding(standingsByPlayer, playerName);

    const allMatches = [...matchesForPlayer];
    if (playerStanding?.match1) allMatches.push(playerStanding.match1);
    if (playerStanding?.match2) allMatches.push(playerStanding.match2);
    if (playerStanding?.match3) allMatches.push(playerStanding.match3);
    if (playerStanding?.match4) allMatches.push(playerStanding.match4);

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

    let totalTop4 = 0;
    let totalLeagueScore = 0.0;
    let nextMatch: WeeklyMatch | null = null;
    let matchIndex = 0;
    const alreadyScoredOpponents: { [key: string]: number } = {};

    const findNextMatch = (
        currentWeek: number,
        sortedMatches: WeeklyMatch[],
        matchIndex: number,
        alreadyScoredOpponents: { [key: string]: number },
        playerCurrentRank: number | null
    ) => {
        if (matchIndex < sortedMatches.length) {
            for (; matchIndex < sortedMatches.length; matchIndex++) {
                let currentMatch = sortedMatches[matchIndex];

                const opponentPlayerRank = getPlayerStanding(standingsByPlayer, currentMatch.opponent);

                if (
                    alreadyScoredOpponents.hasOwnProperty(currentMatch.opponent) ||
                    (currentMatch.leagueWeek === currentWeek &&
                        playerCurrentRank &&
                        opponentPlayerRank &&
                        opponentPlayerRank.rank &&
                        opponentPlayerRank?.rank - playerCurrentRank > 5)
                ) {
                    console.info("league week: " + currentWeek);
                    console.info("match week: " + currentMatch.leagueWeek);
                    console.info(sortedMatches);
                    console.info(playerCurrentRank);
                    console.info(opponentPlayerRank);

                    currentMatch.isMatchEligible = false;
                } else {
                    return currentMatch;
                }
            }
        }
        return null;
    };

    nextMatch = findNextMatch(
        currentWeek,
        sortedMatches,
        matchIndex,
        alreadyScoredOpponents,
        playerStanding?.rank ?? null
    );
    if (nextMatch) {
        new_standing.match1 = sortedMatches[matchIndex++];
        totalLeagueScore += new_standing.match1.leagueScore;
        alreadyScoredOpponents[new_standing.match1.opponent] = 0;
        totalTop4++;
    }
    nextMatch = findNextMatch(
        currentWeek,
        sortedMatches,
        matchIndex,
        alreadyScoredOpponents,
        playerStanding?.rank ?? null
    );
    if (nextMatch) {
        new_standing.match2 = nextMatch;
        totalLeagueScore += new_standing.match2.leagueScore;
        alreadyScoredOpponents[new_standing.match2.opponent] = 0;
        totalTop4++;
    }

    nextMatch = findNextMatch(
        currentWeek,
        sortedMatches,
        matchIndex,
        alreadyScoredOpponents,
        playerStanding?.rank ?? null
    );
    if (nextMatch) {
        new_standing.match3 = nextMatch;
        totalLeagueScore += new_standing.match3.leagueScore;
        alreadyScoredOpponents[new_standing.match3.opponent] = 0;
        totalTop4++;
    }
    nextMatch = findNextMatch(
        currentWeek,
        sortedMatches,
        matchIndex,
        alreadyScoredOpponents,
        playerStanding?.rank ?? null
    );
    if (nextMatch) {
        new_standing.match4 = nextMatch;
        totalLeagueScore += new_standing.match4.leagueScore;
        alreadyScoredOpponents[new_standing.match4.opponent] = 0;
        totalTop4++;
    }

    const leagueScore = totalTop4 > 0 ? totalLeagueScore / totalTop4 : 0.0;

    return { ...new_standing, leagueScore: leagueScore, match: sortedMatches };
};

const build = (players: Player[], matches: Match[], leagueStartDate: string, leagueEndDate: string) => {
    const playerStandingByWeek: StandingsByWeek = {};
    const leagueStandingsByWeek: LeagueStandingsByWeek = {};

    const matchesByWeek = groupMatchesByWeek(matches, leagueStartDate, leagueEndDate);
    const finalLeagueWeek = getLeagueWeek(leagueStartDate, leagueEndDate, leagueEndDate).week + 1;

    for (let week = 1; week < finalLeagueWeek + 1; week++) {
        console.info("week: " + week);
        let matchesForCurrentWeek = matchesByWeek[week];
        let standingsForPriorWeek = week > 1 ? playerStandingByWeek[week - 1] : undefined;

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

                console.info("player: " + player.name);

                let playerStanding: PlayerStanding = {
                    key: uuid(),
                    player: player.name,
                    army: player.army,
                    avgLeagueScore: 0.0,
                };

                let priorPlayerStanding: PlayerStanding | null = getPlayerStanding(standingsForPriorWeek, player.name);

                // week > 1 && standingsForPriorWeek?.hasOwnProperty(player.name)
                //   ? standingsForPriorWeek[player.name]
                //   : null;

                if (matchesForCurrentWeek && matchesForCurrentWeek.hasOwnProperty(player.name)) {
                    const { match1, match2, match3, match4, leagueScore } = determineTop4Matches(
                        week,
                        player.name,
                        matchesForCurrentWeek[player.name],
                        standingsForPriorWeek
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

        leagueStandingsByWeek[week] = leagueStandingsByWeek[week]?.sort((a: PlayerStanding, b: PlayerStanding) => {
            if (a.avgLeagueScore < b.avgLeagueScore) return 1;
            if (a.avgLeagueScore > b.avgLeagueScore) return -1;
            return 0;
        });

        let priorRankPlayerScore = 0.0;
        let deferRank = 1;
        for (let playerRank = 0; playerRank < leagueStandingsByWeek[week].length; playerRank++) {
            const player = leagueStandingsByWeek[week][playerRank];

            if (player.avgLeagueScore === priorRankPlayerScore) {
                player.rank = playerRank + 1 - deferRank++;
            } else {
                player.rank = playerRank + 1;
                deferRank = 1;
            }
            priorRankPlayerScore = player.avgLeagueScore;
        }
    } // by week

    return { leagueStandingsByWeek, totalWeeksInSeason: finalLeagueWeek };
};

const getCurrentLeagueWeekFor = (targetDate: string, leagueStartDate: string, leagueEndDate: string) => {
    return getLeagueWeek(leagueStartDate, leagueEndDate, targetDate);
};

const StandingsBuilder = {
    Build: build,
    GetCurrentLeagueWeekFor: getCurrentLeagueWeekFor,
};

export default StandingsBuilder;
