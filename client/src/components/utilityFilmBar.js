import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Image from 'next/image';
import FilmButton from './filmButton';
import jokerSvg from '../../public/images/joker.svg';

//! This line MUST BE before the component -> High risk of inifity loop
const socket = io(process.env.NEXT_PUBLIC_API_URL);

// eslint-disable-next-line react/prop-types
function UtilityFilmBar({ zoom, filmDimensionsContainer }) {
  const [countdownValue, setCountdownValue] = useState(30);
  const initialCountdownValue = 30;

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (countdownValue > 0) {
        setCountdownValue((prevValue) => prevValue - 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [countdownValue]);

  useEffect(() => {
    socket.on('new-film-name', () => {
      setCountdownValue(initialCountdownValue);
    });
  }, [initialCountdownValue]);

  return (
    <div className="flex items-center justify-center w-full px-22 h-12">
      <span className="countdown font-mono text-4xl shadow bg-base-300 rounded-lg h-full flex items-center justify-center px-3 hidden">
        <span style={{ '--value': countdownValue }} />
      </span>
      <FilmButton
        zoom={zoom}
        filmDimensionsContainer={filmDimensionsContainer}
      />
      <button
        type="button"
        className=" btn-square flex items-center justify-center shadow bg-base-300 rounded-lg h-full w-auto hover:bg-gray-300 hidden"
      >
        <span className="pl-3">3</span>
        <Image
          src={jokerSvg}
          width={50}
          height={50}
          alt="joker chance"
          className="p-1 pr-1"
        />
      </button>
    </div>
  );
}

export default UtilityFilmBar;
