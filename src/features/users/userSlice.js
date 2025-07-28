import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';



const posturluser = 'https://jsonplaceholder.typicode.com/users';

const initialState = []
  

export const fetchuser = createAsyncThunk('users/fetchusers', async () => {
    const response = await axios.get(posturluser);
    return response.data
});

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchuser.fulfilled, (state, action) => {
            return action.payload
        })
    }
});
export const selectAllUsers = (state) => state.users;
export default userSlice.reducer;