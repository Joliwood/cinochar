'use client';

// Since the Next.js version >= 13, every component in the app folder is
// considered to be a server file To tell Next it is a client file, we have to
// use that before any import
import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayerPseudo } from '../utils/reducers/playersReducer';

//! This line MUST BE before the component -> High risk of inifity loop
const socket = io(process.env.NEXT_PUBLIC_API_URL!);

function RoomJoin() {
  const dispatch = useDispatch();
  const pseudo = useSelector((state: any) => state.players.playerPseudo || '');

  useEffect(() => {
    socket.emit('init');
  }, []);

  const handleJoin = () => {
    console.log('You are trying to connect with pseudo:', pseudo);
    dispatch(setPlayerPseudo(pseudo));
    socket.emit('player-connect', { pseudo, points: 0 });
  };

  return (
    <div className="flex w-auto lg:flex-row m-5">
      <input
        type="text"
        placeholder="Pseudo"
        className="input input-bordered w-full max-w-xs rounded-full"
        value={pseudo}
        onChange={(e) => dispatch(setPlayerPseudo(e.target.value))}
      />
      <div className="divider divider-horizontal" />
      <button type="button" className="btn btn-accent rounded-full" onClick={handleJoin}>Rejoindre la partie</button>
    </div>
  );
}

export default RoomJoin;
