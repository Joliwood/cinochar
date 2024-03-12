import axios, { type AxiosResponse } from 'axios';
import { type Socket } from 'socket.io-client';

import type { FilmFromMongo } from '#types';

type Args = {
  socket: Socket;
  zoom: number;
  filmDimensionsContainer: number;
};

async function getNewFilm(args: Args): Promise<void> {
  const { socket, zoom, filmDimensionsContainer } = args;

  try {
    // Correctly await the Axios call and directly assign the response to selectedMovie
    const response: AxiosResponse<FilmFromMongo> = await axios.get(`${process.env.NEXT_PUBLIC_MONGO_API_URL}/mongo/getFilm`);
    const selectedMovie: FilmFromMongo = response.data;

    // Ensure selectedMovie and picture_urls are defined and not empty
    if (!selectedMovie || !selectedMovie.picture_urls || selectedMovie.picture_urls.length === 0) {
      throw new Error('No film found or film has no pictures.');
    }

    const randomUrlIndex: number = Math.floor(Math.random() * selectedMovie.picture_urls.length);

    socket.emit('new-film-name', selectedMovie.name);
    socket.emit('new-film-url', selectedMovie.picture_urls[randomUrlIndex]);
    socket.emit('random-position-zoom', { zoom, filmDimensionsContainer });
    socket.emit('reset-countdown');
    socket.emit('get-cooldown');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Axios error: ${error.message}`);
    } else if (error instanceof Error) {
      console.error(`General error: ${error.message}`);
    } else {
      console.error('Unknown error occurred');
    }
  }
}

export default getNewFilm;
