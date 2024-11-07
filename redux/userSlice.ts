import {createSlice, PayloadAction,} from "@reduxjs/toolkit";

interface userState{
    color:string,
    base_url:string
}

const initialState:userState ={
    color:'#ffffff',
    base_url:'http://localhost:8000',
}
const UserSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setBaseUrl(state,action:PayloadAction<string>){
            state.base_url = action.payload
}
    }
})
export const {  } = UserSlice.actions;
export default UserSlice.reducer;