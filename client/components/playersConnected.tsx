import React, { useEffect, useMemo } from 'react';
import { type Socket, io } from 'socket.io-client';

import { useRecoilState } from 'recoil';

import { type Player } from '#types';
import { playersListConnectedState } from '#store';

//! This line MUST BE before the component -> High risk of inifity loop
const socket: Socket = io(process.env.NEXT_PUBLIC_API_URL as string);

const PlayersConnected = (): JSX.Element => {
  const [playersConnectedList, setPlayersConnectedList] = useRecoilState(playersListConnectedState);

  useEffect(() => {
    socket.on('player-list', (players: Player[]) => {
      setPlayersConnectedList(players);
    });
  }, [playersConnectedList, setPlayersConnectedList]);

  const players = useMemo(() => (
    playersConnectedList.slice().sort(
      (a, b) => b.points - a.points,
    ).map((player: Player, index: number) => (
      <tr key={player.name}>
        <th>{index + 1}</th>
        <td>{player.name}</td>
        <td>{player.points}</td>
      </tr>
    ))
  ), [playersConnectedList]);

  return (
    <div className="lg:absolute my-5 top-[150px] min-h-[400px] h-[50vh] left-5 shadow
    rounded-lg p-5 flex flex-col bg-white items-center w-[85vw] sm:w-[70vw] md:w-auto"
    >
      <h2 className="mb-3 font-bold">Joueurs connectés</h2>
      <div className="overflow-x-auto w-full">
        <table className="table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Joueur</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {players}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlayersConnected;
