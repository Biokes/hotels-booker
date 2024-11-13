'use client'
import { Provider } from "react-redux";
import {persist_store, store} from "@/redux/store";
import {ProviderProps} from '@/interfaces/interfaces'
import {PersistGate} from "redux-persist/integration/react";

export default function Providers({children}: ProviderProps){
    return (
        <Provider store={store}>
            <PersistGate persistor={persist_store}>
                {children}
            </PersistGate>
        </Provider>
    )
}