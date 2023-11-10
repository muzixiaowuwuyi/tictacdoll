import React from "react";
import { useCallback } from "react";
import { Box } from "@react-three/drei";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { placePiece } from "../store/slices/chessSlice";
import PropTypes from "prop-types";

const Chessboard = ({ onPiecePlaced }) => {
  const boardSize = 3; // 3x3 chessboard
  const cellSize = 4.8; // size of each tile
  const cellHeight = 0.1; // height of the tile
  const gap = 0.6; // gap between tile
  const separatorHeight = 0.1; // height of the separator, slightly higher than the tile
  const totalSize = boardSize * cellSize + (boardSize - 1) * gap + 1.5; // total size of the board including gaps

  const cells = [];

  const separators = [];
  const dispatch = useDispatch();

  const activePiece = useSelector(state => state.activePiece);

  const handlePlacePiece = useCallback(
    position => {
      // 检查逻辑: 确保activePiece存在，并且可以放置
      if (activePiece) {
        // 如果需要，可以在这里添加更多的逻辑
        // ...

        // 触发放置棋子的动作
        console.log("放着管理");
        console.log(activePiece);
        onPiecePlaced(activePiece, position);
      } else {
        // 错误处理或忽略点击事件
      }
    },
    [activePiece, onPiecePlaced]
  );
  // Create cells
  for (let x = 0; x < boardSize; x++) {
    for (let y = 0; y < boardSize; y++) {
      // Calculate position for each tile
      const position = [
        (x - (boardSize - 1) / 2) * (cellSize + gap),
        cellHeight / 2,
        (y - (boardSize - 1) / 2) * (cellSize + gap)
      ];

      cells.push(
        <Box
          key={`cell-${x}-${y}`}
          position={position}
          args={[cellSize, cellHeight, cellSize]}
          onClick={() => {
            console.log(`cell ${x}-${y} clicked`);
            // console.log(position);
            handlePlacePiece(position);
          }}
        >
          <meshBasicMaterial attach="material" color={"#f4f4f4"} />
        </Box>
      );
    }
  }

  // Create horizontal separators
  for (let i = 0; i < boardSize - 1; i++) {
    const position = [0, separatorHeight / 2, (i - (boardSize - 1) / 2) * (cellSize + gap) + cellSize / 2 + gap / 2];

    separators.push(
      <Box key={`h-sep-${i}`} position={position} args={[totalSize, separatorHeight, gap]}>
        <meshBasicMaterial attach="material" color={"#c9b29a"} />
      </Box>
    );
  }

  // Create vertical separators
  for (let i = 0; i < boardSize - 1; i++) {
    const position = [(i - (boardSize - 1) / 2) * (cellSize + gap) + cellSize / 2 + gap / 2, separatorHeight / 2, 0];

    separators.push(
      <Box key={`v-sep-${i}`} position={position} args={[gap, separatorHeight, totalSize]}>
        <meshBasicMaterial attach="material" color={"#c9b29a"} />
      </Box>
    );
  }

  return (
    <group>
      {cells}
      {separators}
    </group>
  );
};

Chessboard.propTypes = {
  onPiecePlaced: PropTypes.func.isRequired
};

export default Chessboard;
