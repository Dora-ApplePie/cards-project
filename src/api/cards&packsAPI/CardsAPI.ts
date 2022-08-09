import axios from 'axios';
import {instance} from "../login-api/loginAPI";

type newCardType = {
	cardsPack_id: string,
	question?: string,
	answer?: string
}

type updateCardType = {
	_id: string,
	question?: string,
}

export const cardsAPI = {
	getCards(cardsPack_id: string, pageCount: number = 50, page: number = 1) {
		return instance.get(`cards/card?cardsPack_id=${cardsPack_id}&pageCount=${pageCount}&page=${page}`).then(res=>res.data)
	},
	addNewCard(newCard: newCardType) {
		return  instance.post('cards/card', {card: newCard}).then(res=>res.data)
	},
	updateCard (updateCard: updateCardType) {
		return instance.put('cards/card', {card: updateCard}).then(res=>res.data)
	},
	deleteCard (cardsPack_id: string) {
		return instance.delete(`cards/card?id=${cardsPack_id}` ).then(res=>res.data)
	}
}