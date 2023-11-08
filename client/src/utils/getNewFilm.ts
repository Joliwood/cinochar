import axios, { AxiosResponse } from 'axios';
import { Socket } from 'socket.io-client';
import type { FilmFromMongo } from '@/@types';

const getNewFilm = async (
  socket: Socket,
  zoom: number,
  filmDimensionsContainer: number,
) => {
  try {
    // const response = await fetch('/api/getFilm');
    const response: AxiosResponse<FilmFromMongo> = await axios.get('/api/getFilm');
    const selectedMovie: FilmFromMongo = response.data;

    // Randomaly select an url in the object
    const randomUrlIndex: number = Math.floor(Math.random() * selectedMovie.picture_urls.length);

    // Send the new url film name to the socket
    socket.emit('new-film-name', selectedMovie.name);

    // Send the new url film picture to the socket
    socket.emit('new-film-url', selectedMovie.picture_urls[randomUrlIndex]);

    // Send the new random zoom position to the socket
    socket.emit('random-position-zoom', { zoom, filmDimensionsContainer });

    socket.emit('reset-countdown');

    socket.emit('get-cooldown');

    // setUserInfos({ ...userInfos, jokers: 2 });
  } catch (error) {
    console.error(error);
  }
};

export default getNewFilm;
