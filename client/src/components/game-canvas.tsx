import "./game-canvas.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import GameEnvironment from "./game-environment";
import { useDispatch } from "react-redux";
import { startGame } from "../store/slices/chessSlice";

const GameCanvas = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const gameStarted = localStorage.getItem("gameStarted") === "true";
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
