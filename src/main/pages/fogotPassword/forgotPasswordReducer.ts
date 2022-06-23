const initialState = {}

export const forgotPasswordReducer = (state: InitialForgotStateType = initialState, action: ForgotPasswordActionType): InitialForgotStateType => {
    switch (action.type) {
        case "FORGOT":
            return {...state};

        default:
            return state;
    }
};

//actions
export const ForgotPassAC = () => ({type: 'FORGOT'} as const)

//types
type InitialForgotStateType = {}
export type ForgotPasswordActionType = ReturnType<typeof ForgotPassAC>

