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
      socket.leave('waiting');
    });

    socket.on('joinGame', (room: string) => {
      socket.join(room);
      socket.leave('waiting');
    });

    socket.on('leaveRoom', (room: string) => {
      socket.leave(room);
      socket.join('waiting');
    })

    socket.on('getRoomPlayers', async (room) => {
      const socketsInRoom = await playerNameSpace.in(room).fetchSockets();
      const usernames = socketsInRoom.map(
        (roomSocket) => (roomSocket as unknown as SocketWithUser).user.username
      );
      socket.to(room).emit('roomPlayers', usernames);
    });

    socket.on('triggerStartGame', (room: string) => {
      socket.to(room).emit('startGame');
    });

    socket.on('startGame', (room: string) => {
      socket.on('triggerMovePiece', (pieceId: number, cell: number[]) => {
        socket.broadcast.to(room).emit('movePiece', pieceId, cell);
      });
    });

    socket.on('tiggerEndGame', (room: string) => {
      socket.to(room).emit('endGame', room);
    });

    socket.on('endGame', (room: string) => {
      socket.join('waiting');
      socket.leave(room);
    });

    socket.on('disconnect', () => {
      const socketRoom = (socket as SocketWithUser).user.username + '\'s game'
      socket.broadcast.to(socketRoom).emit('leaveGame', socketRoom, socket.id);
    })
  });
}

function getAllJoinableGames(playerNameSpace: Namespace) {
  const joinableGames: { name: string; members: number }[] = [];

  playerNameSpace.adapter.rooms.forEach((sockets, roomName) => {
    if (sockets.size === 1 && roomName !== 'waiting') {
      joinableGames.push({ name: roomName, members: sockets.size });
    }
  });

  return joinableGames;
}
