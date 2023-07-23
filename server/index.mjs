import express from "express";
import http from "http";
import cors from "cors";
const app = express();
const server = http.createServer(app);

import { Server } from 'socket.io';

const io = new Server(server, {
    cors: {
        origin: process.env.CORS_SUPPORTED,
    },
});
const serverEx = express();
serverEx.use(cors());

const players = {};

io.on("connection", (socket) => {
    // console.log('A user connected');
  
    socket.on("player-connect", (data) => {
      console.log("Player connected with pseudo:", data.pseudo);

      players[socket.id] = {
        pseudo: data?.pseudo ?? 'Unknown Player',
      };

      io.emit("player-list", Object.values(players).map((player) => player.pseudo));
    });
  
    socket.on('disconnect', () => {
      console.log('A user disconnected');

      // Remove the player data when a player disconnects
      delete players[socket.id];

      // Broadcast the updated player list to all clients
      io.emit("player-list", Object.values(players).map((player) => player.pseudo));
    });
  });

server.listen(5000, () => {
    console.log('✔️ Server listening on port 5000')
});