import React from 'react'
import { useSelector } from 'react-redux';
import { selectAllPosts, getPostsStatus, getPostsError } from './postSlice';
import PostExceptation from './PostExceptation';
import { Link } from 'react-router-dom';


const PostList = () => {
    // const dispatch = useDispatch();
   
    const posts = useSelector(selectAllPosts);
    const postStatus = useSelector(getPostsStatus);
      const error = useSelector(getPostsError);
      // useEffect(() => {
      //   if (postStatus === 'idle') {
      //     dispatch(fetchposts());
      //   }
        
      // }, [postStatus, dispatch])

    //   const orderedPosts = [...posts].reverse();
    let content;
    if (postStatus === 'loading') {
        content = <p>Loading...</p>;
      } else if (postStatus === 'succeeded') {
      const orderedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));

     content = orderedPosts.map((post) => (<PostExceptation key={post.id} post={post} /> ));
      } else if (postStatus === 'failed') {
        content = <p>{error}</p>;
      }
  return (
    <section>
        <h2>
            posts
        </h2>
        {content}
    </section>
  )
}

export default PostList