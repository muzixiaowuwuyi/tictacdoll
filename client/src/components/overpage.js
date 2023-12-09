import { useNavigate } from "react-router-dom";
import "./overpage.css";
import { useState } from "react";
import Winner from "./winner";
import GameList from "./GameList";

export default function OverPage() {
  const [clName, setClName] = useState("game-info");
  const [list, setList] = useState("gamelist");
  const navigate = useNavigate();

  function handlePlayAgain() {
    setClName("game-info pop-hide");
    setList("gamelist pop-hide");
    navigate("/");
    window.location.reload();
  }
  return (
    <div className="overpage-container">
      <div className={list}>
        <GameList />
      </div>
      <div className={clName}>
        <Winner />

        <button className="again-button" onClick={handlePlayAgain}>
          Play Again
        </button>
      </div>
    </div>
  );
}
