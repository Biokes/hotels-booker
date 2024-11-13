// import storage from "redux-persist/lib/storage/session";
// const persistConfig = {
//     key: 'user',
//     storage,
// };
//
// const persistedReducer = persistReducer(persistConfig, userSlice.reducer);
// export const store = configureStore({
//     reducer: {
//         user: persistedReducer,
//     },
// });
//
// export const persistor = persistStore(store);
import storage from 'redux-persist/lib/storage'
import {configureStore} from "@reduxjs/toolkit";
import userSlice from "@/redux/userSlice";

const persistConfig  = {
    key:'hotels root',
    storage
}

const persistedStore = configureStore({persistConfig, userSlice})