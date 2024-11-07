import {configureStore} from "@reduxjs/toolkit";
import userSlice from "@/redux/userSlice";

export const Store = configureStore({
    reducer:{
        user:userSlice
    }
})