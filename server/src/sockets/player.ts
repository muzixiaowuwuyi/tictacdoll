import { Namespace } from 'socket.io';
import { SocketWithUser } from '../types';

export default function playerSocket(playerNameSpace: Namespace) {
  playerNameSpace.on('connection', (socket) => {
    socket.join('waiting');
    playerNameSpace.adapter.del(socket.id, socket.id);

    socket.on('refresh', () => {
      const allJoinableGames = getAllJoinableGames(playerNameSpace);
      socket.emit('currentGames', allJoinableGames);
    });

    socket.on('createGame', () => {
      const newRoomName = (socket as SocketWithUser).user.username + "'s game";
      socket.join(newRoomName);
    });

    socket.on('joinGame', (data) => {
      socket.join(data.roomName);
      socket.leave('waiting');
    });

    socket.on('startGame', () => {
      //TODO: Add game logic event listeners
    });

    socket.on('endGame', () => {
      //TODO: Remove game logic event listeners
    });
  });
}

function getAllJoinableGames(playerNameSpace: Namespace) {
  const joinableGames: string[] = [];

  playerNameSpace.adapter.rooms.forEach((sockets, roomName) => {
    if (sockets.size === 1 && roomName !== 'waiting') {
      joinableGames.push(roomName);
    }
  });

  return joinableGames;
}

function startGame(socket: SocketWithUser) {
  //TODO: movePiece listener that would take a pieceId and a cell as argument and then move it for the other person in the room
  //That might actually be it. I don't think I need to do any other ones.
}
