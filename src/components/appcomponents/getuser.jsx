import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { PostCard } from "./postcard"

export function GetUser(){
    const {user_id}=useParams()
    const headers={
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
    }
    const[user,setUser]=useState('')
    const[dataposts,setDataposts]=useState([])
    const[menu,setMenu]=useState(0)
    const[followers,setFollowers]=useState([])
    const[following,setFollowing]=useState([])
    const[myfollow,setMyfollow]=useState(false)

    function checkFollows(follows){
        for(let follow of follows){
            if(follow.follower_id==sessionStorage.getItem('id')){
                setMyfollow(true)
            }
        }
    }

    const getUser=async()=>{
        try{
            let response=await axios.get(`https://redsocial-avxo.onrender.com/users/get_user/${user_id}`,{
                headers:headers,
                withCredentials:true
            })
            let data=response.data
            console.log(data)
            setUser(data)
            setDataposts(data.posts)
            setFollowers(data.followers)
            setFollowing(data.follows)
            checkFollows(data.followers)
        }catch(err){console.log(err)}
    }

    useEffect(()=>{getUser()},[])

    const createFollow=async()=>{
        let body={
            'follower_id':sessionStorage.getItem('id'),
            'followed_id':user_id
        }

        try{
            console.log(body)
            let response=await axios.post(
                `https://redsocial-avxo.onrender.com/followers/create_follow`,body,
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
    const removeFollow=async()=>{
        let body={
            'follower_id':sessionStorage.getItem('id'),
            'followed_id':user_id
        }

        try{
            console.log(body)
            let response=await axios.post(
                `https://redsocial-avxo.onrender.com/followers/delete_follow`,body,
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


    return(
        <div>
            <h1>{user.username}</h1>
            <div>{menu==0?<><div>
                <div>
                    <div onClick={()=>setMenu(1)}>
                    <label>Followers</label>
                    <h2>{user.followers_num}</h2>
                    </div>
                    <div onClick={()=>setMenu(1)}>
                    <label>Following</label>
                    <h2>{user.follows_num}</h2>
                    </div>
                </div>
                <div>
                    {user_id==sessionStorage.getItem('id')?<></>:<button onClick={myfollow==true?(e)=>{e.preventDefault()
                    removeFollow()
                }:(e)=>{e.preventDefault()
                    createFollow()
                }}>{myfollow==true?'Unfollow':'Follow'}</button>}
                </div>
            </div>

            <div>{(dataposts.map((post,k)=>{
            return(<PostCard post={post} key={k}/>)
        }))}</div>   </>:
        <div>
            <button onClick={()=>setMenu(0)}>Back</button>
            <div>
                <label>Followers</label>
                <h2>{user.followers_num}</h2>
                <div>{(followers.map((follower,k)=>{
            return(<h4 key={k}><Link to={`http://localhost:3000/getuser/${follower.follower_id}`}>{follower.follower_username}</Link></h4>)
        }))}</div>
                </div>
                <div>
                <label>Following</label>
                <h2>{user.follows_num}</h2>
                <div>{(following.map((follow,k)=>{
            return(<h4 key={k}><Link to={`http://localhost:3000/getuser/${follow.followed_id}`}>{follow.followed_username}</Link></h4>)
        }))}</div>
                </div>  
        </div>}</div>
        </div>
        
    )
}