import { useState, useEffect } from "react";
import logo1 from "../../assets/logos-and-icons/logo-1.png";
import logo2 from "../../assets/logos-and-icons/logo-2.png";
import "./Navbar.css";
import GameOverPage from "../GameOverPage/GameOverPage";
import Timer from "../Timer/Timer";
import { useAppSelector } from "../../store/hooks";
import Cookies from "js-cookie";
import { logout } from "../../services/userService";

export default function Navbar() {

  const gameEnded = useAppSelector((state) => state.game.gameEnded);
  const shouldShowTimer = useAppSelector((state) => state.game.isInGame);

  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(Cookies.get("username")!);
  });

  async function handleLogout() {
    console.log("logout");
    const res = await logout();
    Cookies.remove("username");
    console.log(Cookies.get("accessToken"));
  }

  return (
    <div className="invisibal-container">
      <div className="navinfo">
        <div className="game-name">Tic Tac Doll</div>
        {shouldShowTimer && <Timer/>}
        <div className="logo_container">
          <img className="logo-doll-2" src={logo2} alt="logo-2" />
          <img className="logo-doll-1" src={logo1} alt="logo-doll" />
        </div>
        <div className="logged-user">
          {Cookies.get("username") ?
          `Logged user: ${username}` :
          "Guest"}
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      {gameEnded && <GameOverPage/>}
    </div>
  );
}
