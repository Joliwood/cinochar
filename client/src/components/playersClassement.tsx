'use client';

import React, { useState, useEffect } from 'react';
import type { Player } from '@/@types';
import axios, { AxiosResponse } from 'axios';
// import io from 'socket.io-client';

//! This line MUST BE before the component -> High risk of inifity loop
// const socket = io(process.env.NEXT_PUBLIC_API_URL);

function PlayersClassement() {
  const [playersList, setPlayersList] = useState<Player[]>([]);

  useEffect(() => {
    const getPlayers = async () => {
      try {
        const response: AxiosResponse<Player[]> = await axios.get('/api/getPlayersRanking');
        const players: Player[] = response.data;
        if (response.status === 200 && players.length > 0) {
          setPlayersList(players);
        } else {
          console.error('Failed to fetch players data');
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(`Axios error: ${error.message}`);
        }
        if (error instanceof Error) {
          console.error(`General error: ${error.message}`);
        }
        console.error('Unknown error occurred');
      }
    };
    getPlayers();
  }, []);

  return (
    <div className="my-5 lg:my-0 lg:absolute top-[150px] right-5 bg-white shadow rounded-lg p-5 flex flex-col items-center w-[85vw] xs:w-auto">
      <h2 className="mb-3 font-bold">Classement global</h2>
      <div className="overflow-x-auto w-full">
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
            {playersList.map((player: Player, index: number) => (
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

export default PlayersClassement;
