import { Dispatch } from 'redux';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const AUTH_ERROR = 'AUTH_ERROR';

interface LoginAction {
    type: typeof LOGIN_SUCCESS;
    payload: { id: string; name: string };
}

interface LogoutAction {
    type: typeof LOGOUT;
}

export type AuthActionTypes = LoginAction | LogoutAction;

export const login = (user: { id: string, name: string }) => {
    return (dispatch: Dispatch<AuthActionTypes>) => {
        // axios future login method
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({ type: LOGIN_SUCCESS, payload: user });
    };
};

export const logout = () => {
    // axios future logout method
    localStorage.removeItem('user');
    return { type: LOGOUT };
};