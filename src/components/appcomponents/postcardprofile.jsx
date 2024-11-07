import axios from "axios"
import { Link } from "react-router-dom"

export function PostCardProfile({post}){

    const deletePost=async()=>{
        const post_id=post.id
        const headers={
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
        }
        try{
            let response=await axios.delete(`https://redsocial-avxo.onrender.com/posts/delete_post/${post_id}`,{headers:headers,withCredentials:true})
            let data=response.data
            console.log(data)
            window.location.reload()
        }catch(err){console.log(err)}
    }

    return(
        <div className="PostCard">
            <h2><Link to={`/getuser/${post.user_id}`}>{post.username}</Link></h2>
            <div className="PostCard_post" onClick={()=>{window.location.href=`http://localhost:3000/getpost/${post.id}`}}>
            <h1>{post.name}</h1>
            <img src={post.photo} alt={post.name}/>
            <p>{post.description}</p>
            </div>
            <button onClick={()=>{deletePost()}}>Delete post</button>
        </div>
    )
}