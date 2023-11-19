import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import GameEnvironment from "../GameEnvironment/GameEnvironment";
import { useDispatch } from "react-redux";
import { startGame } from "../../store/slices/gameSlice";

import './GameCanvas.css'
import { useAppSelector } from "../../store/hooks";

const GameCanvas = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isInGame = useAppSelector((state) => state.game.isInGame);
  
  useEffect(() => {
    const gameStarted = isInGame;
    if (gameStarted) {
      dispatch(startGame());
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Canvas className="GameCanvas">
      <GameEnvironment></GameEnvironment>
    </Canvas>
  );
};

export default GameCanvas;
