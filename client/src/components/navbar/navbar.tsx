import logo1 from "../../assets/logos-and-icons/logo-1.png";
import logo2 from "../../assets/logos-and-icons/logo-2.png";
import "./Navbar.css";
import GameOverPage from "../GameOverPage/GameOverPage";
import Timer from "../Timer/Timer";
import { useAppSelector } from "../../store/hooks";

export default function Navbar() {
  const gameEnded = useAppSelector((state) => state.game.gameEnded);
  const shouldShowTimer = useAppSelector((state) => state.game.isInGame);
  return (
    <div className="invisibal-container">
      <div className="navinfo">
        <div className="game-name">Tic Tac Doll</div>
        {/* {shouldShowTimer && <Timer className="timer" />} */}

        {shouldShowTimer && <Timer/>}
        <div className="logo_container">
          <img className="logo-doll-2" src={logo2} alt="logo-2" />
          <img className="logo-doll-1" src={logo1} alt="logo-doll" />
        </div>
      </div>

      {gameEnded && <GameOverPage/>}
    </div>
  );
}
