import { Link } from "react-router-dom"

export function PostCard({post}){
    return(
        <div className="PostCard">
            <h2><Link to={`/getuser/${post.user_id}`}>{post.username}</Link></h2>
            <div className="PostCard_post" onClick={()=>{window.location.href=`http://localhost:3000/getpost/${post.id}`}}>
            <h1>{post.name}</h1>
            <img src={post.photo} alt={post.name}/>
            <p>{post.description}</p>
            </div>
        </div>
    )
}