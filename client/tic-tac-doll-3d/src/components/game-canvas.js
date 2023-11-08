import { Suspense, useRef } from "react";
import { Chess, ChessSize, ChessType } from "../models/chess";

import {
  Environment,
  OrthographicCamera,
  OrbitControls,
} from "@react-three/drei";
import "./game-canvas.css";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Chessboard from "../models/chessboard";

const GameCanvas = (props) => {
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  return (
    <Canvas
      className="GameCanvas"
      // camera={{ zoom: 50, position: [0, 40, 500], fov: 75 }}
    >
      <Suspense fallback={null}>
        <Chessboard />
        <Chess
          chessSize={ChessSize.LARGE}
          position={[4, 0.72, 4.5]}
          chessType={ChessType.PLAYER}
          floorPlane={floorPlane}
        />
        <Chess
          chessSize={ChessSize.LARGE}
          position={[4, 0.72, 3]}
          chessType={ChessType.PLAYER}
          floorPlane={floorPlane}
        />
        <Chess
          chessSize={ChessSize.LARGE}
          position={[4, 0.72, 1.5]}
          chessType={ChessType.PLAYER}
          floorPlane={floorPlane}
        />

        <Chess
          chessSize={ChessSize.MEDIUM}
          position={[3, 0.72, 9.5]}
          chessType={ChessType.PLAYER}
          floorPlane={floorPlane}
        />

        <Chess
          chessSize={ChessSize.MEDIUM}
          position={[3, 0.72, 7]}
          chessType={ChessType.PLAYER}
          floorPlane={floorPlane}
        />

        <Chess
          chessSize={ChessSize.MEDIUM}
          position={[3, 0.72, 4.5]}
          chessType={ChessType.PLAYER}
          floorPlane={floorPlane}
        />

        <Chess
          chessSize={ChessSize.SMALL}
          position={[-0.5, 0.72, 9.5]}
          chessType={ChessType.PLAYER}
          floorPlane={floorPlane}
        />
        <Chess
          chessSize={ChessSize.SMALL}
          position={[-0.5, 0.72, 7.5]}
          chessType={ChessType.PLAYER}
          floorPlane={floorPlane}
        />
        <Chess
          chessSize={ChessSize.SMALL}
          position={[-0.5, 0.72, 5.5]}
          chessType={ChessType.PLAYER}
          floorPlane={floorPlane}
        />

        {/* computer's chesses */}

        <Chess
          chessSize={ChessSize.LARGE}
          position={[1, 0.72, -3]}
          chessType={ChessType.COMPUTER}
          floorPlane={floorPlane}
        />
        <Chess
          chessSize={ChessSize.LARGE}
          position={[1, 0.72, -1.5]}
          chessType={ChessType.COMPUTER}
          floorPlane={floorPlane}
        />
        <Chess
          chessSize={ChessSize.LARGE}
          position={[1, 0.72, 0]}
          chessType={ChessType.COMPUTER}
          floorPlane={floorPlane}
        />

        <Chess
          chessSize={ChessSize.MEDIUM}
          position={[3, 0.72, -6]}
          chessType={ChessType.COMPUTER}
          floorPlane={floorPlane}
        />
        <Chess
          chessSize={ChessSize.MEDIUM}
          position={[3, 0.72, -3.5]}
          chessType={ChessType.COMPUTER}
          floorPlane={floorPlane}
        />
        <Chess
          chessSize={ChessSize.MEDIUM}
          position={[3, 0.72, -1]}
          chessType={ChessType.COMPUTER}
          floorPlane={floorPlane}
        />

        <Chess
          chessSize={ChessSize.SMALL}
          position={[4.5, 0.72, -6]}
          chessType={ChessType.COMPUTER}
          floorPlane={floorPlane}
        />

        <Chess
          chessSize={ChessSize.SMALL}
          position={[4.5, 0.72, -4]}
          chessType={ChessType.COMPUTER}
          floorPlane={floorPlane}
        />
        <Chess
          chessSize={ChessSize.SMALL}
          position={[4.5, 0.72, -2]}
          chessType={ChessType.COMPUTER}
          floorPlane={floorPlane}
        />
        {/* <planeHelper args={[floorPlane, 5, "red"]} /> */}
        <gridHelper args={[100, 100]} />
        <OrbitControls minZoom={10} maxZoom={50} />

        {/* camera position & type setting */}

        <OrthographicCamera makeDefault zoom={50} position={[45, 450, 300]} />
        <Environment preset="sunset" />
      </Suspense>
    </Canvas>
  );
};

export default GameCanvas;
