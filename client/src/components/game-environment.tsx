import { MutableRefObject, Suspense, useEffect } from 'react';
import { Chess } from './chess';
import {
  Environment,
  PerspectiveCamera,
  OrbitControls,
  Plane,
} from '@react-three/drei';
import { useLoader, useFrame, Vector3 } from '@react-three/fiber';
import './game-canvas.css';
import * as THREE from 'three';
import Chessboard from './chessboard';
import { TextureLoader } from 'three';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
  placePiece,
  selectPiece,
  unselectPiece,
  endGame,
} from '../store/slices/chessSlice';
//@ts-ignore
import TWEEN from '@tweenjs/tween.js'; //doesn't resolve type definitions but it works
import jumpAudio from '../musics/music-jump.mp3';
import errorAudio from '../musics/error.mp3';
import winAudio from '../musics/success.mp3';
import { addGamedata } from '../apiService';
import { Group } from 'three';
import { ChessPiece } from '../utils/types';

// import CheckWinner from "../services/game-win-lose-service";

const GameEnvironment = () => {
  const dispatch = useAppDispatch();
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const texture = useLoader(TextureLoader, '/texture.png');

  const chessPieces = useAppSelector((state) => state.chess.chessPieces);
  const activePiece = useAppSelector((state) => state.chess.activePiece);
  const currentPlayer = useAppSelector((state) => state.chess.currentPlayer);
  const cells = useAppSelector((state) => state.chess.cells);
  const pieces = useAppSelector((state) => state.chess.chessPieces);

  const isInGame = useAppSelector((state) => state.chess.isInGame);
  const intervalId = useAppSelector((state) => state.chess.intervalId);
  // const cells = useAppSelector(state => state.chess.cells);

  // const [chessRefs, setChessRefs] = useState<
  //   Record<number, MutableRefObject<Group>>
  // >({});

  const chessRefs : Record<number, MutableRefObject<Group>> = {}

  const errorSound = new Audio(errorAudio);
  const winnSound = new Audio(winAudio);
  const duration = useAppSelector((state) => state.chess.duration);

  const onChessRefObtained = (
    ref: MutableRefObject<Group>,
    piece: ChessPiece
  ) => {
    chessRefs[piece.id] = ref;

    if (!isInGame) {
      dispatch(unselectPiece());
      return;
    }

    if (piece && piece.hasMoved) {
      // Check if the chess is moved. If chess is moved, then do nothing
      dispatch(unselectPiece());
      return;
    }

    console.log(
      `Chess ${piece.id} selected. its position is ${piece.position}, and is it moved: ${piece.hasMoved}`
    );

    dispatch(selectPiece({ piece }));
    return;
  };

  const handlePiecePlaced = (newPosition: Vector3, cell: number[]) => {
    if (activePiece === undefined) return;

    if (activePiece.player !== currentPlayer) {
      //TODO: 把 alert 移除，放置到二维图层
      errorSound.play();
      setTimeout(() => {
        alert('not your turn!');
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
          alert('Invalid move!');
        }, 500);

        dispatch(unselectPiece());
        return;
      }
    }

    const chessRef = chessRefs[activePiece.id];

    // console.log(activePiece, cell)
    dispatch(placePiece({ activePiece, cell }));
    dispatch(unselectPiece());

    ////TODO: check if is win

    if (chessRef && newPosition) {
      //should be able to deconstruct with vector3 but it won't accept so have to cast
      const {x, y, z} = newPosition as {x: number, y:number, z:number} 

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

    // console.log(chessPieces);
    return;
  };

  useEffect(() => {
    CheckWinner();
  }, [cells]);

  ///TODO: adddata to server

  const checkWinCondition = (piece1 : ChessPiece, piece2 : ChessPiece, piece3 : ChessPiece) => {
    const username = sessionStorage.getItem('username');
    let seconds = Math.floor(duration / 1000);
    console.log(`username ${username} win in ${seconds} seconds`);

    const winnerData = {
      player: username,
      winner: piece1.player,
      duration: seconds,
    };
    if (piece1.player === piece2.player && piece1.player === piece3.player) {
      winnSound.play();

      console.log(`${piece1.player} you win`);
      clearInterval(intervalId);
      dispatch(endGame()); // 发送游戏数据到服务器

      addGamedata(winnerData)
        .then((response) => {
          console.log('Game data saved:', response);
        })
        .catch((error) => {
          console.error('Failed to save game data:', error);
        });
    }
    ////TODO: add apiservise
  };

  const CheckWinner = () => {
    if (cells[0][0] && cells[0][1] && cells[0][2]) {
      const piece1 = pieces.find((p) => p.id === cells[0][0]);
      const piece2 = pieces.find((p) => p.id === cells[0][1]);
      const piece3 = pieces.find((p) => p.id === cells[0][2]);

      checkWinCondition(piece1!, piece2!, piece3!);
    }
    if (cells[1][0] && cells[1][1] && cells[1][2]) {
      const piece1 = pieces.find((p) => p.id === cells[1][0]);
      const piece2 = pieces.find((p) => p.id === cells[1][1]);
      const piece3 = pieces.find((p) => p.id === cells[1][2]);
      checkWinCondition(piece1!, piece2!, piece3!);
    }
    if (cells[2][0] && cells[2][1] && cells[2][2]) {
      const piece1 = pieces.find((p) => p.id === cells[2][0]);
      const piece2 = pieces.find((p) => p.id === cells[2][1]);
      const piece3 = pieces.find((p) => p.id === cells[2][2]);
      checkWinCondition(piece1!, piece2!, piece3!);
    }
    if (cells[0][0] && cells[1][0] && cells[2][0]) {
      const piece1 = pieces.find((p) => p.id === cells[0][0]);
      const piece2 = pieces.find((p) => p.id === cells[1][0]);
      const piece3 = pieces.find((p) => p.id === cells[2][0]);
      checkWinCondition(piece1!, piece2!, piece3!);
    }
    if (cells[0][1] && cells[1][1] && cells[2][1]) {
      const piece1 = pieces.find((p) => p.id === cells[0][1]);
      const piece2 = pieces.find((p) => p.id === cells[1][1]);
      const piece3 = pieces.find((p) => p.id === cells[2][1]);
      checkWinCondition(piece1!, piece2!, piece3!);
    }
    if (cells[0][2] && cells[1][2] && cells[2][2]) {
      const piece1 = pieces.find((p) => p.id === cells[0][2]);
      const piece2 = pieces.find((p) => p.id === cells[1][2]);
      const piece3 = pieces.find((p) => p.id === cells[2][2]);
      checkWinCondition(piece1!, piece2!, piece3!);
    }
    if (cells[0][0] && cells[1][1] && cells[2][2]) {
      const piece1 = pieces.find((p) => p.id === cells[0][0]);
      const piece2 = pieces.find((p) => p.id === cells[1][1]);
      const piece3 = pieces.find((p) => p.id === cells[2][2]);
      checkWinCondition(piece1!, piece2!, piece3!);
    }
    if (cells[0][2] && cells[1][1] && cells[2][0]) {
      const piece1 = pieces.find((p) => p.id === cells[0][2]);
      const piece2 = pieces.find((p) => p.id === cells[1][1]);
      const piece3 = pieces.find((p) => p.id === cells[2][0]);
      checkWinCondition(piece1!, piece2!, piece3!);
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
      console.log('it is  draw');
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
      <Environment preset='city' />
      <ambientLight intensity={1} />
      <Plane
        position={[0, 0, -10]}
        rotation={[-Math.PI / 2, 0, 0]}
        args={[100, 100]}
      >
        {/* <OrbitControls /> */}
        <meshBasicMaterial attach='material' map={texture} />
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
