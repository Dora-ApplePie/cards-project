import axios, {AxiosError} from 'axios';
import {cardNameAPI, CardsTypeResponseType, CardType,} from '../cardName-api/cardName-api';
import {AppStoreType, AppThunk} from "../../../../app/store";
import {Dispatch} from "redux";
import {getStatusAC, setAppErrorAC} from "../../../../app/app-reducer";

const initialState: CardsNameStateType = {
    cards: [] as CardType[],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 5,
    packUserId: '',
    token: '',
    tokenDeathTime: 0,
    cardsPack_id: '',
    cardQuestion: '',
    name: '',
    cardAnswer: '',
    sortCards: '',
    cardId: '',
    question: '',
    answer: '',
    min: 0,
    max: 0,
}

export const cardsNameReducer = (state: CardsNameStateType = initialState, action: CardsNameActionsType): CardsNameStateType => {
    switch (action.type) {
        case 'CARDS-NAME/SET-CARDS-PARAMS':
            return {...state, ...action.data};
        case 'CARDS-NAME/SET-USER-CARD-NAME':
            return {...state, name: action.name};
        case 'CARDS-NAME/SET-CARDS-PAGE':
            return {...state, page: action.page};
        case 'CARDS-NAME/SET-CARDS-PAGE-COUNT':
            return {...state, pageCount: action.pageCount};
        case 'CARDS-NAME/SET-USER-ID':
            return {...state, cardsPack_id: action.userId};
        case 'CARDS-NAME/SET-SORT-CARDS':
            return {...state, sortCards: action.sortCards};
        default:
            return state;
    }
};



export const setUserCardId = (userId: string) => ({
    type: 'CARDS-NAME/SET-USER-ID',
    userId,
} as const);

export const setUserCardName = (name: string| null) => ({
    type: 'CARDS-NAME/SET-USER-CARD-NAME',
    name,
} as const);

export const getCardsNameData = (data: CardsTypeResponseType) => ({
    type: 'CARDS-NAME/SET-CARDS-PARAMS',
    data,
} as const);

export const setCardsPage = (page: number) => ({
    type: 'CARDS-NAME/SET-CARDS-PAGE',
    page,
} as const);

export const setCardsPageCount = (pageCount: number) => ({
    type: 'CARDS-NAME/SET-CARDS-PAGE-COUNT',
    pageCount,
} as const);

export const setSortCards = (sortCards: string) => ({
    type: 'CARDS-NAME/SET-SORT-CARDS',
    sortCards,
} as const);

export const fetchCardsTC = (): AppThunk => async (dispatch: Dispatch, getState: () => AppStoreType) => {
    const {
        cardsPack_id,
        page,
        pageCount,
        packUserId,
        cardQuestion,
        cardAnswer,
        min,
        max,
        sortCards
    } = getState().cardPack;

    const params = {cardsPack_id, page, pageCount, packUserId, cardQuestion, cardAnswer, min, max, sortCards};

    dispatch(getStatusAC('loading'));

    try {
        const res = await cardNameAPI.getCard(params);
        dispatch(getCardsNameData(res.data));
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        if (axios.isAxiosError(err)) {
            dispatch(setAppErrorAC(err.response ? err.response.data.error : err.message));
        }
    } finally {
        dispatch(getStatusAC('idle'));
    }
}


export type CardsNameStateType = CardsTypeResponseType & {
    cardsPack_id: string
    cardQuestion?: string
    name: string | null
    cardId: string
    question: string
    answer: string
    cardAnswer: string
    sortCards: string
    min: number
    max: number
}

export type CardsNameActionsType =
    | ReturnType<typeof getCardsNameData>
    | ReturnType<typeof setCardsPage>
    | ReturnType<typeof setCardsPageCount>
    | ReturnType<typeof setUserCardId>
    | ReturnType<typeof setUserCardName>
    | ReturnType<typeof setSortCards>

