import React from 'react'
import {Navigate, Route, Routes} from "react-router-dom";
import Registration from "../pages/Registration/Registration";
import Page404 from "../pages/Page_404/Page404";
import ForgotPassword from "../pages/FogotPassword/ForgotPassword";
import Login from "../pages/Login/Login";
import SetPassword from "../pages/SetPassword/SetPassword";
import {ProfileContainer} from "../pages/Profile/ProfileContainer";
import {PacksList} from "../pages/Packs/PacksList/PacksList";
import {TableCardName} from "../pages/Cards/tableCardName/TableCardName";
import { LearnPack } from '../pages/Packs/PacksTable/LearnPack/LearnPack';

export const PATH = {
    REGISTRATION: '/register',
    LOGIN: '/login',
    PROFILE: '/profile',
    PAGE404: '/page404',
    FORGOT_PASSWORD: '/forgot-password',
    SET_PASSWORD: '/set-password/:token',
    SUPER_COMPONENTS: '/super-components',
    PACKS: '/packs',
    CARDS: '/cards',
    LEARN_PACK: 'learn-pack/:paramId',

}

function Pages() {
    return (
            <Routes>
                <Route path={'/'} element={<Navigate to={PATH.LOGIN}/>}/>

                <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.PROFILE} element={<ProfileContainer/>}/>
                <Route path={PATH.FORGOT_PASSWORD} element={<ForgotPassword/>}/>
                <Route path={PATH.SET_PASSWORD} element={<SetPassword/>}/>
                <Route path={PATH.PACKS} element={<PacksList/>}/>
                <Route path={PATH.CARDS + `/:id`} element={<TableCardName/>}/>
                <Route path={PATH.PAGE404} element={<Page404/>}/>
                <Route path={'/*'} element={<Page404/>}/>
                <Route path={PATH.LEARN_PACK} element={<LearnPack/>}/>



            </Routes>
    )
}

export default Pages