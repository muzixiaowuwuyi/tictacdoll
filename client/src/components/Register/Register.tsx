import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/userService";
import PopUp  from "../PopUp/PopUp";
import { User } from "../Login/Login";
import Cookies from "js-cookie";

function Register() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleChange(event: FormEvent<HTMLInputElement>) {
    if (event.currentTarget.id === "username") {
      setUsername(event.currentTarget.value);
    } else if (event.currentTarget.id === "password") {
      setPassword(event.currentTarget.value);
    }
  }

  async function handleRegister(event: any) {
    event.preventDefault();
    const user: User = {
      username,
      password
    }
    const res = await register(user);
    if (res!.status === 201) {
      Cookies.set("username", username);
      setUsername("");
      setPassword("");
      navigate('/gamemode');
    } else {

    }
  }

  return (
    <div className="user-page">
        <div className="prompt-container">
          <div className="prompt">
            <h2>Register your details</h2>
          </div>
        </div>

      <div className="form-container">
        <form onSubmit={handleRegister} className="login-form">
          <div className="fields">
            <div className="input-field">
              <label className="input-label">Username:</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={handleChange}
                className="username-input"
                required
              />
            </div>
            <div className="input-field">
              <label className="input-label">Password:</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={handleChange}
                className="password-input"
                required
              />
            </div>
          </div>
          <div className="button-container">
            <button type="submit" className="orange-button">
              Register
            </button>
          </div>
          <div className="button-container">
            <button className="distinct-button" onClick={() => navigate('/')}>
              Go back
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register;