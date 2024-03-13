import React, { useCallback, useMemo } from 'react';
import Image from 'next/image';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import revealSvg from '../../public/images/reveal.svg';
import jokerSvg from '../../public/images/joker.svg';

import FilmButton from './filmButton';

import { userInfosState, countdownValueState } from '#store';

const UtilityFilmBar = (): JSX.Element => {
  const userInfos = useRecoilValue(userInfosState);
  const setUserInfos = useSetRecoilState(userInfosState);
  const countdownValue = useRecoilValue(countdownValueState);

  const handleJokerClick = useCallback(() => {
    if (userInfos.jokers > 0) {
      setUserInfos({ ...userInfos, jokers: userInfos.jokers - 1 });
    }
  }, [userInfos, setUserInfos]);

  const jokerButton = useMemo(() => {
    if (userInfos.name === '' || !userInfos.isUserPlaying) {
      return (
        <div className="tooltip" data-tip="Vous devez vous connecter et rejoindre la partie pour participer">
          <button
            type="button"
            className="btn-square flex items-center justify-center shadow bg-base-300 rounded-lg h-full w-auto hover:bg-gray-300 cursor-not-allowed"
            onClick={userInfos.jokers > 0
              ? handleJokerClick
              : () => setUserInfos({ ...userInfos, revealImg: true })}
            disabled
          >

            {userInfos.jokers > 0 && (
              <span className="pl-3">{userInfos.jokers}</span>
            )}
            <Image
              src={userInfos.jokers > 0 ? jokerSvg : revealSvg}
              width={50}
              height={50}
              alt="joker chance"
              className={`p-1 pr-1 ${userInfos.jokers === 0 && 'mx-2'}`}
            />
          </button>
        </div>
      );
    }

    return (
      <button
        type="button"
        className={`btn-square flex items-center m-0 justify-center shadow bg-base-300 rounded-lg h-full w-auto hover:bg-gray-300 ${userInfos.revealImg ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        onClick={userInfos.jokers > 0
          ? handleJokerClick
          : () => setUserInfos({ ...userInfos, revealImg: true })}
        disabled={userInfos.revealImg}
      >
        {userInfos.jokers > 0 && (
          <span className="pl-3">{userInfos.jokers}</span>
        )}
        <Image
          src={userInfos.jokers > 0 ? jokerSvg : revealSvg}
          width={50}
          height={50}
          alt="joker chance"
          className={`p-1 pr-1 ${userInfos.jokers === 0 && 'mx-2'}`}
        />
      </button>
    );
  }, [userInfos, handleJokerClick, setUserInfos]);

  return (
    <div className="flex items-center justify-between w-full px-22 h-12">
      <span className="font-mono text-4xl shadow bg-base-300 rounded-lg h-full flex items-center justify-center px-3">
        {countdownValue}
      </span>
      <FilmButton />
      {jokerButton}
    </div>
  );
};

export default UtilityFilmBar;
