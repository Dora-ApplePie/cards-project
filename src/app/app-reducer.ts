export type RequestStatusType = 'loading' | 'succeeded';

export type InitialStateType = {
    initialized: boolean;
    status: RequestStatusType;
    error: string | null;
};

const initialState: InitialStateType = {
    initialized: false,
    status: 'loading',
    error: null,
};

export const appReducer = (
    state: InitialStateType = initialState,
    action: AppActionType,
): InitialStateType => {
    switch (action.type) {
        case 'APP/INITIALIZED':
            return { ...state, initialized: action.value };

        case 'APP/GET-STATUS':
            return { ...state, status: action.status };

        case 'APP/SET-ERROR':
            return { ...state, error: action.error };

        default: {
            return state;
        }
    }
};

//types
export type AppActionType =
    | ReturnType<typeof initializedAC>
    | ReturnType<typeof getStatusAC>
    | ReturnType<typeof setAppErrorAC>;


//actions
export const initializedAC = (value: boolean) =>
    ({ type: 'APP/INITIALIZED', value } as const);

export const getStatusAC = (status: RequestStatusType) =>
    ({ type: 'APP/GET-STATUS', status } as const);

export const setAppErrorAC = (error: string | null) =>
    ({ type: 'APP/SET-ERROR', error } as const);