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
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectPiece, placePiece, movePiece } from "../store/slices/chessSlice";

const GameCanvas = (props) => {
  const dispatch = useDispatch();
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const texture = useLoader(TextureLoader, "/texture.png");
  const playerLargePieces = useSelector(
    (state) => state.chess.players.human.pieces.large
  );
  const playerMediumPieces = useSelector(
    (state) => state.chess.players.human.pieces.medium
  );
  const playerSmallPieces = useSelector(
    (state) => state.chess.players.human.pieces.small
  );
  const computerLargePieces = useSelector(
    (state) => state.chess.players.computer.pieces.large
  );
  const computerMediumPieces = useSelector(
    (state) => state.chess.players.computer.pieces.medium
  );
  const computerSmallPieces = useSelector(
    (state) => state.chess.players.computer.pieces.small
  );

  const handleSelectPiece = (pieceId) => {
    dispatch(selectPiece({ id: pieceId }));
  };

  return (
    <Canvas className="GameCanvas">
      <Suspense fallback={null}>
        <Chessboard />

        {/* player's chesses */}
        {playerLargePieces.map((piece) => (
          <Chess
            key={piece.id}
            chessSize={ChessSize.LARGE}
            position={piece.position}
            chessType={ChessType.PLAYER}
            floorPlane={floorPlane}
            onClick={() => handleSelectPiece(piece.id)}
          />
        ))}

        {playerMediumPieces.map((piece) => (
          <Chess
            key={piece.id}
            chessSize={ChessSize.MEDIUM}
            position={piece.position}
            chessType={ChessType.PLAYER}
            floorPlane={floorPlane}
            onClick={() => handleSelectPiece(piece.id)}
          />
        ))}

        {playerSmallPieces.map((piece) => (
          <Chess
            key={piece.id}
            chessSize={ChessSize.SMALL}
            position={piece.position}
            chessType={ChessType.PLAYER}
            floorPlane={floorPlane}
            onClick={() => handleSelectPiece(piece.id)}
          />
        ))}

        {/* computer's chesses */}

        {computerLargePieces.map((piece) => (
          <Chess
            key={piece.id}
            chessSize={ChessSize.LARGE}
            position={piece.position}
            chessType={ChessType.COMPUTER}
            floorPlane={floorPlane}
            onClick={() => handleSelectPiece(piece.id)}
          />
        ))}

        {computerMediumPieces.map((piece) => (
          <Chess
            key={piece.id}
            chessSize={ChessSize.MEDIUM}
            position={piece.position}
            chessType={ChessType.COMPUTER}
            floorPlane={floorPlane}
            onClick={() => handleSelectPiece(piece.id)}
          />
        ))}

        {computerSmallPieces.map((piece) => (
          <Chess
            key={piece.id}
            chessSize={ChessSize.SMALL}
            position={piece.position}
            chessType={ChessType.COMPUTER}
            floorPlane={floorPlane}
            onClick={() => handleSelectPiece(piece.id)}
          />
        ))}

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
