import React from 'react'
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import Reactiobutton from './Reactiobutton';
import { Link } from 'react-router-dom';


const PostExceptation = ({post}) => {
  return (
 <article>
            <h3>{post.title}</h3>
            <p>{post.body.substring(0, 100)}</p>
            <p className="postCredit">
              <Link to= {`/post/${post.id}`}>View Post</Link>
                 <PostAuthor userId={post.userId} />
                 <TimeAgo timestamp={post.date} />

                 </p>

                 <Reactiobutton post={post} />
            {/* <p className="postCredit"><TimeAgo timestamp={post.date} /></p> */}
           
        </article>
  )
}

// PostExceptation = React.memo(PostExceptation);

export default PostExceptation