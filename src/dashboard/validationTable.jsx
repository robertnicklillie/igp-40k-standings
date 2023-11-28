import {Table} from "antd"; 

export default function Standings({ players, matches }) {
    // name: cols[0],
    // army: cols[1],
    // isArmyValid: armyHashMap.hasOwnProperty(cols[1]),
    // isActive: cols[2] === "",
    const playerColumns = [
        {
          title: "Name",
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

    return (
    <>
      <div>
        <h2>Players</h2>
        <Table
          pagination={false}
          columns={columnsStandings}
          dataSource={players}
        />
      </div>
      <div>
        <h2>Matches</h2>
        <TextArea cols={40} rows={8} onChange={handleMatchesChange}></TextArea>
      </div>
    </>
  );
}
