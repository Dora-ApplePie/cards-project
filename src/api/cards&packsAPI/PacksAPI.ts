import axios from 'axios';
import {PackType} from '../../main/pages/Packs/packsReducer';
import {instance} from "../instance/instance";


export const packsAPI = {
    getPacksData(packName: string, min: number, max: number, sortPacks: string, page: number = 1, pageCount: number = 20, myId: string | null) {
        return instance.get<ResponseGetPacksType>(`cards/pack?pageCount=${pageCount}&page=${page}&packName=${packName}&sortPacks=${sortPacks}&min=${min}&max=${max}&user_id=${myId === null ? '' : myId}`).then(response => response.data)
    },
    addPack(newPack: any) {
        return instance.post('cards/pack', {cardsPack: newPack}).then(response => response.data)
    },
    deletePack(PackId: string | null) {
        return instance.delete(`cards/pack?id=${PackId}`).then(response => response.data)
    },
    updatePack(updatePack: any) {
        return instance.put('cards/pack', {cardsPack: updatePack}).then(response => response.data)
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
