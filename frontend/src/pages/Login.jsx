import { useState } from "react";

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

import { auth } from "../firebase";

import { useNavigate } from "react-router-dom";

function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Login Successful");

      navigate("/dashboard");

    } catch(error){

      alert(error.message);

    }
  };

  const handleGoogleLogin = async () => {

    try {

      const provider = new GoogleAuthProvider();

      await signInWithPopup(
        auth,
        provider
      );

      alert("Google Login Successful");

      navigate("/dashboard");

    } catch(error){

      alert(error.message);

    }
  };

  return (
    <div>

      <h1>Login</h1>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Login
        </button>

      </form>

      <br />

      <button onClick={handleGoogleLogin}>
        Login With Google
      </button>

    </div>
  );
}

export default Login;