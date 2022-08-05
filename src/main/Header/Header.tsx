import React from 'react'
import {NavLink} from "react-router-dom";
import {PATH} from "../Routes/Routes";
import style from './Header.module.css'

function Header() {
    return (
        <header className={style.header}>
            <ul className={style.header__list}>
                <li>
                    <NavLink to={PATH.REGISTRATION}>Registration</NavLink>
                </li>
                <li>
                    <NavLink to={PATH.LOGIN}>Login</NavLink>
                </li>
                <li>
                    <NavLink to={PATH.FORGOT_PASSWORD}>Forgot Password</NavLink>
                </li>
                <li>
                    <NavLink to={PATH.PROFILE}>Profile</NavLink>
                </li>
                <li>
                    <NavLink to={PATH.SET_PASSWORD}>Set password</NavLink>
                </li>
                <li>
                    <NavLink to={PATH.PACKS}>Packs</NavLink>
                </li>
                {/*<li>*/}
                {/*    <NavLink to={PATH.SUPER_COMPONENTS}>Super Components</NavLink>*/}
                {/*</li>*/}
            </ul>
        </header>
    )
}

export default Header;