'use client';

import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

//! This line MUST BE before the component -> High risk of inifity loop
// const socket = io(process.env.NEXT_PUBLIC_API_URL);

function PlayersClassement() {
  const [playersList, setPlayersList] = useState([]);

  useEffect(() => {
    const getPlayers = async () => {
      try {
        const response = await fetch('/api/getPlayersRanking'); // Replace with the correct API endpoint
        if (response.ok) {
          const data = await response.json(); // Convert response to JSON
          setPlayersList(data); // Set the data to the playersList state
        } else {
          console.error('Failed to fetch players data');
        }
      } catch (error) {
        console.error('Error fetching players data:', error);
      }
    };
    getPlayers();
  }, []);

  return (
    <div className="my-5 lg:my-0 top-[150px] right-[50px] shadow rounded-lg p-5 flex flex-col items-center lg:absolute">
      <h2 className="mb-3 font-bold">Classement global</h2>
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
            {playersList.map((player, index) => (
              <tr key={player.id || index}>
                <th>{index + 1}</th>
                <td>{player.pseudo}</td>
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
