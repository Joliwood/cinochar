import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// eslint-disable-next-line react/prop-types
function FilmButton({ zoom }) {
  const socket = io(process.env.NEXT_PUBLIC_API_URL);
  const cooldownDuration = 5;
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (counter > 0) {
      const timeout = setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);

      if (counter === 0) {
        clearTimeout(timeout);
      }
    }
  }, [counter]);

  // Function to generate random X and Y position
  const getRandomPosition = () => {
    const randomX = Math.floor(Math.random() * (100 / zoom + 1));
    const randomY = Math.floor(Math.random() * (100 / zoom + 1));
    const randomZoomPosition = { x: -randomX, y: -randomY };
    return randomZoomPosition;
  };

  const filmFinder = async () => {
    setCounter(cooldownDuration);
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

  const buttonClass = counter === 0 ? 'bg-green-500' : 'bg-red-700';

  return (
    <button
      type="button"
      className={`px-3 ${buttonClass}`}
      onClick={() => filmFinder()}
      disabled={counter > 0}
    >
      Toggle a new film to find
      {counter > 0 && ` (${counter})`}
    </button>
  );
}

export default FilmButton;