import type { Server, Socket } from 'socket.io';
import { gameInfos } from '../data';

const GetCooldownSocket = (io: Server, socket: Socket) => {
  const getCooldown = () => {
    gameInfos.cooldownCounter = gameInfos.cooldownDuration;

    for (let i = 0; i < gameInfos.cooldownDuration + 1; i += 1) {
      setTimeout(() => {
        if (gameInfos.cooldownCounter >= 0) {
          console.log(gameInfos.cooldownCounter);
          io.emit('cooldown', gameInfos.cooldownCounter);
          gameInfos.cooldownCounter -= 1;
        }
      }, i * 1000);
    }
  };

  socket.on('get-cooldown', getCooldown);
};

export default GetCooldownSocket;
