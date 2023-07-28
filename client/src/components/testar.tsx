'use client';

// Since the Next.js version >= 13, every component in the app folder is
// considered to be a server file To tell Next it is a client file, we have to
// use that before any import
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_API_URL!);

function Testar() {
  const [pseudo, setPseudo] = useState('');
  const [playerList, setPlayerList] = useState<string[]>([]);

  useEffect(() => {
    socket.on('player-list', (players) => {
      setPlayerList(players);
    });

    socket.emit('init');
  }, []);

  const handleJoin = () => {
    console.log('You are trying to connect with pseudo:', pseudo);
    socket.emit('player-connect', { pseudo });
  };

  return (
    <div className="bg-gray-800 p-4 flex justify-center gap-10 flex-wrap">
      <input type="Pseudo" placeholder="Pseudo" className="text-orange-500" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
      <button type="button" className="bg-red-700" onClick={handleJoin}>JOIN THE ROOM</button>
      <div>
        <h2>Connected Players:</h2>
        {playerList.length > 0 && (
          <ul>
            {playerList.map((player, index) => (
              <li key={player[index]}>{player}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Testar;
