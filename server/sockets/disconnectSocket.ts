import type { Server, Socket } from 'socket.io';
import { players } from '../data';

const DisconnectSocket = (io: Server, socket: Socket) => {
  const disconnect = () => {
    const socketId = Number(socket.id);

    if (players[socketId]) {
      console.log(`${players[socketId].name} has disconnected`);
      delete players[socketId];
      io.emit('player-list', Object.values(players).map(
        // TODO - Types to precise
        (player: any) => ({ name: player.pseudo, points: player.points })));
    }
  }

  socket.on("disconnect", disconnect);
}

export default DisconnectSocket;
