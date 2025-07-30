import React, {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate, useParams } from 'react-router-dom'
import { selectAllUsers } from '../users/userSlice';
import { fetchupdatePost, selectPostById } from './postSlice';
import { fetchdeletePost } from './postSlice';

const EditPost = () => {


    const navigate = useNavigate();

    const {postId} = useParams();
    const post = useSelector(state => selectPostById(state, Number(postId)));
    const user = useSelector(selectAllUsers);
    const usersOptions = user.map(user => <option key={user.id} value={user.id}>{user.name}</option>);
    const[title, setTitle] = useState(post?.title);
    const[content, setContent] = useState(post?.body);
    const[userId, setUserId] = useState(post?.userId);
    const[requestStatus, setRequestStatus] = useState('idle');


    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(Number(e.target.value))

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId);
    const dispatch = useDispatch();
    const onSavePostClicked = () => {
        try {
            if(canSave) {
                setRequestStatus('pending');
                dispatch(fetchupdatePost({id: post.id, title, body: content, userId})).unwrap();
                setTitle('');
                setContent('');
                setUserId('');
                navigate(`/post/${post.id}`);
            }

            
            // save the Post
        } catch (err) {
            console.error('Failed to save the post', err)
        }finally {
            setRequestStatus('idle');
        }  
        
        
    }

    const onDeletePostClicked = () => {
        try {
            setRequestStatus('pending');
            dispatch(fetchdeletePost({id: post.id})).unwrap();
            setTitle('');
            setContent('');
            setUserId('');
            navigate('/');
            
        } catch (err) {
            console.error('Failed to delete the post', err)
        }finally {
            setRequestStatus('idle');
        }  
    }



     if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

  return (
    <section>
            <h2>Edit Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button
                    type="button"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                >
                    Save Post
                </button>
                <button className="deleteButton"
                    type="button"
                    onClick={onDeletePostClicked}
                >
                    Delete Post
                </button>
            </form>
        </section>
  )
}

export default EditPost