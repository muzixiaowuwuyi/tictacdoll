import { Suspense, useEffect, useState } from "react";
import { Chess } from "./chess";
import { ChessType } from "../models/enums";
import { Environment, PerspectiveCamera, OrbitControls, Plane } from "@react-three/drei";
import { useLoader, useFrame } from "@react-three/fiber";
import "./game-canvas.css";
import * as THREE from "three";
import Chessboard from "./chessboard";
import { TextureLoader } from "three";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { placePiece, selectPiece, unselectPiece, endGame } from "../store/slices/chessSlice";
import TWEEN from "@tweenjs/tween.js";
import jumpAudio from "../musics/music-jump.mp3";
import errorAudio from "../musics/error.mp3";
import winAudio from "../musics/success.mp3";
import { addGamedata } from "../apiService";
import { findBestSpot, findRandomSpot } from "../services/computer-play-service";
// import CheckWinner from "../services/game-win-lose-service";

const gridPosition =
  "[[-5.3999999999999995,0.05,-5.3999999999999995],[-5.3999999999999995,0.05,0],[-5.3999999999999995,0.05,5.3999999999999995],[0,0.05,-5.3999999999999995],[0,0.05,0],[0,0.05,5.3999999999999995],[5.3999999999999995,0.05,-5.3999999999999995],[5.3999999999999995,0.05,0],[5.3999999999999995,0.05,5.3999999999999995]]";

