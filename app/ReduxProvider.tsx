import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ProviderProps } from "@/interfaces/interfaces";
import { persistStore } from "redux-persist";

export default function ReduxProvider({ children }: ProviderProps) {

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
            </Provider>
        );
}