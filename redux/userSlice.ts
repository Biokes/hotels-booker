import {createSlice, PayloadAction,} from "@reduxjs/toolkit";
import {UserState} from "@/interfaces/interfaces";

const initialState:UserState ={
    color:'#ffffff',
}
const UserSlice = createSlice({
    name:'user',
    initialState,
    reducers:{

        setColor(state, action:PayloadAction<string>){
            state.color = action.payload
        }
    }
})
export const {setColor} = UserSlice.actions;
export default UserSlice.reducer;