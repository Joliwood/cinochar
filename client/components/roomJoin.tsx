import React, { useCallback, useEffect, useMemo } from 'react';
import { type Socket, io } from 'socket.io-client';
import Image from 'next/image';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { userInfosState } from '#store';

//! This line MUST BE before the component -> High risk of inifity loop
const socket: Socket = io(process.env.NEXT_PUBLIC_API_URL as string);

const RoomJoin = (): JSX.Element => {
  const userInfos = useRecoilValue(userInfosState);
  const setUserInfos = useSetRecoilState(userInfosState);

  useEffect(() => {
    socket.emit('init');
  }, []);

  const handleJoin = useCallback(() => {
    socket.emit('player-connect', { name: userInfos.name, points: 0 });
    setUserInfos({ ...userInfos, isUserPlaying: true });
  }, [userInfos, setUserInfos]);

  const partyJoinButton = useMemo(() => {
    if (!userInfos.isUserPlaying) {
      return (
        <>
          <div className="divider divider-horizontal" />
          <button type="button" className="btn btn-accent rounded-full" onClick={handleJoin}>Rejoindre la partie</button>
        </>
      );
    }

    return null;
  }, [handleJoin, userInfos.isUserPlaying]);

  const user = useMemo(() => {
    if (userInfos.name) {
      return (
        <div className="avatar flex gap-3 items-center">
          <h3 className="font-bold text-primary-content">{userInfos.name}</h3>

          <div className="w-[48px] rounded h-[48px]">
            <Image
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              alt="azok"
              width={100}
              height={100}
            />
          </div>
          {partyJoinButton}
        </div>
      );
    }

    return null;
  }, [userInfos, partyJoinButton]);

  return (
    <div className={`${userInfos.name && 'none'} flex w-auto lg:flex-row m-1 sm:m-5 flex-wrap justify-center gap-2`}>
      {user}
    </div>
  );
};

export default RoomJoin;
