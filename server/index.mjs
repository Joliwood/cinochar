import express from "express";
import http from "http";
import sharp from "sharp";
import axios from "axios";
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
let cooldownDuration = 1;
let cooldownCounter = 0;

// Function to generate random X and Y position
const getRandomPosition = async (zoom, filmDimensionsContainer) => {
  const response = await axios.get(filmUrlFromSocket, { responseType: 'arraybuffer' });

  const image = sharp(response.data);
  const metadata = await image.metadata();

  const width = metadata.width;
  const height = metadata.height;

  // Width after zoom render = filmDimensionsContainer x zoom, whatever real
  // width before but we still need it for the aspect ratio to have the height
  // after zoom render
  const aspectRatio = width / height;
  const xMax = filmDimensionsContainer - filmDimensionsContainer / zoom;
  const yMax = ((zoom * filmDimensionsContainer / aspectRatio) - filmDimensionsContainer ) / zoom;

  console.log("zoom : ", zoom, ". FilmDimensionsContainer : ", filmDimensionsContainer)
  console.log("Width pixel : ", width, "px. Height pixel : ", height, "px. Aspect ratio is : ", aspectRatio, ". Xmax = ", xMax, ". Ymax = ", yMax);

  const randomX = Math.floor(Math.random() * xMax);
  const randomY = Math.floor(Math.random() * yMax);
  const randomZoomPosition = { x: -randomX, y: -randomY };
  return randomZoomPosition;
};

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
  socket.on('random-position-zoom', async ({ zoom, filmDimensionsContainer }) => {
    
    const randomZoomPosition = await getRandomPosition(zoom, filmDimensionsContainer);

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