import authReducer, {AuthState} from "./authReducer.ts";
import {configureStore} from "@reduxjs/toolkit";

export interface ReducerType {
    auth: AuthState;
}


const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export type AppDispatch = typeof store.dispatch;

export default store;