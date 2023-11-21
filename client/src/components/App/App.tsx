import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import GameCanvas from "../GameCanvas/GameCavas";
import Navbar from "../Navbar/Navbar";
import Home from "../Local/Local";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/game"
          element={<GameCanvas key={Date.now()} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
