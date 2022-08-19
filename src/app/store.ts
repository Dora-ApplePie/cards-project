import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {loginReducer} from "../main/pages/Login/loginReducer";
import {profileReducer} from "../main/pages/Profile/profileReducer";
import {forgotPasswordReducer} from "../main/pages/FogotPassword/forgotPasswordReducer";
import {setPasswordReducer} from "../main/pages/SetPassword/setPasswordReducer";
import {registrationReducer} from "../main/pages/Registration/registrationReducer";
import {appReducer} from "./app-reducer";
import {packsListReducer} from "../main/pages/Packs/packsListReducer";
import {packsTableReducer} from "../main/pages/Packs/PacksTable/packsTableReducer";
import {cardsNameReducer} from "../main/pages/Cards/cardsReducer";
import {learnPackReducer} from "../main/pages/Packs/PacksTable/LearnPack/learnPackReducer";


const rootReducer = combineReducers({
    app: appReducer,
    login: loginReducer,
    registration: registrationReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    setPassword: setPasswordReducer,
    packList: packsListReducer,
    tablePacks: packsTableReducer,
    cardPack: cardsNameReducer,
    learnPack: learnPackReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))


export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>

export type AppRootStateType = ReturnType<typeof rootReducer>
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>


// @ts-ignore
window.store = store;



export default store;