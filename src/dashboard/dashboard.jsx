import { Button, Table } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import Standings from "./standings";
import MatchImporter from "../services/MatchImporter";
import ValidationTable from "./validationTable";

const Display = {
  Form: "Form",
  Validation: "Validation",
  Standings: "Standings",
}

export default function Dashboard() {
  const [display, setDisplay] = useState(Display.Form);

  const [playerData, setPlayerData] = useState("");
  const [matchData, setMatchData] = useState("");

  const [players, setPlayers] = useState(null);
  const [matches, setMatches] = useState(null);

  const handlePlayersChange = (event) => {
    setPlayerData(event.target.value);
  };

  const handleMatchesChange = (event) => {
    setMatchData(event.target.value);
  };

  const handleImportMatches = () => {
    setPlayers(MatchImporter.ParsePlayers(playerData));
    setMatches(MatchImporter.ParseMatches(matchData));
    setDisplay(Display.Validation);
  };

  const handleGenerateStandings = () => {
    // do the stuff with matches and standings
    setDisplay(Display.Standings);
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
    
  }, [display]);

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
      {display === Display.Form && (
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
            <Button type="primary" onClick={handleImportMatches}>
              Import Matches
            </Button>
          </div>
        </>
      )}
      {display === Display.Validation && (
        <>
          <ValidationTable players={players} matches={matches} />
          <div style={{ paddingTop: "20px" }}>
            <Button type="primary" onClick={handleGenerateStandings}>
              Generate Standings
            </Button>
          </div>
        </>
      )}
      {display === Display.Standings && (
        <Standings data={_standings} matchesByPlayer={matchesByPlayer} />
      )}
    </>
  );
}
