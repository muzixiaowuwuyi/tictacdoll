import { Namespace } from 'socket.io';

export default function playerSocket(playerNameSpace: Namespace) {
  playerNameSpace.on('connection', (socket) => {
    socket.on('createGame', (data) => {
      socket.emit('test');
    });
  });
}
