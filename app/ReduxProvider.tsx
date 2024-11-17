import { Provider } from "react-redux";
import {store} from "@/redux/store";
import {ProviderProps} from '@/interfaces/interfaces'
import {persistStore} from "redux-persist";

export default function ReduxProvider({children}: ProviderProps){
    persistStore(store)
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}