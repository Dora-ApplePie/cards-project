import {packsListAPI, PacksParamsResponseType, PackType} from './packsListAPI';
import {AxiosError} from 'axios';
import {AppStoreType, AppThunk} from "../../../../app/store";
import {getStatusAC, setAppErrorAC} from "../../../../app/app-reducer";
import {Dispatch} from "redux";

const initialState: PacksListStateType = {
    cardPacks: [] as PackType[],
    page: 1,
    pageCount: 0,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    token: '',
    tokenDeathTime: 0,
    packName: '',
    packId: '',
}

export const packsListReducer = (state: PacksListStateType = initialState, action: PacksListActionsType): PacksListStateType => {
    switch (action.type) {
        case 'PACKS-LIST/SET-PACKS-LIST-PARAMS':
        case 'PACKS-LIST/SET-PACK-MODAL-PARAMS':
            return {...state, ...action.data};
        default:
            return state;
    }
};

const setPacksListData = (data: PacksParamsResponseType) => ({
    type: 'PACKS-LIST/SET-PACKS-LIST-PARAMS',
    data,
} as const);
export const setPackModalParams = (data: { packId: string, packName?: string }) => ({
    type: 'PACKS-LIST/SET-PACK-MODAL-PARAMS',
    data,
} as const);


export const fetchCardPacks = (): AppThunk => (dispatch: Dispatch, getState: () => AppStoreType) => {
    const {pageCount, page, packName, sortPacks, user_id, min, max} = getState().tablePacks;
    const params = {
        packName,
        sortPacks,
        page,
        pageCount,
        user_id,
        min,
        max,
    }

    dispatch(getStatusAC('loading'));
    packsListAPI.getPacks(params)
        .then(res => {
            dispatch(setPacksListData(res.data));
        })
        .catch((e: AxiosError<{ error: string }>) => {
            dispatch(setAppErrorAC(e.response ? e.response.data.error : e.message));
        })
        .finally(() => {
            dispatch(getStatusAC('idle'));
        })
}

export type PacksListActionsType = ReturnType<typeof setPacksListData> | ReturnType<typeof setPackModalParams>

type PacksListStateType = PacksParamsResponseType & {
    packName: string
    packId: string
}