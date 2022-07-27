import {authApi, ProfileType} from "../../../api/login-api/loginAPI";
import {Dispatch} from "redux";
import {AppThunk} from "../../../app/store";

const initialState: InitialStateType = {
    profile: {
        _id: null,
        name: '',
        email: null,
        avatar: '',
        isAdmin: null,
        publicCardPacksCount: null,
        rememberMe: null,
        updated: null,
        verified: null,
        created: null,
        error: '',
    },
    isLogin: false,
};

export type InitialStateType = {
    profile: ProfileType;
    isLogin: boolean;
};

export const loginReducer = (state: InitialStateType = initialState, action: InitialAuthStateType): InitialStateType => {
    switch (action.type) {
        case 'LOGIN/SIGN_IN':
            return {...state, profile: action.data};
        case 'LOGIN/IS-LOGIN':
            return {...state, isLogin: action.payload.value};
        default: {
            return state;
        }
    }
};

//actions
export const signInAC = (data: ProfileType) => ({type: 'LOGIN/SIGN_IN', data} as const);
export const isLoginAC = (value: boolean) =>
    ({type: 'LOGIN/IS-LOGIN', payload: {value}} as const);

//thunk
export const requestLoginTC = (data: { email: string; password: string; rememberMe: boolean }): AppThunk =>
    (dispatch: Dispatch) => {
        authApi.loginRequest(data)
            .then(res => {
                dispatch(isLoginAC(true));
                dispatch(signInAC(res.data));
                // dispatch(authMeAC(res.data));
            })
            .catch(error => {

                // dispatch(setAppErrorAC(error.response.data.error));
            });
    };

//types
type InitialAuthStateType = SignInActionType | LoginActionType
export type LoginActionType = ReturnType<typeof isLoginAC>
export type SignInActionType = ReturnType<typeof signInAC>

