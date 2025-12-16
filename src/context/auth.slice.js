import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: localStorage.getItem("user") || null,
    loading: false,
    error: null,
}


const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        login:(state, action)=>{
          state.user = action.payload;
           localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logout:(state, action)=>{
            state.user = null
        },
    }   
});

export const {login, logout} = authSlice.actions;
const authReducers = authSlice.reducer
export default authReducers;

