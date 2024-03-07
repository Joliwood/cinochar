import type { Server, Socket } from 'socket.io';
import { players } from '../data';

const PlayerAddPointsSocket = (io: Server, socket: Socket) => {
  const playerAddPoints = (data: any) => {
    const { pseudo, points } = data;
    
    if (typeof pseudo !== 'string' || typeof points !== 'number') {
      console.error('Invalid data received for player-add-points:', pseudo, points);
      return;
    }
  
    let foundPlayer = false;
  
    Object.keys(players).forEach((player) => {
      const playerId = Number(player);
  
      if (players[playerId].name === pseudo) {
        // TODO - Fix this
        // @ts-expect-error Object can be null
        players[playerId].points += points;
        foundPlayer = true;
        console.log(`${pseudo} received ${points} points. Total points now: ${players[playerId].points}`);
      }
    });
  
    if (foundPlayer) {
      io.emit('player-list', Object.values(players).map((player) => ({ name: player.name, points: player.points })));
    } else {
      console.error(`Player ${pseudo} not found.`);
    }
  }
  socket.on("player-add-points", playerAddPoints);
}

export default PlayerAddPointsSocket;
