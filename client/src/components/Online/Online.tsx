import { socket } from '../../socket';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { useState, useEffect } from 'react';
import OnlinePage from '../OnlinePage/OnlinePage';
import GameLobby from '../GameLobby/GameLobby';

export default function Online() {
  const navigate = useNavigate();

  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const username = useAppSelector((state) => state.user.username);

  const [games, setGames] = useState<{ name: string; members: number }[]>([]);
  const [gameLobby, setGameLobby] = useState<string>();
  const [playersInRoom, setPlayersInRoom] = useState<string[]>([]);

  useEffect(() => {
    if (!isAuthenticated) navigate('/');
    socket.connect();
    refreshPage();
    return () => {
      socket.disconnect();
    };
  }, []);

  function refreshPage() {
    socket.emit('refresh');
  }

  function createGame() {
    socket.emit('createGame');
    setGameLobby(username + "'s game");
  }

  function joinGame(gameName: string) {
    socket.emit('joinGame', gameName);
    setGameLobby(gameName);
  }

  function leaveGame(gameName: string) {
    socket.emit('leaveRoom', gameName)
    setGameLobby(undefined);
    refreshPage();
  }

  function getRoomPlayers(room: string) {
    socket.emit('getRoomPlayers', room);
  }

  socket.on('connect', refreshPage);
  socket.on('currentGames', setGames);
  socket.on('roomPlayers', setPlayersInRoom);
  socket.on('leaveGame', leaveGame)

  return (
    <>
      {gameLobby != null ? (
        <GameLobby
          players={playersInRoom}
          name={gameLobby}
          getRoomPlayers={getRoomPlayers}
        />
      ) : (
        <OnlinePage
          games={games}
          createGame={createGame}
          joinGame={joinGame}
          refreshPage={refreshPage}
        />
      )}
    </>
  );
}
