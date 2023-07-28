'use client';

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Image from 'next/image';
import FilmButton from './filmButton';

function FilmFinder() {
  const socket = io(process.env.NEXT_PUBLIC_API_URL);

  // Main movie picture
  const [movieUrl, setMovieUrl] = useState('');
  // Random film to find by the user
  const [randomMovieName, setRandomMovieName] = useState();
  // User result
  const [userAnswer, setUserAnswer] = useState('');
  // Match between film to find and user result, null at initialization and
  // bollean after a first try
  const [matchResult, setMatchResult] = useState(null);
  // Others basic requests
  const zoom = 3;
  const [zoomPosition, setZoomPosition] = useState(null);

  useEffect(() => {
    // It is the first emit send to the socket, so we reset all
    socket.once('new-film-name', (name) => {
      setZoomPosition(null);
      setRandomMovieName(name);
      setMatchResult(null);
    });

    socket.once('new-film-url', (url) => {
      setMovieUrl(url);
    });

    socket.once('random-position-zoom', (position) => {
      setZoomPosition(position);
    });

    // return () => {
    //   // Clean up the event listeners when the component is unmounted
    //   socket.off('new-film-name');
    //   socket.off('new-film-url');
    //   socket.off('random-position-zoom');
    // };
  }, [socket]);

  // Compare film to find and user result
  const testMatchingResult = () => {
    if (userAnswer === randomMovieName) {
      setMatchResult('IT IS GOOD !');
    } else {
      setMatchResult('WROOONG !');
    }
  };

  return (
    <div className=" flex justify-center flex-col items-center gap-5 py-3">
      <FilmButton zoom={zoom} />
      {randomMovieName && movieUrl ? (
        <div className="film-square">
          {zoomPosition !== null && (
            <Image
              src={movieUrl}
              width={500}
              height={500}
              alt="film to find"
              className="film-img"
              style={{ transform: `scale(${zoom}) translate(${zoomPosition.x}%, ${zoomPosition.y}%)` }}
            />
          )}
        </div>
      ) : (
        <h3>No film to find</h3>
      )}

      <input type="text" placeholder="Enter a name" className="text-black" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} />
      <div className="flex gap-5">
        <button type="button" className="bg-gray-800 px-3" onClick={testMatchingResult}>TEST</button>
        {/* Only show the message if the matchResult isn't null */}
        {matchResult !== undefined && (
          matchResult === 'IT IS GOOD !'
            ? <span className="bg-green-600">{matchResult}</span>
            : <span className="bg-red-700">{matchResult}</span>
        )}
      </div>
    </div>
  );
}

export default FilmFinder;
