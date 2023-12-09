import "./home.css";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { startGame } from "../store/slices/chessSlice";
import { useNavigate } from "react-router-dom";
import logo1 from "../public/logo-1.png";
import logo2 from "../public/logo-2.png";
export default function Home() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setShowButton(true);
  }, []);

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleStartGame = () => {
    if (!username.trim()) {
      alert("Please enter a username.");
    }

    sessionStorage.setItem("username", username);

    navigate("/game");

    ////start game and the timer
    dispatch(startGame());
  };

  return (
    <div className="home-page">
      <div className="img-container">
        <img className="logo1" src={logo1} alt="img1" />
        <img className="logo2" src={logo2} alt="img2" />
      </div>
      {showButton && (
        <div className="startgame">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={handleInputChange}
            className="username-input"
          />
          <button onClick={handleStartGame} className="start-button">
            Start Game
          </button>
        </div>
      )}
    </div>
  );
}
