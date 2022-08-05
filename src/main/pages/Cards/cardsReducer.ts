import {ThunkAction} from 'redux-thunk';
import {Dispatch} from 'redux';
import { RequestStatusType } from '../../../app/app-reducer';
import { cardsAPI } from '../../../api/cards&packsAPI/CardsAPI';
import {AppStoreType} from "../../../app/store";


enum CARDS {
	SET_CARDS = 'SET_CARDS',
	SET_CARDS_STATUS = 'SET_CARDS_STATUS',
	SET_CARD_ID = 'SET_CARD_ID',
}

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

export const cardsReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
	switch (action.type) {
		case CARDS.SET_CARDS: {
			return {
				...state,
				cards: action.cards
			}
		}
		case  CARDS.SET_CARDS_STATUS: {
			return {
				...state,
				status: action.status
			}
		}


		case CARDS.SET_CARD_ID: {
			return {
				...state,
				cardId: action.id
			}
		}
		default:
			return state
	}
}


export const setCardsAC = (cards: Array<CardType>) => ({type: CARDS.SET_CARDS, cards} as const)
export const setCardsStatusAC = (status: RequestStatusType) => ({type: CARDS.SET_CARDS_STATUS, status} as const)
export const setCardIdAC = (id: string) => ({type: CARDS.SET_CARD_ID, id} as const)


export const getCardsTC = (cardsPack_id: string): ThunkType => (dispatch, getState) => {
	dispatch(setCardsStatusAC('loading'))

	cardsAPI.getCards(cardsPack_id)
		.then(res => {
			dispatch(setCardsAC(res.cards))

		})
		.catch()
		.finally(() => {
			dispatch(setCardsStatusAC('succeeded'))
		})
}

export const addCardTC = (cardsPack_id: string, question?: string, answer?: string): ThunkType => (dispatch, getState) => {
	dispatch(setCardsStatusAC('loading'))
	const newCard = {
		cardsPack_id,
		question,
		answer
	}
	cardsAPI.addNewCard(newCard)
		.then(() => {
			dispatch(getCardsTC(cardsPack_id))
		})
		.catch()
		.finally(() => {
			dispatch(setCardsStatusAC('succeeded'))
		})
}



export const deleteCardTC = (packId: string, cardsPack_id: string): ThunkType => (dispatch, getState) => {
	dispatch(setCardsStatusAC('loading'))
	cardsAPI.deleteCard(cardsPack_id)
		.then((res) => {
			dispatch(getCardsTC(packId))
		})
		.catch()
		.finally(() => {
			dispatch(setCardsStatusAC('succeeded'))
		})
}


type ActionsType =
	| ReturnType<typeof setCardsAC>
	| ReturnType<typeof setCardsStatusAC>
	| ReturnType<typeof setCardIdAC>

export type ThunkType = ThunkAction<void, AppStoreType, Dispatch<ActionsType>, ActionsType>

