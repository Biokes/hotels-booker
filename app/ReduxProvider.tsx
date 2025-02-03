'use client'
import React, { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { persistStore } from "redux-persist";
import Footer from "@/components/reuseables/footer";

interface ReduxProviderProps {
    children: ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
    const persistor = persistStore(store);

    useEffect(() => {
        const handleBeforeUnload = () => {
            persistor.purge();
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [persistor]);

    return (
        <Provider store={store}>
            {children}
            <Footer />
        </Provider>
    );
}
