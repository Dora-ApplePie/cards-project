import {AxiosResponse} from 'axios';
import {instance} from "../../../../api/login-api/loginAPI";


export const cardNameAPI = {
	getCard(data: CardParamsType) {
		return instance.get<any, AxiosResponse<CardsTypeResponseType>, CardParamsType>('cards/card', {params: data});
	},
}

export type CardParamsType = {
	cardAnswer?: string
	cardQuestion?: string
	cardsPack_id: string
	min?: number
	max?: number
	sortCards?: string
	page?: number
	pageCount?: number
}

export type CardsTypeResponseType = {
	cards: CardType[]
	cardsTotalCount: number
	maxGrade: number
	minGrade: number
	page: number
	pageCount: number
	packUserId: string
	token: string
	tokenDeathTime: number
}

export type CardType = {
	answer: string
	question: string
	cardsPack_id: string
	grade: number
	shots: number
	user_id: string
	created: string
	updated: string
	_id: string | null
}

