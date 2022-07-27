import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {LoginActionType, loginReducer} from "../main/pages/Login/loginReducer";
import {page404Reducer} from "../main/pages/Page_404/page404Reducer";
import {ProfileActionType, profileReducer} from "../main/pages/Profile/profileReducer";
import {ForgotPasswordActionType, forgotPasswordReducer} from "../main/pages/fogotPassword/forgotPasswordReducer";
import {ActionsForSetPasswordType, setPasswordReducer} from "../main/pages/setPassword/setPasswordReducer";
import {RegisterActionType, registrationReducer} from "../main/pages/Registration/registrationReducer";


const reducers = combineReducers({
    login: loginReducer,
    registration: registrationReducer,
    profile: profileReducer,
    page404: page404Reducer,
    forgotPassword: forgotPasswordReducer,
    setPassword: setPasswordReducer,
})

const store = createStore(reducers, applyMiddleware(thunk))

export type CommonActionTypeForApp = LoginActionType |
    ForgotPasswordActionType | ActionsForSetPasswordType | ProfileActionType
    | RegisterActionType;

export type AppStoreType = ReturnType<typeof reducers>

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>


// @ts-ignore
window.store = store;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>

export default store