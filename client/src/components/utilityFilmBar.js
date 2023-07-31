import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import FilmButton from './filmButton';

//! This line MUST BE before the component -> High risk of inifity loop
const socket = io(process.env.NEXT_PUBLIC_API_URL);

// eslint-disable-next-line react/prop-types
function UtilityFilmBar({ zoom, filmDimensionsContainer }) {
  const [countdownValue, setCountdownValue] = useState(30);
  const initialCountdownValue = 30;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdownValue((prevValue) => prevValue - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    socket.on('new-film-name', () => {
      setCountdownValue(initialCountdownValue);
    });
  }, [initialCountdownValue]);

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
        className=" btn-square flex items-center justify-center shadow bg-base-300 rounded-lg h-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
  );
}

export default UtilityFilmBar;
