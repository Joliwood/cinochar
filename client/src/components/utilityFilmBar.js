import React, { useState } from 'react';
import Image from 'next/image';
import FilmButton from './filmButton';
import jokerSvg from '../../public/images/joker.svg';

// eslint-disable-next-line react/prop-types
function UtilityFilmBar({ zoom, filmDimensionsContainer, countdownValue }) {
  const [jokerCounter, setJokerCounter] = useState(3);

  const handleJokerClick = () => {
    if (jokerCounter > 0) {
      setJokerCounter(jokerCounter - 1);
    }
  };

  return (
    <div className="flex items-center justify-between w-full px-22 h-12">
      <span className="countdown font-mono text-4xl shadow bg-base-300 rounded-lg h-full flex items-center justify-center px-3">
        <span style={{ '--value': countdownValue }} />
      </span>
      <FilmButton
        zoom={zoom}
        filmDimensionsContainer={filmDimensionsContainer}
      />
      <button
        type="button"
        className="btn-square flex items-center justify-center shadow bg-base-300 rounded-lg h-full w-auto hover:bg-gray-300"
        onClick={handleJokerClick}
        disabled={jokerCounter === 0}
      >
        <span className="pl-3">{jokerCounter}</span>
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
