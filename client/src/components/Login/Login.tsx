import { useState, FormEvent, useEffect } from "react";
import './Login.css';

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <h1>Login Works</h1>
    </div>
  )
}

export default Login;