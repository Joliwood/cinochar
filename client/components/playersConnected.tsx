import React, { useState, useEffect, useMemo } from 'react';
import { type Socket, io } from 'socket.io-client';

import { type Player } from '#types';

//! This line MUST BE before the component -> High risk of inifity loop
const socket: Socket = io(process.env.NEXT_PUBLIC_API_URL as string);

const PlayersConnected = (): JSX.Element => {
  const [playerList, setPlayerList] = useState<Player[]>([]);

  useEffect(() => {
    socket.on('player-list', (players: Player[]) => {
      setPlayerList(players);
    });
  }, [playerList]);

  const playerListConnected = useMemo(() => (
    playerList.slice().sort((a, b) => b.points - a.points).map((player: Player, index: number) => (
      <tr key={player.name}>
        <th>{index + 1}</th>
        <td>{player.name}</td>
        <td>{player.points}</td>
      </tr>
    ))
  ), [playerList]);

  return (
    <div className="lg:absolute my-5 top-[150px] min-h-[400px] h-[50vh] left-5 shadow
    rounded-lg p-5 flex flex-col bg-white items-center w-[85vw] sm:w-[70vw] md:w-auto"
    >
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
            {playerListConnected}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlayersConnected;
