import { Suspense, useState } from "react";
import { Chess } from "./chess";
import { Environment, PerspectiveCamera, OrbitControls, Plane, useSelect } from "@react-three/drei";
import { useLoader, useFrame } from "@react-three/fiber";
import "./game-canvas.css";
import * as THREE from "three";
import Chessboard from "./chessboard";
import { TextureLoader } from "three";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { placePiece, selectPiece, unselectPiece } from "../store/slices/chessSlice";
import TWEEN from "@tweenjs/tween.js";

const GameEnvironment = props => {
  const dispatch = useDispatch();
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const texture = useLoader(TextureLoader, "/texture.png");

  const chessPieces = useSelector(state => state.chess.chessPieces);
  const activePiece = useSelector(state => state.chess.activePiece);
  const currentPlayer = useSelector(state => state.chess.currentPlayer);
  const cells = useSelector(state => state.chess.cells);

  const [chessRefs, setChessRefs] = useState({});

  const onChessRefObtained = (ref, piece) => {
    chessRefs[piece.id] = ref;

    if (piece && piece.isMoved) {
      // TODO: Check if the chess is moved. If chess is moved, then do nothing
      dispatch(unselectPiece());
      return;
    }

    console.log(`Chess ${piece.id} selected. its position is ${piece.position}, and is it moved: ${piece.isMoved}`);
    dispatch(selectPiece({ piece }));
  };

  const handlePiecePlaced = (newPosition, cell) => {
    if (activePiece === undefined) return;

    if (activePiece.player !== currentPlayer) {
      alert("not your turn!");
      return;
    }

    // 检查目标位置是否为空或者可以覆盖
    const [cellX, cellY] = cell;

    const targetPieceId = cells[cellX][cellY];
    const targetPiece = chessPieces.find(p => p.id === targetPieceId);

    // If cell exists, check if we can place a new chess piece there.
    if (targetPiece && cells[cellX][cellY] !== undefined) {
      // If item on board has a bigger size, then do nothing and return
      if (targetPiece.size - activePiece.size >= 0) {
        // TODO: Add logic showing error placement
        alert("Invalid move!");
        dispatch(unselectPiece());
        return;
      }
    }

    const chessRef = chessRefs[activePiece.id];

    dispatch(placePiece({ activePiece, cell }));
    dispatch(unselectPiece());
    if (chessRef && newPosition) {
      const [x, y, z] = newPosition; // 假设 newPosition 是一个包含 x, y, z 的对象

      // 启动动画
      const animation = new TWEEN.Tween(activePiece.position)
        .to({ x, y, z }, 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
          // 动画中的更新，如果需要
          chessRef.current.position.x = x;
          chessRef.current.position.z = z;
        })
        .onComplete(() => {});
      animation.start();
    }
  };

  useFrame(() => TWEEN.update());
  return (
    <Suspense fallback={null}>
      <Chessboard onPiecePlaced={handlePiecePlaced} />
      {chessPieces.map(piece => (
        <Chess
          piece={piece}
          key={piece.id}
          ref={chessRefs[piece.id]}
          chessSize={piece.size}
          position={piece.position}
          chessType={piece.player}
          floorPlane={floorPlane}
          onRefObtained={onChessRefObtained}
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
      <OrbitControls />
    </Suspense>
  );
};

export default GameEnvironment;
