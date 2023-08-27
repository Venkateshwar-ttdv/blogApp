import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import IndexPage from "./components/indexPage";
import LoginPage from "./components/loginPage";
import RegisterPage from "./components/registerPage";
import { UserContextProvider } from "./userContext";
import CreatePost from "./components/createPost";
import PostPage from "./components/postPage";
import EditPost from "./components/editPost";
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element = {<Layout />}>
          <Route index element={<IndexPage />}/>
          <Route path = "/login" element = {<LoginPage />}/>
          <Route path = "/register" element = {<RegisterPage />}/>
          <Route path = "/create" element = {<CreatePost />} />
          <Route path = "/post/:id" element = {<PostPage />} />
          <Route path = "/edit/:id" element = {<EditPost />}></Route>
        </Route>
    </Routes>
    </UserContextProvider>
    
      
  );
}

export default App;
