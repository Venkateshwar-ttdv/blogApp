import React, { useContext, useEffect ,useState } from "react";
import {format} from "date-fns";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../userContext";
import BASE_URL from "./backEnd";
const PostPage = () => {
    const {userInfo} = useContext(UserContext);
    const {id} = useParams();
    const [postInfo ,setPostInfo] = useState(null);
    useEffect(() => {
        fetch(`${BASE_URL}/post/${id}`)
        .then(Response => {
            Response.json().then(postInfo => setPostInfo(postInfo));
        })
    } ,[]);
    
  
    if(!postInfo) return '';
    return (
        <div className="post-page">
            <h1>{postInfo.title}</h1>
            <p className="content"> by <span className="author">@ {postInfo.author.username}</span> </p>
            <time> {format(new Date(postInfo.createdAt) ,"MMM d ,yyyy HH:mm")} </time>
            {userInfo?.id === postInfo.author._id && (
                <div className="edit-row"> 
                    <Link className="edit-btn" to ={`/edit/${postInfo._id}`}> Edit Post </Link>
                </div>
            )}
            <div className="image">
                <img src = {`${BASE_URL}/${postInfo.cover}`} alt = "" />
            </div>
           
               <div className = "content" dangerouslySetInnerHTML={{__html:postInfo.content}} />
        </div>
    );
};

export default PostPage;