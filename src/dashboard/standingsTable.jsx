import { Table } from "antd";

export default function StandingsTable({ standings }) {
    const generateRankingsDisplayData = (standings) => {
        let tournamentRank = 0;
        const leagueStandings = standings.sortedPlayers.reduce((acc, currentPlayer, currentIndex) => {
            let matches = {};
            let qualifiesForTournament = false;

            for (let i = 0; i < 6; i++) {
                let match = currentPlayer.playerMatches[i];
                let index = `match${i}`;

                if (match === undefined) {
                    matches[index] = { hasMatch: false };
                    continue;
                }

                if (i === 5) { qualifiesForTournament = true; }

                let winOrLoss = match.playerScore === match.opponentScore ? "T" : match.playerScore > match.opponentScore ? "W" : "L";
                let playerByLine = `${winOrLoss} ${match.playerScore} - ${match.opponentScore} ${match.playerArmy}`;
                let opponentByLine = `${match.opponent} ${match.opponentArmy}`;
                matches[index] = {
                    hasMatch: true,
                    playerScore: match.leagueScore,
                    playerByLine: playerByLine,
                    opponentByLine: opponentByLine,
                    key: match.key
                }
            }
            
            acc[currentIndex] = {
                rank: currentIndex,
                leagueScore: parseFloat(currentPlayer.leagueScore).toFixed(2),
                playerName: currentPlayer.name,
                qualifiesForTournament: qualifiesForTournament,
                tournamentRank: tournamentRank,
                matches: matches,
                key: currentPlayer.key,
            };

            if (qualifiesForTournament) { tournamentRank++; }

            return acc;
        }, []);

        return leagueStandings;
    };

    const generateMatchShorthand = (match) => {
        if (match.hasMatch) {
            return (
                <>
                    <b>{match.playerScore}</b>
                    <div style={{ fontSize: "14px"}}>{match.playerByLine}</div>
                    <div style={{ fontSize: "14px"}}><b>v</b> {match.opponentByLine}</div>
                </>
            );
        }
        return <>---</>;
    };

    // Rank	Avg LEAGUE Score	Player	Army	Match 1	Match 2	Match 3	Match 4 Match 5 Match 6
    const standingsColumns = [
        {
            title: "Regular Season",
            children: [                
                {
                    title: "Rank",
                    dataIndex: "rank",
                    key: "rank",
                    render: (rank) => <span style={{ fontSize: "24px", fontWeight: "bold", color: "#FFFFFF", backgroundColor: "#6b32a8", padding:"6px", borderRadius:"12px" }}>{rank + 1 ?? "n/a"}</span>,
                },
                {
                    title: "League Score",
                    dataIndex: "leagueScore",
                    key: "leagueScore",
                    render: (score) => score,
                },
                {
                    title: "Player",
                    dataIndex: "playerName",
                    key: "player",
                    render: (playerName) => (
                        <b>{playerName}</b>
                    ),
                },
                {
                    title: "Match 1",
                    dataIndex: "matches",
                    key: "matches",
                    render: (matches) => generateMatchShorthand(matches.match0),

                },
                {
                    title: "Match 2",
                    dataIndex: "matches",
                    key: "matches",
                    render: (matches) => generateMatchShorthand(matches.match1),
                },
                {
                    title: "Match 3",
                    dataIndex: "matches",
                    key: "matches",
                    render: (matches) => generateMatchShorthand(matches.match2),
                },
                {
                    title: "Match 4",
                    dataIndex: "matches",
                    key: "matches",
                    render: (matches) => generateMatchShorthand(matches.match3),
                },
                {
                    title: "Match 5",
                    dataIndex: "matches",
                    key: "matches",
                    render: (matches) => generateMatchShorthand(matches.match4),
                },
                {
                    title: "Match 6",
                    dataIndex: "matches",
                    key: "matches",
                    render: (matches) => generateMatchShorthand(matches.match5),
                },
            ]
        },
        {
            title: "Post Season",
            children: [
                {
                    title: "Tournament Rank",
                    dataIndex: "player",
                    key: "playerRank",
                    render: (_, player) => {
                        return (<span 
                            style={{ fontSize: "24px", fontWeight: "bold", color: player.qualifiesForTournament ? "#32a83a" : "#808080" }}>
                                {player.qualifiesForTournament ? player.tournamentRank + 1 : "n/a"}
                        </span>)
                    }
                        
                }
            ]
        }
    ];

    return (
        <>
            <div>
                <h1>Standings</h1>
                <Table 
                    pagination={false} 
                    columns={standingsColumns} 
                    dataSource={generateRankingsDisplayData(standings)}
                    bordered />
            </div>
        </>
    );
}
