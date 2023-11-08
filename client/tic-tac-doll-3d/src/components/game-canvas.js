import { Suspense } from "react";
import { Chess, ChessSize, ChessType } from "../models/chess";

import {
  Environment,
  PerspectiveCamera,
  OrbitControls,
  Plane,
} from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import "./game-canvas.css";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Chessboard from "../models/chessboard";
import { TextureLoader } from "three";
const GameCanvas = (props) => {
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const texture = useLoader(TextureLoader, "/texture.png");
  return (
    <Canvas className="GameCanvas">
      <Suspense fallback={null}>
        <Chessboard />
        <Chess
          chessSize={ChessSize.LARGE}
          position={[6.8, 0.72, 3.4]}
          chessType={ChessType.PLAYER}
          floorPlane={floorPlane}
        />
        <Chess
          chessSize={ChessSize.LARGE}
          position={[6.8, 0.72, 1.8]}
          chessType={ChessType.PLAYER}
          floorPlane={floorPlane}
        />
        <Chess
          chessSize={ChessSize.LARGE}
          position={[6.8, 0.72, 0.2]}
          chessType={ChessType.PLAYER}
          floorPlane={floorPlane}
        />

        <Chess
          chessSize={ChessSize.MEDIUM}
          position={[8.7, 0, 7.2]}
          chessType={ChessType.PLAYER}
          floorPlane={floorPlane}
        />

        <Chess
          chessSize={ChessSize.MEDIUM}
          position={[8.7, 0, 5]}
          chessType={ChessType.PLAYER}
          floorPlane={floorPlane}
        />

        <Chess
          chessSize={ChessSize.MEDIUM}
          position={[8.7, 0, 2.8]}
          chessType={ChessType.PLAYER}
          floorPlane={floorPlane}
        />

        <Chess
          chessSize={ChessSize.SMALL}
          position={[5.8, 0, 7.5]}
          chessType={ChessType.PLAYER}
          floorPlane={floorPlane}
        />
        <Chess
          chessSize={ChessSize.SMALL}
          position={[5.8, 0, 5.8]}
          chessType={ChessType.PLAYER}
          floorPlane={floorPlane}
        />
        <Chess
          chessSize={ChessSize.SMALL}
          position={[5.8, 0, 4.1]}
          chessType={ChessType.PLAYER}
          floorPlane={floorPlane}
        />

        {/* computer's chesses */}

        <Chess
          chessSize={ChessSize.LARGE}
          position={[-7, 0.72, -3]}
          chessType={ChessType.COMPUTER}
          floorPlane={floorPlane}
        />
        <Chess
          chessSize={ChessSize.LARGE}
          position={[-7, 0.72, -1.5]}
          chessType={ChessType.COMPUTER}
          floorPlane={floorPlane}
        />
        <Chess
          chessSize={ChessSize.LARGE}
          position={[-7, 0.72, 0]}
          chessType={ChessType.COMPUTER}
          floorPlane={floorPlane}
        />

        <Chess
          chessSize={ChessSize.MEDIUM}
          position={[-13, 0, -6]}
          chessType={ChessType.COMPUTER}
          floorPlane={floorPlane}
        />
        <Chess
          chessSize={ChessSize.MEDIUM}
          position={[-13, 0, -3.5]}
          chessType={ChessType.COMPUTER}
          floorPlane={floorPlane}
        />
        <Chess
          chessSize={ChessSize.MEDIUM}
          position={[-13, 0, -1]}
          chessType={ChessType.COMPUTER}
          floorPlane={floorPlane}
        />

        <Chess
          chessSize={ChessSize.SMALL}
          position={[-12, 0, -6]}
          chessType={ChessType.COMPUTER}
          floorPlane={floorPlane}
        />

        <Chess
          chessSize={ChessSize.SMALL}
          position={[-12, 0, -4]}
          chessType={ChessType.COMPUTER}
          floorPlane={floorPlane}
        />
        <Chess
          chessSize={ChessSize.SMALL}
          position={[-12, 0, -2]}
          chessType={ChessType.COMPUTER}
          floorPlane={floorPlane}
        />

        <OrbitControls
          minZoom={10}
          maxZoom={50}
          enableRotate={false}
          enableZoom={false}
          enableDamping={false}
          enableKeys={false}
        />
        <PerspectiveCamera makeDefault fov={35} position={[0, 24, 24]} />

        <Environment preset="city" />
        <ambientLight intensity={1} />
        <Plane position={[0, -5, -9]} args={[100, 100]}>
          <meshBasicMaterial attach="material" map={texture} />
        </Plane>
      </Suspense>
    </Canvas>
  );
};

export default GameCanvas;
