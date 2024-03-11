import type { Server, Socket } from 'socket.io';
import { players } from '../data';

const DisconnectSocket = (io: Server, socket: Socket) => {
  const disconnect = () => {
    const socketId = socket.id;
    const playerDisconnected = players.find((player) => player.socketId === socketId);

    if (playerDisconnected) {
      console.log(`${playerDisconnected.name} has disconnected`);
      players.splice(players.indexOf(playerDisconnected), 1);
      io.emit('player-list', players);
    }
  };

  socket.on('disconnect', disconnect);
};

export default DisconnectSocket;
