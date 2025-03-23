import {LOGIN_SUCCESS, LOGOUT, AuthActionTypes } from './actions';
import {UnknownAction} from "redux";

export interface AuthState {
    user: { id: string, name: string } | null;
    isAuthenticated: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    isAuthenticated: !!localStorage.getItem('user'),
    error: null,
};

const authReducer = (state = initialState, action: AuthActionTypes | UnknownAction) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                error: null,
            };
        case LOGOUT:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                error: null,
            };
        default:
            return state;
    }
};

export default authReducer;