import {Dispatch} from 'redux';
import {AppStoreType} from "../../../app/store";
import {ThunkAction} from "redux-thunk";
import {getStatusAC, RequestStatusType, setAppErrorAC} from '../../../app/app-reducer';
import {packsAPI} from '../../../api/cards&packsAPI/PacksAPI';
import {AxiosError} from "axios";

enum PACKS {
    SET_PACKS = 'PACKS/SET_PACKS',
}

const initialState: initialStateType = {
    error: null,
    status: 'idle',
    packs: [],
    searchName: '',
    min: 0,
    max: 20,
    sortPacks: '',
    page: 1,
    packsPerPage: 10,
    currentPage: 1,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 24,
    packCardsId: '',
    packUserId: '',
}

export const packsReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case PACKS.SET_PACKS:
            return {
                ...state,
                packs: action.packs
            }

        default:
            return state
    }
}

//actions
export const setPacksAC = (packs: Array<PackType>) => ({type: PACKS.SET_PACKS, packs} as const)

//thunks
export const getPacksTC: any = () => (dispatch: Dispatch, getState: () => AppStoreType) => {
    dispatch(getStatusAC('loading'))

    const state = getState()
    const searchName = state.packs.searchName
    const min = state.packs.min
    const max = state.packs.max
    const sortPacks = state.packs.sortPacks
    const currentPage = state.packs.page
    const packsOnPage = state.packs.packsPerPage
    const myId = state.profile.myId

    packsAPI.getPacksData(searchName, min, max, sortPacks, currentPage, packsOnPage, myId)
        .then((res) => {
            console.log('packs',res.cardPacks)

            dispatch(setPacksAC(res.cardPacks))
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = (err.response && err.response.data) ? err.response.data.error : err.message;
            dispatch(setAppErrorAC(error));
        })
        .finally(() => {
            dispatch(getStatusAC('succeeded'))
        })
}

export const addPackTC:any = (name: string): ThunkType => (dispatch, getState) => {
    dispatch(getStatusAC('loading'))

    packsAPI.addPack({name})
        .then(response => {
            console.log(response)
            dispatch(getPacksTC())
        })
        .catch()
        .finally(() => {
            dispatch(getStatusAC('succeeded'))
        })
}

export const deletePackTC: any = (PackId: string | null): ThunkType => (dispatch) => {
    dispatch(getStatusAC('loading'))
    packsAPI.deletePack(PackId)
        .then(() => {dispatch(getPacksTC())})
        .catch((error)=>{
            console.log(error.response.data.error);
        })
        .finally(() => {
            dispatch(getStatusAC('succeeded'))
        })
}

export const updatePackTС:any = (packId: string, name: string): ThunkType => (dispatch, getState) => {
    dispatch(getStatusAC('loading'))
    const newPack = {
        _id: packId,
        name: name
    }

    packsAPI.updatePack(newPack)
        .then(() => {
            dispatch(getPacksTC())
        })
        .catch((error)=> {
            console.log(error.response.data.error);
        })
        .finally(() => {
            dispatch(getStatusAC('succeeded'))
        })
}


type ActionsType =
    ReturnType<typeof setPacksAC> | ReturnType<typeof getStatusAC>

export type PackType = {
    cardsCount: number | null
    created: Date | null
    deckCover: string | null
    grade: number | null
    more_id: string | null
    name: string | null
    path: string | null
    private: boolean
    rating: number | null
    shots: number | null
    type: string | null
    updated: Date | null
    user_id: string | null
    user_name: string | null
    __v: number | null
    _id: string
}

type initialStateType = {
    error: string | null
    status: RequestStatusType
    packs: Array<PackType>
    searchName: string
    min: number
    max: number
    sortPacks: string
    page: number
    packsPerPage: number
    currentPage: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    packCardsId: string
    packUserId: string
}


export type ThunkType = ThunkAction<void, AppStoreType, Dispatch<ActionsType>, ActionsType>
