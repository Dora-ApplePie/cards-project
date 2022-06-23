const initialState = {}

export const setPasswordReducer = (state: InitialSetPasswordStateType = initialState, action: ActionsForSetPasswordType): InitialSetPasswordStateType => {
    switch (action.type) {
        case "SET-PASSWORD":
            return {...state};

        default:
            return state;
    }
};

//actions
export const SetPasswordAC = () => ({type: 'SET-PASSWORD'} as const)

//types
type InitialSetPasswordStateType = {}
export type ActionsForSetPasswordType = ReturnType<typeof SetPasswordAC>

