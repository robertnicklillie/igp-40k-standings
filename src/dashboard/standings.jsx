import { Button, Table } from "antd";
import React, { useState, useEffect } from "react";

export default function Standings({ data, matchesByPlayer }) {
  const [focusPlayer, setFocusPlayer] = useState(null);
  const [playerMatches, setPlayerMatches] = useState({ matches: [] });

  // Rank	Avg LEAGUE Score	Player	Army	Match 1	Match 2	Match 3	Match 4
  const columnsStandings = [
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

  const columnMatches = [
    {
      title: "Date",
      dataIndex: "matchDate",
      key: "matchDate",
    },
    {
      title: "Player Score",
      dataIndex: "score",
      key: "score",
    },
    {
      title: "Opponent",
      dataIndex: "opponent",
      key: "opponent",
    },
    {
      title: "Opponent Score",
      dataIndex: "opponentScore",
      key: "opponentScore",
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
          columns={columnsStandings}
          dataSource={data}
        />
      </div>

      {focusPlayer && (
        <div>
          <h2>Player Matches: {focusPlayer}</h2>
          <Table
            pagination={false}
            columns={columnMatches}
            dataSource={playerMatches}
          />
        </div>
      )}
    </>
  );
}
