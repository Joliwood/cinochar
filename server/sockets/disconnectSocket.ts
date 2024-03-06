import type { Server, Socket } from 'socket.io';

type Props = {
  io: Server;
  socket: Socket;
  players: any;
}

const DisconnectSocket = (props: Props) => {
  const { io, socket, players } = props;
  
  
  const disconnect = () => {
    const socketId = Number(socket.id);

  if (players[socketId]) {
    console.log(`${players[socketId].name} has disconnected`);
    delete players[socketId];
    io.emit('player-list', Object.values(players).map(
      // TODO - Types to precise
      (player: any) => ({ name: player.pseudo, points: player.points })));
  }
  }

  socket.on("disconnect", disconnect);
}

export default DisconnectSocket;
