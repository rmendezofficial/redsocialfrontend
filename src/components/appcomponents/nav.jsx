import { Link } from "react-router-dom"

export function Nav(){
    return(
        <ul>
            <li><Link to={'http://localhost:3000'}>Home</Link></li>
            <li><Link to={'http://localhost:3000/search'}>Search</Link></li>
            <li><Link to={'http://localhost:3000/createpost'}>Create post</Link></li>
            <li><Link to={'http://localhost:3000/profile'}>Profile</Link></li> 
        </ul>
    )
}