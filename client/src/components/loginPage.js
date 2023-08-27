import React ,{ useContext, useState } from "react";
import {Navigate} from "react-router-dom";
import { UserContext } from "../userContext";
import Info from "./info";
import BASE_URL from "./backEnd";
const LoginPage = () => {
    const [username ,setUsername] = useState("");
    const [password ,setPassword] = useState("");
    const [redirect ,setRedirect] = useState(false);
    const {userInfo ,setUserInfo} = useContext(UserContext);
    const [infoShow ,setInfoShow] = useState(<div className="info-class">  </div>);

    const login = async(ev) => {
        ev.preventDefault();
        if(username !== "" && password !== "") {
            const responce = await fetch(`${BASE_URL}/login`,{
                method : "POST",
                body : JSON.stringify({username,password}),
                headers : {"Content-Type" : "application/json"},
                credentials : 'include'
            })
        
            if(responce.ok) {
                responce.json().then(userInfo => {
                setUserInfo(userInfo);
                setRedirect(true);
            })} else {
                setInfoShow(<Info toPrint={"Wrong Credentials"}/>);
                setTimeout(() => setInfoShow(<div className="info-class">  </div>) ,2000)
            }
        } else {
            setInfoShow(<Info toPrint = {"Type Username and password"}/>);
            setTimeout(() => setInfoShow(<div className="info-class">  </div>) ,2000);
        }
 
    }

    if(redirect) {
        return <Navigate to = "/" />
    }
    
    return (
        <div className="login-reg-container"> 
            <form className = "login-reg-page" onSubmit={login}>
            <h1 className=""> Login </h1>
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
                <button> Login </button>
                {infoShow}
        </form>
        </div>
    )
}

export default LoginPage;