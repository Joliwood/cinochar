import type { Server, Socket } from 'socket.io';
import { players } from '../data';
import type { Player } from '#types';

const playerConnectSocket = (io: Server, socket: Socket) => {
  const playerConnect = (data: any) => {
    console.log('les players : ', players);
    // TODO - To change the type so we don't have to convert this way
    const socketId = Number(socket.id);
    console.log("Player connected with pseudo:", data.pseudo, "he has : ", data.points, " points.");
    
    const newPlayer: Player = {
      name: data?.pseudo ?? 'Unknown Player',
      // name: data.pseudo,
      points: data?.points ?? 0,
      // points: data.points,
    };

    players[socketId] = newPlayer;

    io.emit("player-list", Object.values(players).map((player) => ({ name: player.name, points: player.points })));
  }
  socket.on("player-connect", playerConnect);
}

export default playerConnectSocket;
