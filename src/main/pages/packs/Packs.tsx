import Button from '@mui/material/Button';
import React, {FC} from 'react';
import {useDispatch} from 'react-redux';
import { setProfileIdAC } from '../Profile/profileReducer';
import {
	getPacksTC,
	PackType,
} from './packs-reducer';
import { RequestStatusType } from '../../../app/app-reducer';


type PacksPropsType = {
	packs: Array<PackType>
	myId: string | null
	status: RequestStatusType
}

export const Packs: FC<PacksPropsType> = ({packs,status,myId}) => {
	const dispatch = useDispatch()

	const getAllPacks = () => {
		dispatch(setProfileIdAC(null))
		dispatch(getPacksTC())
	}

	const getMyPacks = () => {
		dispatch(setProfileIdAC(myId))
		dispatch(getPacksTC())
	}


	return (
		<div>

			<div >
				<Button onClick={getAllPacks}>All packs</Button>
				<Button onClick={getMyPacks}>My packs</Button>
			</div>

				<Button  disabled={status === 'loading'}>
					Add pack
				</Button>

		</div>
	)
}