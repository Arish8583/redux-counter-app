import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from 'axios';
import {sub} from 'date-fns';
const post_url = 'https://jsonplaceholder.typicode.com/posts';


const initialState = {
    posts: [],
    status: 'idle',
    error: null,

    
}

export const fetchposts = createAsyncThunk('posts/fetchposts', async () => {
    const response = await axios.get(post_url);
    return response.data
  
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response = await axios.post(post_url, initialPost);
    return response.data
})
export const fetchupdatePost = createAsyncThunk('posts/updatePost', async (initialPost, { rejectWithValue }) => {
    const { id } = initialPost;
    try {
        const response = await axios.put(`${post_url}/${id}`, initialPost);
        return response.data;
    } catch (error) {
        return initialPost;
    }
});


export const fetchdeletePost = createAsyncThunk('posts/deletePost', async (initialPost) => {
    const { id } = initialPost;
    try {
        const response = await axios.delete(`${post_url}/${id}`);
        if (response?.status === 200) return initialPost;
        return `${response?.status}: ${response?.statusText}`;
      } catch (error) {
        return error.message;
      }
})


const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload);
            },
            prepare(title, content, userId, date) {
                return {
                    payload: {
                        id: nanoid(), // Generate a unique ID for the post
                        // The payload will contain the post data
                        title,
                        content,
                        userId,
                        date: new Date().toISOString(),
                        reactions: { thumbsUp: 0, wow: 0, heart: 0, rocket: 0, coffea: 0 }
                    }
                };
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload;
            const existingPost = state.posts.find(post => post.id === postId);
            if (existingPost) {
                existingPost.reactions[reaction]++;
            }
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchposts.pending, (state, action) => {
                state.status = 'loading';
            })
            // .addCase(fetchposts.fulfilled, (state, action) => {
            //     state.status = 'succeeded';
            //     // Add any fetched posts to the array
            //     let min = 1
                
            //         const loadedPosts = action.payload.map(post => {
            //         post.date = sub(new Date(), { minutes: min++ }).toISOString();
            //         post.reactions = {
            //             thumbsUp: 0,
            //             wow: 0,
            //             heart: 0,
            //             rocket: 0,
            //             coffee: 0
            //         }
            //         return post;
            //     });                
            //     state.posts = state.posts.concat(loadedPosts);
            // })
            .addCase(fetchposts.fulfilled, (state, action) => {
  state.status = 'succeeded';

  const loadedPosts = action.payload.map(post => ({
    ...post,
    content: post.body,
    date: new Date().toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffea: 0
    }
  }));

  const existingIds = new Set(state.posts.map(p => p.id));
  const newUniquePosts = loadedPosts.filter(post => !existingIds.has(post.id));

  state.posts = state.posts.concat(newUniquePosts);
})
            .addCase(fetchposts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                const sortedposts = state.posts.sort((a, b) => {
                    if (a.id > b.id) return 1;
                    if (a.id < b.id) return -1;
                    return 0;
                })
                action.payload.id = sortedposts[sortedposts.length - 1].id + 1;
                action.payload.userId = Number(action.payload.userId);
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffea: 0
                }
                console.log(action.payload);
                state.posts.push(action.payload);
            })
            .addCase(fetchupdatePost.fulfilled, (state, action) => {
                    if (!action.payload?.id) {
                        console.log('Update could not complete');
                        console.log(action.payload);
                        return;
                    }
                    const { id } = action.payload;
                    action.payload.date = new Date().toISOString();

                    // 🛠️ Get old post's reactions
                    const existingPost = state.posts.find(post => post.id === id);
                    const reactions = existingPost?.reactions || {
                        thumbsUp: 0, wow: 0, heart: 0, rocket: 0, coffea: 0
                    };

                    // 🛠️ Restore reactions into updated post
                    const updatedPost = {
                        ...action.payload,
                        reactions
                    };

                    const posts = state.posts.filter(post => post.id !== id);
                    state.posts = [...posts, updatedPost];
            })
            .addCase(fetchupdatePost.rejected, (state, action) => {
                console.error("Update failed:", action.payload);
            })
            .addCase(fetchdeletePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Delete could not complete');
                    return;
                }
                const { id } = action.payload;
                const posts = state.posts.filter(post => post.id !== id);
                state.posts = posts;
            })
            
    }
});


export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId);
export const { postAdded, reactionAdded } = postSlice.actions;

export default postSlice.reducer;

