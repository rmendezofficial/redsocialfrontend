import { useEffect } from "react"
import { IsLoged,loged } from "../api/serverapi"
import {Route, Routes } from 'react-router-dom';
import {Home} from './appcomponents/home'
import {Search} from './appcomponents/search'
import {GetUser} from './appcomponents/getuser'
import {GetPost} from './appcomponents/getpost'
import { CreatePost } from "./appcomponents/createpost";
import { UpdateUser } from "./appcomponents/updateuser";
import { Profile } from "./appcomponents/profile";
import { Nav } from "./appcomponents/nav";

export function App(){
    
useEffect(()=>{

    IsLoged()
    if(loged=='false'){
        window.location.href='http://localhost:3000/login'
    }
})

    return(
        <Routes>
          <Route path='/' element={<><Nav/><Home/></>}/>
          <Route path='/search' element={<><Nav/><Search/></>}/>
          <Route path='/getuser/:user_id' element={<><Nav/><GetUser/></>}/>
          <Route path='/getpost/:post_id' element={<><Nav/><GetPost/></>}/>
          <Route path='/createpost' element={<><Nav/><CreatePost/></>}/>
          <Route path='/updateuser' element={<><Nav/><UpdateUser/></>}/>
          <Route path='/profile' element={<><Nav/><Profile/></>}/>
        </Routes>
)
}