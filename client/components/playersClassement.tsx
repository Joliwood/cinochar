import React, { useEffect, useMemo } from 'react';
import axios, { type AxiosResponse } from 'axios';

import { useRecoilState } from 'recoil';

import { playersListClassementState } from '#store';

import type { Player } from '#types';

const PlayersClassement = (): JSX.Element => {
  const [playersListClassement, setPlayersListClassement] = useRecoilState(
    playersListClassementState,
  );

  useEffect(() => {
    const getPlayers = async () => {
      try {
        const response: AxiosResponse<Player[]> = await axios.get(`${process.env.NEXT_PUBLIC_MONGO_API_URL}/mongo/getPlayersRanking`);
        const { data } = response;
        const players: Player[] = data;

        if (response.status === 200 && players.length > 0) {
          setPlayersListClassement(players);
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
  }, [setPlayersListClassement]);

  const players = useMemo(() => {
    return (
      <>
        {playersListClassement.map((player: Player, index: number) => (
        // eslint-disable-next-line react/no-array-index-key
          <tr key={index}>
            <th>{index + 1}</th>
            <td>{player.name}</td>
            <td>{player.points}</td>
          </tr>
        ))}
      </>
    );
  }, [playersListClassement]);

  return (
    <div className="my-5 lg:my-0 lg:absolute top-[150px] min-h-[400px] h-[50vh]
    right-5 bg-white shadow rounded-lg p-5 flex flex-col items-center w-[85vw] sm:w-[70vw] md:w-auto"
    >
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
            {players}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlayersClassement;
