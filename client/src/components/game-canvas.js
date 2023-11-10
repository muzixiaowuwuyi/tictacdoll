import "./game-canvas.css";

import { Canvas } from "@react-three/fiber";
import GameEnvironment from "./game-environment";
const GameCanvas = (props) => {
  return (
    <Canvas className="GameCanvas">
      <GameEnvironment></GameEnvironment>
    </Canvas>
  );
};

export default GameCanvas;
