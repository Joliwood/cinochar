import type { Server, Socket } from 'socket.io';
import { gameInfos, players } from '../data';

const InitSocket = (io: Server, socket: Socket) => {
  const init = async () => {
    io.emit('player-list', Object.values(players).map((player) => ({ name: player?.name, points: player?.points })));
    io.emit('new-film-name', gameInfos.filmNameFromSocket);
    io.emit('random-position-zoom', gameInfos.zoomPositionFromSocket);
    io.emit('new-film-url', gameInfos.filmUrlFromSocket);
    io.emit('cooldown', gameInfos.cooldownCounter);
    io.emit('get-countdown', gameInfos.countdown);
  };
  socket.on('init', init);
};

export default InitSocket;
