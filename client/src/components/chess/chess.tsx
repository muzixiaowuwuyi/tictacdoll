import { MutableRefObject, useRef } from 'react';
import { useGLTF } from '@react-three/drei';

import { ChessSize, ChessType } from '../../models/enums';
import { ChessPiece } from '../../utils/types';
import { GLTFResult } from '../../utils/GTLFChess';
import { Vector3 } from '@react-three/fiber';
import { Group, Plane } from 'three';

type ChessProps = {
  chessSize: number;
  piece: ChessPiece;
  position: Vector3;
  chessType: number;
  onRefObtained: (ref: MutableRefObject<Group>, piece: ChessPiece) => void;
  ref: MutableRefObject<Group>;
  floorPlane: Plane;
};

const Chess: React.FC<ChessProps> = (props: ChessProps) => {
  const { nodes, materials } = useGLTF('/assets/chess.glb') as GLTFResult;
  const {
    chessSize,
    position,
    chessType,
    piece,
    onRefObtained,
    ...otherProps
  } = props;

  const groupRef = useRef<Group>(new Group());

  const handleClick = () => {
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
      {/* Player's chesses */}
      {chessSize === ChessSize.LARGE && chessType === ChessType.HUMAN && (
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
      {chessSize === ChessSize.MEDIUM && chessType === ChessType.HUMAN && (
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
      {chessSize === ChessSize.SMALL && chessType === ChessType.HUMAN && (
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

      {/* Computer's chesses */}

      {chessSize === ChessSize.LARGE && chessType === ChessType.COMPUTER && (
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
      {chessSize === ChessSize.MEDIUM && chessType === ChessType.COMPUTER && (
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
      {chessSize === ChessSize.SMALL && chessType === ChessType.COMPUTER && (
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

useGLTF.preload('/assets/chess.glb');

export { Chess };
