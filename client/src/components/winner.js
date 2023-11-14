import { useSelector } from "react-redux";
import "./winner.css";

export default function Winner() {
  let duration = useSelector((state) => state.chess.duration);
  const username = sessionStorage.getItem("username");

  duration = Math.floor(duration / 1000);
  console.log(username);
  console.log(duration);
  return (
    <div className="winner-info">
      <strong>Congratulations! 🎉</strong>
      <span className="username-highlight">
        <strong>{username}</strong>
      </span>
      you've triumphed with a stellar time of
      <strong>{duration} seconds! </strong>
      <em>Can you beat your own record next time?</em>
    </div>
  );
}
