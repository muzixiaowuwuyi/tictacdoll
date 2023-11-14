import { useNavigate } from "react-router-dom";
import "./overpage.css";
import { useState } from "react";
import { fetchGamedata } from "../apiService";
import Winner from "./winner";
export default function OverPage() {
  const [clName, setClName] = useState("game-info");
  const navigate = useNavigate();

  function handlePlayAgain() {
    setClName("game-info pop-hide");

    navigate("/");
    window.location.reload();
  }
  return (
    <div className={clName}>
      <Winner />

      <button className="again-button" onClick={handlePlayAgain}>
        Play Again
      </button>
    </div>
  );
}
