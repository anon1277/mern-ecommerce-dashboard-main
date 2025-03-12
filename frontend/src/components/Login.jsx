import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');  // State to store email
  const [password, setPassword] = useState('');  // State to store password
  const navigate = useNavigate();  // hook to navigate to different routes

  // check if the user is already logged in
  useEffect(() => {
    const auth = localStorage.getItem('user');  // get user data from localStorage
    if (auth) {
      navigate('/');  // redirect to home page if user is already logged in
    }
  }, []);

  // handle user login
  const handleLogin = async () => {
    let result = await fetch("http://localhost:8050/login", {
      method: 'post',  // POST request to send login data
      body: JSON.stringify({ email, password }),  // send email and password in request body
      headers: {
        'Content-type': 'application/json'  // specify that data is in JSON format
      }
    });
    result = await result.json();  // parse the response as JSON
    if (result.name) {  // if result contains user data
      localStorage.setItem('user', JSON.stringify(result));  // store user data in localStorage
      navigate('/');  // redirect to home page after successful login
    }
    else {
      alert('wrong email or password');  // alert for incorrect login details
    }
    console.log("login result", result);  // log the result of the login attempt

    console.log("Email: " + email + " Password: " + password);  // log the email and password entered by the user
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
          onChange={(e) => setEmail(e.target.value)}  // update email state
        />
        <input
          type="password"
          className="input-box"
          placeholder="Enter Your Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}  // update password state
        />
        <button onClick={handleLogin} className="login-btn" type="button">
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
