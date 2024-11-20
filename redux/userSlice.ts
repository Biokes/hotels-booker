import {createSlice, PayloadAction,} from "@reduxjs/toolkit";
import {DataItem, Results, UserState} from "@/interfaces/interfaces";
import {DefaultResults} from "@/utils/functions";

const hotelsFound: DataItem= {
    hierarchy: '',
    location: '',
    score: 0,
    entityName: '',
    entityId: '',
    entityType: '',
    highlight: {
        entityName: '',
        hierarchy: '',
    },
    class: '',
    pois: null
} ;

const initialState:UserState ={
    color:'#ffffff',
    bookingHotel: hotelsFound,
    result:DefaultResults

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
        },
        setResult(state, action:PayloadAction<Results>){
            state.result= action.payload
        }
    }
})

export const {setColor,setBookingHotel,setResult} = UserSlice.actions;
export default UserSlice.reducer;