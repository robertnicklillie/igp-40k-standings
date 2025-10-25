import { Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import StandingsTable from "./standingsTable";
import MatchImporter from "../services/MatchImporter";
import ValidationTable from "./validationTable";
import StandingsBuilder from "../services/StandingsBuilder";

const Display = {
    Form: "Form",
    Validation: "Validation",
    Standings: "Standings",
};

export default function Dashboard() {
    const [display, setDisplay] = useState(Display.Form);

    const [playerData, setPlayerData] = useState("");
    const [matchData, setMatchData] = useState("");

    const [players, setPlayers] = useState(null);
    const [matches, setMatches] = useState(null);

    const [standings, setStandings] = useState(null);

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
        setStandings(StandingsBuilder.build(players, matches));
        setDisplay(Display.Standings);
    };

    return (
        <>
            {display === Display.Form && (
                <>
                    <div>
                        <h1>Players</h1>
                        <TextArea cols={40} rows={8} onChange={handlePlayersChange}></TextArea>
                    </div>
                    <div>
                        <h1>Matches</h1>
                        <TextArea cols={40} rows={8} onChange={handleMatchesChange}></TextArea>
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
                    <div style={{ paddingBottom: "20px" }}>
                        <Button type="primary" onClick={handleGenerateStandings}>
                            Generate Standings
                        </Button>
                    </div>
                    <ValidationTable matches={matches} />
                </>
            )}
            {display === Display.Standings && (
                <StandingsTable
                    standings={standings}
                    matchesByPlayer={standings.matchesByPlayer}
                />
            )}
            <div>Version 12</div>
        </>
    );
}
