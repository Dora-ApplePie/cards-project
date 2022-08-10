import {loginApi, UserResponseType} from "../../../api/loginApi/loginAPI";
import {Dispatch} from "redux";
import {AppThunk} from "../../../app/store";
import {getStatusAC, setAppErrorAC} from "../../../app/app-reducer";
import {AxiosError} from "axios";

const initialState: LoginDataUserType = {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,
    created: new Date(),
    updated: new Date(),
    isAdmin: false,
    verified: false,
    rememberMe: false,
    error: '',
    __v: 0,
    token: '',
    tokenDeathTime: 0,
    isLogin: false,
};

export type LoginStateType = typeof initialState;

export const loginReducer = (state: LoginStateType = initialState, action: InitialAuthStateType): LoginStateType => {
    switch (action.type) {
        case 'LOGIN/SIGN_IN':
            return {...state, ...action.data};
        case 'LOGIN/IS-LOGIN':
            return {...state, isLogin: action.payload.value};
        default: {
            return state;
        }
    }
};

//actions
export const signInAC = (data: UserResponseType) => ({type: 'LOGIN/SIGN_IN', data} as const);
export const isLoginAC = (value: boolean) =>
    ({type: 'LOGIN/IS-LOGIN', payload: {value}} as const);

//thunk
export const requestLoginTC = (data: { email: string; password: string; rememberMe: boolean }): AppThunk =>
    (dispatch: Dispatch) => {
        dispatch(getStatusAC('loading'));

        loginApi.loginRequest(data)
            .then(res => {
                dispatch(signInAC(res.data));
                dispatch(isLoginAC(true));
            })
            .catch((e: AxiosError<{ error: string }>) => {
                const error = (e.response && e.response.data) ? e.response.data.error : e.message;
                console.log(error)
                // dispatch(setAppErrorAC(error));
            })
            .finally(() => {
                dispatch(getStatusAC('succeeded'));
            })
    };

//types
type InitialAuthStateType = SignInActionType | LoginActionType
export type LoginActionType = ReturnType<typeof isLoginAC>
export type SignInActionType = ReturnType<typeof signInAC>
export type LoginDataUserType = UserResponseType & {
    isLogin: boolean
}

