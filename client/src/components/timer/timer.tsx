import { useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import { useDispatch } from "react-redux";
import { setIntervalId, updateDuration } from "../../store/slices/chessSlice";

import "./timer.css";

const Timer = () => {
  const dispatch = useDispatch();
  const isInGame = useAppSelector((state) => state.chess.isInGame);
  const startTime = useAppSelector((state) => state.chess.startTime);
  const duration = useAppSelector((state) => state.chess.duration);
  const timerId = useAppSelector((state) => state.chess.intervalId);

  useEffect(() => {
    if (isInGame) {
      const id = setInterval(() => {
        const d = Date.now() - startTime!;
        dispatch(updateDuration({ duration: d }));
      }, 1000);
      dispatch(setIntervalId({ intervalId: id }));
    }
    if (!isInGame) {
      clearInterval(timerId);
    }
    // return () => clearInterval(timerId);
  }, [isInGame]);

  const formatTime = (totalSeconds : number) => {
    totalSeconds = Math.floor(totalSeconds / 1000);
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
