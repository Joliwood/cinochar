import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { UserContext } from '../../context/UserContext';

//! This line MUST BE before the component -> High risk of inifity loop
const socket = io(process.env.NEXT_PUBLIC_API_URL);

// eslint-disable-next-line react/prop-types
function FilmButton({ zoom, filmDimensionsContainer }) {
  const {
    pseudo, setJokers, isUserPlaying,
  } = useContext(UserContext);
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

      setJokers(2);

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
    pseudo === '' || !isUserPlaying ? (
      <div
        className="h-full tooltip"
        data-tip="Vous devez vous connecter et rejoindre la partie pour participer"
      >
        <button
          type="button"
          className={`px-3 shadow-md rounded-lg h-full ${counter > 0 ? 'bg-red-700 text-white' : 'bg-green-500'} cursor-not-allowed`}
          onClick={() => filmFinder()}
          disabled
        >
          <span className="inherit xs:hidden">
            <svg
              height="65%"
              version="1.1"
              id="Capa_1"
              fill="rgb(41, 19, 52)"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 489.533 489.533"
              xmlSpace="preserve"
            >
              <g>
                <path d="M268.175,488.161c98.2-11,176.9-89.5,188.1-187.7c14.7-128.4-85.1-237.7-210.2-239.1v-57.6c0-3.2-4-4.9-6.7-2.9l-118.6,87.1c-2,1.5-2,4.4,0,5.9l118.6,87.1c2.7,2,6.7,0.2,6.7-2.9v-57.5c87.9,1.4,158.3,76.2,152.3,165.6c-5.1,76.9-67.8,139.3-144.7,144.2c-81.5,5.2-150.8-53-163.2-130c-2.3-14.3-14.8-24.7-29.2-24.7c-17.9,0-31.9,15.9-29.1,33.6C49.575,418.961,150.875,501.261,268.175,488.161z" />
              </g>
            </svg>

          </span>
          <span className="hidden xs:flex">Nouveau film</span>
          {counter > 0 && ` (${counter})`}
        </button>
      </div>
    ) : (
      <button
        type="button"
        className={`px-3 shadow-md rounded-lg h-full ${counter > 0 ? 'bg-red-700 text-white' : 'bg-green-500'} ${counter > 0 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        onClick={() => filmFinder()}
        disabled={counter > 0}
      >
        <span className={`inherit xs:hidden ${counter > 0 && 'hidden'}`}>
          <svg
            height="65%"
            version="1.1"
            id="Capa_1"
            fill="rgb(41, 19, 52)"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 489.533 489.533"
            xmlSpace="preserve"
          >
            <g>
              <path d="M268.175,488.161c98.2-11,176.9-89.5,188.1-187.7c14.7-128.4-85.1-237.7-210.2-239.1v-57.6c0-3.2-4-4.9-6.7-2.9l-118.6,87.1c-2,1.5-2,4.4,0,5.9l118.6,87.1c2.7,2,6.7,0.2,6.7-2.9v-57.5c87.9,1.4,158.3,76.2,152.3,165.6c-5.1,76.9-67.8,139.3-144.7,144.2c-81.5,5.2-150.8-53-163.2-130c-2.3-14.3-14.8-24.7-29.2-24.7c-17.9,0-31.9,15.9-29.1,33.6C49.575,418.961,150.875,501.261,268.175,488.161z" />
            </g>
          </svg>

        </span>
        <span className="hidden xs:flex">Nouveau film</span>
        {counter > 0 && ` (${counter})`}
      </button>
    )
  );
}

export default FilmButton;
