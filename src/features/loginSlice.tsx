import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface LogUser {
    email: string,
    password: string
}

interface LoginState {
    login: LogUser[],
    error: null|string|undefined;
    status: "idle" | "loading" | "success" | "error";
}

const initialState: LoginState = {
    login: [],
    error: null,
    status: "idle"
}

export const fetchLogin = createAsyncThunk('users/fetchLogin', async (login:LogUser) => {
  try{
    const res = await fetch('http://localhost:5000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(login)
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
  
const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchLogin.pending, (state) => {
          state.status = "loading";
        })
        
        .addCase(fetchLogin.fulfilled, (state,  action) => {
          state.status = "success";
          state.login = action.payload;
          localStorage.setItem('token',action.payload.jwt)
        })
        .addCase(fetchLogin.rejected, (state, action) => {
          state.status = "error";
          state.error = action.error.message;
          
        })
    },
});

export default loginSlice.reducer;
export const loginReducer = (state:RootState):LogUser[]=> state.login.login