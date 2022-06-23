const initialState = {}

export const loginReducer = (state: InitialAuthStateType = initialState, action: LoginActionType): InitialAuthStateType => {
        switch (action.type) {
            case "LOGIN":
                return {...state};

            default:
                return state;
        }
};

//actions
export const LoginAC = () => ({type: 'LOGIN'} as const)

//types
type InitialAuthStateType = {}
export type LoginActionType = ReturnType<typeof LoginAC>

