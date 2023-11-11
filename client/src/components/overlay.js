import logo1 from "../logos/logo-1.png";
import logo2 from "../logos/logo-2.png";
import "./overlay.css";
import Timer from "./timer";
export default function Overlay() {
  return (
    <div className="invisibal-container">
      <header className="header">
        <div className="game-name">Tic Tac Doll</div>
        <Timer />
        <div className="logo_container">
          <img className="logo-doll-2" src={logo2} alt="logo-2" />
          <img className="logo-doll-1" src={logo1} alt="logo-doll" />
        </div>
      </header>
    </div>
  );
}
