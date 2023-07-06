import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";


interface User {
    userName: string;
    email: string;
    password: string;
  }

interface UserState {
    users: User[];
    error: null|string|undefined;
    status: "idle" | "loading" | "success" | "error";
  }
  
const initialState: UserState = {
    users: [],
    error: null,
    status: "idle",
  };

  export const fetchRegister = createAsyncThunk('users/fetchRegister', async (user:User) => {
    try {
      const res = await fetch('http://localhost:5000/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    });
    if (res.ok) {
      const responseData = await res.json();
      return responseData;
    } else {
      const errorMsg = await res.json();
      throw new Error(errorMsg.err);
    } 
  } catch (err:any) {
    throw new Error(err);
  }
  });
  

const registerSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchRegister.pending, (state) => {
          state.status = "loading";
          state.error = null;
        })
        .addCase(fetchRegister.fulfilled, (state,  action) => {
          state.status = "success";
          state.users = action.payload;
        })
        .addCase(fetchRegister.rejected, (state, action) => {
          state.status = "error";
          state.error = action.error.message;
          
        })
    },
  });

export default registerSlice.reducer;
export const registerReducer = (state:RootState):User[]=> state.users.users