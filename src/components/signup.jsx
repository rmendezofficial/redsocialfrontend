import { useState } from "react"
import { IsLoged, loged } from "../api/serverapi"
import axios from "axios"

export function Signup(){

    const[username,setUsername]=useState('')
    const[password,setPassword]=useState('')
    const[email,setEmail]=useState('')
    const[message,setMessage]=useState('')

    const login=async()=>{
        try{
            const formData = new URLSearchParams()
            formData.append('username', username)
            formData.append('password', password)

            const headers={
                'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': ''
            }
            let response=await axios.post('https://redsocial-avxo.onrender.com/auth/login',formData,{headers,withCredentials:true})

            let data=response.data
            if(data.message=='Login successful'){
                sessionStorage.setItem('access_token',data.access_token)
                sessionStorage.setItem('username',data.user_info.username)
                sessionStorage.setItem('id',data.user_info.id)
                sessionStorage.setItem('email',data.user_info.email)
                IsLoged()
                window.location.href='http://localhost:3000'
            }

        }catch(err){console.log(err)}
    }

    const createUser=async()=>{
        try{
            let body={
                'username':username,
                'password':password,
                'email':email,
                'user_id':0
            }

            let response=await axios.post('https://redsocial-avxo.onrender.com/users/create_user',body)
            let data=response.data
            console.log(response)
            if(data.message='Success'){
                login()
            }else{}

        }catch(err){console.log(err)
            setMessage('Error has occurred')
        }
            
    }

    return(
        <form onSubmit={(e)=>{
            e.preventDefault()
            createUser()
        }}>
            <input onChange={(e)=>setUsername(e.target.value)} placeholder="Username"/>

            <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password"/>

            <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email"/>

            <h2 id="message">{message}</h2>

            <button>Send</button>
        </form>
    )
}