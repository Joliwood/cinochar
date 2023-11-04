'use client';

import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import Image from 'next/image';
import lottie from 'lottie-web';
// import { useSelector } from 'react-redux';
import UtilityFilmBar from './utilityFilmBar';
// import { setPlayerPseudo } from '../utils/reducers/playersReducer';
import { UserContext } from '../../context/UserContext';
import handleAddPoints from '../../utils/handleAddPoints';

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
  const [zoom, setZoom] = useState(3);
  const filmDimensionsContainer = 350;
  const [zoomPosition, setZoomPosition] = useState(null);
  const [countdownValue, setCountdownValue] = useState(null);
  // const pseudo = useSelector((state) => state.players.playerPseudo);
  const [filmFound, isFilmFound] = useState(false);
  const {
    pseudo, jokers, revealImg, setRevealImg,
  } = useContext(UserContext);
  const [playerList, setPlayerList] = useState([]);
  const [isUserPlaying, setIsUserPlaying] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(5);

  useEffect(() => {
    socket.on('get-countdown', (countdown) => {
      setCountdownValue(countdown);
    });
  }, []);

  useEffect(() => {
    if (jokers === 2) {
      setZoom(3);
      setPointsEarned(5);
    }
    if (jokers === 1) {
      setZoom(2.5);
      setPointsEarned(3);
    }
    if (jokers === 0) {
      setZoom(2);
      setPointsEarned(1);
    }
    if (revealImg) {
      setZoom(1);
      setRevealImg(true);
      setPointsEarned(0);
    }
  }, [jokers, revealImg, setRevealImg]);

  useEffect(() => {
    socket.on('player-list', (players) => {
      setPlayerList(players);
    });

    // Check if the pseudo is in the playerList
    const isPseudoInPlayerList = playerList.some((player) => player.name === pseudo);

    if (isPseudoInPlayerList) {
      setIsUserPlaying(true);
    } else {
      setIsUserPlaying(false);
    }
  }, [playerList, pseudo]);

  useEffect(() => {
    lottie.loadAnimation({
      container: document.getElementById('lottie-container'),
      // eslint-disable-next-line global-require
      animationData: require('../../../public/images/animation_lkrazake.json'),
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
      isFilmFound(false);
      setRevealImg(false);
    });

    socket.on('new-film-url', (url) => {
      setMovieUrl(url);
    });

    socket.on('random-position-zoom', (position) => {
      setZoomPosition(position);
    });
  }, [setRevealImg]);

  // Compare film to find and user result
  const testMatchingResult = () => {
    if (countdownValue === 0) {
      setMatchResult('Vous avez dépassé le temps imparti.');
    } else if (userAnswer === randomMovieName) {
      if (filmFound === false) {
        socket.emit('player-add-points', { pseudo, points: pointsEarned });
        setMatchResult('Bien joué !');
        handleAddPoints(pointsEarned);
        isFilmFound(true);
      } else {
        setMatchResult('Vous avez déjà trouvé ce film.');
      }
    } else {
      setMatchResult('Mauvaise réponse.');
    }
  };

  return (
    <div className="overflow-hidden flex justify-center flex-col items-center gap-5 py-3 mt-[50px]">
      <UtilityFilmBar
        zoom={zoom}
        filmDimensionsContainer={filmDimensionsContainer}
        countdownValue={countdownValue}
      />
      <div
        className="film-square shadow-md flex"
        style={{
          width: `${filmDimensionsContainer}px`,
          /* , height: `${filmDimensionsContainer}px` */
          overflowX: revealImg ? 'scroll' : 'hidden',
        }}
      >
        {randomMovieName && movieUrl ? (
          <Image
            src={movieUrl}
            width={1920}
            height={1080}
            alt="film to find"
            className="film-img"
            priority
            style={{
              // width: '1280px',
              // height: '720px',
              display: zoomPosition !== null
                ? 'inherit'
                : 'none',
              transform: (zoomPosition !== null && !revealImg) && `
              scale(${zoom}) 
              translate(${zoomPosition.x}px, ${zoomPosition.y}px)`,
            }}
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
          <input
            type="text"
            placeholder="Entre le nom du film..."
            className="input input-bordered w-full rounded-lg"
            value={userAnswer}
            disabled={!isUserPlaying}
            onChange={(e) => setUserAnswer(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-square border-1 border-l-0 border-gray-300  hover:bg-gray-300"
            onClick={testMatchingResult}
            disabled={!isUserPlaying}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
        </div>
        {!isUserPlaying && <p className="text-xs text-gray-500 mx-auto my-1">Vous devez rejoindre la partie pour participer</p>}
      </div>
    </div>
  );
}

export default FilmFinder;
