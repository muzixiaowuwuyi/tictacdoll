import "./home.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { startGame } from "../store/slices/chessSlice";

import { useNavigate } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

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
  );
}
