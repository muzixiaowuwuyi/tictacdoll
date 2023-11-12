import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import GameCanvas from "./components/game-canvas";
import Navbar from "./components/navbar";
import Home from "./components/home";
function App() {
  return (
    <BrowserRouter className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<GameCanvas className="GameCanvas" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
