import { Suspense, useRef } from "react";
import { Chess, ChessSize, ChessType } from "../models/chess";
import {
  Environment,
  PerspectiveCamera,
  OrbitControls,
  Plane,
} from "@react-three/drei";
import { useLoader, useFrame } from "@react-three/fiber";
import "./game-canvas.css";
import * as THREE from "three";
import Chessboard from "../models/chessboard";
import { TextureLoader } from "three";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectPiece, placePiece } from "../store/slices/chessSlice";
import TWEEN from "@tweenjs/tween.js";

const GameEnvironment = (props) => {
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
  const activePiece = useSelector(
    (state) => state.chess.players.human.activePiece
  );
  const chessRefs = useRef({});
  const handleSelectPiece = (pieceId, piecePosition) => {
    console.log(`Chess ${pieceId} selected. its position is ${piecePosition}`);
    dispatch(selectPiece({ id: pieceId }));
  };

  const handlePiecePlaced = (pieceId, newPosition) => {
    const chessRef = chessRefs.current[pieceId];

    if (chessRef && newPosition) {
      const { x, y, z } = newPosition; // 假设 newPosition 是一个包含 x, y, z 的对象

      // 启动动画
      new TWEEN.Tween(chessRef.position)
        .to({ x, y, z }, 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
          // 动画中的更新，如果需要
        })
        .onComplete(() => {
          // 动画完成后的状态更新
          dispatch(placePiece({ pieceId, position: [x, y] })); // 假设棋盘是二维的，z 总是固定的
        })
        .start();
    }
  };

  useFrame(() => TWEEN.update());
  return (
    <Suspense fallback={null}>
      <Chessboard onPiecePlaced={handlePiecePlaced} />

      {/* player's chesses */}
      {playerLargePieces.map((piece) => (
        <Chess
          key={piece.id}
          ref={(ref) => (chessRefs.current[piece.id] = ref)}
          chessSize={ChessSize.LARGE}
          position={piece.position}
          chessType={ChessType.PLAYER}
          floorPlane={floorPlane}
          onClick={() => handleSelectPiece(piece.id, piece.position)}
        />
      ))}

      {playerMediumPieces.map((piece) => (
        <Chess
          key={piece.id}
          ref={(ref) => (chessRefs.current[piece.id] = ref)}
          chessSize={ChessSize.MEDIUM}
          position={piece.position}
          chessType={ChessType.PLAYER}
          floorPlane={floorPlane}
          onClick={() => handleSelectPiece(piece.id, piece.position)}
        />
      ))}

      {playerSmallPieces.map((piece) => (
        <Chess
          key={piece.id}
          ref={(ref) => (chessRefs.current[piece.id] = ref)}
          chessSize={ChessSize.SMALL}
          position={piece.position}
          chessType={ChessType.PLAYER}
          floorPlane={floorPlane}
          onClick={() => handleSelectPiece(piece.id, piece.position)}
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
  );
};

export default GameEnvironment;
