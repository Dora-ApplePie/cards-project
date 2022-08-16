import * as React from 'react';
import {useEffect} from 'react';
import styles from './PacksList.module.css';
import {Navigate} from 'react-router-dom';
import {PATH} from "../../../Routes/Routes";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {deletePackTC, fetchCardPacks} from "../packsListReducer";
import {setProfileIdAC} from "../../Profile/profileReducer";
import {Packs} from "../Packs";


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
    const myId = useAppSelector(state => state.profile.profile._id)
    const status = useAppSelector(state => state.app.status)


    useEffect(() => {
        dispatch(fetchCardPacks());
    }, [page, pageCount, sortPackName, searchPackName, commonUserId, commonMin, commonMax]);

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    const getAllPacks = () => {
        dispatch(setProfileIdAC(null))
        dispatch(fetchCardPacks())
    }

    const getOnlyMyPacks = () => {
        dispatch(setProfileIdAC(myId))
        dispatch(fetchCardPacks())
    }

    const deletePack = (title: string) => {
        dispatch(deletePackTC(title))

    }

    return (
        <div className={styles.packsContainer}>
            <h2>Packs List</h2>
            <Packs status={status}
                   getAllPacks={getAllPacks}
                   getOnlyMyPacks={getOnlyMyPacks}
                   deletePack={deletePack}
            />

        </div>

    )
};