'use client';

import React, { useState, useEffect } from 'react';
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
  const zoom = 3;
  const [zoomPosition, setZoomPosition] = useState(null);

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
    const randomZoomPosition = { x: -randomX, y: -randomY };
    return randomZoomPosition;
  };

  useEffect(() => {
    // It is the first emit send to the socket, so we reset all
    socket.on('new-film-name', (filmName) => {
      setZoomPosition(null);
      setRandomMovieName(filmName);
      setMatchResult(null);
    });

    socket.on('new-film-url', (url) => {
      getRandomPosition();
      setMovieUrl(url);
    });

    socket.on('random-position-zoom', (zoomPositionFromSocket) => {
      setZoomPosition(zoomPositionFromSocket);
    });
  }, [socket]);

  const filmFinder = async () => {
    try {
      const response = await fetch('/api/getData');
      const selectedMovie = await response.json();

      // Extract the picture_urls object
      const pictureUrls = selectedMovie[0].picture_urls;

      // Get all the keys (picture URLs) from the 'picture_urls' object
      const pictureKeys = Object.keys(pictureUrls);

      // Randomaly select an url in the object
      const randomUrlIndex = Math.floor(Math.random() * pictureKeys.length);

      // Send the new url film name to the socket
      socket.emit('new-film-name', (selectedMovie[0].name));

      // Send the new random zoom position to the socket
      socket.emit('random-position-zoom', (getRandomPosition()));

      // Send the new url film picture to the socket
      socket.emit('new-film-url', (pictureUrls[pictureKeys[randomUrlIndex]]));

      // console.log('The film is : ', selectedMovie[0].name);
      // console.log('The new random position is : ', getRandomPosition().x, getRandomPosition().y);
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

export default Header;
