import type { Server, Socket } from 'socket.io';
import { gameInfos } from '../data';

// Assuming gameInfos has a countdown property that can be number or null
// Declare a variable at module scope to keep track of the interval
let countdownInterval: NodeJS.Timeout | null = null;

const ResetCountdownSocket = (io: Server, socket: Socket) => {
  const resetCountdown = async () => {
    // Clear any existing countdown interval
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }

    // Reset the countdown to 30
    gameInfos.countdown = 30;
    io.emit('get-countdown', gameInfos.countdown);

    // Start a new countdown interval
    countdownInterval = setInterval(() => {
      if (gameInfos.countdown !== null && gameInfos.countdown > 0) {
        gameInfos.countdown -= 1;
        io.emit('get-countdown', gameInfos.countdown);
      } else {
        // Once the countdown reaches 0 or is null, clear the interval and
        // optionally reset gameInfos.countdown to null
        clearInterval(countdownInterval as NodeJS.Timeout);
        countdownInterval = null;
        gameInfos.countdown = null;
        // Optional: Reset the countdown to indicate the countdown has finished or stopped
        io.emit('get-countdown', gameInfos.countdown); // Optionally inform the clients that the countdown has been reset/stopped
      }
    }, 1000);
  };

  socket.on('reset-countdown', resetCountdown);
};

export default ResetCountdownSocket;
