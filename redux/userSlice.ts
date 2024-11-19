import {createSlice, PayloadAction,} from "@reduxjs/toolkit";
import {DataItem, UserState} from "@/interfaces/interfaces";
const hotelsFound: DataItem[] =[] ;

const initialState:UserState ={
    color:'#ffffff',
    bookingHotel: hotelsFound

}
const UserSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setColor(state, action:PayloadAction<string>){
            state.color = action.payload
        },
        setBookingHotel(state, action:PayloadAction<DataItem>){
            state.bookingHotel = action.payload
        }
    }
})
export const {setColor,setBookingHotel} = UserSlice.actions;
export default UserSlice.reducer;