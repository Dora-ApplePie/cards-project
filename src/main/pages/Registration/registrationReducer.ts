import {AppThunk} from "../../../app/store";
import {AxiosError} from "axios";
import {Dispatch} from "redux";
import {registrationApi} from "../../../api/register-api/registrationAPI";

const initialState = {}

export const registrationReducer = (state: InitialRegistrationStateType = initialState, action: RegisterActionType): InitialRegistrationStateType => {
    switch (action.type) {
        case "REGISTRATION":
            return {...state};

        default:
            return state;
    }
};

//actions
export const RegistrationAC = (data:{email: string, password: string}) => ({type: 'REGISTRATION', data} as const)

//thunk
export const registrationTC = (data: { email: string; password: string }): AppThunk =>
    (dispatch: Dispatch) => {
        //dispatch(getStatusAC('loading'));

        registrationApi.registrationRequest(data)
            .then(res => {
                dispatch(RegistrationAC(res.data));
            })
            .catch((e: AxiosError<{ error: string }>) => {
                const error = (e.response && e.response.data) ? e.response.data.error : e.message;
                //dispatch(setAppErrorAC(error));
            })
            .finally(() => {
                //dispatch(getStatusAC('succeeded'));
            })
    };

//types
type InitialRegistrationStateType = {}
export type RegisterActionType = ReturnType<typeof RegistrationAC>

