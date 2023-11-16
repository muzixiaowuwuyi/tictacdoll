import { Vector3 } from "@react-three/fiber";
import {GLTF } from 'three-stdlib';
import {Mesh, MeshStandardMaterial} from 'three';

export type GameState = {
  gameEnded: boolean;
  isInGame: boolean;
  duration: number;
  intervalId?: number;
  startTime: null | number;

  cells: (null | number)[][];

  chessPieces: ChessPiece[]

  currentPlayer: number;
  activePiece:  undefined | ChessPiece;
  winner: null
};

export type ChessPiece = {
  id: number;
  position: Vector3;
  hasMoved: boolean;
  size: number;
  player: number;
};

export type GLTFResult = GLTF & {
  nodes: {
    materials1: Mesh;
    materials1_1: Mesh;
    materials1_2: Mesh;
    materials1_3: Mesh;
    materials2: Mesh;
    materials2_1: Mesh;
    materials2_2: Mesh;
    materials2_3: Mesh;
    materials3: Mesh;
    materials3_1: Mesh;
    materials3_2: Mesh;
    materials3_3: Mesh;
  },
  materials :{
    m001: MeshStandardMaterial;
    m002: MeshStandardMaterial;
    m003: MeshStandardMaterial;
    m004: MeshStandardMaterial;
    m005: MeshStandardMaterial;
    m006: MeshStandardMaterial;
    m007: MeshStandardMaterial;
    m010: MeshStandardMaterial;
    m011: MeshStandardMaterial;
    n: MeshStandardMaterial;
    n001: MeshStandardMaterial;
    n002: MeshStandardMaterial;
    n003: MeshStandardMaterial;
  }
}
