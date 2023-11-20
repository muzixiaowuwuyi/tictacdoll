import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import GameEnvironment from "../GameEnvironment/GameEnvironment";
import { useDispatch } from "react-redux";
import { startGame } from "../../store/slices/gameSlice";

import './GameCanvas.css'
import { useAppSelector } from "../../store/hooks";
import Modal from "react-overlays/Modal";

const GameCanvas = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isInGame = useAppSelector((state) => state.game.isInGame);

  useEffect(() => {
    const gameStarted = isInGame;
    if (gameStarted) {
      dispatch(startGame());
    } else {
      navigate("/");
    }
  }, [navigate]);

  // Added local state for handling popup
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  // Popup handlers START
  const handleClose = () => setShowPopup(false);

  const renderBackdrop = (props: any) => <div className="backdrop" {...props} />;

  // Popup handlers END

  return (
    <>
    <Modal
      className="modal"
      show={showPopup}
      onHide={handleClose}
      renderBackdrop={renderBackdrop}
      >
      <div>
        <div className="modal-header">
          <div className="modal-title">Message</div>
          <div>
            <span className="close-button" onClick={handleClose}>
              ✖
            </span>
          </div>
        </div>
        <div className="modal-desc">
          <p>{popupMessage}</p>
        </div>
      </div>
  </Modal>
    <Canvas className="GameCanvas">
      <GameEnvironment setShowPopup={setShowPopup} setPopupMessage={setPopupMessage}></GameEnvironment>
    </Canvas>
    </>
  );
};

export default GameCanvas;
