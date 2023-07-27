'use client';

// Since the Next.js version >= 13, every component in the app folder is
// considered to be a server file To tell Next it is a client file, we have to
// use that before any import
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_API_URL!);

function Testar() {
  const [data, setData] = useState([]);
  const [pseudo, setPseudo] = useState('');
  const [playerList, setPlayerList] = useState<string[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/getData');
      const dataReq = await response.json();
      setData(dataReq);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    socket.on('player-list', (players) => {
      setPlayerList(players);
    });

    socket.emit('player-connect', { pseudo });

    return () => {
      socket.disconnect();
    };
  }, [pseudo]);

  const handleClick = () => {
    console.log(data);
  };

  const handleJoin = () => {
    console.log('You are trying to connect with pseudo:', pseudo);
    socket.emit('player-connect', { pseudo });
  };

  return (
    <div className="bg-gray-800 p-4 flex justify-center gap-10 flex-wrap">
      <button type="button" className="bg-red-700" onClick={handleClick}>TEST MONGODB</button>
      <input type="Pseudo" placeholder="Pseudo" className="text-orange-500" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
      <button type="button" className="bg-red-700" onClick={handleJoin}>JOIN THE ROOM</button>
      {playerList.length > 0 && (
        <div>
          <h2>Connected Players:</h2>
          <ul>
            {playerList.map((player) => (
              <li key={player}>{player}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Testar;
