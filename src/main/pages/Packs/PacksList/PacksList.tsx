import * as React from 'react';
import {useEffect} from 'react';
import styles from './PacksList.module.css';
import {Navigate} from 'react-router-dom';
import PacksTable from "../PacksTable/PacksTable";
import {PATH} from "../../../Routes/Routes";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {fetchCardPacks} from "./packsListReducer";
import {setProfileIdAC} from "../../Profile/profileReducer";
import {addPackTC, deletePackTC, getPacksTC, updatePackTС} from "../packsReducer";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../../app/store";
import {Packs} from "../Packs";
import {RequestStatusType} from "../../../../app/app-reducer";



export const PacksList = () => {
    const dispatch = useAppDispatch();

    const isLoggedIn = useAppSelector(state => state.login.isLogin);
    const page = useAppSelector(state => state.tablePacks.page);
    const pageCount = useAppSelector(state => state.tablePacks.pageCount);
    const searchPackName = useAppSelector(state => state.tablePacks.packName);
    const sortPackName = useAppSelector(state => state.tablePacks.sortPacks);
    const commonUserId = useAppSelector(state => state.tablePacks.user_id);
    const commonMin = useAppSelector(state => state.tablePacks.min);
    const commonMax = useAppSelector(state => state.tablePacks.max);
    const myId = useSelector<AppStoreType, string | null>(state => state.profile.profile._id)
    const status = useSelector<AppStoreType, RequestStatusType>(state => state.app.status)



    useEffect(() => {
        dispatch(getPacksTC());
    }, [dispatch]);

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
        dispatch(updatePackTС(id,'!newPackName!'))
    }


    return (
        <div className={styles.packsContainer}>
            <Packs status={status}
                   getAllPacks={getAllPacks}
                   getOnlyMyPacks={getOnlyMyPacks}
                   addPackHandler={addPackHandler}
                   deletePack={deletePack}
                   changeName={changeName}/>
        </div>
    )
};