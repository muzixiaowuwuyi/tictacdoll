import { useNavigate } from "react-router-dom";

function Gamemode() {

  const navigate = useNavigate();

  return (
    <div className="user-page">
    <div className="prompt-container">
      <div className="prompt">
        <h2>Choose gamemode</h2>
      </div>
    </div>
    <div className="form-container">
      <div className="button-container">
        <button className="orange-button" onClick={() => navigate('/local')}>
          Local play
        </button>
        <button className="orange-button" onClick={() => navigate('/online')}>
          Online play
        </button>
      </div>
      <div className="button-container">
        <button className="distinct-button" onClick={() => navigate('/')}>
          Go back
        </button>
      </div>
    </div>
  </div>
)
}

export default Gamemode;