import "./home.css";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { startGame } from "../store/slices/chessSlice";
import background from "../public/texture.png";
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
      alert("Please enter a username."); // 提醒用户输入用户名
      return;
    }

    // 存储用户名在sessionStorage中
    sessionStorage.setItem("username", username);
    // 页面跳转到游戏界面
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
      {/* <img className="background" src={background} alt="backgroud img" /> */}
    </div>
  );
}
