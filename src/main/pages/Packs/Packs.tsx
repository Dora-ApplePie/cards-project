import Button from '@mui/material/Button';
import React, {useState} from 'react';
import {RequestStatusType} from '../../../app/app-reducer';
import PacksTable from "./PacksTable/PacksTable";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import s from './Packs.module.css'
import Stack from '@mui/material/Stack';
import {ModalChangeData} from '../../common/Modal/ModalChangeData';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {addPackTC} from "./packsListReducer";
import {CardSlider} from "../../common/CardSlider/CardSlider";

type PacksPropsType = {
    status: RequestStatusType
    getAllPacks: () => void
    getOnlyMyPacks: () => void
    deletePack: (id: string) => void
}

export const Packs = (props: PacksPropsType) => {
    const dispatch = useAppDispatch()
    const [activeModal, setActiveModal] = useState<boolean>(false)
    const packId = useAppSelector(state => state.cardPack.cardsPack_id);
    const [packName, setPackName] = useState<string>('')


    const onClickAddPackHandler = () => {
        dispatch(addPackTC(packName))
        closeModal()
    }

    const closeModal = () => {
        setActiveModal(false)
    }
    const onChangeTextHandler = (value: string) => setPackName(value)

    return (
        <div>

            <div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline"}}>
                <h2 style={{fontWeight: "500"}}>Packs List</h2>
                <Button style={{backgroundColor: "#eece00", color: "purple"}}
                        variant="contained"
                        startIcon={<LibraryAddIcon/>}
                        onClick={() => {
                            setActiveModal(true)
                        }}
                        disabled={props.status === 'loading'}>
                    Add new pack
                </Button>
            </div>

            <span className={s.addBtn}>
                 <CardSlider/>

                <div>
                     <div style={{textAlign: "center", margin: "20px 0", fontWeight: "500"}}>Show packs cards</div>
                    <Stack direction='row' spacing={2}>
                    <Button style={{color: "#fcef02", margin: "0 20px"}} color='secondary' variant="contained"
                            onClick={props.getAllPacks}>All packs</Button>
                    <Button style={{backgroundColor: "#eece00", color: "purple", margin: "0 20px"}} variant="contained"
                            onClick={props.getOnlyMyPacks}>My packs</Button>
                </Stack>
                </div>
                {activeModal && <ModalChangeData
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