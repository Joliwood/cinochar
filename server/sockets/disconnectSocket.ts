import type { Server, Socket } from 'socket.io';
import { players } from '../data';

const DisconnectSocket = (io: Server, socket: Socket) => {
  const disconnect = () => {
    const socketId = socket.id;
    console.log('we are', socketId);
    const player = players.find((player) => player.socketId === socketId);

    if (player) {
      console.log(`${player.name} has disconnected`);
      players.splice(players.indexOf(player), 1);
      io.emit('player-list', players);
    }
  }

  socket.on("disconnect", disconnect);
}

export default DisconnectSocket;