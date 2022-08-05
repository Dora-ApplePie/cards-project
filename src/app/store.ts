import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {LoginActionType, loginReducer} from "../main/pages/Login/loginReducer";
import {page404Reducer} from "../main/pages/Page_404/page404Reducer";
import {ProfileActionsType, profileReducer} from "../main/pages/Profile/profileReducer";
import {ForgotPasswordActionType, forgotPasswordReducer} from "../main/pages/fogotPassword/forgotPasswordReducer";
import {ActionsForSetPasswordType, setPasswordReducer} from "../main/pages/setPassword/setPasswordReducer";
import {RegisterActionType, registrationReducer} from "../main/pages/Registration/registrationReducer";
import {appReducer} from "./app-reducer";
import {packsReducer} from "../main/pages/Packs/packsReducer";
import {cardsReducer} from "../main/pages/Cards/cardsReducer";


const reducers = combineReducers({
    app: appReducer,
    login: loginReducer,
    registration: registrationReducer,
    profile: profileReducer,
    page404: page404Reducer,
    forgotPassword: forgotPasswordReducer,
    setPassword: setPasswordReducer,
    packs:packsReducer,
    cards:cardsReducer
})

const store = createStore(reducers, applyMiddleware(thunk))

export type CommonActionTypeForApp = LoginActionType |
    ForgotPasswordActionType | ActionsForSetPasswordType | ProfileActionsType
    | RegisterActionType;

export type AppStoreType = ReturnType<typeof reducers>

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>


// @ts-ignore
window.store = store;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>

export default store