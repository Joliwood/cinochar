import type { Server, Socket } from 'socket.io';
import { getRandomPosition } from '../utils';
import { serverData } from '../index';

type Props = {
  io: Server;
  socket: Socket;
  filmUrlFromSocket: any;
}

const RandomPositionZoomSocket = (props: Props) => {
  const { io, socket, filmUrlFromSocket } = props;
  
  
  const randomPositionZoom = async (zoom: any, filmDimensionsContainer: any) => {
    let randomZoomPosition = await getRandomPosition({ zoom, filmDimensionsContainer, filmUrlFromSocket });

    console.log('The new random position is : ', randomZoomPosition.x, randomZoomPosition.y);

    serverData.zoomPositionFromSocket = randomZoomPosition;
    await io.emit("random-position-zoom", serverData.zoomPositionFromSocket);
  }

  socket.on("random-position-zoom", randomPositionZoom);
}

export default RandomPositionZoomSocket;
