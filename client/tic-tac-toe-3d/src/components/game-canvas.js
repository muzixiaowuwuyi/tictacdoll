import { Suspense, useState } from "react";
import { Chess, ChessSize } from "../models/chess";
import { Environment, OrthographicCamera, OrbitControls } from "@react-three/drei";
import "./game-canvas.css";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

const GameCanvas = props => {
  const [isDragging, setIsDragging] = useState(false);
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

  return (
    <Canvas className="GameCanvas">
      <Suspense fallback={null}>
        <Chess chessSize={ChessSize.LARGE} setIsDragging={setIsDragging} floorPlane={floorPlane} />
        <Chess chessSize={ChessSize.MEDIUM} setIsDragging={setIsDragging} floorPlane={floorPlane} />
        <Chess chessSize={ChessSize.SMALL} setIsDragging={setIsDragging} floorPlane={floorPlane} />

        <planeHelper args={[floorPlane, 5, "red"]} />
        <gridHelper args={[100, 100]} />
        <OrbitControls minZoom={10} maxZoom={50} enabled={!isDragging} />
        <OrthographicCamera makeDefault zoom={50} position={[0, 40, 200]} />
        <Environment preset="sunset" />
      </Suspense>
    </Canvas>
  );
};

export default GameCanvas;
