import React, { useState } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { postAdded, addNewPost } from './postSlice';
import { selectAllUsers } from '../users/userSlice';
import { add } from 'date-fns';

const AddPost = () => {
    // This component will handle adding a new post
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [addRequestStatus, setAddRequestStatus] = useState('idle');
    // Select all users from the store
    const users = useSelector(selectAllUsers);
    const [userId, setUserId] = useState(users[0]?.id || ''); // Default to the first user if available
    const userOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    )); 

    // const cansave = Boolean(title) && Boolean(content) && Boolean(userId);


    const Ontitlechange = (e) => {
        setTitle(e.target.value);
    }
    const Oncontentchange = (e) => {
        setContent(e.target.value);
    }
    const Onuserchange = (e) => {
        setUserId(e.target.value);
    }

    const cansave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';
    const onpostsubmit = (e) => {
        e.preventDefault();
        if (cansave) {
            try {
                setAddRequestStatus('pending');
                dispatch(addNewPost({ title, body: content, userId })).unwrap();
                setTitle('');
                setContent('');
                setUserId('');
            } catch (err) {
                console.error('Failed to save the post', err);
            } finally {
                setAddRequestStatus('idle');
            }
        }   
        
        // // if (title && content) {
        // // const date = new Date().toISOString(); // 🔹 ISO format
        // // dispatch(addNewPost(title, content, userId, date));
        // // setTitle('');
        // // setContent('');
        // // setUserId(users[0]?.id || ''); // Reset to the first user
        //     }
    }
  return (
    <section>
        <h2>Add New Post</h2>
        <form>
            <label htmlFor="postTitle">Post Title:</label>
            <input type="text" id="postTitle" name="postTitle" value={title}
            onChange={Ontitlechange} required />
            <label htmlFor="postContent">Post Content:</label>
            <textarea id="postContent" name="postContent"
            onChange={Oncontentchange} value={content} required />
            <label htmlFor="postUser">User:</label>
            <select id="postUser" name="postUser" value={userId} onChange={Onuserchange}>
                {userOptions}
            </select>
            {/* Add a button to submit the form */}
            <button type="submit" onClick={onpostsubmit} disabled={!cansave}>Save Post</button>
        </form>
    </section>
  )
}

export default AddPost