const initialState = {}

export const profileReducer = (state: InitialProfileStateType = initialState, action: ProfileActionType): InitialProfileStateType => {
    switch (action.type) {
        case "PROFILE":
            return {...state};

        default:
            return state;
    }
};

//actions
export const ProfileAC = () => ({type: 'PROFILE'} as const)

//types
type InitialProfileStateType = {}
export type ProfileActionType = ReturnType<typeof ProfileAC>

