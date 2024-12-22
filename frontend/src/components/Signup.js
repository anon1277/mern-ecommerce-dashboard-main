import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';

// Signup Component
const Signup = () => {
    // State variables for name, email, and password
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); 

    //check condtion for if user is login then don't show signu page
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    },[]);


    // Function to collect and log form data
    const collectdata = async () => {
        console.warn(name, email, password);

        let result = await fetch("http://localhost:8050/register" ,{
            method:'post',
            body : JSON.stringify({name ,email,password}),
            headers:{
                'Content-type':'application/json'
            }
        });
        result  = await result.json();
        console.log("sign up result" ,result);
        localStorage.setItem('user' ,JSON.stringify(result));
        navigate('/')
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
