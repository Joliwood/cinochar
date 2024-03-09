import type { Server, Socket } from 'socket.io';
import { gameInfos } from '../data';

const NewFilmUrlSocket = (io: Server, socket: Socket) => {
  const newFilmUrl = async (filmPictureUrl: any) => {
    console.log('The url picture is : ', filmPictureUrl);
    gameInfos.filmUrlFromSocket = filmPictureUrl;
    io.emit('new-film-url', gameInfos.filmUrlFromSocket);
  };
  socket.on('new-film-url', newFilmUrl);
};

export default NewFilmUrlSocket;
