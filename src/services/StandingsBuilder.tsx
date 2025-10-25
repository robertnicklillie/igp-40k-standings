var { v4: uuid } = require("uuid");

interface Match {
    key: string;
    player1: string;
    player1Army: string;
    player1Score: string;
    player2: string;
    player2Army: string;
    player2Score: string;
    date: string;

    player1IsNameValid: boolean;
    player1IsArmyValid: boolean;
    player2IsNameValid: boolean;
    player2IsArmyValid: boolean;
}

interface Player {
    key: string;
    name: string;
    isNameValid: boolean;
    leagueScore: number;
    playerMatches: PlayerMatch[];
}

interface PlayerMatch {
    key: string;
    date: string;
    leagueScore: number;
    player: string;
    playerArmy: string;
    playerScore: number;
    opponent: string;
    opponentArmy: string;
    opponentScore: number;
}

interface PlayersWithMatches {
    [key: string]: Player;
}

interface PlayersByName {
    [key: string]: Player;
}

interface PlayersByNameWithName {
    [key: string]: string;
}

const utility_calculateLeagueScore = (playerScore: string, opponentScore: string) => {
    return parseFloat(playerScore) + (100 - parseFloat(opponentScore));
};

const setPlayerMatches = (players: Player[], matches: Match[]): { playersWithMatches: PlayersWithMatches, matchesWithPlayerValidation: Match[] } => {
    const playersWithMatches: PlayersWithMatches = {};
    const playersByName: PlayersByName = players.reduce((collection: PlayersByName, currentPlayer) => {
        collection[currentPlayer.name] = currentPlayer;
        return collection;
    }, {});

    for (let i = 0; i < matches.length; i++ ) {
        let match = matches[i];

        if (playersByName.hasOwnProperty(match.player1)) {
            match.player1IsNameValid = true;

            if (!playersWithMatches.hasOwnProperty(match.player1)) {
                playersWithMatches[match.player1] = {
                    key: uuid(),
                    name: match.player1,
                    isNameValid: true,
                    leagueScore: 0,
                    playerMatches: []
                }
            }

            playersWithMatches[match.player1].playerMatches.push({
                key: uuid(),
                date: match.date,
                leagueScore: utility_calculateLeagueScore(match.player1Score, match.player2Score),
                player: match.player1,
                playerArmy: match.player1Army,
                playerScore: parseFloat(match.player1Score),
                opponent: match.player2,
                opponentArmy: match.player2Army,
                opponentScore: parseFloat(match.player2Score),
            });
        }

        if (playersByName.hasOwnProperty(match.player2)) {
            match.player1IsNameValid = true;

            if (!playersWithMatches.hasOwnProperty(match.player2)) {
                playersWithMatches[match.player2] = {
                    key: uuid(),
                    name: match.player2,
                    isNameValid: true,
                    leagueScore: 0,
                    playerMatches: []
                }
            }

            playersWithMatches[match.player2].playerMatches.push({
                key: uuid(),
                date: match.date,
                leagueScore: utility_calculateLeagueScore(match.player2Score, match.player1Score),
                player: match.player2,
                playerArmy: match.player2Army,
                playerScore: parseFloat(match.player2Score),
                opponent: match.player1,
                opponentArmy: match.player1Army,
                opponentScore: parseFloat(match.player1Score),
            });
        }
    }

    return { playersWithMatches, matchesWithPlayerValidation: matches };
}

const calculatePlayerLeagueScoresAndSort = (players: PlayersWithMatches) => {
    const playersSortable: Player[] = [];
    for (const player in players) {
        players[player].playerMatches.sort((a: PlayerMatch, b: PlayerMatch) => {
            if (a.leagueScore < b.leagueScore) return 1;
            if (a.leagueScore > b.leagueScore) return -1;
            return 0;
        });

        let absoluteLeagueScore = 0;
        let matches = 0;
        let matchesToCount = 6;
        let eligibleMatches = [];
        let ineligibleOpponents: PlayersByNameWithName = {};
        for (let i = 0; i < players[player].playerMatches.length; i++) {
            let currentMatch = players[player].playerMatches[i];
            if (currentMatch === undefined) {
                break;
            }
            if (eligibleMatches.length === matchesToCount) {
                break;
            }
            if (!ineligibleOpponents.hasOwnProperty(currentMatch.opponent)) {
                
                eligibleMatches.push(currentMatch);
                ineligibleOpponents[currentMatch.opponent] = "";

                absoluteLeagueScore += currentMatch.leagueScore;
                ++matches;

                console.log({absoluteLeagueScore, matches });
            }
        }
        players[player].leagueScore = absoluteLeagueScore / matches;
        players[player].playerMatches = eligibleMatches;

        playersSortable.push(players[player])
    }

    return playersSortable;
}

const sortLeagueStandings = (players: Player[]) => {
    players.sort((a: Player, b: Player) => {
        if (a.leagueScore < b.leagueScore) return 1;
        if (a.leagueScore > b.leagueScore) return -1;
        return 0;
    });

    return players;
}

const buildStandings = (players: Player[], matches: Match[]) => {
    let { playersWithMatches, matchesWithPlayerValidation } = setPlayerMatches(players, matches);
    let playersSortable = calculatePlayerLeagueScoresAndSort(playersWithMatches);
    let sortedPlayers = sortLeagueStandings(playersSortable);

    return { sortedPlayers, matchesWithPlayerValidation };
};

const StandingsBuilder = {
    build: buildStandings,
};

export default StandingsBuilder;
