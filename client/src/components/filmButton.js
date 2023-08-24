import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

//! This line MUST BE before the component -> High risk of inifity loop
const socket = io(process.env.NEXT_PUBLIC_API_URL);

// eslint-disable-next-line react/prop-types
function FilmButton({ zoom, filmDimensionsContainer }) {
  const cooldownDuration = 5;
  const [counter, setCounter] = useState(0);

  useEffect(() => {
  // Listen for cooldown updates from the server
    socket.on('cooldown', (counterFromSocket) => {
      setCounter(counterFromSocket);
    });
  }, []);

  const filmFinder = async () => {
    setCounter(cooldownDuration);
    try {
      const response = await fetch('/api/getFilm');
      const selectedMovie = await response.json();

      // Extract the picture_urls object
      const pictureUrls = selectedMovie[0].picture_urls;

      // Get all the keys (picture URLs) from the 'picture_urls' object
      const pictureKeys = Object.keys(pictureUrls);

      // Randomaly select an url in the object
      const randomUrlIndex = Math.floor(Math.random() * pictureKeys.length);

      // Send the new url film name to the socket
      socket.emit('new-film-name', selectedMovie[0].name);

      // Send the new url film picture to the socket
      socket.emit('new-film-url', pictureUrls[pictureKeys[randomUrlIndex]]);

      // Send the new random zoom position to the socket
      socket.emit('random-position-zoom', { zoom, filmDimensionsContainer });

      socket.emit('reset-countdown');

      socket.emit('get-cooldown');

      // Solution to have less exchange with the socket but create < 1sec of
      // difference between each player depends on when they enter in the game
      // socket.emit('get-countdown');

      // console.log('The film is : ', selectedMovie[0].name);
      // console.log('The new random position is : ', getRandomPosition().x, getRandomPosition().y);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      type="button"
      className={`px-3 shadow-md rounded-lg h-full ${counter > 0 ? 'bg-red-700 text-white' : 'bg-green-500'}`}
      onClick={() => filmFinder()}
      disabled={counter > 0}
    >
      Nouveau film
      {counter > 0 && ` (${counter})`}
    </button>
  );
}

export default FilmButton;
