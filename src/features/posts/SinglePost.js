import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectPostById } from './postSlice';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import { Link } from 'react-router-dom'
import Reactiobutton from './Reactiobutton';

const SinglePost = () => {
  const { postId } = useParams();
  const post = useSelector(state => selectPostById(state, Number(postId)));

  if (!post) {
    return (
      <section>
        <h2>Post Not Found</h2>
      </section>
    );
  }

  return (
    <article>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <div className="postCredit">
                <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
                <Reactiobutton post={post} />
            </div>
        </article>
  );
}

export default SinglePost;
