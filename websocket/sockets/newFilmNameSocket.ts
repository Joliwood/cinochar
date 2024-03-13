import type { Server, Socket } from 'socket.io';

import { gameInfos } from '../data';

const NewFilmNameSocket = (io: Server, socket: Socket) => {
  const newFilmName = async (name: any) => {
    console.log('The film to find is : ', name);
    gameInfos.filmNameFromSocket = name;
    io.emit('new-film-name', gameInfos.filmNameFromSocket);
  };
  socket.on('new-film-name', newFilmName);
};

export default NewFilmNameSocket;
