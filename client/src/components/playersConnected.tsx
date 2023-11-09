'use client';

import { Player } from '@/@types';
import React, { useState, useEffect } from 'react';
import { Socket, io } from 'socket.io-client';

//! This line MUST BE before the component -> High risk of inifity loop
const socket: Socket = io(process.env.NEXT_PUBLIC_API_URL as string);

function PlayersConnected() {
  const [playerList, setPlayerList] = useState<Player[]>([]);
  const sortedPlayerList: Player[] = playerList.slice().sort((a, b) => b.points - a.points);

  useEffect(() => {
    socket.on('player-list', (players: Player[]) => {
      setPlayerList(players);
    });
  }, [playerList]);

  return (
    <div className="lg:absolute my-5 top-[150px] left-5 shadow rounded-lg p-5 flex flex-col bg-white items-center w-[85vw] xs:w-auto">
      <h2 className="mb-3 font-bold">Joueurs connectés</h2>
      <div className="overflow-x-auto w-full">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Rank</th>
              <th>Joueur</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {sortedPlayerList.map((player: Player, index: number) => (
              <tr key={player.name}>
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

export default PlayersConnected;
