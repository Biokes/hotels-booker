import {createSlice, } from "@reduxjs/toolkit";

interface userState{
    color:string
}

const initialState:userState ={
    color:'#ffffff'
}
const UserSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        // setBackgroundColor(state, action:PayloadAction<string>){
        //     initialState.color = action.payload
        // }
    }
})
export const {  } = UserSlice.actions;
export default UserSlice.reducer;