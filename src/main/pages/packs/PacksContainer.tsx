import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {
	getPacksTC,
	PackType,
} from './packs-reducer';
import {AppStoreType} from "../../../app/store";
import { PATH } from '../../Routes/Routes';
import { setProfileIdAC } from '../Profile/profileReducer';
import { Packs } from './Packs';
import {RequestStatusType} from "../../../app/app-reducer";



export const PacksContainer = () => {
	const dispatch = useDispatch()
	const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isLogin)
	const packs = useSelector<AppStoreType, PackType[]>(state => state.packs.packs)
	const myId = useSelector<AppStoreType, string | null>(state => state.profile.profile._id)
	const status = useSelector<AppStoreType, RequestStatusType>(state => state.packs.status)

	useEffect(() => {
		dispatch(setProfileIdAC(null))
		dispatch(getPacksTC())
	}, [dispatch])

	if (!isLoggedIn) {
		return <Navigate to={PATH.LOGIN}/>
	}


	return (
		<>
			<Packs packs={packs} myId={myId} status={status}/>
		</>
	)
}

