import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../userContext";
import BASE_URL from "./backEnd";
const Header = () => {
  const {userInfo ,setUserInfo} = useContext(UserContext);
  useEffect(() => {
    fetch(`${BASE_URL}/profile`,{
      credentials : "include"
    }).then(responce => {
        responce.json().then(userInfo => {
        setUserInfo(userInfo.username);
      })
    })
  },[])

  const logout = () => {
    fetch(`${BASE_URL}/logout` , {
      credentials : 'include',
      method : "POST"
    });

    setUserInfo(null);
  }

    return (
        <header>
        <Link to = "/" className="logo"> TechBlog </Link>
        <nav>
           {userInfo && (
            <>
              <Link to = "/create" className="create-post"> Create new Post </Link>
              <a onClick={logout} className="logout" style = {{cursor:"pointer"}}> Log Out </a>
            </>
           )} 
           {!userInfo && (
           <>
              <Link to = "/login" className = "login"> Login </Link>
              <Link to = "/register" className = "register"> Register </Link>
           </>
           )}
          
        </nav>
      </header>
    );
}

export default Header;