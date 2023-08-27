import { useEffect ,useState} from "react";
import Post from "./post"
import BASE_URL from "./backEnd";
const IndexPage = () => {
    const [posts ,setPosts] = useState([]);
    useEffect(() => {
        fetch(`${BASE_URL}/post`).then(responce => {
            responce.json().then(posts => {
                setPosts([...posts]);
            })
        })
    } ,[]);
    return(
        <div className="all-post">
          {posts.length > 0 && <><div className="post-notify"> Posts </div> <hr /> </>}
          {posts.length > 0 ? posts.map((post ,i) => (
            <>
            <Post {...post} key = {i}/>
            <hr/>
            </>
            )) : (<div style = {{flex:"0.9" ,display:"flex",justifyContent:"center" ,alignItems:"center"}}> 
                     <div style={{fontSize:"1.6rem"}}> No Post</div> 
                </div>)}
        </div>
    )
}

export default IndexPage;