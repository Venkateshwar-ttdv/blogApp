import React, { useState } from "react";
import swal from "sweetalert";
import BASE_URL from "./backEnd";
import Info from "./info";
const RegisterPage = () => {
    const [username ,setUsername] = useState("");
    const [password ,setPassword] = useState("");
    const [infoShow ,setInfoShow] = useState(<div className="info-class">  </div>);

    const register = async(ev) => {
        ev.preventDefault();
        if(username !== "" && password !== "") {
            const responce = await fetch(`${BASE_URL}/register`,{
                method : "POST",
                body : JSON.stringify({username,password}),
                headers : {"content-Type" : "application/json"},
            })
            
            console.log(responce);
            if(responce.status === 200) {
                swal("Registration SuccessFull" ,"Go to Login" ,"success");
            } else {
                setInfoShow(<Info toPrint = {"Try another Username"}/>);
                setTimeout(() => setInfoShow(<div className="info-class">  </div>) ,2000);
            }

            setUsername("");
            setPassword("");
        } else {
            setInfoShow(<Info toPrint = {"Type Username and password"}/>);
            setTimeout(() => setInfoShow(<div className="info-class">  </div>) ,2000);
        }
    }
    return (
        <div className="login-reg-container"> 
            <form className = "login-reg-page" onSubmit={register}>
            <h1 className=""> Register </h1>
                <input type = "text" 
                   placeholder="username"
                   value={username}
                   onChange={ev =>setUsername(ev.target.value)}
                   spellCheck="false"
                >
                </input>
                <input type = "password" 
                   placeholder="password"
                   value={password}
                   onChange={ev => setPassword(ev.target.value)}
                   spellCheck="false"
                >
                </input>
                <button> Register </button>
                {infoShow}
        </form>
        </div>
        
    );
}

export default RegisterPage;