import axios from "axios"
import { useState } from "react"
import { IsLoged } from "../api/serverapi"

export function Login(){

    const[username,setUsername]=useState('')
    const[password,setPassword]=useState('')
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
            if(data){
                if(data.message=='Login successful'){
                    sessionStorage.setItem('access_token',data.access_token)
                    sessionStorage.setItem('username',data.user_info.username)
                    sessionStorage.setItem('id',data.user_info.id)
                    sessionStorage.setItem('email',data.user_info.email)
                    IsLoged()
                    window.location.href='http://localhost:3000'
                }
            }
            

        }catch(err){
            setMessage('Error')
            console.log(err)
        }
    }

    return(
        <form onSubmit={(e)=>{
            e.preventDefault()
            login()
        }}>
            <input onChange={(e)=>setUsername(e.target.value)} placeholder="Username"/>

            <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password"/>

            <h2 id="message">{message}</h2>

            <button>Send</button>
        </form>
    )
}