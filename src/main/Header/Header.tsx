import React from 'react'
import {NavLink} from "react-router-dom";
import {PATH} from "../Routes/Routes";

function Header() {
    return (
        <div>
            <NavLink to={PATH.REGISTRATION} >Registration</NavLink>
            <NavLink to={PATH.LOGIN}>Login</NavLink>
            <NavLink to={PATH.FORGOT_PASSWORD}>Forgot Password</NavLink>
            <NavLink to={PATH.PROFILE}>Profile</NavLink>
            <NavLink to={PATH.SET_PASSWORD}>Set password</NavLink>
            <NavLink to={PATH.SUPER_COMPONENTS}>Super Components</NavLink>
        </div>
    )
}

export default Header;