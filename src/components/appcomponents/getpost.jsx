import axios from "axios"
import { useEffect, useState } from "react"
import { PostCard } from "./postcard"
import { Link, useParams } from "react-router-dom"
import { Comment } from "./comment"

export function GetPost(){

    const access_token=sessionStorage.getItem('access_token')
    const userid=sessionStorage.getItem('id')
    const {post_id}=useParams()
    const[post,setPost]=useState([])
    const[postcomments,setPostcomments]=useState([])
    const[mylike,setMylike]=useState(false)

    const headers={
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
    }
    const[newcomment,setNewcomment]=useState('')

    function checkLikes(likes){
        for(let like of likes){
            if(like.user_id==userid){
                setMylike(true)
            }
        }
    }

    const getPost=async()=>{
        try{
            let response=await axios.get(
                `https://redsocial-avxo.onrender.com/posts/get_post/${post_id}`,
                {
                    params:{
                        post_id:post_id
                    },
                    headers:headers,
                    withCredentials:true
                }
            )
            let data=response.data
            console.log(data)
            setPost(data)
            setPostcomments(data.comments)
            checkLikes(data.likes_db)
            console.log(mylike)
        }catch(err){console.log(err)}
    }

    const createLike=async()=>{
        let body={
            'user_id':userid,
            'post_id':post_id
        }

        try{
            console.log(body)
            let response=await axios.post(
                `https://redsocial-avxo.onrender.com/likes/create_like`,body,
                {
                    
                    headers:headers,
                    withCredentials:true
                }
            )
            let data=response.data
            console.log(data)
            window.location.reload()
    
        }catch(err){console.log(err)}
    }
    const quitarLike=async()=>{
        let body={
            'user_id':userid,
            'post_id':post_id
        }

        try{
            console.log(body)
            let response=await axios.post(
                `https://redsocial-avxo.onrender.com/likes/delete_like`,body,
                {
                    
                    headers:headers,
                    withCredentials:true
                }
            )
            let data=response.data
            console.log(data)
            window.location.reload()
    
        }catch(err){console.log(err)}
    }

    const createComment=async()=>{
        let body={
            'comment':newcomment,
            'user_id':userid,
            'post_id':post_id
        }

        try{
            console.log(body)
            let response=await axios.post(
                `https://redsocial-avxo.onrender.com/comments/create_comment`,body,
                {
                    
                    headers:headers,
                    withCredentials:true
                }
            )
            let data=response.data
            console.log(data)
            window.location.reload()
    
        }catch(err){console.log(err)}
    }

    useEffect(()=>{
        getPost()
    },[])
    /*useEffect(()=>{
        getPost()
    })*/

    return(
        <div>
            <h2><Link to={`http://localhost:3000/getuser/${post.user_id}`}>{post.username}</Link></h2>
            <h1>{post.name}</h1>
            <img src={post.photo} alt={post.name}/>
            <div>
                <h4>Likes:{post.likes}<Link onClick={mylike==true?(e)=>{e.preventDefault()
                    quitarLike()
                }:(e)=>{e.preventDefault()
                    createLike()
                }}>{mylike==true?'Remove Like':'Like'}</Link></h4>
                </div>
            <p>{post.description}</p>
            <div>
                <h4>Comentarios:{post.comments_num}</h4>
                <div>
                {(postcomments.map((comment,k)=>{
            return(<Comment user_id={userid} comment={comment} key={k}/>)
        }))}
                </div>
                <form onSubmit={(e)=>{
                    e.preventDefault()
                    createComment()}} >
                <input onChange={(e)=>setNewcomment(e.target.value)} placeholder="Comment"/>
                <button>Send</button>
                </form>
                


            </div>
        </div>
    )
}