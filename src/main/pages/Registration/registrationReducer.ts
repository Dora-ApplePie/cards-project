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
export const RegistrationAC = () => ({type: 'REGISTRATION'} as const)

//types
type InitialRegistrationStateType = {}
export type RegisterActionType = ReturnType<typeof RegistrationAC>

