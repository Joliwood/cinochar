import React, { useEffect, useMemo } from 'react';
import { io, type Socket } from 'socket.io-client';
import { useRecoilState, useSetRecoilState } from 'recoil';

import FilmViewer from './filmViewer';
import UtilityFilmBar from './utilityFilmBar';

import {
  countdownValueState,
  filmFoundState,
  isUserPlayingState,
  matchResultState,
  movieUrlState,
  playerListState,
  pointsEarnedState,
  randomMovieNameState,
  userAnswerState,
  userInfosState,
  zoomPositionState,
  zoomState,
} from '#store';
import { handleAddPoints } from '#utils';
import type { Player, RandomFilmPosition } from '#types';

//! This line MUST BE before the component -> High risk of inifity loop
const socket: Socket = io(process.env.NEXT_PUBLIC_API_URL as string);

const SearchFilm = (): JSX.Element => {
  const [userInfos, setUserInfos] = useRecoilState(userInfosState);
  const setMovieUrl = useSetRecoilState(movieUrlState);
  const [randomMovieName, setRandomMovieName] = useRecoilState(randomMovieNameState);
  const [userAnswer, setUserAnswer] = useRecoilState(userAnswerState);
  const [matchResult, setMatchResult] = useRecoilState(matchResultState);
  const setZoom = useSetRecoilState(zoomState);
  const setZoomPosition = useSetRecoilState(zoomPositionState);
  const [countdownValue, setCountdownValue] = useRecoilState(countdownValueState);
  const [filmFound, isFilmFound] = useRecoilState(filmFoundState);
  const [playerList, setPlayerList] = useRecoilState(playerListState);
  const [isUserPlaying, setIsUserPlaying] = useRecoilState(isUserPlayingState);
  const [pointsEarned, setPointsEarned] = useRecoilState(pointsEarnedState);

  useEffect(() => {
    socket.on('get-countdown', (countdown: number) => {
      setCountdownValue(countdown);
    });
  }, [setCountdownValue]);

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
  }, [setPointsEarned, setZoom, userInfos]);

  useEffect(() => {
    socket.on('player-list', (players: Player[]) => {
      setPlayerList(players);
    });

    // Check if the name is in the playerList
    const isNameInPlayerList: boolean = playerList.some(
      (player: Player) => player.name === userInfos.name,
    );

    if (isNameInPlayerList) {
      setIsUserPlaying(true);
    } else {
      setIsUserPlaying(false);
    }
  }, [playerList, setIsUserPlaying, setPlayerList, userInfos.name]);

  useEffect(() => {
    // It is the first emit send to the socket, so we reset all
    socket.on('new-film-name', (name: string) => {
      setZoomPosition(null);
      setRandomMovieName(name);
      setMatchResult(null);
      isFilmFound(false);
      setUserInfos({ ...userInfos, revealImg: false, jokers: 2 });
    });

    socket.on('new-film-url', (url: string) => {
      setMovieUrl(url);
    });

    socket.on('random-position-zoom', (position: RandomFilmPosition) => {
      setZoomPosition(position);
    });
  }, [
    userInfos,
    setUserInfos,
    setRandomMovieName,
    setMatchResult,
    setZoomPosition,
    setMovieUrl,
    isFilmFound,
  ]);

  // Compare film to find and user result
  const testMatchingResult = () => {
    if (countdownValue === 0) {
      setMatchResult('Vous avez dépassé le temps imparti.');
    } else if (userAnswer === randomMovieName) {
      if (filmFound === false) {
        socket.emit('player-add-points', { name: userInfos.name, points: pointsEarned });
        setMatchResult('Bien joué !');
        handleAddPoints({ pointsEarned });
        isFilmFound(true);
      } else {
        setMatchResult('Vous avez déjà trouvé ce film.');
      }
    } else {
      setMatchResult('Mauvaise réponse.');
    }
  };

  const matchResultMessage = useMemo(() => {
    if (matchResult) {
      return <h4>{matchResult}</h4>;
    }
    return <h4>Essayez de trouver le film.</h4>;
  }, [matchResult]);

  const infoMessage = useMemo(() => {
    if (!isUserPlaying) {
      return <p>Vous devez rejoindre la partie pour participer</p>;
    }

    return null;
  }, [isUserPlaying]);

  return (
    <div className="flex justify-center flex-col items-center gap-5 py-3 mt-5 max-w-[90vw]">
      <UtilityFilmBar />
      <FilmViewer />

      {matchResultMessage}

      <div className="form-control w-full">
        <div className="join">
          <input
            type="text"
            placeholder="Entre le nom du film..."
            className="input input-bordered join-item w-full rounded-full"
            value={userAnswer}
            disabled={!isUserPlaying}
            onChange={(e) => setUserAnswer(e.target.value)}
          />
          <button
            type="submit"
            aria-label="submit answer"
            className="btn join-item border-1 border-l-0 border-gray-300  hover:bg-gray-300"
            onClick={testMatchingResult}
            disabled={!isUserPlaying}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
        </div>

        {infoMessage}
      </div>
    </div>
  );
};

export default SearchFilm;
