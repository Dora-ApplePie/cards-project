import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {addPackTC, deletePackTC, getPacksTC, updatePackTC} from './packsReducer';
import {AppStoreType} from "../../../app/store";
import {PATH} from '../../Routes/Routes';
import {setProfileIdAC} from '../Profile/profileReducer';
import {Packs} from './Packs';
import {RequestStatusType} from "../../../app/app-reducer";


export const PacksContainer = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isLogin)
    const myId = useSelector<AppStoreType, string | null>(state => state.profile.profile._id)
    const status = useSelector<AppStoreType, RequestStatusType>(state => state.app.status)

    useEffect(() => {
        dispatch(setProfileIdAC(null))
        dispatch(getPacksTC())
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    const getAllPacks = () => {
        dispatch(setProfileIdAC(null))
        dispatch(getPacksTC())
    }

    const getOnlyMyPacks = () => {
        dispatch(setProfileIdAC(myId))
        dispatch(getPacksTC())
    }

    const addPackHandler = () => {
        dispatch(addPackTC('newPack'))
    }

    const deletePack = (title: string) => {
        dispatch(deletePackTC(title))

    }
    const changeName = (id:string|null) => {
        dispatch(updatePackTC(id,'!newPackName!'))
    }


    return (
        <>
            <Packs status={status}
                   getAllPacks={getAllPacks}
                   getOnlyMyPacks={getOnlyMyPacks}
                   addPackHandler={addPackHandler}
                   deletePack={deletePack}
                   changeName={changeName}/>
        </>
    )

}