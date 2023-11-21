import {Server as SocketIOServer} from 'socket.io';
import playerSocket from './player';

export default function setupWebSocket(io: SocketIOServer) {
  const playerNameSpace = io.of('/players')

  playerSocket(playerNameSpace);
}