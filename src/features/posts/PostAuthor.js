import { useSelector } from "react-redux";
import React from 'react'
import { selectAllUsers } from "../users/userSlice";
import { Link } from "react-router-dom";

const PostAuthor = ({userId}) => {
    const users = useSelector(selectAllUsers);
    const author = users.find(user => user.id === userId);
  return ( 
       <Link to={`/users/${author.id}`}>{author ? author.name : 'Unknown author'}</Link>
  )
}

export default PostAuthor
                                                                                  