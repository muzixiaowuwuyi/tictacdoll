import { useNavigate } from "react-router-dom";

export default function OverPage() {
  const navigator = useNavigate();
  function handlePlayAgain() {
    navigator("/game");
    window.location.reload();
  }
  return (
    <>
      <div>This is overpage</div>
      <button onClick={handlePlayAgain}>Play Again</button>
    </>
  );
}
