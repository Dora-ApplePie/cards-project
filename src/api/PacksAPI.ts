import axios from 'axios';
import { PackType } from '../main/pages/packs/packs-reducer';

const instance = axios.create({
	// baseURL: 'https://neko-back.herokuapp.com/2.0/',
	baseURL: 'http://localhost:7542/2.0/',
	withCredentials: true
})


export const packsAPI = {
	getPacksData(packName: string, min: number, max: number, sortPacks: string, page: number = 1 , pageCount: number = 20, myId: string | null) {
		return instance.get<ResponseGetPacksType>(`cards/pack?pageCount=${pageCount}&page=${page}&packName=${packName}&sortPacks=${sortPacks}&min=${min}&max=${max}&user_id=${myId === null ? '' : myId}`).then(response => response.data)
	}
}


export type ResponseGetPacksType = {
	cardPacks: Array<PackType>
	cardPacksTotalCount: number
	minCardsCount: number | null
	maxCardsCount: number | null
	page: number | null
	pageCount: number | null
	sortPacks: string
	packUserId: string
}
