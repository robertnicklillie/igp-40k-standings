// Player 1	Player 1 Score	Player 1 Army	Player 2	Player 2 Score	Player 2 Army	Date
// asdfasdf	25	Tau	rtyutryu	46	Tau	11/25/2023
// fhdfhgd	94	Tau	ghjkghjk	57	Tau	12/3/2023
// fghjghj	67	Tau	uyioyuioyu	36	Tau	12/3/2023
// ghjkghjk	85	Tau	fghjghj	67	Tau	12/7/2023
// hjklhjkl	83	Tau	zxcvzxcv	37	Tau	12/10/2023
// ertyrty	63	Tau	qwerqwre	38	Tau	12/12/2023
import useState from "react";

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

  const [matches, setMatches] = useState(matchesFromApi);

  return (
    <div>
      <h1>Standings for IGP 40K League</h1>
      <p>Week x</p>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Avg LEAGUE Score</th>
            <th>Player</th>
            <th>Army</th>
            <th>Match 1</th>
            <th>Match 2</th>
            <th>Match 3</th>
            <th>Match 4</th>
          </tr>
        </thead>
        <tbody>
          {matches.length === 0 ? (
            <tr>
              <td colspan="8">No matches played means no one is ranked.</td>
            </tr>
          ) : (
            matches.map((match) => {
              return (
                <tr>
                  <td>{match.playerOne}</td>
                  <td>{match.playerOne}</td>
                  <td>{match.playerOne}</td>
                  <td>{match.playerOne}</td>
                  <td>{match.playerOne}</td>
                  <td>{match.playerOne}</td>
                  <td>{match.playerOne}</td>
                  <td>{match.playerOne}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
