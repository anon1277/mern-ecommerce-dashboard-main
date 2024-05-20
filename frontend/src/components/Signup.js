import React ,{useState} from "react";

// Signup Components
const Signup = ()=>{

    const   [name,setName] = useState("");
    const   [email,setEmail] = useState("");
    const   [password,setPassword] = useState("");
    const collectdata = ()=>{
        console.warn(name,email,password)
    }
    return(
        <div className="registe_div">
            <h1>Register</h1>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="inputBox" placeholder="Enter Name"/>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="inputBox" placeholder="Enter Email"/>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="inputBox" placeholder="Enter Password"/>

            <button onClick={collectdata} className="Signup_btn" type="button">Sign up </button>
        </div>

    )
}

export default Signup;