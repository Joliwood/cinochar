import type { Server, Socket } from 'socket.io';

import type { Player } from '#types';

import { players } from '../data';

const playerConnectSocket = (io: Server, socket: Socket) => {
  const playerConnect = (data: any) => {
    console.log('les players : ', players);
    // TODO - To change the type so we don't have to convert this way
    const socketId = socket.id;
    console.log('Player connected with name:', data.name, 'he has : ', data.points, ' points.');

    if (data === null) {
      return;
    }

    const newPlayer: Player = {
      socketId,
      name: data.name,
      points: data.points,
    };

    if (!players.find((player) => player.name === data.name)) {
      players.push(newPlayer);
    }

    io.emit('player-list', players);
  };
  socket.on('player-connect', playerConnect);
};

export default playerConnectSocket;
