import React, {useCallback} from 'react';
import {editProfileTC, logOutTC, ProfileType} from "./profileReducer";
import {Navigate, useNavigate} from 'react-router-dom';
import {PATH} from "../../Routes/Routes";
import { RequestStatusType } from '../../../app/app-reducer';
import Profile from './Profile';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


export const ProfileContainer = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isLogin = useAppSelector<boolean>(state => state.login.isLogin)
    const profile = useAppSelector<ProfileType>(state => state.profile.profile)
    const status = useAppSelector<RequestStatusType>(state => state.profile.status)


    const logOutHandler = useCallback(() => {
        dispatch(logOutTC())
    }, [])

    const activateEditMode = useCallback((name: string | null) => {
        dispatch(editProfileTC(name))
    }, [dispatch])


    if (!isLogin) {
        return <Navigate to={PATH.LOGIN}/>
    }

    const onChangeNavigateHandler = () => {
        navigate(`/packs`);
    }


    return (
        <div style={{width: "80%", margin: "0 auto"}}>
            <>
                <IconButton style={{margin: "10px 0"}} disabled={status === 'loading'} onClick={onChangeNavigateHandler}>
                    <ArrowBackIcon fontSize='medium'/>
                </IconButton>
                    <span>Back to Packs list</span>
            </>
            <Profile profile={profile} logOutHandler={logOutHandler} EditMode={activateEditMode} status={status}/>
        </div>
    )
}
