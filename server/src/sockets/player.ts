import { Namespace } from 'socket.io';

export default function playerSocket(playerNameSpace: Namespace) {
  playerNameSpace.on('connection', (socket) => {
    socket.join('waiting');
    playerNameSpace.adapter.del(socket.id, socket.id);

    const allJoinableGames = getAllJoinableGames(playerNameSpace);

    console.log('allJoinableGames', allJoinableGames);
    socket.emit('currentGames', allJoinableGames);
  });
}

function getAllJoinableGames(playerNameSpace : Namespace) {
  const joinableGames : string[] = [];
  
  playerNameSpace.adapter.rooms.forEach((sockets, roomName)=> {
    if (sockets.size === 1 && roomName != 'waiting') {
      joinableGames.push(roomName);
    }
  })

  return joinableGames;
}