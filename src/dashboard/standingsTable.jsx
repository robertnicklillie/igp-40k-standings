import { Button, Table, Tag } from "antd";
import React, { useState, useEffect } from "react";

export default function StandingsTable({
  leagueWeek,
  standings,
  matchesByPlayer,
}) {
  const [focusPlayer, setFocusPlayer] = useState(null);
  const [playerMatches, setPlayerMatches] = useState({ matches: [] });

  const generateMatchShorthand = (match) => {
    if (match) {
      const matchScoreLine = `${
        match.matchScore > match.opponentScore ? "W" : "L"
      } ${match.matchScore} - ${match.opponentScore}`;
      return (
        <>
          <b>{match.leagueScore}</b>&nbsp;--&nbsp;{matchScoreLine} vs <b>{match.opponent}</b> [
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
      render: (rank) => <h2>{rank ?? "NR"}</h2>,
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
        <Button type="link" onClick={() => setFocusPlayer(match.player)}>
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
      dataIndex: "matchDate",
      key: "matchDate",
    },
    {
      title: "League Week",
      dataIndex: "leagueWeek",
      key: "leagueWeek",
    },
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
    },
    {
      title: "Player Score",
      dataIndex: "score",
      key: "score",
      render: (_, item) => (
        <Tag
          key={item.key}
          color={
            item.score > item.opponentScore ? "green-inverse" : "red-inverse"
          }
        >
          {item.score}
        </Tag>
      ),
    },
    {
      title: "Opponent",
      dataIndex: "opponent",
      key: "opponent",
    },
    {
      title: "Opponent Rank",
      dataIndex: "opponentRank",
      key: "opponentRank",
    },
    {
      title: "Opponent Score",
      dataIndex: "opponentScore",
      key: "opponentScore",
      render: (_, item) => (
        <Tag
          key={item.key}
          color={
            item.score < item.opponentScore ? "green-inverse" : "red-inverse"
          }
        >
          {item.opponentScore}
        </Tag>
      ),
    },
    {
      title: "Opponent Army",
      dataIndex: "opponentArmy",
      key: "opponentArmy",
    },
  ];

  const getStandings = () => {
    return standings.leagueStandingsByWeek[standings.totalWeeksInSeason];
  };

  // useEffect(() => {
  //   setPlayerMatches(matchesByPlayer[focusPlayer]);
  // }, [focusPlayer, matchesByPlayer]);

  return (
    <>
      <div>
        <h1>Standings</h1>
        <h3>
          For week #{leagueWeek.week} of {standings.totalWeeksInSeason},
          starting {leagueWeek.firstDay}
        </h3>
        <Table
          pagination={false}
          columns={standingsColumns}
          //leagueStandingsByWeek, totalWeeksInSeason
          dataSource={getStandings()}
        />
      </div>

      {focusPlayer && (
        <div>
          <h2>Player Matches: {focusPlayer}</h2>
          <Table
            pagination={false}
            columns={matchesColumns}
            dataSource={playerMatches}
          />
        </div>
      )}
    </>
  );
}
