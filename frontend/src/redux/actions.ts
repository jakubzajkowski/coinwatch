import { Dispatch } from 'redux';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const AUTH_ERROR = 'AUTH_ERROR';

interface LoginAction {
    type: typeof LOGIN_SUCCESS;
    payload: { email: string; token: string };
}

interface LogoutAction {
    type: typeof LOGOUT;
}

export type AuthActionTypes = LoginAction | LogoutAction;

export const login = (user: { token: string, email: string }) => {
    return (dispatch: Dispatch<AuthActionTypes>) => {
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({ type: LOGIN_SUCCESS, payload: user });
    };
};

export const logout = () => {
    localStorage.removeItem('user');
    return { type: LOGOUT };
};