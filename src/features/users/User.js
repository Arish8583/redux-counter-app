import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserByIdusers } from './userSlice';
import { useParams, Link } from 'react-router-dom';
import { selectAllPosts } from '../posts/postSlice';

const User = () => {
  const { userid } = useParams();
  const userIdNum = Number(userid);

  const user = useSelector(state => selectUserByIdusers(state, userIdNum));
  const posts = useSelector(selectAllPosts);
  const userPosts = posts.filter(post => post.userId === userIdNum);

  const posttitle = userPosts.map(post => (
    <li key={post.id}>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  ));

  if (!user) return <p>User not found!</p>;

  return (
    <section>
      <h2>{user.name}</h2>
      <ul>{posttitle}</ul>
    </section>
  );
};

export default User;
