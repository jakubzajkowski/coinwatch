import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as stream from "stream";

export interface AppState {
    count: number;
    username: string;
    password: string;
    user: {firstname: string, lastname: string}
}

const initialState: AppState = {
    count: 0,
    username: '',
    password: '',
    user: {firstname: 'Jakub',lastname:"Kowalski"}
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setUsername(state, action: PayloadAction<string>) {
            state.username = action.payload;
        },
        setPassword(state, action: PayloadAction<string>) {
            state.password = action.payload;
        },
    },
});

export const { setUsername,setPassword } = appSlice.actions;

export default appSlice.reducer;