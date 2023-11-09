import React from "react";
import { Box } from "@react-three/drei";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { placePiece } from "../store/slices/chessSlice";

const Chessboard = () => {
  const boardSize = 3; // 3x3 chessboard
  const tileSize = 4.8; // size of each tile
  const tileHeight = 0.1; // height of the tile
  const gap = 0.6; // gap between tile
  const separatorHeight = 0.1; // height of the separator, slightly higher than the tile
  const totalSize = boardSize * tileSize + (boardSize - 1) * gap + 1.5; // total size of the board including gaps

  const tiles = [];
  const separators = [];
  const dispatch = useDispatch();

  const activePiece = useSelector(
    (state) => state.chess.players.human.activePiece
  );
  const handlePlacePiece = (x, y) => {
    // 添加检查逻辑，例如：
    // const canPlace = 检查逻辑...
    // if (activePiece && canPlace) {
    if (activePiece) {
      dispatch(placePiece({ pieceId: activePiece, position: { x, y } }));
    } else {
      // 显示错误消息或忽略点击事件
    }
  };
  // Create tiles
  for (let x = 0; x < boardSize; x++) {
    for (let y = 0; y < boardSize; y++) {
      // Calculate position for each tile
      const position = [
        (x - (boardSize - 1) / 2) * (tileSize + gap),
        tileHeight / 2,
        (y - (boardSize - 1) / 2) * (tileSize + gap),
      ];

      tiles.push(
        <Box
          key={`tile-${x}-${y}`}
          position={position}
          args={[tileSize, tileHeight, tileSize]}
          onClick={() => {
            console.log(`Tile ${x}-${y} clicked`);
            handlePlacePiece(x, y);
          }}
        >
          <meshBasicMaterial attach="material" color={"#f4f4f4"} />
        </Box>
      );
    }
  }

  // Create horizontal separators
  for (let i = 0; i < boardSize - 1; i++) {
    const position = [
      0,
      separatorHeight / 2,
      (i - (boardSize - 1) / 2) * (tileSize + gap) + tileSize / 2 + gap / 2,
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
      (i - (boardSize - 1) / 2) * (tileSize + gap) + tileSize / 2 + gap / 2,
      separatorHeight / 2,
      0,
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
