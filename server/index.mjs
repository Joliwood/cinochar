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

io.on("connection", (socket) => {
    
  // Connections in and out
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

  // New film name
  socket.on("new-film-name", (filmName) => {
    console.log(filmName);

    console.log("We are in the new-film. The film to find is : ", filmName);

    io.emit("new-film-name", filmName);
  });

  // New random zoom position
  socket.on('random-position-zoom', (randomZoomPosition) => {
    console.log('The new random position is : ', randomZoomPosition.x, randomZoomPosition.y);
    const zoomPositionFromSocket = randomZoomPosition;

    io.emit("random-position-zoom", zoomPositionFromSocket);
  });
  
  // New film url
  socket.on("new-film-url", (filmPictureUrl) => {

    console.log("The url picture is : ", filmPictureUrl);

    io.emit("new-film-url", filmPictureUrl);
  });

});

server.listen(5000, () => {
    console.log('✔️ Server listening on port 5000')
});