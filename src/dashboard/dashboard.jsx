import { Button, Table } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import Standings from "./standings";
import MatchImporter from "../services/MatchImporter";
import ValidationTable from "./validationTable";

export default function Dashboard() {
  const [importMatches, setImportMatches] = useState(false);
  const [displayValidation, setDisplayValidation] = useState(false);
  const [displayStandings, setDisplayStandings] = useState(false);

  const [playerData, setPlayerData] = useState("");
  const [players, setPlayers] = useState(null);
  const [matchData, setMatchData] = useState("");
  const [matches, setMatches] = useState(null);

  const handlePlayersChange = (event) => {
    setPlayerData(event.target.value);
  };

  const handleMatchesChange = (event) => {
    setMatchData(event.target.value);
  };

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
    if (importMatches) {
      setImportMatches(false);

      setPlayers(MatchImporter.ParsePlayers(playerData));
      setMatches(MatchImporter.ParseMatches(matchData));

      setDisplayValidation(true);
    }
  }, [importMatches]);

  useEffect(() => {}, [displayValidation]);

  const matchesByPlayer = {
    Larry: [
      {
        key: uuid(),
        score: 25,
        matchDate: "11/25/2023",
        opponent: "Tommy",
        opponentScore: 79,
        opponentScoreArmy: "Chaos Space Marines",
      },
    ],
    Nicholas: [
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
    ],
  };

  return (
    <>
      {displayStandings ? (
        <Standings data={_standings} matchesByPlayer={matchesByPlayer} />
      ) : displayValidation ? (
        <>
          <ValidationTable players={players} matches={matches} />
          <div style={{ paddingTop: "20px" }}>
            <Button type="primary" onClick={() => setImportMatches(true)}>
              Generate Standings
            </Button>
          </div>
        </>
      ) : (
        <>
          <div>
            <h2>Players</h2>
            <TextArea
              cols={40}
              rows={8}
              onChange={handlePlayersChange}
            ></TextArea>
          </div>
          <div>
            <h2>Matches</h2>
            <TextArea
              cols={40}
              rows={8}
              onChange={handleMatchesChange}
            ></TextArea>
          </div>
          <div style={{ paddingTop: "20px" }}>
            <Button type="primary" onClick={() => setImportMatches(true)}>
              Import Matches
            </Button>
          </div>
        </>
      )}
    </>
  );
}
