import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import chartReducer from './chartSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        chart: chartReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;