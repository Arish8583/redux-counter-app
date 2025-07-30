import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllUsers } from './userSlice';
import { Link } from 'react-router-dom';

const UserList = () => {
  const users = useSelector(selectAllUsers); // ✅ Correct selector

  if (!users || users.length === 0) {
    return <p>No users found.</p>;
  }

  const userListItems = users.map(user => (
    <li key={user.id}>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </li>
  ));

  return (
    <section>
      <h2>Users</h2>
      <ul>{userListItems}</ul>
    </section>
  );
};

export default UserList;
