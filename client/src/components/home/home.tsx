import "./home.css";
import { FormEvent, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { startGame } from "../../store/slices/gameSlice";
import { useNavigate } from "react-router-dom";
import logo1 from "/logos-and-icons/logo-1.png";
import logo2 from "/logos-and-icons/logo-2.png";
import Modal from "react-overlays/Modal";
export default function Home() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setShowButton(true);
  }, []);

  // Added local state for handling popup
  const [showPopup, setShowPopup] = useState(false);

  // Popup handlers START
  const handleClose = () => setShowPopup(false);
  const handleSuccess = () => console.log('success');

  const renderBackdrop = (props: any) => <div className="backdrop" {...props} />;

  // Popup handlers END

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value);
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
        <p>Alert message</p>
      </div>
    </div>
  </Modal>
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
          <button onClick={() => setShowPopup(true)}>Popup</button>
        </div>
      )}
    </div>
  );
}
