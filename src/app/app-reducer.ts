import {AppThunk} from "./store";
import {Dispatch} from "redux";
import {authApi} from "../api/auth-api/authAPI";
import {isLoginAC, signInAC} from "../main/pages/Login/loginReducer";
import {authMeTC, setProfileIdAC} from "../main/pages/Profile/profileReducer";

export type RequestStatusType = 'loading' | 'succeeded'| 'idle';

export type InitialStateType = {
    initialized: boolean;
    status: RequestStatusType;
    error: string | null;
};

const initialState: InitialStateType = {
    initialized: false,
    status: 'loading' as RequestStatusType,
    error: null,
};

export const appReducer = (
    state: InitialStateType = initialState,
    action: AppActionType,
): InitialStateType => {
    switch (action.type) {
        case 'APP/INITIALIZED':
            return {...state, initialized: true};

        case 'APP/GET-STATUS':
            return {...state, status: action.status};

        case 'APP/SET-ERROR':
            return {...state, error: action.error};

        default: {
            return state;
        }
    }
};

//types
export type AppActionType =
    | ReturnType<typeof initializedAC>
    | ReturnType<typeof getStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setProfileIdAC>;


//actions
export const initializedAC = (value: boolean) =>
    ({type: 'APP/INITIALIZED', value} as const);

export const getStatusAC = (status: RequestStatusType) =>
    ({type: 'APP/GET-STATUS', status} as const);

export const setAppErrorAC = (error: string | null) =>
    ({type: 'APP/SET-ERROR', error} as const);

//thunk
export const initializeAppTC = (): AppThunk => (dispatch: Dispatch) => {
    authApi
        .me()
        .then((res) => {
            dispatch(authMeTC())
            dispatch(signInAC(res.data));
            dispatch(isLoginAC(true))
            dispatch(setProfileIdAC(res.data._id))
        })
        .catch(error => {
            dispatch(isLoginAC(false));
            console.log(error.response.data.error);
        })
        .finally(() => {
            dispatch(initializedAC(true));
            dispatch(getStatusAC('succeeded'));
        });
};
