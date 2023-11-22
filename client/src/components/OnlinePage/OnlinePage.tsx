import './OnlinePage.css';
import OnlineGamesList from '../OnlineGamesList/OnlineGamesList';

type OnlinePageProps = {
  games: { name: string; members: number }[];
  joinGame: (gameName: string) => void;
  createGame: () => void;
  refreshPage: () => void;
};

export default function OnlinePage(props: OnlinePageProps) {
  const { games, joinGame, createGame, refreshPage } = props;

  return (
    <div className='online-page'>
      <OnlineGamesList games={games} joinGame={joinGame} />
      <button onClick={createGame}>Create new game</button>
      <button onClick={refreshPage}>Refresh</button>
    </div>
  );
}
