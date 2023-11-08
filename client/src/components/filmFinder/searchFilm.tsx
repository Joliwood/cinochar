'use client';

import React, { useState, useEffect, useContext } from 'react';
import { io, Socket } from 'socket.io-client';
import type { Player, RandomFilmPosition } from '@/@types';
import FilmViewer from './filmViewer';
import UtilityFilmBar from './utilityFilmBar';
import { UserContext } from '../../context/UserContext';
import handleAddPoints from '../../utils/handleAddPoints';

//! This line MUST BE before the component -> High risk of inifity loop
const socket: Socket = io(process.env.NEXT_PUBLIC_API_URL as string);

function SearchFilm() {
  // Main movie picture
  const [movieUrl, setMovieUrl] = useState<string>('');
  // Random film to find by the user
  const [randomMovieName, setRandomMovieName] = useState<string | undefined>();
  // User result
  const [userAnswer, setUserAnswer] = useState<string>('');
  // Match between film to find and user result, null at initialization and
  // bollean after a first try
  const [matchResult, setMatchResult] = useState<string | null>(null);
  // Others basic requests
  const [zoom, setZoom] = useState<number>(3);
  const filmDimensionsContainer: number = 350;
  const [zoomPosition, setZoomPosition] = useState<RandomFilmPosition | null>(null);
  const [countdownValue, setCountdownValue] = useState<number | null>(null);
  const [filmFound, isFilmFound] = useState<boolean>(false);
  const { userInfos, setUserInfos } = useContext(UserContext);
  const [playerList, setPlayerList] = useState<Player[]>([]);
  const [isUserPlaying, setIsUserPlaying] = useState<boolean>(false);
  const [pointsEarned, setPointsEarned] = useState<number>(5);

  useEffect(() => {
    socket.on('get-countdown', (countdown) => {
      setCountdownValue(countdown);
    });
  }, []);

  useEffect(() => {
    if (userInfos.jokers === 2) {
      setZoom(3);
      setPointsEarned(5);
    }
    if (userInfos.jokers === 1) {
      setZoom(2.5);
      setPointsEarned(3);
    }
    if (userInfos.jokers === 0) {
      setZoom(2);
      setPointsEarned(1);
    }
    if (userInfos.revealImg) {
      setZoom(1);
      setPointsEarned(0);
    }
  }, [userInfos]);

  useEffect(() => {
    socket.on('player-list', (players: Player[]) => {
      setPlayerList(players);
    });

    // Check if the pseudo is in the playerList
    const isPseudoInPlayerList: boolean = playerList.some(
      (player: Player) => player.name === userInfos.pseudo,
    );

    if (isPseudoInPlayerList) {
      setIsUserPlaying(true);
    } else {
      setIsUserPlaying(false);
    }
  }, [playerList, userInfos.pseudo]);

  useEffect(() => {
    // It is the first emit send to the socket, so we reset all
    socket.on('new-film-name', (name: string) => {
      setZoomPosition(null);
      setRandomMovieName(name);
      setMatchResult(null);
      isFilmFound(false);
      setUserInfos({ ...userInfos, revealImg: false });
    });

    socket.on('new-film-url', (url: string) => {
      setMovieUrl(url);
    });

    socket.on('random-position-zoom', (position: RandomFilmPosition) => {
      setZoomPosition(position);
    });
  }, [userInfos, setUserInfos]);

  // Compare film to find and user result
  const testMatchingResult = () => {
    if (countdownValue === 0) {
      setMatchResult('Vous avez dépassé le temps imparti.');
    } else if (userAnswer === randomMovieName) {
      if (filmFound === false) {
        socket.emit('player-add-points', { pseudo: userInfos.pseudo, points: pointsEarned });
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
    <div className="flex justify-center flex-col items-center gap-5 py-3 mt-5 max-w-[90vw]">
      <UtilityFilmBar
        zoom={zoom}
        filmDimensionsContainer={filmDimensionsContainer}
        countdownValue={countdownValue}
      />
      <FilmViewer
        filmDimensionsContainer={filmDimensionsContainer}
        randomMovieName={randomMovieName}
        movieUrl={movieUrl}
        zoomPosition={zoomPosition}
        zoom={zoom}
        revealImg={userInfos.revealImg}
      />

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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
        </div>
        {!isUserPlaying && <p className="text-xs text-gray-500 mx-auto my-1">Vous devez rejoindre la partie pour participer</p>}
      </div>
    </div>
  );
}

export default SearchFilm;
