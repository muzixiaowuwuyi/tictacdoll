import "./App.css";
import { useState, Dispatch, SetStateAction } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import GameCanvas from "../GameCanvas/GameCanvas";
import Navbar from "../Navbar/Navbar";

import Local from "../Local/Local";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Gamemode from "../Gamemode/Gamemode";
import Online from "../Online/Online";

export type Props = {
  showPopUp: boolean;
  setShowPopup: Dispatch<SetStateAction<boolean>>;
  popUpMessage: string;
  setPopUpMessage: (message: string) => void;
}

function App() {

  const [showPopUp, setShowPopup] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState("");

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login
         showPopUp={showPopUp}
         setShowPopup={setShowPopup}
         popUpMessage={popUpMessage}
         setPopUpMessage={setPopUpMessage}
        />} />
        <Route path="/register"
        element={<Register
        showPopUp={showPopUp}
        setShowPopup={setShowPopup}
        popUpMessage={popUpMessage}
        setPopUpMessage={setPopUpMessage}/>} />
        <Route path="/gamemode" element={<Gamemode />} />
        <Route path="/local" element={<Local />} />
        <Route path='online' element={<Online />} />
        <Route
          path="/game" 
          element={<GameCanvas key={Date.now()} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App ;
