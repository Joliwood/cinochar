'use client';

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Image from 'next/image';
import lottie from 'lottie-web';
import UtilityFilmBar from './utilityFilmBar';

//! This line MUST BE before the component -> High risk of inifity loop
const socket = io(process.env.NEXT_PUBLIC_API_URL);

function FilmFinder() {
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
  const filmDimensionsContainer = 350;
  const [zoomPosition, setZoomPosition] = useState(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: document.getElementById('lottie-container'),
      // eslint-disable-next-line global-require
      animationData: require('../../public/images/animation_lkrazake.json'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
    });
  }, []);

  useEffect(() => {
    // It is the first emit send to the socket, so we reset all
    socket.on('new-film-name', (name) => {
      setZoomPosition(null);
      setRandomMovieName(name);
      setMatchResult(null);
    });

    socket.on('new-film-url', (url) => {
      setMovieUrl(url);
    });

    socket.on('random-position-zoom', (position) => {
      setZoomPosition(position);
    });
  }, []);

  // Compare film to find and user result
  const testMatchingResult = () => {
    if (userAnswer === randomMovieName) {
      setMatchResult('Bien joué !');
    } else {
      setMatchResult('Mauvaise réponse');
    }
  };

  return (
    <div className=" flex justify-center flex-col items-center gap-5 py-3 mt-[50px]">
      <UtilityFilmBar zoom={zoom} filmDimensionsContainer={filmDimensionsContainer} />
      <div
        className="film-square shadow-md flex"
        style={{ width: `${filmDimensionsContainer}px`, height: `${filmDimensionsContainer}px` }}
      >
        {randomMovieName && movieUrl ? (
          <Image
            src={movieUrl}
            width={500}
            height={500}
            alt="film to find"
            className="film-img"
            style={{ display: zoomPosition !== null ? 'inherit' : 'none', transform: zoomPosition !== null && `scale(${zoom}) translate(${zoomPosition.x}px, ${zoomPosition.y}px)` }}
          />
        ) : (
          <div className="flex w-full self-center" id="lottie-container" />
        )}
      </div>

      {/* Only show the message if the matchResult isn't null */}
      {matchResult ? (
        <h4>{matchResult}</h4>
      ) : (
        <h4>Essayez de trouver le film.</h4>
      )}

      <div className="form-control w-full">
        <div className="input-group">
          <input type="text" placeholder="Entre le nom du film..." className="input input-bordered w-full rounded-lg" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} />
          <button type="submit" className="btn btn-square" onClick={testMatchingResult}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilmFinder;
