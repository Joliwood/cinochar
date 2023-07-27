'use client';

import React, { useState, useEffect } from 'react';
// WIP // import axios from 'axios';
import io from 'socket.io-client';
import Image from 'next/image';

function Header() {
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
  // WIP // const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  // WIP // const baseURL = 'https://api.themoviedb.org/3';
  // WIP // const requestFilm = `${baseURL}/trending/all/week?api_key=${apiKey}&language=en-US`;
  const zoom = 3;
  const [randomZoomPosition, setRandomZoomPosition] = useState(null);

  // Others requests disponible
  // fetchTopRated: baseURL + "/movie/top_rated?api_key=" + apiKey + "&language=en-US"
  // fetchActionMovies: baseURL + "/discover/movie?api_key=" + apiKey + "&with_genres=28"
  // fetchComedyMovies: baseURL + "/discover/movie?api_key=" + apiKey + "&with_genres=35"
  // fetchHorrorMovies: baseURL + "/discover/movie?api_key=" + apiKey + "&with_genres=27"
  // fetchRomanceMovies: baseURL + "/discover/movie?api_key=" + apiKey + "&with_genres=10749"
  // fetchDocumentaries: baseURL + "/discover/movie?api_key=" + apiKey + "&with_genres=99"

  // Function to generate random X and Y position
  const getRandomPosition = () => {
    const randomX = Math.floor(Math.random() * (100 / zoom + 1));
    const randomY = Math.floor(Math.random() * (100 / zoom + 1));

    setRandomZoomPosition({ x: -randomX, y: -randomY });

    return { x: -randomX, y: -randomY };
  };

  useEffect(() => {
    socket.on('new-film-name', (filmName) => {
      setRandomZoomPosition(null);
      setRandomMovieName(filmName);
      setMatchResult(null);
    });

    socket.on('new-film-url', (url) => {
      setRandomZoomPosition(null);
      setRandomZoomPosition(getRandomPosition());
      setMovieUrl(url);
    });
  }, [socket]);

  const filmFinder = async () => {
    try {
      // WIP // const response = await axios.request(requestFilm);
      const response = await fetch('/api/getData');
      const selectedMovie = await response.json();

      // WIP // Select a random movie from the movies array
      // WIP // const randomIndex = Math.floor(Math.random() * response.data.results.length);
      // WIP // const selectedMovie = response.data.results[randomIndex];

      // Send the new url film name to the socket
      socket.emit('new-film-name', (selectedMovie[0].name));

      // Send the new url film picture to the socket
      socket.emit('new-film-url', (selectedMovie[0].picture_url));

      console.log('The film is : ', selectedMovie[0].name);
      console.log('The film url picture is : ', selectedMovie[0].picture_url);
    } catch (error) {
      console.error(error);
    }
  };

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
      <button type="button" className="bg-gray-800 px-3" onClick={filmFinder}>Toggle a new film to find</button>
      {randomMovieName && movieUrl ? (
        <div className="film-square">
          {randomZoomPosition !== null && (
            <Image
              src={movieUrl}
              width={500}
              height={500}
              alt="film to find"
              className="film-img"
              style={{ transform: `scale(${zoom}) translate(${randomZoomPosition.x}%, ${randomZoomPosition.y}%)` }}
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

export default Header;
