import { combineReducers } from 'redux';
import counterReducer from './counterSlice';

const rootReducer = combineReducers({
    counter: counterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;