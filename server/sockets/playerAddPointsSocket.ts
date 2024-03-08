import type { Server, Socket } from 'socket.io';
import { players } from '../data';

const PlayerAddPointsSocket = (io: Server, socket: Socket) => {
  const playerAddPoints = (data: any) => {
    const { name, points } = data;
    
    if (typeof name !== 'string' || typeof points !== 'number') {
      console.error('Invalid data received for player-add-points:', name, points);
      return;
    }
  
    let foundPlayer = false;
  
    Object.keys(players).forEach((player) => {
      const playerId = Number(player);
  
      if (players[playerId].name === name) {
        // TODO - Fix this
        // @ts-expect-error Object can be null
        players[playerId].points += points;
        foundPlayer = true;
        console.log(`${name} received ${points} points. Total points now: ${players[playerId].points}`);
      }
    });
  
    if (foundPlayer) {
      io.emit('player-list', Object.values(players).map((player) => ({ name: player.name, points: player.points })));
    } else {
      console.error(`Player ${name} not found.`);
    }
  }
  socket.on("player-add-points", playerAddPoints);
}

export default PlayerAddPointsSocket;
