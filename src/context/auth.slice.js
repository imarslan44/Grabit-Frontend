import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isAuthorized: false,
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        authorize:(state, action)=>{
          state.isAuthorized = action.payload
        }
    }

});

export const {authorize} = authSlice.actions;
const authReducers = authSlice.reducer
export default authReducers;

