import { Link } from "react-router-dom";

export function Comment({comment,user_id}){
    

    return(
        <div style={user_id==comment.user_id?{background:'#00f'}:{}} >
            <h6><Link to={`http://localhost:3000/getuser/${comment.user_id}`}>{comment.username}</Link></h6>
            <p>{comment.comment}</p>
        </div>
    )
}