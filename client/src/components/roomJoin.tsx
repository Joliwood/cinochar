'use client';

// Since the Next.js version >= 13, every component in the app folder is
// considered to be a server file To tell Next it is a client file, we have to
// use that before any import
import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
// import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { UserContext } from '../context/UserContext';
// import { setPlayerPseudo } from '../utils/reducers/playersReducer';

//! This line MUST BE before the component -> High risk of inifity loop
const socket = io(process.env.NEXT_PUBLIC_API_URL!);

function RoomJoin() {
  // const dispatch = useDispatch();
  // const pseudo = useSelector((state: any) => state.players.playerPseudo || '');

  const { pseudo, isUserPlaying, setIsUserPlaying } = useContext(UserContext);
  const [playerList, setPlayerList] = useState([]);

  useEffect(() => {
    socket.emit('init');
  }, []);

  useEffect(() => {
    socket.on('player-list', (players) => {
      setPlayerList(players);
    });

    // Check if the pseudo is in the playerList
    const isPseudoInPlayerList = playerList.some((player: any) => player.name === pseudo);

    if (isPseudoInPlayerList) {
      setIsUserPlaying(true);
    } else {
      setIsUserPlaying(false);
    }
  }, [playerList, pseudo, setIsUserPlaying]);

  const handleJoin = () => {
    // console.log('You are trying to connect with pseudo:', pseudo);
    // dispatch(setPlayerPseudo(pseudo));
    socket.emit('player-connect', { pseudo, points: 0 });
  };

  return (
    <div className={`${pseudo && 'none'}flex w-auto lg:flex-row m-5`}>
      {/* <input
        type="text"
        placeholder="Pseudo"
        className="input input-bordered w-full max-w-xs rounded-full"
        value={pseudo}
        onChange={(e) => dispatch(setPlayerPseudo(e.target.value))}
      /> */}
      {pseudo && (
        <>
          <div className="avatar flex gap-3 items-center">
            <h3 className="font-bold text-primary-content">{pseudo}</h3>

            <div className="w-[48px] rounded h-[48px]">
              <Image
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                alt="azok"
                width={100}
                height={100}
              />
            </div>

          </div>
          {!isUserPlaying && (
            <>
              <div className="divider divider-horizontal" />
              <button type="button" className="btn btn-accent rounded-full" onClick={handleJoin}>Rejoindre la partie</button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default RoomJoin;
