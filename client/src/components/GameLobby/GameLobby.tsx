import { useEffect } from 'react';

import './GameLobby.css';

type GameLobbyProps = {
  name: string;
  players: string[];
  getRoomPlayers: (room: string) => void;
};

export default function GameLobby(props: GameLobbyProps) {
  const { name, players, getRoomPlayers } = props;

  useEffect(() => {
    getRoomPlayers(name);
  }, []);

  return (
    <div className='game-lobby'>
      <h2>{name}</h2>
      <div className='players'>
        <div className='player1'>
          <h3>Player 1:</h3>
          <div className='player-name first'>{players[0]}</div>
        </div>
        <div className='player2'>
          <h3>Player 2:</h3>
          <div className='player-name second'>
            {players[1] != null ? players[1] : 'Waiting...'}
          </div>
        </div>
      </div>
      <button className='start-button' disabled={players.length < 2}>Start Game</button>
    </div>
  );
}
