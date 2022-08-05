import {ThunkAction} from 'redux-thunk';
import {Dispatch} from 'redux';
import {getStatusAC, RequestStatusType} from '../../../app/app-reducer';
import { cardsAPI } from '../../../api/cards&packsAPI/CardsAPI';
import {AppStoreType} from "../../../app/store";


export const cardsReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
	switch (action.type) {
		case SET_CARDS: {
			return {
				...state,
				cards: action.cards
			}
		}

		default:
			return state
	}
}

export const setCardsAC = (cards:CardType[]) => ({type: SET_CARDS, cards} as const)


export const getCardsTC:any = (cardsPack_id: string): ThunkType => (dispatch, getState) => {
	dispatch(getStatusAC('loading'))

	cardsAPI.getCards(cardsPack_id)
		.then(res => {
			dispatch(setCardsAC(res.cards))

		})
		.catch((err)=>{
			console.log(err.response.data.error)
		})
		.finally(() => {
			dispatch(getStatusAC('succeeded'))
		})
}

export const addCardTC:any = (cardsPack_id: string, question?: string, answer?: string): ThunkType => (dispatch, getState) => {
	dispatch(getStatusAC('loading'))
	const newCard = {
		cardsPack_id,
		question,
		answer
	}
	cardsAPI.addNewCard(newCard)
		.then(() => {
			dispatch(getCardsTC(cardsPack_id))
		})
		.catch((err)=>{
			console.log(err.response.data.error)
		})
		.finally(() => {
			dispatch(getStatusAC('succeeded'))
		})
}



export const deleteCardTC = (packId: string, cardsPack_id: string): ThunkType => (dispatch, getState) => {
	dispatch(getStatusAC('loading'))
	cardsAPI.deleteCard(cardsPack_id)
		.then((res) => {
			dispatch(getCardsTC(packId))
		})
		.catch((err)=>{
			console.log(err.response.data.error)
		})
		.finally(() => {
			dispatch(getStatusAC('succeeded'))
		})
}

//types
type ActionsType =
	| ReturnType<typeof setCardsAC>
	| ReturnType<typeof getStatusAC>

export const SET_CARDS ='SET_CARDS'

export type CardType = {
	answer: string | null
	question: string | null
	cardsPack_id: string | null
	grade: number
	rating: number | null
	shots: number
	type: string | null
	user_id: string | null
	created: string | null
	updated: string | null
	__v: number | null
	_id: string
}
type initialStateType = {
	cards: CardType[]
	error: string
	status: RequestStatusType
	trainStatus: RequestStatusType
	emptyCardMessage: string
	cardId: string
}
const initialState: initialStateType = {
	cards: [],
	error: '',
	status: 'idle',
	trainStatus: 'idle',
	emptyCardMessage: '',
	cardId: ''
}

export type ThunkType = ThunkAction<void, AppStoreType, Dispatch<ActionsType>, ActionsType>

