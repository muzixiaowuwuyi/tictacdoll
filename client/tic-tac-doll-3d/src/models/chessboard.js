import React from "react";
import { Box } from "@react-three/drei";

const Chessboard = () => {
  const boardSize = 3; // 3x3 chessboard
  const tileSize = 4; // size of each tile
  const tileHeight = 0.1; // height of the tile
  const gap = 0.6; // gap between tiles
  const separatorHeight = 0.2; // height of the separator, slightly higher than the tile
  const totalSize = boardSize * tileSize + (boardSize - 1) * gap; // total size of the board including gaps

  const tiles = [];
  const separators = [];

  // Create tiles
  for (let x = 0; x < boardSize; x++) {
    for (let y = 0; y < boardSize; y++) {
      // Calculate position for each tile
      const position = [
        (x - (boardSize - 1) / 2) * (tileSize + gap) - 10,
        tileHeight / 2,
        (y - (boardSize - 1) / 2) * (tileSize + gap) + 2,
      ];

      tiles.push(
        <Box
          key={`tile-${x}-${y}`}
          position={position}
          args={[tileSize, tileHeight, tileSize]}
          onClick={() => console.log(`Tile ${x}-${y} clicked`)}
        >
          <meshBasicMaterial attach="material" color={"#f7ede1"} />
        </Box>
      );
    }
  }

  // Create horizontal separators
  for (let i = 0; i < boardSize - 1; i++) {
    const position = [
      -10,
      separatorHeight / 2,
      (i - (boardSize - 1) / 2) * (tileSize + gap) + tileSize / 2 + gap / 2 + 2,
    ];

    separators.push(
      <Box
        key={`h-sep-${i}`}
        position={position}
        args={[totalSize, separatorHeight, gap]}
      >
        <meshBasicMaterial attach="material" color={"#c9b29a"} />
      </Box>
    );
  }

  // Create vertical separators
  for (let i = 0; i < boardSize - 1; i++) {
    const position = [
      (i - (boardSize - 1) / 2) * (tileSize + gap) +
        tileSize / 2 +
        gap / 2 -
        10,
      separatorHeight / 2,
      2,
    ];

    separators.push(
      <Box
        key={`v-sep-${i}`}
        position={position}
        args={[gap, separatorHeight, totalSize]}
      >
        <meshBasicMaterial attach="material" color={"#c9b29a"} />
      </Box>
    );
  }

  return (
    <group>
      {tiles}
      {separators}
    </group>
  );
};

export default Chessboard;
