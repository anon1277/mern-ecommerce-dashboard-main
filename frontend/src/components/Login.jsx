import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // login function
  const handleLogin = () => {
    console.log("Email: " + email + " Password: " + password);
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="login-title">Login</h1>
        <input
          type="email"
          className="input-box"
          placeholder="Enter Your Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="input-box"
          placeholder="Enter Your Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="login-btn" type="button">
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
