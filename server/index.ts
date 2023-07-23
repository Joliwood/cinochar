import express, { Express } from "express";
const http = require('http');
const app = express();
const server = http.createServer(app);
import cors from "cors";
require('dotenv').config();

import { Server } from 'socket.io';
const serverEx: Express = express();
serverEx.use(cors());

const io = new Server(server, {
    cors: {
        origin: process.env.NODE_ENV === 'production' ? 'https://cinochar.netlify.app' : 'http://localhost:3000',
    },
});

interface Player {
  pseudo: string;
}

const players: { [socketId: string]: Player } = {};

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