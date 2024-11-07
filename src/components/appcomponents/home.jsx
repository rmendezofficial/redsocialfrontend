import axios from "axios"
import { useEffect, useState } from "react"
import { PostCard } from "./postcard"

export function Home(){

    const access_token=sessionStorage.getItem('access_token')
    const user_id=sessionStorage.getItem('id')
    const[dataposts,setDataposts]=useState([])

    const headers={
        'Content-Type': 'application/json',
        'Authorization': access_token
    }

    const getPosts=async()=>{
        try{
            let response=await axios.post(
                'https://redsocial-avxo.onrender.com/posts/home',null,
                {
                    params:{
                        user_id:user_id
                    },
                    headers:headers,
                    withCredentials:true
                }
            )
            let datareq=response.data
            setDataposts(datareq)
            console.log(datareq)
        }catch(err){console.log(err)}
    }

    useEffect(()=>{
        getPosts()
    },[])

    return(
        <div>{(dataposts.map((post,k)=>{
            return(<PostCard post={post} key={k}/>)
        }))}</div>
    )
}