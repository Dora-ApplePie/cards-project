import React from 'react'
import {NavLink} from "react-router-dom";
import {PATH} from "../Routes/Routes";
import style from './Header.module.css'
import {useAppSelector} from "../../app/hooks";
import {AppBar, Avatar, Box, IconButton, Toolbar, Tooltip, Typography} from '@mui/material';
import defaultAvatar from '../../assets/img/userIcon.png'
import appLogo from '../../assets/img/logoIcon.png.png'
import Button from "@mui/material/Button";


function Header() {

    const islogin = useAppSelector(state => state.login.isLogin)
    const imgFromServer = useAppSelector(state => state.profile.profile.avatar)
    const userName = useAppSelector(state => state.profile.profile.name)
    const ava = imgFromServer ? imgFromServer : defaultAvatar

    return (<>
            {!islogin
                ? <Box sx={{flexGrow: 1}}>
                    <AppBar position="static" color={"inherit"}>
                        <Toolbar>
                            <Avatar sx={{marginRight: '5px'}} src={appLogo} alt={'logo'}/>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                Learning App
                            </Typography>
                            <Button variant="outlined" color="secondary"><NavLink style={{color: "inherit", textDecoration: "none"}} to={PATH.LOGIN}>Sign in</NavLink></Button>
                        </Toolbar>
                    </AppBar>
                </Box>
                : <Box sx={{flexGrow: 1}}>
                    <AppBar position="static" color={"inherit"}>
                        <Toolbar>
                            <Avatar sx={{marginRight: '5px'}} src={appLogo} alt={'logo'}/>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                Learning App
                            </Typography>
                            {userName}
                            <Tooltip title="Open Profile">
                                <NavLink to={PATH.PROFILE}>
                                    <IconButton sx={{p: 0}}>
                                        <Avatar sx={{marginLeft: '5px'}} alt="avatar" src={ava}/>
                                    </IconButton>
                                </NavLink>
                            </Tooltip>
                        </Toolbar>
                    </AppBar>
                </Box>

            }
        </>
    )
}

export default Header;