import axios from 'axios';

const instance = axios.create({
	// baseURL: 'https://neko-back.herokuapp.com/2.0/',
	baseURL: 'http://localhost:7542/2.0/',
	withCredentials: true
})

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
	getCards: async (cardsPack_id: string, pageCount: number = 50, page: number = 1) => {
		const response = await instance.get(`cards/card?cardsPack_id=${cardsPack_id}&pageCount=${pageCount}&page=${page}`)
		return response.data
	},
	addNewCard: async (newCard: newCardType) => {
		const response = await instance.post('cards/card', {card: newCard})
		return response.data
	},
	updateCard: async (updateCard: updateCardType) => {
		const response = await instance.put('cards/card', {card: updateCard})
		return response.data
	},
	deleteCard: async (cardsPack_id: string) => {
		const response = await instance.delete(`cards/card?id=${cardsPack_id}` )
		return response.data
	}
}