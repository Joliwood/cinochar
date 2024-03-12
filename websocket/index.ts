import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import {
  disconnectSocket,
  getCooldownSocket,
  InitSocket,
  newFilmNameSocket,
  newFilmUrlSocket,
  playerAddPointsSocket,
  playerConnectSocket,
  randomPositionZoomSocket,
  resetCountdownSocket,
} from './sockets';

dotenv.config();
const app = express();

// const options = {
//   key: readFileSync('key.pem'),
//   cert: readFileSync('cert.pem'),
// };

const server = createServer(app);

export const io = new Server(server, {
  cors: {
    credentials: true,
    origin: process.env.CLIENT_URL,
  },
});

io.on('connection', (socket) => {
  disconnectSocket(io, socket);
  getCooldownSocket(io, socket);
  InitSocket(io, socket);
  newFilmNameSocket(io, socket);
  newFilmUrlSocket(io, socket);
  playerAddPointsSocket(io, socket);
  playerConnectSocket(io, socket);
  randomPositionZoomSocket(io, socket);
  resetCountdownSocket(io, socket);
});

server.listen(8000, () => {
  console.log('✔️ Server listening on port 8000');
});
