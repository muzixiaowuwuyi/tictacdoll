import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { resetGame } from "../store/slices/chessSlice";

export default function OverPage() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const gameState = useSelector((state) => state.chess.isInGame);

  function handlePlayAgain() {
    navigate("/");
    window.location.reload();
    // dispatch(resetGame());
  }
  return (
    <>
      <div>This is overpage</div>
      <button onClick={handlePlayAgain}>Play Again</button>
    </>
  );
}
