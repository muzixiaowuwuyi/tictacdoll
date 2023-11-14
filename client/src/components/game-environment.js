import { Suspense, useEffect, useState } from "react";
import { Chess } from "./chess";
import {
  Environment,
  PerspectiveCamera,
  OrbitControls,
  Plane,
} from "@react-three/drei";
import { useLoader, useFrame } from "@react-three/fiber";
import "./game-canvas.css";
import * as THREE from "three";
import Chessboard from "./chessboard";
import { TextureLoader } from "three";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  placePiece,
  selectPiece,
  unselectPiece,
  endGame,
} from "../store/slices/chessSlice";
import TWEEN from "@tweenjs/tween.js";
import jumpAudio from "../musics/music-jump.mp3";
import errorAudio from "../musics/error.mp3";
import winAudio from "../musics/success.mp3";
import { addGamedata } from "../apiService";
// import CheckWinner from "../services/game-win-lose-service";

const GameEnvironment = (props) => {
  const dispatch = useDispatch();
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const texture = useLoader(TextureLoader, "/texture.png");

  const chessPieces = useSelector((state) => state.chess.chessPieces);
  const activePiece = useSelector((state) => state.chess.activePiece);
  const currentPlayer = useSelector((state) => state.chess.currentPlayer);
  const cells = useSelector((state) => state.chess.cells);
  const pieces = useSelector((state) => state.chess.chessPieces);

  const isInGame = useSelector((state) => state.chess.isInGame);
  const intervalId = useSelector((state) => state.chess.intervalId);
  // const cells = useSelector(state => state.chess.cells);
  const [chessRefs, setChessRefs] = useState({});
  const errorSound = new Audio(errorAudio);
  const winnSound = new Audio(winAudio);
  const duration = useSelector((state) => state.chess.duration);

  const onChessRefObtained = (ref, piece) => {
    chessRefs[piece.id] = ref;

    if (!isInGame) {
      dispatch(unselectPiece());
      return;
    }

    if (piece && piece.isMoved) {
      // Check if the chess is moved. If chess is moved, then do nothing
      dispatch(unselectPiece());
      return;
    }

    console.log(
      `Chess ${piece.id} selected. its position is ${piece.position}, and is it moved: ${piece.isMoved}`
    );

    dispatch(selectPiece({ piece }));
  };

  const handlePiecePlaced = (newPosition, cell) => {
    if (activePiece === undefined) return;

    if (activePiece.player !== currentPlayer) {
      //TODO: 把 alert 移除，放置到二维图层
      errorSound.play();
      setTimeout(() => {
        alert("not your turn!");
      }, 500);

      return;
    }

    // 检查目标位置是否为空或者可以覆盖
    const [cellX, cellY] = cell;

    const targetPieceId = cells[cellX][cellY];
    const targetPiece = chessPieces.find((p) => p.id === targetPieceId);

    if (targetPiece && cells[cellX][cellY] !== undefined) {
      if (targetPiece.size - activePiece.size >= 0) {
        // Add logic showing error placement
        //TODO: 把 alert 移除，放置到二维图层
        errorSound.play();
        setTimeout(() => {
          alert("Invalid move!");
        }, 500);

        dispatch(unselectPiece());
        return;
      }
    }

    const chessRef = chessRefs[activePiece.id];

    dispatch(placePiece({ activePiece, cell }));
    dispatch(unselectPiece());

    ////TODO: check if is win

    if (chessRef && newPosition) {
      const [x, y, z] = newPosition;

      const jumpSound = new Audio(jumpAudio);
      const peakPos = {
        x: (chessRef.current.position.x + x) / 2,
        y: Math.max(chessRef.current.position.y, y) + 7,
        z: (chessRef.current.position.z + z) / 2,
      };

      // star the animation
      const horizontalTween = new TWEEN.Tween(chessRef.current.position)
        .to({ x, z }, 500)
        .onUpdate(() => {})
        .onStart(() => {
          jumpSound.play();
        });

      const upTween = new TWEEN.Tween(chessRef.current.position)
        .to({ y: peakPos.y }, 250)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {});

      const downTween = new TWEEN.Tween(chessRef.current.position)
        .to({ y: y + chessRef.current.position.y }, 250)
        .easing(TWEEN.Easing.Quadratic.In)
        .onUpdate(() => {});

      upTween.chain(downTween);
      horizontalTween.start();
      upTween.start();
    }

    console.log(chessPieces);
  };

  useEffect(() => {
    CheckWinner();
  }, [cells]);

  ///TODO: adddata to server

  const checkWinCondition = (piece1, piece2, piece3) => {
    const winnerData = {
      player: sessionStorage.getItem("username"),
      winner: piece1.player,
      duration: duration,
    };
    if (piece1.player === piece2.player && piece1.player === piece3.player) {
      winnSound.play();

      console.log(`${piece1.player} you win`);
      clearInterval(intervalId);
      dispatch(endGame());
    }
  };

  const CheckWinner = () => {
    ////TODO: the rule of win

    if (cells[0][0] && cells[0][1] && cells[0][2]) {
      const piece1 = pieces.find((p) => p.id === cells[0][0]);
      const piece2 = pieces.find((p) => p.id === cells[0][1]);
      const piece3 = pieces.find((p) => p.id === cells[0][2]);

      checkWinCondition(piece1, piece2, piece3);
    }
    if (cells[1][0] && cells[1][1] && cells[1][2]) {
      const piece1 = pieces.find((p) => p.id === cells[1][0]);
      const piece2 = pieces.find((p) => p.id === cells[1][1]);
      const piece3 = pieces.find((p) => p.id === cells[1][2]);
      checkWinCondition(piece1, piece2, piece3);
    }
    if (cells[2][0] && cells[2][1] && cells[2][2]) {
      const piece1 = pieces.find((p) => p.id === cells[2][0]);
      const piece2 = pieces.find((p) => p.id === cells[2][1]);
      const piece3 = pieces.find((p) => p.id === cells[2][2]);
      checkWinCondition(piece1, piece2, piece3);
    }
    if (cells[0][0] && cells[1][0] && cells[2][0]) {
      const piece1 = pieces.find((p) => p.id === cells[0][0]);
      const piece2 = pieces.find((p) => p.id === cells[1][0]);
      const piece3 = pieces.find((p) => p.id === cells[2][0]);
      checkWinCondition(piece1, piece2, piece3);
    }
    if (cells[0][1] && cells[1][1] && cells[2][1]) {
      const piece1 = pieces.find((p) => p.id === cells[0][1]);
      const piece2 = pieces.find((p) => p.id === cells[1][1]);
      const piece3 = pieces.find((p) => p.id === cells[2][1]);
      checkWinCondition(piece1, piece2, piece3);
    }
    if (cells[0][2] && cells[1][2] && cells[2][2]) {
      const piece1 = pieces.find((p) => p.id === cells[0][2]);
      const piece2 = pieces.find((p) => p.id === cells[1][2]);
      const piece3 = pieces.find((p) => p.id === cells[2][2]);
      checkWinCondition(piece1, piece2, piece3);
    }
    if (cells[0][0] && cells[1][1] && cells[2][2]) {
      const piece1 = pieces.find((p) => p.id === cells[0][0]);
      const piece2 = pieces.find((p) => p.id === cells[1][1]);
      const piece3 = pieces.find((p) => p.id === cells[2][2]);
      checkWinCondition(piece1, piece2, piece3);
    }
    if (cells[0][2] && cells[1][1] && cells[2][0]) {
      const piece1 = pieces.find((p) => p.id === cells[0][2]);
      const piece2 = pieces.find((p) => p.id === cells[1][1]);
      const piece3 = pieces.find((p) => p.id === cells[2][0]);
      checkWinCondition(piece1, piece2, piece3);
    }

    if (
      cells[0][0] &&
      cells[0][1] &&
      cells[0][2] &&
      cells[1][0] &&
      cells[1][1] &&
      cells[1][2] &&
      cells[2][0] &&
      cells[2][1] &&
      cells[2][2]
    ) {
      console.log("it is  draw");
      clearInterval(intervalId);
      dispatch(endGame());
    }
  };

  useFrame(() => TWEEN.update());
  return (
    <Suspense fallback={null}>
      <Chessboard onPiecePlaced={handlePiecePlaced} />
      {chessPieces.map((piece) => (
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
      <PerspectiveCamera makeDefault fov={35} position={[0, 24, 24]} />
      <Environment preset="city" />
      <ambientLight intensity={1} />
      <Plane
        position={[0, 0, -10]}
        rotation={[-Math.PI / 2, 0, 0]}
        args={[100, 100]}
      >
        {/* <OrbitControls /> */}
        <meshBasicMaterial attach="material" map={texture} />
      </Plane>
      <OrbitControls
        enableZoom={false}
        minAzimuthAngle={-Math.PI / 8}
        maxAzimuthAngle={Math.PI / 8}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI - Math.PI / 1.4}
      />
    </Suspense>
  );
};

export default GameEnvironment;
