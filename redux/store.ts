import {configureStore} from "@reduxjs/toolkit";
import UserSlice from "@/redux/userSlice";


export const Store = configureStore({
    reducer:{
        user:UserSlice
    }
})
export type AppDispatch = typeof Store.dispatch;
export type RootState = ReturnType<typeof Store.getState>;