const GameEnvironment = props => {
  const dispatch = useDispatch();
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const texture = useLoader(TextureLoader, "/texture.png");

  const chessPieces = useSelector(state => state.chess.chessPieces);
  const activePiece = useSelector(state => state.chess.activePiece);
  const currentPlayer = useSelector(state => state.chess.currentPlayer);
  const cells = useSelector(state => state.chess.cells);
  const pieces = useSelector(state => state.chess.chessPieces);

  const isInGame = useSelector(state => state.chess.isInGame);
  const intervalId = useSelector(state => state.chess.intervalId);
  const [chessRefs, setChessRefs] = useState({});
  const errorSound = new Audio(errorAudio);
  const winnSound = new Audio(winAudio);
  const duration = useSelector(state => state.chess.duration);

  const finishAnimation = () => {};

  const placeError = message => {
    errorSound.play();
    setTimeout(() => {
      alert(message);
    }, 500);
    dispatch(unselectPiece());
  };

  const onChessClicked = (ref, piece) => {
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

    console.log(`Chess ${piece.id} selected. its position is ${piece.position}, and is it moved: ${piece.isMoved}`);
    dispatch(selectPiece({ piece }));
  };

  const onChessRefCreated = (ref, piece) => {
    chessRefs[piece.id] = ref;
  };

  const handlePiecePlaced = (newPosition, cell) => {
    if (activePiece === undefined) return;

    if (activePiece.player !== ChessType.HUMAN) {
      placeError("Not your turn!");
      return;
    }

    // 检查目标位置是否为空或者可以覆盖
    const [cellX, cellY] = cell;
    const targetPiece = cells[cellX][cellY];

    if (targetPiece && cells[cellX][cellY] !== undefined) {
      if (targetPiece.size - activePiece.size >= 0) {
        // Add logic showing error placement
        placeError("Invalid piece size!");
      }
    }

    const chessRef = chessRefs[activePiece.id];
    const blockedCell = [activePiece, cell];

    dispatch(placePiece({ activePiece, cell }));
    dispatch(unselectPiece());

    if (!isInGame) {
      return;
    }

    if (chessRef && newPosition) {
      jumpAnimation(chessRef, newPosition);
    }

    setTimeout(() => {
      CheckWinner();
      computerRound(blockedCell);
    }, 1000);

    console.log(chessPieces);
  };

  const jumpAnimation = (chessRef, newPosition) => {
    const [x, y, z] = newPosition;

    const jumpSound = new Audio(jumpAudio);
    const peakPos = {
      x: (chessRef.current.position.x + x) / 2,
      y: Math.max(chessRef.current.position.y, y) + 7,
      z: (chessRef.current.position.z + z) / 2
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
  };

  const computerRound = blockedCell => {
    const useMinMax = 0; // Math.round(Math.random * 100);
    let computerChess = biggestComputerChess();
    let computerCell = [null, null];
    let updatedCells = [];

    const [id, c] = blockedCell;
    const [x, y] = c;

    for (let cx = 0; cx < cells.length; cx++) {
      const columns = [];
      for (let cy = 0; cy < cells.length; cy++) {
        if (x === cx && y === cy) columns.push(id);
        else columns.push(cells[cx][cy]);
      }
      updatedCells.push(columns);
    }
    computerCell = findBestSpot(updatedCells);

    const gridPositions = JSON.parse(gridPosition);
    const targetCell = computerCell[0] * 3 + computerCell[1];
    const targetPosition = gridPositions[targetCell];

    const ref = chessRefs[computerChess.id];
    dispatch(placePiece({ activePiece: computerChess, cell: computerCell }));

    jumpAnimation(ref, targetPosition);
  };

  useEffect(
    () => {
      CheckWinner();
    },
    [cells]
  );

  const getRemainingComputerChess = () => {
    return chessPieces.flat().filter(p => !p.isMoved && p.player === ChessType.COMPUTER);
  };

  const smallestComputerChess = size => {
    const availableChess = getRemainingComputerChess().filter(p => p.size > size);
    const c = availableChess.sort((a, b) => a.size - b.size)[0];
    return c;
  };

  const biggestComputerChess = () => {
    const availableChess = getRemainingComputerChess();
    const c = availableChess.sort((a, b) => b.size - b.size)[0];
    return c;
  };

  ///TODO: adddata to server

  const checkWinCondition = (piece1, piece2, piece3) => {
    const username = sessionStorage.getItem("username");
    let seconds = Math.floor(duration / 1000);
    console.log(`username ${username} win in ${seconds} seconds`);

    const winnerData = {
      player: username,
      winner: piece1.player,
      duration: seconds
    };
    if (piece1.player === piece2.player && piece1.player === piece3.player) {
      winnSound.play();

      console.log(`${piece1.player} you win`);
      clearInterval(intervalId);
      dispatch(endGame()); // 发送游戏数据到服务器

      addGamedata(winnerData)
        .then(response => {
          console.log("Game data saved:", response);
        })
        .catch(error => {
          console.error("Failed to save game data:", error);
        });
      return true;
    }
    return false;
  };

  const CheckWinner = () => {
    if (cells[0][0] && cells[0][1] && cells[0][2]) {
      const piece1 = pieces.find(p => p.id === cells[0][0]);
      const piece2 = pieces.find(p => p.id === cells[0][1]);
      const piece3 = pieces.find(p => p.id === cells[0][2]);

      return checkWinCondition(piece1, piece2, piece3);
    }
    if (cells[1][0] && cells[1][1] && cells[1][2]) {
      const piece1 = pieces.find(p => p.id === cells[1][0]);
      const piece2 = pieces.find(p => p.id === cells[1][1]);
      const piece3 = pieces.find(p => p.id === cells[1][2]);
      return checkWinCondition(piece1, piece2, piece3);
    }
    if (cells[2][0] && cells[2][1] && cells[2][2]) {
      const piece1 = pieces.find(p => p.id === cells[2][0]);
      const piece2 = pieces.find(p => p.id === cells[2][1]);
      const piece3 = pieces.find(p => p.id === cells[2][2]);
      return checkWinCondition(piece1, piece2, piece3);
    }
    if (cells[0][0] && cells[1][0] && cells[2][0]) {
      const piece1 = pieces.find(p => p.id === cells[0][0]);
      const piece2 = pieces.find(p => p.id === cells[1][0]);
      const piece3 = pieces.find(p => p.id === cells[2][0]);
      return checkWinCondition(piece1, piece2, piece3);
    }
    if (cells[0][1] && cells[1][1] && cells[2][1]) {
      const piece1 = pieces.find(p => p.id === cells[0][1]);
      const piece2 = pieces.find(p => p.id === cells[1][1]);
      const piece3 = pieces.find(p => p.id === cells[2][1]);
      return checkWinCondition(piece1, piece2, piece3);
    }
    if (cells[0][2] && cells[1][2] && cells[2][2]) {
      const piece1 = pieces.find(p => p.id === cells[0][2]);
      const piece2 = pieces.find(p => p.id === cells[1][2]);
      const piece3 = pieces.find(p => p.id === cells[2][2]);
      return checkWinCondition(piece1, piece2, piece3);
    }
    if (cells[0][0] && cells[1][1] && cells[2][2]) {
      const piece1 = pieces.find(p => p.id === cells[0][0]);
      const piece2 = pieces.find(p => p.id === cells[1][1]);
      const piece3 = pieces.find(p => p.id === cells[2][2]);
      return checkWinCondition(piece1, piece2, piece3);
    }
    if (cells[0][2] && cells[1][1] && cells[2][0]) {
      const piece1 = pieces.find(p => p.id === cells[0][2]);
      const piece2 = pieces.find(p => p.id === cells[1][1]);
      const piece3 = pieces.find(p => p.id === cells[2][0]);
      return checkWinCondition(piece1, piece2, piece3);
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
      return true;
    }
    return false;
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
          onClicked={onChessClicked}
          onRefCreated={onChessRefCreated}
        />
      ))}
      <PerspectiveCamera makeDefault fov={35} position={[0, 24, 24]} />
      <Environment preset="city" />
      <ambientLight intensity={1} />
      <Plane position={[0, 0, -10]} rotation={[-Math.PI / 2, 0, 0]} args={[100, 100]}>
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
