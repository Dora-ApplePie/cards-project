// add routes

import React from 'react'
import {Navigate, Route, Routes} from "react-router-dom";
import Registration from "../pages/Registration/Registration";
import Page404 from "../pages/Page_404/Page404";
import ForgotPassword from "../pages/fogotPassword/ForgotPassword";
import Profile from "../pages/Profile/Profile";
import Login from "../pages/Login/Login";
import SetPassword from "../pages/setPassword/SetPassword";
import SuperComponents from "../common/SuperComponents/SuperComponents";

export const PATH = {
    REGISTRATION: '/register',
    LOGIN: '/login',
    PROFILE: '/profile',
    PAGE404: '/page404',
    FORGOT_PASSWORD: '/forgot-password',
    SET_PASSWORD: '/set-password',
    SUPER_COMPONENTS: '/super-components',
}

function Pages() {
    return (
            <Routes>
                <Route path={'/'} element={<Navigate to={PATH.LOGIN}/>}/>

                <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.FORGOT_PASSWORD} element={<ForgotPassword/>}/>
                <Route path={PATH.SET_PASSWORD} element={<SetPassword/>}/>
                <Route path={PATH.SUPER_COMPONENTS} element={<SuperComponents/>}/>

                <Route path={PATH.PAGE404} element={<Page404/>}/>
                <Route path={'/*'} element={<Page404/>}/>

            </Routes>
    )
}

export default Pages