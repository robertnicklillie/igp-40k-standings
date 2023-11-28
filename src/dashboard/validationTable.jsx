import { Table, Tag } from "antd";

export default function Standings({ players, matches }) {
  // name: cols[0],
  // army: cols[1],
  // isArmyValid: armyHashMap.hasOwnProperty(cols[1]),
  // isActive: cols[2] === "",
  const playerColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Army",
      dataIndex: "army",
      key: "army",
      render: (_, item) => (
        <Tag key={item.key} color={item.isArmyValid ? "blue" : "red-inverse"}>{item.army}</Tag>
      )
    },
    {
      title: "IsActive",
      dataIndex: "isActive",
      key: "isActive",
      render: (_, item) => (
        <Tag key={item.key} color={item.isActive ? "blue" : "orange"}>{item.isActive ? "Yes" : "No"}</Tag>
      )
    },
  ];

    // key: uuid(),
    // player1: cols[0],
    // player1IsNameValid: playerHashMap.hasOwnProperty(cols[0]),
    // player1Army: cols[1],
    // player1IsArmyValid: armyHashMap.hasOwnProperty(cols[1]),
    // player1Score: cols[2],
    // player2: cols[3],
    // player2IsNameValid: playerHashMap.hasOwnProperty(cols[3]),
    // player2Army: cols[4],
    // player2IsArmyValid: armyHashMap.hasOwnProperty(cols[4]),
    // player2Score: cols[5],
    // date: cols[6],

  const matchColumns = [
    {
      title: "Player 1",
      dataIndex: "player1",
      key: "player1",
      render: (_, item) => (
        <Tag key={item.key} color={item.player1IsNameValid ? "blue" : "red-inverse"}>{item.player1}</Tag>
      )
    },
    {
      title: "Player 1 Army",
      dataIndex: "player1Army",
      key: "player1Army",
      render: (_, item) => (
        <Tag key={item.key} color={item.player1IsArmyValid ? "blue" : "red-inverse"}>{item.player1Army}</Tag>
      )
    },
    {
      title: "Player 1 Score",
      dataIndex: "player1Score",
      key: "player1Score",
    },
    {
      title: "Player 2",
      dataIndex: "player2",
      key: "player2",
      render: (_, item) => (
        <Tag key={item.key} color={item.player2IsNameValid ? "blue" : "red-inverse"}>{item.player2}</Tag>
      )
    },
    {
      title: "Player 2 Army",
      dataIndex: "player2Army",
      key: "player2Army",
      render: (_, item) => (
        <Tag key={item.key} color={item.player2IsArmyValid ? "blue" : "red-inverse"}>{item.player2Army}</Tag>
      )
    },
    {
      title: "Player 2 Score",
      dataIndex: "player2Score",
      key: "player2Score",
    },
    {
      title: "Date of Match",
      dataIndex: "date",
      key: "date",
    },
  ];

  return (
    <>
      <div>
        <h2>Players</h2>
        <Table
          pagination={false}
          columns={playerColumns}
          dataSource={players}
        />
      </div>
      <div>
        <h2>Matches</h2>
        <Table
          pagination={false}
          columns={matchColumns}
          dataSource={matches}
        />
      </div>
    </>
  );
}
