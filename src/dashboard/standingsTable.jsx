import { Button, Table, Tag } from "antd";
import React, { useState, useEffect } from "react";


export default function StandingsTable({ standings, matchesByPlayer }) {
  const [focusPlayer, setFocusPlayer] = useState(null);
  const [playerMatches, setPlayerMatches] = useState({ matches: [] });

  // Rank	Avg LEAGUE Score	Player	Army	Match 1	Match 2	Match 3	Match 4
  const standingsColumns = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
    },
    {
      title: "League Score",
      dataIndex: "leagueScore",
      key: "leagueScore",
    },
    {
      title: "Player",
      dataIndex: "player",
      key: "player",
      render: (_, match) => (
        <Button type="link" onClick={() => setFocusPlayer(match.player)}>
          {match.player}
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
      dataIndex: "matchOne",
      key: "matchOne",
    },
    {
      title: "Match 2",
      dataIndex: "matchTwo",
      key: "matchTwo",
    },
    {
      title: "Match 3",
      dataIndex: "matchThree",
      key: "matchThree",
    },
    {
      title: "Match 4",
      dataIndex: "matchFour",
      key: "matchFour",
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
        <Tag key={item.key} color={item.score > item.opponentScore ? "green-inverse" : "red-inverse"}>{item.score}</Tag>
      )
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
        <Tag key={item.key} color={item.score < item.opponentScore ? "green-inverse" : "red-inverse"}>{item.opponentScore}</Tag>
      )
    },
    {
      title: "Opponent Army",
      dataIndex: "opponentArmy",
      key: "opponentArmy",
    },
  ];

  useEffect(() => {
    setPlayerMatches(matchesByPlayer[focusPlayer]);
  }, [focusPlayer, matchesByPlayer]);

  return (
    <>
      <div>
        <h2>Standings</h2>
        <Table
          pagination={false}
          columns={standingsColumns}
          dataSource={standings}
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
