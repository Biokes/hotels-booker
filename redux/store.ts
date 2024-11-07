import {configureStore} from "@reduxjs/toolkit";
import userSlice from "@/redux/userSlice";

export const Store = configureStore({
    reducer:{
        user:userSlice
    }
})
export type AppDispatch = typeof Store.dispatch;
export type RootState = ReturnType<typeof Store.getState>;