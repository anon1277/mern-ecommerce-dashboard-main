import React, { useState } from "react";

// Signup Component
const Signup = () => {
    // State variables for name, email, and password
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Function to collect and log form data
    const collectdata = () => {
        console.warn(name, email, password);
    };

    // JSX for the Signup component
    return (
        <div className="registe_div">
            <h1>Register</h1>
            {/* Input fields for name, email, and password */}
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="inputBox" placeholder="Enter Name" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="inputBox" placeholder="Enter Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="inputBox" placeholder="Enter Password" />

            {/* Button to submit form data */}
            <button onClick={collectdata} className="Signup_btn" type="button">Sign up</button>
        </div>
    );
};

export default Signup;
