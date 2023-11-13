import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

import { ChessSize, ChessType } from "../models/enums";

const Chess = props => {
  const { nodes, materials } = useGLTF("/assets/chess.glb");
  const { chessSize, position, chessType, piece, onRefObtained, ...otherProps } = props;

  const groupRef = useRef({});

  const handleClick = evt => {
    onRefObtained(groupRef, piece);
  };

  return (
    <group {...otherProps} dispose={null}>
      {/* Player's chesses */}
      {chessSize === ChessSize.LARGE && chessType === ChessType.HUMAN && (
        <group position={position} ref={groupRef} rotation={[Math.PI / 2, 0, 0]} onClick={handleClick}>
          <mesh castShadow receiveShadow geometry={nodes.materials1.geometry} material={materials.m010} />
          <mesh castShadow receiveShadow geometry={nodes.materials1_1.geometry} material={materials.m007} />
          <mesh castShadow receiveShadow geometry={nodes.materials1_2.geometry} material={materials.n} />
          <mesh castShadow receiveShadow geometry={nodes.materials1_3.geometry} material={materials.m011} />
        </group>
      )}
      {chessSize === ChessSize.MEDIUM && chessType === ChessType.HUMAN && (
        <group position={position} ref={groupRef} rotation={[Math.PI / 2, 0, 0]} onClick={handleClick}>
          <mesh castShadow receiveShadow geometry={nodes.materials2.geometry} material={materials.m001} />
          <mesh castShadow receiveShadow geometry={nodes.materials2_1.geometry} material={materials.m002} />
          <mesh castShadow receiveShadow geometry={nodes.materials2_2.geometry} material={materials.n001} />
          <mesh castShadow receiveShadow geometry={nodes.materials2_3.geometry} material={materials.n003} />
        </group>
      )}
      {chessSize === ChessSize.SMALL && chessType === ChessType.HUMAN && (
        <group position={position} ref={groupRef} rotation={[Math.PI / 2, 0, 0]} onClick={handleClick}>
          <mesh castShadow receiveShadow geometry={nodes.materials3.geometry} material={materials.m004} />
          <mesh castShadow receiveShadow geometry={nodes.materials3_1.geometry} material={materials.m005} />
          <mesh castShadow receiveShadow geometry={nodes.materials3_2.geometry} material={materials.m006} />
          <mesh castShadow receiveShadow geometry={nodes.materials3_3.geometry} material={materials.n002} />
        </group>
      )}

      {/* Computer's chesses */}

      {chessSize === ChessSize.LARGE && chessType === ChessType.COMPUTER && (
        <group position={position} ref={groupRef} rotation={[Math.PI / 2, 0, 0]} onClick={handleClick}>
          <mesh castShadow receiveShadow geometry={nodes.materials1.geometry} material={materials.m010} />
          <mesh castShadow receiveShadow geometry={nodes.materials1_1.geometry} material={materials.m007}>
            <meshStandardMaterial color={"#517bc5"} />
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.materials1_2.geometry} material={materials.n} />
          <mesh castShadow receiveShadow geometry={nodes.materials1_3.geometry} material={materials.m011} />
        </group>
      )}
      {chessSize === ChessSize.MEDIUM && chessType === ChessType.COMPUTER && (
        <group position={position} ref={groupRef} rotation={[Math.PI / 2, 0, 0]} onClick={handleClick}>
          <mesh castShadow receiveShadow geometry={nodes.materials2.geometry} material={materials.m001} />
          <mesh castShadow receiveShadow geometry={nodes.materials2_1.geometry} material={materials.m002}>
            <meshStandardMaterial color={"#517bc5"} />
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.materials2_2.geometry} material={materials.n001} />
          <mesh castShadow receiveShadow geometry={nodes.materials2_3.geometry} material={materials.n003} />
        </group>
      )}
      {chessSize === ChessSize.SMALL && chessType === ChessType.COMPUTER && (
        <group position={position} ref={groupRef} rotation={[Math.PI / 2, 0, 0]} onClick={handleClick}>
          <mesh castShadow receiveShadow geometry={nodes.materials3.geometry} material={materials.m004} />
          <mesh castShadow receiveShadow geometry={nodes.materials3_1.geometry} material={materials.m005} />
          <mesh castShadow receiveShadow geometry={nodes.materials3_2.geometry} material={materials.m006}>
            <meshStandardMaterial color={"#517bc5"} />
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.materials3_3.geometry} material={materials.n002} />
        </group>
      )}
    </group>
  );
};

useGLTF.preload("/assets/chess.glb");

export { Chess };
