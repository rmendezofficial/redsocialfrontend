import axios from "axios"
import { useEffect, useState } from "react"
import { PostCard } from "./postcard"
import { Link } from "react-router-dom"
import { PostCardProfile } from "./postcardprofile"

export function Profile(){

    const user_id=sessionStorage.getItem('id')
    const headers={
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
    }
    const[user,setUser]=useState('')
    const[dataposts,setDataposts]=useState([])
    const[menu,setMenu]=useState(0)
    const[followers,setFollowers]=useState([])
    const[following,setFollowing]=useState([])

    const getMe=async()=>{
        try{
            const formData = new URLSearchParams()
            formData.append('user_id', user_id)

            console.log(headers)
            let response=await axios.post(
                'https://redsocial-avxo.onrender.com/users/get_me',formData,
                {
                    params:{
                        user_id:user_id
                    },
                    headers:headers,
                    withCredentials:true
                }
            )


            let data=response.data
            console.log(data)
            setUser(data)
            setDataposts(data.posts)
            setFollowers(data.followers)
            setFollowing(data.follows)
        }catch(err){console.log(err)}
    }

    useEffect(()=>{getMe()},[])

    return(
        <>
        <h1>Profile</h1>
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
                
            </div>

            <div>{(dataposts.map((post,k)=>{
            return(<PostCardProfile post={post} key={k}/>)
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
     
        </>
    )
}