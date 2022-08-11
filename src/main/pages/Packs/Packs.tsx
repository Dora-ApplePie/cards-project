import Button from '@mui/material/Button';
import React, {useState} from 'react';
import {RequestStatusType} from '../../../app/app-reducer';
import PacksTable from "./PacksTable/PacksTable";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import s from './Packs.module.css'
import Stack from '@mui/material/Stack';
import {ModalBase} from '../../common/Modal/ModalBase';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {addPackTC} from "./packsListReducer";

type PacksPropsType = {
    status: RequestStatusType
    getAllPacks: () => void
    getOnlyMyPacks: () => void
    addPackHandler: () => void
    deletePack: (id: string) => void
    changeName: (id: string) => void
}

export const Packs = (props: PacksPropsType) => {
    const dispatch = useAppDispatch()
    const [activeModal, setActiveModal] = useState<boolean>(false)
    const [packName, setPackName] = useState<string>('')
    const packId = useAppSelector(state => state.cardPack.cardsPack_id);


    const onClickAddPackHandler = () => {
        dispatch(addPackTC(packName))
        closeModal()
        setPackName('')
    }

    const closeModal = () => {
        setActiveModal(false)
        setPackName('')
    }
    const onChangeTextHandler = (value: string) => setPackName(value)



    return (
        <div>
            <span className={s.Addbtn}>
                <Stack direction='row' spacing={2}>
                    <Button color='success' variant="contained" onClick={props.getAllPacks}>All packs</Button>
                    <Button color='success' variant="contained" onClick={props.getOnlyMyPacks}>My packs</Button>
                </Stack>
                <div>
                    <Button color='success' variant="contained" startIcon={<LibraryAddIcon/>}
                            onClick={()=>{setActiveModal(true)}}
                            disabled={props.status === 'loading'}>
                        Add pack
                    </Button>
                </div>

                {activeModal && <ModalBase
                    packId={packId}
                    closeModal={closeModal}
                    input={packName}
                    onChangeText={onChangeTextHandler}
                    addNewItemHandler={onClickAddPackHandler}
                    isAddingForm={true}
                    title='Please, enter the name of the pack'/>}
            </span>
            <PacksTable/>
        </div>
    )
}