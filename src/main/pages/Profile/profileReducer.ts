import {Dispatch} from 'redux';
import {authApi} from "../../../api/auth-api/authAPI";
import { profileAPI } from '../../../api/profile-api/profileAPI';
import {isLoginAC} from "../Login/loginReducer";
import {AxiosError} from "axios";
import {setAppErrorAC} from "../../../app/app-reducer";

export const profileReducer = (state: ProfileInitialStateType = initialState, action: ProfileActionsType): ProfileInitialStateType => {
    switch (action.type) {
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }

        case SET_NEW_USER_NAME: {
            return {
                ...state,
                profile: {...state.profile, name: action.name}
            }
        }
        default:
            return state
    }
}

// actions
export const setUserProfileAC = (profile: ProfileType) => ({type: SET_USER_PROFILE, profile} as const)
export const setUserProfileNameAC = (name: string | null) => ({type: SET_NEW_USER_NAME, name} as const)

//thunks
export const authMeTC = (): any => (dispatch: Dispatch) => {
    return authApi.me()
        .then(res => {
            if (res.status === 200) {
                dispatch(isLoginAC(true))
                dispatch(setUserProfileAC(res.data))
            }
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = (err.response && err.response.data) ? err.response.data.error : err.message;
            dispatch(setAppErrorAC(error));
        })
}

export const editNameTC: any = (name:string) => (dispatch: Dispatch) => {

    return profileAPI.updateProfile(name)
        .then(() => {
            dispatch(setUserProfileNameAC(name))

        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = (err.response && err.response.data) ? err.response.data.error : err.message;
            dispatch(setAppErrorAC(error));
        })
        .finally(() => {
        })
}

export const logOutTC:any = () => (dispatch: Dispatch) => {

    profileAPI.logOut()
        .then(() => {
            dispatch(isLoginAC(false))
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = (err.response && err.response.data) ? err.response.data.error : err.message;
            dispatch(setAppErrorAC(error));
        })
        .finally(() => {
        })
}

//types
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_NEW_USER_NAME = 'SET_NEW_USER_NAME'

export type ProfileType = {
    _id: string | null
    email: string | null
    name: string | null
    avatar: string | null
    publicCardPacksCount: number | null
    created: string | null
    updated: string | null
    isAdmin: boolean | null
    verified: boolean | null
    rememberMe: boolean | null
    error: string | null
}
export type ProfileInitialStateType = {
    profile: ProfileType
    myId: string | null
    error: string | null
    status: string | null
}
const initialState: ProfileInitialStateType = {
    profile: {
        _id: null,
        email: null,
        name: null,
        avatar: null,
        publicCardPacksCount: null,
        created: null,
        updated: null,
        isAdmin: null,
        verified: null,
        rememberMe: null,
        error: null
    },
    myId: null,
    error: null,
    status: 'idle'
}

export type ProfileActionsType = ReturnType<typeof setUserProfileAC> | ReturnType<typeof setUserProfileNameAC>

