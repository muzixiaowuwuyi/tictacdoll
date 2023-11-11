import "./App.css";
import GameCanvas from "./components/game-canvas";
import Overlay from "./components/overlay";
function App() {
  return (
    <div className="App">
      <Overlay />
      <GameCanvas />
    </div>
  );
}

export default App;
