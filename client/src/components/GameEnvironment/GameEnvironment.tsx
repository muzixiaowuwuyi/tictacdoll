import { MutableRefObject, Suspense, useEffect, useState } from 'react';
import { Piece } from '../Piece/Piece';
import {
  Environment,
  PerspectiveCamera,
  OrbitControls,
  Plane,
} from '@react-three/drei';
import { useLoader, useFrame, Vector3 } from '@react-three/fiber';
import * as THREE from 'three';
import Board from '../Board/Board';
import { TextureLoader } from 'three';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {
  placePiece,
  selectPiece,
  unselectPiece,
  // endGame,
} from '../../store/slices/gameSlice';

//@ts-ignore
import TWEEN from '@tweenjs/tween.js'; //doesn't resolve type definitions but they're there and it works

import errorAudio from '../../assets/sound/error.mp3';
import { Group } from 'three';
import { GamePiece } from '../../utils/types';
import { placePieceAnimation } from '../../animations/placePieceAnimation';
import CheckWinner from '../../services/checkWinService';

const GameEnvironment = () => {
  const dispatch = useAppDispatch();
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const texture = useLoader(TextureLoader, '/texture.png');

  const chessPieces = useAppSelector((state) => state.game.pieces);
  const activePiece = useAppSelector((state) => state.game.activePiece);
  const currentPlayer = useAppSelector((state) => state.game.currentPlayer);
  const cells = useAppSelector((state) => state.game.cells);

  const isInGame = useAppSelector((state) => state.game.isInGame);

  const [chessRefs, setChessRefs] = useState<
    Record<number, MutableRefObject<Group>>
  >({});

  const errorSound = new Audio(errorAudio);

  const onChessRefObtained = (
    ref: MutableRefObject<Group>,
    piece: GamePiece
  ) => {
    setChessRefs((prev) => ({...prev, [piece.id]: ref}))

    if (!isInGame) {
      dispatch(unselectPiece());
      return;
    }

    if (piece && piece.hasMoved) {
      dispatch(unselectPiece());
      return;
    }

    dispatch(selectPiece({ piece }));
    return;
  };

  const handlePiecePlaced = (newPosition: Vector3, cell: number[]) => {
    if (activePiece === undefined) return;

    if (activePiece.player !== currentPlayer) {
      //TODO: 把 alert 移除，放置到二维图层 / Remove the alert and add a UI pop up
      errorSound.play();
      setTimeout(() => {
        alert('not your turn!');
      }, 500);

      return;
    }

    const [cellX, cellY] = cell;
    const targetPieceId = cells[cellX][cellY];

    let targetPiece: GamePiece | undefined;
    if (targetPieceId != null) targetPiece = chessPieces[targetPieceId - 1];

    console.log(targetPiece, targetPieceId);

    if (targetPiece && targetPiece.size >= activePiece.size) {
      //TODO: 把 alert 移除，放置到二维图层 / Remove the alert and add a UI pop up
      errorSound.play();
      setTimeout(() => {
        alert('Invalid move!');
      }, 500);

      dispatch(unselectPiece());
      return;
    }

    console.log(activePiece, cell);
    dispatch(placePiece({ activePiece, cell }));
    dispatch(unselectPiece());

    ////TODO: check if is win
    ///checking the places surronding this piece after a piece is placed 
    ///will be more efficient than checking the current way.

    const chessRef = chessRefs[activePiece.id];

    placePieceAnimation(newPosition, chessRef);

    return;
  };

  useEffect(() => {
    CheckWinner();
  }, [cells]);

  useFrame(() => TWEEN.update());
  return (
    <Suspense fallback={null}>
      <Board onPiecePlaced={handlePiecePlaced} />
      {chessPieces.map((piece) => (
        <Piece
          piece={piece}
          key={piece.id}
          ref={chessRefs[piece.id]}
          pieceSize={piece.size}
          position={piece.position}
          piecePlayer={piece.player}
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
