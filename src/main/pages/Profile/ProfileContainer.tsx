import React, {useCallback, useEffect} from 'react';
import {authMeTC, editNameTC, logOutTC, ProfileType} from "./profileReducer";
import {AppStoreType} from '../../../app/store';
import {Navigate} from 'react-router-dom';
import {PATH} from "../../Routes/Routes";
import {useDispatch, useSelector} from 'react-redux';
import { RequestStatusType } from '../../../app/app-reducer';
import Profile from './Profile';


export const ProfileContainer = () => {

    const dispatch = useDispatch()
    const isLogin = useSelector<AppStoreType, boolean>(state => state.login.isLogin)
    const profile = useSelector<AppStoreType, ProfileType>(state => state.profile.profile)
    const status = useSelector<AppStoreType, RequestStatusType>(state => state.profile.status)


    useEffect(()=>{
        dispatch(authMeTC())
    },[])

    const logOutHandler = useCallback(() => {
        dispatch(logOutTC())
    }, [])

    const activateEditMode = useCallback((name: string | null) => {
        dispatch(editNameTC(name))
    }, [dispatch])

    if (!isLogin) {
        return <Navigate to={PATH.LOGIN}/>
    }
    return (
        <div>
            <Profile profile={profile} logOutHandler={logOutHandler} EditMode={activateEditMode} status={status}/>
        </div>
    )
}
