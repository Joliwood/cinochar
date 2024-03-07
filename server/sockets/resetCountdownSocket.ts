import type { Server, Socket } from 'socket.io';
import { gameInfos } from '../data';

const ResetCountdownSocket = (io: Server, socket: Socket) => {
  const resetCountdown = async () => {
    gameInfos.countdown = 30;
    io.emit('get-countdown', gameInfos.countdown);

    const countDownInterval = setInterval(() => {
      if (gameInfos.countdown == null) {
        clearInterval(countDownInterval);
      } else

      if (gameInfos.countdown > 0) {
        gameInfos.countdown--;
        io.emit('get-countdown', gameInfos.countdown);
      } else {
        clearInterval(countDownInterval);
      }
    }, 1000);
  }
  socket.on("reset-countdown", resetCountdown);
}

export default ResetCountdownSocket;
