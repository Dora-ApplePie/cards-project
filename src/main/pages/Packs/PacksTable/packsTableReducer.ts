const initialState: TablePacksType = {
    packName: '',
    sortPacks: '',
    page: 1,
    pageCount: 20,
    user_id: '',
    min: 0,
    max: 110,
    packId: '',
    name: ''
};

export const packsTableReducer = (state: TablePacksType = initialState, action: TablePacksActionsType): TablePacksType => {
  switch (action.type) {
        case 'TABLE-PACKS/SET-PAGE':
            return {...state, page: action.page};
        case 'TABLE-PACKS/SET-PAGE-COUNT':
            return {...state, pageCount: action.pageCount};
        case 'TABLE-PACKS/SET-SORT-PACK-NAME':
            return {...state, sortPacks: action.sortPackName};
        default:
            return state;
    }
};

export const setPage = (page: number) => ({
    type: 'TABLE-PACKS/SET-PAGE',
    page,
} as const);

export const setCardsPageCount = (pageCount: number) => ({
    type: 'TABLE-PACKS/SET-PAGE-COUNT',
    pageCount,
} as const);

export const setSortPackName = (sortPackName: string) => ({
    type: 'TABLE-PACKS/SET-SORT-PACK-NAME',
    sortPackName,
} as const);


export type TablePacksActionsType =
    | ReturnType<typeof setPage>
    | ReturnType<typeof setCardsPageCount>
    | ReturnType<typeof setSortPackName>

export type TablePacksType = {
    packName: string
    sortPacks: string
    page: number
    pageCount: number
    user_id: string
    min: number
    max: number,
    packId: string,
    name: string
}