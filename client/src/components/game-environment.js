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
import { findBestSpot, getWinner, findRandomSpot } from "../services/computer-play-service";
// import CheckWinner from "../services/game-win-lose-service";

const gridPosition =
  "[[-5.4,0.05,-5.4]," +
  "[-5.4,0.05,0]," +
  "[-5.4,0.05,5.4]," +
  "[0,0.05,-5.4], " +
  "[0,0.05,0], " +
  "[0,0.05,5.4]," +
  "[5.4,0.05,-5.4]," +
  "[5.4,0.05,0]," +
  "[5.4,0.05,5.4]]";

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

  const showErrorMessage = message => {
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

  const handlePiecePlaced = (newPosition, cellIndex) => {
    console.log(cellIndex);
    if (activePiece === undefined) return;

    if (activePiece.player !== ChessType.HUMAN) {
      showErrorMessage("Not your turn!");
      return;
    }

    const targetPiece = cells[cellIndex];

    if (targetPiece && cells[cellIndex] !== undefined) {
      if (targetPiece.size - activePiece.size >= 0) {
        // Add logic showing error placement
        if ((targetPiece.player = ChessType.COMPUTER)) {
          showErrorMessage("Computer has no way to place, you win!");
          displayWinningScreen();
          return;
        }

        showErrorMessage("Invalid piece size!");
      }
    }

    const chessRef = chessRefs[activePiece.id];
    const blockedCell = [activePiece, cellIndex];

    dispatch(placePiece({ activePiece, cellIndex }));
    dispatch(unselectPiece());

    if (!isInGame) {
      return;
    }

    if (chessRef && newPosition) {
      jumpAnimation(chessRef, newPosition);
    }

    setTimeout(() => {
      checkWinner();
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
    const [piece, cellIndex] = blockedCell;

    let computerChess = biggestComputerChess();
    let updatedCells = cells.flat();

    updatedCells[cellIndex] = piece;
    const computerCell = findBestSpot(updatedCells);

    const gridPositions = JSON.parse(gridPosition);
    const targetPosition = gridPositions[computerCell];

    const ref = chessRefs[computerChess.id];
    dispatch(placePiece({ activePiece: computerChess, cellIndex: computerCell }));

    jumpAnimation(ref, targetPosition);
  };

  useEffect(
    () => {
      checkWinner();
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

  const displayWinningScreen = () => {
    const username = sessionStorage.getItem("username");
    let seconds = Math.floor(duration / 1000);
    console.log(`username ${username} win in ${seconds} seconds`);

    const winnerData = {
      player: username,
      duration: seconds,
      winner: ChessType.HUMAN
    };

    winnSound.play();

    console.log(`you win`);
    clearInterval(intervalId);
    dispatch(endGame()); // 发送游戏数据到服务器

    addGamedata(winnerData)
      .then(response => {
        console.log("Game data saved:", response);
      })
      .catch(error => {
        console.error("Failed to save game data:", error);
      });
  };

  const checkWinner = () => {
    const winner = getWinner(cells);

    if (winner === null || undefined) return;
    if (winner === 0) {
      showErrorMessage("Draw!");
      clearInterval(intervalId);
      dispatch(endGame());
      return;
    } else if (winner.player === ChessType.COMPUTER) {
      // lose the game
      showErrorMessage("You lose!");
      clearInterval(intervalId);
      dispatch(endGame());
      return;
    }

    displayWinningScreen();
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
