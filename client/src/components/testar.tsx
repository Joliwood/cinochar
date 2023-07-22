"use client";
// Since the Next.js version >= 13, every component in the app folder is considered to be a server file
// To tell Next it is a client file, we have to use that before any import
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
const socket = io("http://localhost:5000");

const Testar: React.FC = () => {

  const [data, setData] = useState([]);
  const [pseudo, setPseudo] = useState('');
  const [playerList, setPlayerList] = useState<string[]>([]);
    
    useEffect(() => {
      fetchData();
      const socket = io("http://localhost:5000");
      socket.on("player-list", (players) => {
        setPlayerList(players);
      });

      socket.emit("player-connect", { pseudo });

      return () => {
        socket.disconnect();
      };
    }, []);
    
    const fetchData = async () => {
        try {
          const response = await fetch('/api/getData');
          const data = await response.json();
          setData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };
    
    const handleClick = () => {
        console.log(data);
    };
  
  const handleJoin = () => {
    console.log("You are trying to connect with pseudo:", pseudo);
    socket.emit("player-connect", { pseudo });
  };

  return (
      <div className="bg-gray-800 p-4 flex justify-center gap-10">
      <button className="bg-red-700" onClick={handleClick}>TEST MONGODB</button>
      <input type="Pseudo" placeholder="Pseudo" className="text-orange-500" value={pseudo} onChange={(e) => setPseudo(e.target.value)}/> 
      <button className="bg-red-700" onClick={handleJoin}>JOIN THE ROOM</button>
      {playerList.length > 0 && (
        <div>
          <h2>Connected Players:</h2>
          <ul>
            {playerList.map((player, index) => (
              <li key={index}>{player}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Testar;
