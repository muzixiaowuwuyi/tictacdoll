import "./home.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleInputChange = e => {
    setUsername(e.target.value);
  };

  const handleButtonClick = () => {
    if (!username.trim()) {
      alert("Please enter a username."); // 提醒用户输入用户名
      return;
    }
    // 存储用户名在sessionStorage中
    sessionStorage.setItem("username", username);
    // 页面跳转到游戏界面
    navigate("/game");
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
      <button onClick={handleButtonClick} className="start-button">
        Start Game
      </button>
    </div>
  );
}
