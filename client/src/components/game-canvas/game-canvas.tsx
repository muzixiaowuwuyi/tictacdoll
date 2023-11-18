import "./game-canvas.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import GameEnvironment from "../game-environment/game-environment";
import { useDispatch } from "react-redux";
import { startGame } from "../../store/slices/chessSlice";

import './game-canvas.css'
import { useAppSelector } from "../../store/hooks";

const GameCanvas = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isInGame = useAppSelector((state) => state.chess.isInGame);
  
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
