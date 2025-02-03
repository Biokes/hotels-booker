import {createSlice, PayloadAction,} from "@reduxjs/toolkit";
import {UserState} from "@/interfaces/interfaces";


const initialState:UserState = {
    color:'#ffffff',
    isOpen: false,
    details:{
        location:'',
        checkInDate:''
    }
}
const UserSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        toggleModal(state, action:PayloadAction<boolean>){
            state.isOpen = action.payload
        },
        setDetails(state, action:PayloadAction<{location:string,checkInDate:string}>){
            state.details = action.payload
        }
    }
})

export const {toggleModal,setDetails} = UserSlice.actions;
export default UserSlice.reducer;