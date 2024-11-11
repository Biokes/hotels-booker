import {createSlice, PayloadAction,} from "@reduxjs/toolkit";
import {UserState} from "@/interfaces/interfaces";

const initialState:UserState ={
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
export const {setBaseUrl} = UserSlice.actions;
export default UserSlice.reducer;