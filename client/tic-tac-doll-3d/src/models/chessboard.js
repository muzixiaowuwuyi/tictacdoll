import React from "react";
import { useCallback } from "react";
import { Box } from "@react-three/drei";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { placePiece } from "../store/slices/chessSlice";
import PropTypes from "prop-types";

const Chessboard = ({ onPiecePlaced }) => {
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

  const calculateTargetPosition = (x, y) => {
    // 根据 x 和 y 计算目标位置
    // 注意这应该是基于 Three.js 世界坐标的计算
  };
  const handlePlacePiece = useCallback(
    (x, y) => {
      // 检查逻辑: 确保activePiece存在，并且可以放置
      if (activePiece) {
        // 计算目标位置（世界坐标）
        const targetPosition = calculateTargetPosition(x, y);

        // 如果需要，可以在这里添加更多的逻辑
        // ...

        // 触发放置棋子的动作
        onPiecePlaced(activePiece, targetPosition);
      } else {
        // 错误处理或忽略点击事件
      }
    },
    [activePiece, onPiecePlaced]
  );
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
            console.log(position);
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

Chessboard.propTypes = {
  onPiecePlaced: PropTypes.func.isRequired,
};

export default Chessboard;
