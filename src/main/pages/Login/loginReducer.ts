import {Dispatch} from "redux";
import {profileAPI} from "../../../api/auth-api/authAPI";
import {loginAPI} from "../../../api/login-api/loginAPI";
import { setUserProfileAC } from "../Profile/profileReducer";

const initialState: InitialAuthStateType = {
    isLoggedIn: false,
    loginError: null,
    logoutStatus: 'idle',
    loginStatus: 'idle'
}
export const loginReducer = (state: InitialAuthStateType = initialState, action: LoginActionType): InitialAuthStateType => {
    switch (action.type) {
        case "LOGIN":
            return {...state};
        case "SET_IS_LOGGED_IN":
            debugger
            return {
                ...state, isLoggedIn: action.value
            }
        default:
            return state;
    }
};

//actions
export const LoginAC = () => ({type: 'LOGIN'} as const)
export const setIsLoggedInAC = (value: boolean) => ({type: 'SET_IS_LOGGED_IN', value} as const)

//thunk


export const loginTC: any = () => (dispatch: Dispatch) => {
    debugger
    loginAPI.login()
        .then(res => {
            debugger
            dispatch(setIsLoggedInAC(true))
            dispatch(setUserProfileAC(res.data))
        })
        .catch()
        .finally(() => {
        })
}


export const logOutTC:any = () => (dispatch: Dispatch) => {

    profileAPI.logOut()
        .then(() => {
            dispatch(setIsLoggedInAC(false))
        })
        .catch(err => {

        })
        .finally(() => {
        })
}


//types

export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
}

type InitialAuthStateType = {
    isLoggedIn: boolean
    loginError: string | null
    logoutStatus: string | null
    loginStatus: string | null
}
export type LoginActionType = ReturnType<typeof LoginAC> | ReturnType<typeof setIsLoggedInAC>

