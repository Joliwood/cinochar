import express from "express";
import http from "http";
const app = express();
const server = http.createServer(app);

import { Server } from 'socket.io';

const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

const players = {};
let filmUrlFromSocket = "";
let filmNameFromSocket = "";
let zoomPositionFromSocket = "";
let cooldownDuration = 5;
let cooldownCounter = 0;

io.on("connection", (socket) => {

  // Initialization players
  socket.on("init", () => {
    io.emit("player-list", Object.values(players).map((player) => player.pseudo));
    io.emit("new-film-name", filmNameFromSocket);
    io.emit("random-position-zoom", zoomPositionFromSocket);
    io.emit("new-film-url", filmUrlFromSocket);
    io.emit("cooldown", cooldownCounter);
  });
    
  // Connections in and out
  socket.on("player-connect", (data) => {
    console.log("Player connected with pseudo:", data.pseudo);

    players[socket.id] = {
      pseudo: data?.pseudo ?? 'Unknown Player',
    };

    io.emit("player-list", Object.values(players).map((player) => player.pseudo));
  });

  socket.on('disconnect', () => {
  if (players[socket.id]) {
    console.log(players[socket.id].pseudo, ' has disconnected');
    delete players[socket.id];
    io.emit("player-list", Object.values(players).map((player) => player.pseudo));
  }
});

  // New film name
  socket.on("new-film-name", (filmName) => {
    console.log("The film to find is : ", filmName);
    filmNameFromSocket = filmName;
    io.emit("new-film-name", filmNameFromSocket);
  });

  // New random zoom position
  socket.on('random-position-zoom', (randomZoomPosition) => {
    console.log('The new random position is : ', randomZoomPosition.x, randomZoomPosition.y);
    zoomPositionFromSocket = randomZoomPosition;
    io.emit("random-position-zoom", zoomPositionFromSocket);
  });
  
  // New film url
  socket.on("new-film-url", (filmPictureUrl) => {
    console.log("The url picture is : ", filmPictureUrl);
    filmUrlFromSocket = filmPictureUrl;
    io.emit("new-film-url", filmUrlFromSocket);
  });

  // Cooldown counter
  socket.on("get-cooldown", () => {
    cooldownCounter = cooldownDuration;
    for (let i = 0; i < cooldownDuration + 1; i++) {
      setTimeout(() => {
        if (cooldownCounter >= 0) {
          console.log(cooldownCounter);
          io.emit("cooldown", cooldownCounter);
          cooldownCounter--;
        }
      }, i * 1000);
    }
  });

});

server.listen(5000, () => {
    console.log('✔️ Server listening on port 5000')
});