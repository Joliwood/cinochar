'use client';

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

//! This line MUST BE before the component -> High risk of inifity loop
const socket = io(process.env.NEXT_PUBLIC_API_URL);

function PlayersList() {
  const [playerList, setPlayerList] = useState([]);
  const sortedPlayerList = playerList.slice().sort((a, b) => b.points - a.points);

  useEffect(() => {
    socket.on('player-list', (players) => {
      setPlayerList(players);
    });
  }, [playerList]);

  return (
    <div className="absolute top-[150px] right-[50px] shadow rounded-lg p-5 flex flex-col items-center">
      <h2 className="mb-3 font-bold">Classement</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <th>Rank</th>
              <th>Joueur</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {sortedPlayerList.map((player, index) => (
              <tr key={player.id || index}>
                <th>{index + 1}</th>
                <td>{player.name}</td>
                <td>{player.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PlayersList;
