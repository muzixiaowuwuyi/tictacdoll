import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateDuration, resetTimer } from "../store/slices/chessSlice";

import "./timer.css";

const Timer = () => {
  const gameState = useSelector((state) => state.chess.gameStarted);
  const duration = useSelector((state) => state.chess.timeDuration);
  const dispatch = useDispatch();

  ///////Later put in redux///////////////

  useEffect(() => {
    let intervalId;
    if (gameState) {
      const startTime = Date.now();
      console.log(`startTime is at ${startTime}`);
      intervalId = setInterval(() => {
        // 更新计时器的时间
        dispatch(updateDuration(Date.now() - startTime));
        console.log(`allready passed ${Date.now() - startTime} seconds`);
      }, 1000);
    } else if (!gameState && intervalId) {
      clearInterval(intervalId);
      dispatch(resetTimer()); // 游戏结束时重置计时器
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [gameState]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="timer">
      <div>{formatTime(duration)}</div>
    </div>
  );
};

export default Timer;
