import type { Server, Socket } from 'socket.io';

type Props = {
  io: Server;
  socket: Socket;
  players: any;
}

const playerConnectSocket = (props: Props) => {
  const { io, socket, players } = props;
  
  
  const playerConnect = (data: any) => {
    console.log('les players : ', players);
    // TODO - To change the type so we don't have to convert this way
    const socketId = Number(socket.id);
    console.log("Player connected with pseudo:", data.pseudo, "he has : ", data.points, " points.");
    
    // type to use : Player

    const newPlayer: any = {
      // name: pseudo?.name ?? 'Unknown Player',
      name: data.pseudo,
      // points: data?.points ?? 0,
      points: data.points,
    };


    players[socketId] = newPlayer;

    // @ts-expect-error az
    io.emit("player-list", Object.values(players).map((player) => ({ name: player.name, points: player.points })));
  }

  socket.on("player-connect", playerConnect);
}

export default playerConnectSocket;
