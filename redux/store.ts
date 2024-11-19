import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import UserSlice from '@/redux/userSlice';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
// import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const persistConfig = {
    key: 'hotels_root',
    storage,
    whitelist: ['color','bookingHotel'],
};
const persistedReducer = persistReducer(persistConfig, UserSlice);

export const store = configureStore({
    reducer: {
        user: persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
            //     {
            //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            // },
        }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = ()=> useDispatch<AppDispatch>();
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector;
// export const persist_store = persistStore(store);
// import { configureStore } from '@reduxjs/toolkit';
// import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import UserSlice from '@/redux/userSlice';
// import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
//
// const persistConfig = {
//     key: 'hotels_root',
//     storage,
//     whitelist: ['user'],
// };
//
// const persistedReducer = persistReducer(persistConfig, UserSlice);
//
// export const store = configureStore({
//     reducer: {
//         user: persistedReducer,
//     },
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: {
//                 ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//             },
//         }),
// });
//
// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
// export const persist_store = persistStore(store);
