import { MutableRefObject, useRef } from 'react';
import { useGLTF } from '@react-three/drei';

import { PieceSize, PiecePlayer } from '../../models/enums';
import { GamePiece } from '../../utils/types';
import { GLTFResult } from '../../utils/GTLFPiece';
import { Vector3 } from '@react-three/fiber';
import { Group, Plane } from 'three';

type PieceProps = {
  pieceSize: number;
  piece: GamePiece;
  position: Vector3;
  piecePlayer: number;
  onRefObtained: (ref: MutableRefObject<Group>, piece: GamePiece) => void;
  ref: MutableRefObject<Group>;
  floorPlane: Plane;
};

const Piece = (props: PieceProps) => {
  const { nodes, materials } = useGLTF('/3d-models/piece.glb') as GLTFResult;
  const {
    pieceSize,
    position,
    piecePlayer,
    piece,
    onRefObtained,
    ...otherProps
  } = props;

  const groupRef = useRef<Group>(new Group());

  const handleClick = () => {
    console.log(`Piece ${piece.id} clicked and its position is ${piece.position}, and its player is ${piece.player}`)
    onRefObtained(groupRef, piece);
  };

  return (
    <group
      {...otherProps}
      dispose={null}
      position={position}
      ref={groupRef}
      rotation={[Math.PI / 2, 0, 0]}
      onClick={handleClick}
    >
      {/* Player's pieces */}
      {pieceSize === PieceSize.LARGE && piecePlayer === PiecePlayer.PLAYER1 && (
        <>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.materials1.geometry}
            material={materials.m010}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.materials1_1.geometry}
            material={materials.m007}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.materials1_2.geometry}
            material={materials.n}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.materials1_3.geometry}
            material={materials.m011}
          />
        </>
      )}
      {pieceSize === PieceSize.MEDIUM && piecePlayer === PiecePlayer.PLAYER1 && (
        <>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.materials2.geometry}
            material={materials.m001}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.materials2_1.geometry}
            material={materials.m002}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.materials2_2.geometry}
            material={materials.n001}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.materials2_3.geometry}
            material={materials.n003}
          />
        </>
      )}
      {pieceSize === PieceSize.SMALL && piecePlayer === PiecePlayer.PLAYER1 && (
        <>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.materials3.geometry}
            material={materials.m004}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.materials3_1.geometry}
            material={materials.m005}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.materials3_2.geometry}
            material={materials.m006}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.materials3_3.geometry}
            material={materials.n002}
          />
        </>
      )}

      {/* Computer's pieces */}

      {pieceSize === PieceSize.LARGE && piecePlayer === PiecePlayer.PLAYER2 && (
        <>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.materials1.geometry}
            material={materials.m010}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.materials1_1.geometry}
            material={materials.m007}
          >
            <meshStandardMaterial color={'#517bc5'} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.materials1_2.geometry}
            material={materials.n}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.materials1_3.geometry}
            material={materials.m011}
          />
        </>
      )}
      {pieceSize === PieceSize.MEDIUM && piecePlayer === PiecePlayer.PLAYER2 && (
        <>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.materials2.geometry}
            material={materials.m001}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.materials2_1.geometry}
            material={materials.m002}
          >
            <meshStandardMaterial color={'#517bc5'} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.materials2_2.geometry}
            material={materials.n001}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.materials2_3.geometry}
            material={materials.n003}
          />
        </>
      )}
      {pieceSize === PieceSize.SMALL && piecePlayer === PiecePlayer.PLAYER2 && (
        <>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.materials3.geometry}
            material={materials.m004}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.materials3_1.geometry}
            material={materials.m005}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.materials3_2.geometry}
            material={materials.m006}
          >
            <meshStandardMaterial color={'#517bc5'} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.materials3_3.geometry}
            material={materials.n002}
          />
        </>
      )}
    </group>
  );
};

useGLTF.preload('/3d-models/piece.glb');

export { Piece };
