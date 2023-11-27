// Player 1	Player 1 Score	Player 1 Army	Player 2	Player 2 Score	Player 2 Army	Date
// asdfasdf	25	Tau	rtyutryu	46	Tau	11/25/2023
// fhdfhgd	94	Tau	ghjkghjk	57	Tau	12/3/2023
// fghjghj	67	Tau	uyioyuioyu	36	Tau	12/3/2023
// ghjkghjk	85	Tau	fghjghj	67	Tau	12/7/2023
// hjklhjkl	83	Tau	zxcvzxcv	37	Tau	12/10/2023
// ertyrty	63	Tau	qwerqwre	38	Tau	12/12/2023
import React, { useState } from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';

export default function Dashboard() {
  const matchesFromApi = [
    {
      playerOne: "Joe",
      playerOneScore: 25,
      playerOneArmy: "Tau",
      playerTwo: "Bobby",
      playerTwoScore: 79,
      playerTwoArmy: "Chaos Space Marines",
      matchDate: "11/25/2023",
    },
    {
      playerOne: "Joe",
      playerOneScore: 93,
      playerOneArmy: "Tau",
      playerTwo: "Bobby",
      playerTwoScore: 24,
      playerTwoArmy: "Black Templars",
      matchDate: "11/28/2023",
    },
    {
      playerOne: "Lenny",
      playerOneScore: 48,
      playerOneArmy: "Drukhari",
      playerTwo: "Bobby",
      playerTwoScore: 100,
      playerTwoArmy: "Chaos Space Marines",
      matchDate: "12/3/2023",
    },
    {
      playerOne: "Jeffry",
      playerOneScore: 73,
      playerOneArmy: "Blood Angels",
      playerTwo: "Bobby",
      playerTwoScore: 68,
      playerTwoArmy: "Chaos Space Marines",
      matchDate: "12/9/2023",
    },
  ];

  const [matches] = useState(matchesFromApi);

  return (
    <div>
      <h1>Standings for IGP 40K League</h1>
      <p>Week x</p>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Avg LEAGUE Score</TableCell>
            <TableCell>Player</TableCell>
            <TableCell>Army</TableCell>
            <TableCell>Match 1</TableCell>
            <TableCell>Match 2</TableCell>
            <TableCell>Match 3</TableCell>
            <TableCell>Match 4</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {matches.length === 0 ? (
            <TableRow>
              <TableCell colspan="8">No matches played means no one is ranked.</TableCell>
            </TableRow>
          ) : (
            matches.map((match) => {
              return (
                <TableRow>
                  <TableCell>{match.playerOne}</TableCell>
                  <TableCell>{match.playerOne}</TableCell>
                  <TableCell>{match.playerOne}</TableCell>
                  <TableCell>{match.playerOne}</TableCell>
                  <TableCell>{match.playerOne}</TableCell>
                  <TableCell>{match.playerOne}</TableCell>
                  <TableCell>{match.playerOne}</TableCell>
                  <TableCell>{match.playerOne}</TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
