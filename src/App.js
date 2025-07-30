import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddPost from './features/posts/AddPost';
import PostList from './features/posts/PostList';
import Layout from './component/Layout';
import SinglePost from './features/posts/SinglePost';
import EditPost from './features/posts/EditPost';
import UserList from './features/users/UserList';
import User from './features/users/User';

function App() {  
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostList />} />
        <Route path="post">
          <Route index element={<AddPost />} />
          <Route path=":postId" element={<SinglePost />} />
          <Route path="edit/:postId" element={<EditPost />} />
        </Route>
        <Route path="users" >
          <Route index element= {<UserList />} />
          <Route path = ":userid" element={<User />} />
          </Route>      
      </Route>
    </Routes>
  );
}

export default App;
