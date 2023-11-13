import logo1 from "../logos/logo-1.png";
import logo2 from "../logos/logo-2.png";
import "./navbar.css";
import OverPage from "./overpage";
import Timer from "./timer";
import { useSelector } from "react-redux";

export default function Navbar() {
  const gameEnded = useSelector((state) => state.chess.gameEnded);

  return (
    <div className="invisibal-container">
      <div className="navinfo">
        <div className="game-name">Tic Tac Doll</div>
        <Timer />
        <div className="logo_container">
          <img className="logo-doll-2" src={logo2} alt="logo-2" />
          <img className="logo-doll-1" src={logo1} alt="logo-doll" />
        </div>
      </div>

      {gameEnded && <OverPage className="overpage" />}
    </div>
  );
}
