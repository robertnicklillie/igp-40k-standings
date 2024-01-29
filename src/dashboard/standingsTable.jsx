import { Button, Table, Tag } from "antd";
import React, { useState, useEffect } from "react";
import { FireTwoTone, CloseCircleTwoTone } from "@ant-design/icons";

export default function StandingsTable({ leagueWeek, standings, matchesByPlayer }) {
    const [focusPlayer, setFocusPlayer] = useState(null);
    const [playerMatches, setPlayerMatches] = useState({ matches: [] });
    const [playerStandings, setPlayerStandings] = useState(null);

    const generateMatchShorthand = (match) => {
        if (match) {
            const playerScoreLine = `${match.playerScore === match.opponentScore ? "T" : match.playerScore > match.opponentScore ? "W" : "L"} ${match.playerScore} - ${
                match.opponentScore
            }`;
            return (
                <>
                    <b>{match.leagueScore}</b>&nbsp;--&nbsp;{playerScoreLine} vs <b>{match.opponent}</b> [
                    {match.opponentArmy}]
                </>
            );
        }
        return <>---</>;
    };

    // Rank	Avg LEAGUE Score	Player	Army	Match 1	Match 2	Match 3	Match 4
    const standingsColumns = [
        {
            title: "Rank",
            dataIndex: "rank",
            key: "rank",
            render: (rank) => <span style={{ fontSize: "18px", fontWeight: "bold" }}>{rank ?? "NR"}</span>,
        },
        {
            title: "League Score",
            dataIndex: "avgLeagueScore",
            key: "avgLeagueScore",
            render: (score) => parseFloat(score).toFixed(2),
        },
        {
            title: "Player",
            dataIndex: "player",
            key: "player",
            render: (_, match) => (
                <Button type="link" className="link-button" onClick={() => setFocusPlayer(match.player)}>
                    <b>{match.player}</b>
                </Button>
            ),
        },
        {
            title: "Army",
            dataIndex: "army",
            key: "army",
        },
        {
          title: "Total Matches",
          dataIndex: "totalMatches",
          key: "totalMatches",
        },
        {
            title: "Match 1",
            dataIndex: "match1",
            key: "match1",
            render: (match) => generateMatchShorthand(match),
        },
        {
            title: "Match 2",
            dataIndex: "match2",
            key: "match2",
            render: (match) => generateMatchShorthand(match),
        },
        {
            title: "Match 3",
            dataIndex: "match3",
            key: "match3",
            render: (match) => generateMatchShorthand(match),
        },
        {
            title: "Match 4",
            dataIndex: "match4",
            key: "match4",
            render: (match) => generateMatchShorthand(match),
        },
    ];

    const matchesColumns = [
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Week",
            dataIndex: "leagueWeek",
            key: "leagueWeek",
        },

        {
            title: "Eligible?",
            dataIndex: "isMatchEligible",
            key: "isMatchEligible",
            render: (item) => (
                <Tag key={item} color={item === true ? "blue" : "red"}>
                    {item ? "Yes" : "No"}
                </Tag>
            ),
        },
        {
            title: "League Score",
            dataIndex: "leagueScore",
            key: "leagueScore",
            render: (_, match) => {
                const isTop4 =
                    playerStandings[0]?.match1?.key === match.key ||
                    playerStandings[0]?.match2?.key === match.key ||
                    playerStandings[0]?.match3?.key === match.key ||
                    playerStandings[0]?.match4?.key === match.key;

                return (
                    <>
                        {isTop4 && <FireTwoTone />} {match.leagueScore}
                    </>
                );
            },
        },
        {
            title: "Player (army, rank, score)",
            render: (_, match) => `${match.playerArmy} | ${match.playerRank} | ${match.playerScore}`,
        },
        {
            title: "Opponent (name, army, rank, score)",
            render: (_, match) =>
                `${match.opponent} | ${match.opponentArmy} | ${match.opponentRank} | ${match.opponentScore}`,
        },
    ];

    const getStandings = () => {
        return standings.leagueStandingsByWeek[standings.totalWeeksInSeason];
    };

    const removeFocusPlayer = () => {
        setFocusPlayer(null)
    }

    useEffect(() => {
        const matchesForPlayer = matchesByPlayer[focusPlayer];
        const playerStandings = standings.leagueStandingsByWeek[standings.totalWeeksInSeason].filter(
            (s) => s.player === focusPlayer
        );
        setPlayerStandings(playerStandings);
        setPlayerMatches(matchesForPlayer);
    }, [focusPlayer, matchesByPlayer, standings.leagueStandingsByWeek, standings.totalWeeksInSeason]);

    return (
        <>
            <div>
                <h1>Standings - Week {leagueWeek.week}</h1>
                <Table pagination={false} columns={standingsColumns} dataSource={getStandings()} />
            </div>

            {focusPlayer && (
                <div>
                    <h2>Player Matches: {focusPlayer} <CloseCircleTwoTone onClick={removeFocusPlayer} /></h2>
                    <Table pagination={false} columns={matchesColumns} dataSource={playerMatches} />
                </div>
            )}
        </>
    );
}
