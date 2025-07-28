import { useSelector } from "react-redux";
import React from 'react'
import { selectAllUsers } from "../users/userSlice";

const PostAuthor = ({userId}) => {
    const users = useSelector(selectAllUsers);
    const author = users.find(user => user.id === userId);
  return ( 
       <span>{author ? author.name : 'Unknown author'}</span> 
  )
}

export default PostAuthor
                                                                                  