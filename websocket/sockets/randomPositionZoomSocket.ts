import type { Server, Socket } from 'socket.io';

import { getRandomPosition } from '../utils';
import { gameInfos } from '../data';

const RandomPositionZoomSocket = (io: Server, socket: Socket) => {
  const randomPositionZoom = async (position: any) => {
    const { zoom, FILM_DIMENSIONS_CONTAINER: filmDimensionsContainer } = position;
    const { filmUrlFromSocket } = gameInfos;

    const randomZoomPosition = await getRandomPosition({
      zoom,
      filmDimensionsContainer,
      filmUrlFromSocket,
    });

    console.log('The new random position is : ', randomZoomPosition.x, randomZoomPosition.y);

    gameInfos.zoomPositionFromSocket = randomZoomPosition;
    await io.emit('random-position-zoom', gameInfos.zoomPositionFromSocket);
  };
  socket.on('random-position-zoom', randomPositionZoom);
};

export default RandomPositionZoomSocket;
