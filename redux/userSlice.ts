import {createSlice, PayloadAction,} from "@reduxjs/toolkit";
import {UserState} from "@/interfaces/interfaces";


const initialState:UserState = {
    color:'#ffffff',
    isOpen: false,

}
const UserSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        toggleModal(state, action:PayloadAction<boolean>){
            state.isOpen = action.payload
        }
    }
})

export const {toggleModal} = UserSlice.actions;
export default UserSlice.reducer;