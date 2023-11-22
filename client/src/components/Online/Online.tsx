import { socket } from '../../socket';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  endGame,
  placePiece,
  selectPiece,
  startGame as startGameReducer,
  unselectPiece,
} from '../../store/slices/gameSlice';
import { useState, useEffect } from 'react';
import OnlinePage from '../OnlinePage/OnlinePage';
import GameLobby from '../GameLobby/GameLobby';
import GameCanvas from '../GameCanvas/GameCanvas';
import { movePieceData } from '../../utils/types';
import { placePieceAnimation } from '../../animations/placePieceAnimation';
import { MutableRefObject } from 'react';
import { Group } from 'three';

export default function Online() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const username = useAppSelector((state) => state.user.username);
  const isInGame = useAppSelector((state) => state.game.isInGame);
  const pieces = useAppSelector((state) => state.game.allPieces);

  const [games, setGames] = useState<{ name: string; members: number }[]>([]);
  const [gameLobby, setGameLobby] = useState<string>();
  const [playersInRoom, setPlayersInRoom] = useState<string[]>([]);

  //@ts-ignore
  const [pieceRefs, setPieceRefs] = useState<
    Record<number, MutableRefObject<Group>>
  >({});

  useEffect(() => {
    if (!isAuthenticated) navigate('/');

    socket.on('connect', refreshPage);
    socket.on('currentGames', setGames);
    socket.on('roomPlayers', setPlayersInRoom);
    socket.on('leaveGame', leaveGame);
    socket.on('startGame', startGame);
    socket.on('movePiece', movePiece);

    socket.connect();
    refreshPage();

    return () => {
      socket.off('currentGames', setGames);
      socket.off('roomPlayers', setPlayersInRoom);
      socket.off('leaveGame', leaveGame);
      socket.off('startGame', startGame);
      socket.off('movePiece', movePiece);
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

  function recieveRef(id: number, ref: MutableRefObject<Group>) {
    console.log('ID', id, 'REF', ref);
    pieceRefs[id] = ref;
    // setPieceRefs((prev) => {
    //   const newPieceRefs = { ...prev, [id]: ref };
    //   console.log('INSIDE', newPieceRefs)
    //   return newPieceRefs;
    // });
    // console.log('REFS', pieceRefs);
  }

  function leaveGame(gameName: string) {
    socket.emit('leaveRoom', gameName);
    setGameLobby(undefined);
    dispatch(endGame({ gameWinner: 0 }));
    refreshPage();
  }

  function getRoomPlayers(room: string) {
    socket.emit('getRoomPlayers', room);
  }

  function triggerStartGame(room: string) {
    socket.emit('triggerStartGame', room);
  }

  function startGame(room: string) {
    console.log('starting game', room);
    dispatch(startGameReducer());
  }

  function triggerMovePiece(data: movePieceData) {
    console.log('TRIGGER');
    socket.emit('movePiece', gameLobby, data);
  }

  function movePiece(data: movePieceData) {
    console.log(username, `piece ${data.pieceId} moved to cell ${data.cell}`);

    dispatch(selectPiece({ piece: pieces[data.pieceId] }));
    dispatch(placePiece({ cell: data.cell }));
    dispatch(unselectPiece());

    console.log(pieceRefs);
    console.log('ID', data.pieceId);
    placePieceAnimation(data.newPosition, pieceRefs[data.pieceId]);
  }



  return (
    <>
      {isInGame ? (
        <GameCanvas
          online={{
            [1]: playersInRoom[0],
            [2]: playersInRoom[1],
            triggerMovePiece,
            sendRef: recieveRef,
          }}
        />
      ) : gameLobby != null ? (
        <GameLobby
          players={playersInRoom}
          name={gameLobby}
          getRoomPlayers={getRoomPlayers}
          triggerStartGame={triggerStartGame}
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
