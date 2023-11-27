// Player 1	Player 1 Score	Player 1 Army	Player 2	Player 2 Score	Player 2 Army	Date
// asdfasdf	25	Tau	rtyutryu	46	Tau	11/25/2023
// fhdfhgd	94	Tau	ghjkghjk	57	Tau	12/3/2023
// fghjghj	67	Tau	uyioyuioyu	36	Tau	12/3/2023
// ghjkghjk	85	Tau	fghjghj	67	Tau	12/7/2023
// hjklhjkl	83	Tau	zxcvzxcv	37	Tau	12/10/2023
// ertyrty	63	Tau	qwerqwre	38	Tau	12/12/2023
import { Button, Spin, Table } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

export default function Dashboard() {
  const [focusPlayer, setFocusPlayer] = useState(null);
  const [playerMatches, setPlayerMatches] = useState({ matches: [] });

  const [requestStandings, setRequestStandings] = useState(false);
  const [generateStandings, setGenerateStandings] = useState(false);
  const [displayStandings, setDisplayStandings] = useState(false);

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

  const _standings = [
    {
      key: uuid(),
      rank: 1,
      leagueScore: 125.245,
      player: "Nicholas",
      army: "Black Templars",
      matchOne: "Joe | Aeldari | 175 | 11/28/2023",
      matchTwo: "Joe | Aeldari | 175 | 11/28/2023",
      matchThree: "Joe | Aeldari | 175 | 11/28/2023",
      matchFour: "Joe | Aeldari | 175 | 11/28/2023",
    },
    {
      key: uuid(),
      rank: 2,
      leagueScore: 115.245,
      player: "Larry",
      army: "Black Templars",
      matchOne: "Joe | Aeldari | 175 | 11/28/2023",
      matchTwo: "Joe | Aeldari | 175 | 11/28/2023",
      matchThree: "Joe | Aeldari | 175 | 11/28/2023",
      matchFour: "Joe | Aeldari | 175 | 11/28/2023",
    },
    {
      key: uuid(),
      rank: 3,
      leagueScore: 105.245,
      player: "Nicholas",
      army: "Black Templars",
      matchOne: "Joe | Aeldari | 175 | 11/28/2023",
      matchTwo: "Joe | Aeldari | 175 | 11/28/2023",
      matchThree: "Joe | Aeldari | 175 | 11/28/2023",
      matchFour: "Joe | Aeldari | 175 | 11/28/2023",
    },
    {
      key: uuid(),
      rank: 4,
      leagueScore: 95.245,
      player: "Nicholas",
      army: "Black Templars",
      matchOne: "Joe | Aeldari | 175 | 11/28/2023",
      matchTwo: "Joe | Aeldari | 175 | 11/28/2023",
      matchThree: "Joe | Aeldari | 175 | 11/28/2023",
      matchFour: "Joe | Aeldari | 175 | 11/28/2023",
    },
    {
      key: uuid(),
      rank: 5,
      leagueScore: 85.245,
      player: "Nicholas",
      army: "Black Templars",
      matchOne: "Joe | Aeldari | 175 | 11/28/2023",
      matchTwo: "Joe | Aeldari | 175 | 11/28/2023",
      matchThree: "Joe | Aeldari | 175 | 11/28/2023",
      matchFour: "Joe | Aeldari | 175 | 11/28/2023",
    },
    {
      key: uuid(),
      rank: 6,
      leagueScore: 75.245,
      player: "Nicholas",
      army: "Black Templars",
      matchOne: "Joe | Aeldari | 175 | 11/28/2023",
      matchTwo: "Joe | Aeldari | 175 | 11/28/2023",
      matchThree: "Joe | Aeldari | 175 | 11/28/2023",
      matchFour: "Joe | Aeldari | 175 | 11/28/2023",
    },
    {
      key: uuid(),
      rank: 7,
      leagueScore: 65.245,
      player: "Nicholas",
      army: "Black Templars",
      matchOne: "Joe | Aeldari | 175 | 11/28/2023",
      matchTwo: "Joe | Aeldari | 175 | 11/28/2023",
      matchThree: "Joe | Aeldari | 175 | 11/28/2023",
      matchFour: "Joe | Aeldari | 175 | 11/28/2023",
    },
    {
      key: uuid(),
      rank: 8,
      leagueScore: 55.245,
      player: "Nicholas",
      army: "Black Templars",
      matchOne: "Joe | Aeldari | 175 | 11/28/2023",
      matchTwo: "Joe | Aeldari | 175 | 11/28/2023",
      matchThree: "Joe | Aeldari | 175 | 11/28/2023",
      matchFour: "Joe | Aeldari | 175 | 11/28/2023",
    },
  ];

  useEffect(() => {
    if (requestStandings) {
      setRequestStandings(false);
      setGenerateStandings(true);

      setTimeout(() => {
        setGenerateStandings(false);
        setDisplayStandings(true);
      }, 5000);

      // generate the standings by what the user provided
    }
  }, [requestStandings]);

  useEffect(() => {
    const larryMatches = [
      {
        key: uuid(),
        score: 25,
        matchDate: "11/25/2023",
        opponent: "Tommy",
        opponentScore: 79,
        opponentScoreArmy: "Chaos Space Marines",
      },
    ];

    const nicholasMatches = [
      {
        key: uuid(),
        score: 25,
        matchDate: "11/25/2023",
        opponent: "Tommy",
        opponentScore: 79,
        opponentScoreArmy: "Chaos Space Marines",
      },
      {
        key: uuid(),
        score: 25,
        matchDate: "11/25/2023",
        opponent: "Tommy",
        opponentScore: 79,
        opponentScoreArmy: "Chaos Space Marines",
      },
      {
        key: uuid(),
        score: 25,
        matchDate: "11/25/2023",
        opponent: "Tommy",
        opponentScore: 79,
        opponentScoreArmy: "Chaos Space Marines",
      },
      {
        key: uuid(),
        score: 25,
        matchDate: "11/25/2023",
        opponent: "Tommy",
        opponentScore: 79,
        opponentScoreArmy: "Chaos Space Marines",
      },
      {
        key: uuid(),
        score: 25,
        matchDate: "11/25/2023",
        opponent: "Tommy",
        opponentScore: 79,
        opponentScoreArmy: "Chaos Space Marines",
      },
      {
        key: uuid(),
        score: 25,
        matchDate: "11/25/2023",
        opponent: "Tommy",
        opponentScore: 79,
        opponentScoreArmy: "Chaos Space Marines",
      },
    ];
    setPlayerMatches(
      focusPlayer === "Nicholas" ? nicholasMatches : larryMatches
    );
  }, [focusPlayer]);

  return (
    <>
      {displayStandings ? (
        <>
          <div>
            <h2>Standings</h2>
            <Table
              pagination={false}
              columns={columnsStandings}
              dataSource={_standings}
            />
          </div>

          {focusPlayer ? (
            <div>
              <h2>Player Matches: {focusPlayer}</h2>
              <Table
                pagination={false}
                columns={columnMatches}
                dataSource={playerMatches}
              />
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          <div>
            <h2>Players</h2>
            <TextArea cols={40} rows={8}></TextArea>
          </div>
          <div>
            <h2>Matches</h2>
            <TextArea cols={40} rows={8}></TextArea>
          </div>
          <div style={{ paddingTop: "20px" }}>
            <Button
              type="primary"
              loading={generateStandings}
              onClick={() => setRequestStandings(true)}
            >
              Generate Standings
            </Button>
          </div>
        </>
      )}
    </>
  );
}
