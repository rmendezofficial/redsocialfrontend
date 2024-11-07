import { useState,useEffect } from "react"
import { PostCard } from "./postcard"
import axios from "axios"

export function Search(){
    const[menu,setMenu]=useState(0)
    const[dataposts,setDataposts]=useState([])
    const[query,setQuery]=useState('')
    const[encontrados,setEncontrados]=useState([])
    const headers={
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
    }

    const getPosts=async()=>{
        try{
            let response=await axios.get('https://redsocial-avxo.onrender.com/posts/search_home',{headers:headers,withCredentials:true})
            let data=response.data
            console.log(data)
            setDataposts(data)
        }catch(err){console.log(err)}
    }
    const search=async()=>{
        try{
            let response=await axios.get(`https://redsocial-avxo.onrender.com/users/search/${query}`,{headers:headers,withCredentials:true})
            let data=response.data
            console.log(data)
            setMenu(1)
            setEncontrados(data)
        }catch(err){console.log(err)}
    }

    useEffect(()=>{getPosts()},[])

    return(<div>
        <form onSubmit={(e)=>{
            e.preventDefault()
            search()
        }}>
            <input onChange={(e)=>setQuery(e.target.value)} placeholder="Search"/>
            <button>Search</button>
        </form>
        <div>
            {
                menu==0?//Normal menu
                <>
                    
                    <div>
                        {(dataposts.map((post,k)=>{
                        return(<PostCard post={post} key={k}/>)
                        }))}
                    </div>
                </>
                ://search menu
                <>
                    <div>{encontrados.length==0?<h2>No results matching results</h2>:<div>{(encontrados.map((user,k)=>{
                        return(<h4 onClick={()=>{window.location.href=`http://localhost:3000/getuser/${user.user_id}`}} key={k}>{user.username}</h4>)
                    }))}</div>}</div> 
                </>
            }
        </div>
        </div>
    )
}