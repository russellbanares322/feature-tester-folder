import React, { useEffect, useState } from "react";

const players = [
  {
    name: "Lebron",
    team: "Lakers",
  },
  {
    name: "Nowitzki",
    team: "Mavs",
  },
  {
    name: "Allen",
    team: "Heat",
  },
  {
    name: "Johnson",
    team: "Nets",
  },
  {
    name: "Tatum",
    team: "Celtics",
  },
];
const Filter = () => {
  const [filteredPlayer, setFilteredPlayer] = useState([]);
  const [playersData, setPlayersData] = useState(players);

  const filters = players.map((val) => val.team);

  const handleFilter = (selectedTeam) => {
    if (filteredPlayer.includes(selectedTeam)) {
      const filtered = filteredPlayer.filter((val) => val !== selectedTeam);
      setFilteredPlayer(filtered);
    } else {
      setFilteredPlayer([...filteredPlayer, selectedTeam]);
    }
  };

  useEffect(() => {
    handleFilterPlayers();
  }, [filteredPlayer]);

  const handleFilterPlayers = () => {
    if (filteredPlayer.length > 0) {
      const tempItems = filteredPlayer.map((selected) => {
        const temp = players.filter((player) => player.team === selected);
        return temp;
      });
      setPlayersData(tempItems.flat());
    } else {
      setPlayersData([...players]);
    }
  };

  const handleReset = () => {
    setFilteredPlayer([]);
    setPlayersData([...players]);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <button onClick={handleReset}>Reset</button>
        {filters.map((team, idx) => (
          <h3
            onClick={() => handleFilter(team)}
            style={{
              cursor: "pointer",
              backgroundColor: filteredPlayer.includes(team) ? "red" : "",
            }}
            key={idx}
          >
            {team}
          </h3>
        ))}
      </div>
      {playersData.map((player) => (
        <div key={player.id}>
          <h1>{player.name}</h1>
          <h4>{player.team}</h4>
        </div>
      ))}
    </div>
  );
};

export default Filter;
