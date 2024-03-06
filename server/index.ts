import express from "express";
import { createServer } from "http";
// import getRandomPosition from "./utils/getRandomPosition";
import { Server } from 'socket.io';
import { PositionType } from "#types";
import { 
  playerConnectSocket, 
  disconnectSocket, 
  randomPositionZoomSocket
 } from "./sockets";

const app = express();
const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

export type Player = {
  pseudo?: string | null;
  playerId?: string
  name: string | null;
  points: number | null;
};

// WIP - Check if it doesn't broke the functionnement
const players: Player[] = [{
  pseudo: null,
  name: null,
  points: null
}];

type ServerData = {
  zoomPositionFromSocket: PositionType
}

export const serverData: ServerData = {
  zoomPositionFromSocket: { x: null, y: null },
}

let filmUrlFromSocket = "";
let filmNameFromSocket = "";
let zoomPositionFromSocket: PositionType = { x: null, y: null };
let cooldownDuration = 5;
let cooldownCounter = 0;
let countdown: number;

io.on("connection", (socket) => {

  // Initialization players
  socket.on("init", () => {
    io.emit("player-list", Object.values(players).map((player) => ({ name: player?.name, points: player?.points })));
    io.emit("new-film-name", filmNameFromSocket);
    io.emit("random-position-zoom", zoomPositionFromSocket);
    io.emit("new-film-url", filmUrlFromSocket);
    io.emit("cooldown", cooldownCounter);
    io.emit('get-countdown', countdown);
  });

  // Connections in and out
  playerConnectSocket({ io, socket, players });

  disconnectSocket({ io, socket, players });

  // New film name dev helper
  socket.on("new-film-name", (filmName) => {
    console.log("The film to find is : ", filmName);
    filmNameFromSocket = filmName;
    io.emit("new-film-name", filmNameFromSocket);
  });

  // New random zoom position
  randomPositionZoomSocket({ io, socket, filmUrlFromSocket })
  // socket.on('random-position-zoom', async ({ zoom, filmDimensionsContainer }) => {

  //   let randomZoomPosition = await getRandomPosition({ zoom, filmDimensionsContainer, filmUrlFromSocket });

  //   console.log('The new random position is : ', randomZoomPosition.x, randomZoomPosition.y);

  //   zoomPositionFromSocket = randomZoomPosition;
  //   await io.emit("random-position-zoom", zoomPositionFromSocket);
  // });

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

  // Add points to a player
  socket.on('player-add-points', ({ pseudo, points }) => {

    if (typeof pseudo !== 'string' || typeof points !== 'number') {
      console.error('Invalid data received for player-add-points:', pseudo, points);
      return;
    }

    let foundPlayer = false;

    Object.keys(players).forEach((player) => {
      const playerId = Number(player);

      if (players[playerId].name === pseudo) {
        // TODO - Fix this
        // @ts-expect-error Object can be null
        players[playerId].points += points;
        foundPlayer = true;
        console.log(`${pseudo} received ${points} points. Total points now: ${players[playerId].points}`);
      }
    });

    if (foundPlayer) {
      io.emit('player-list', Object.values(players).map((player) => ({ name: player.name, points: player.points })));
    } else {
      console.error(`Player ${pseudo} not found.`);
    }
  });

  // Reset the countdown
  socket.on('reset-countdown', () => {
    countdown = 30;
    io.emit('get-countdown', countdown);
    const countDownInterval = setInterval(() => {
      if (countdown > 0) {
        countdown--;
        io.emit('get-countdown', countdown);
      } else {
        clearInterval(countDownInterval);
      }
    }, 1000);
  })


});

server.listen(8000, () => {
  console.log('✔️ Server listening on port 8000')
});