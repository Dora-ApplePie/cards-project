import React, {useState} from 'react';
import {memo} from 'react';
import styles from './TableRowItem.module.css';
import {RequestStatusType} from "../../../../../app/app-reducer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import {useAppDispatch, useAppSelector} from "../../../../../app/hooks";
import {IconButton} from "@mui/material";
import {PATH} from "../../../../Routes/Routes";
import {setUserCardId, setUserCardName} from "../../../Cards/reducer/packCardReducer";
import {useNavigate} from "react-router-dom";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import {ModalConfirm} from "../../../../common/Modal/ModalConfirm/ModalConfirm";
import {deletePackTC, updatePackTC} from "../../packsListReducer";
import { ModalBase } from '../../../../common/Modal/ModalBase';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import SchoolIcon from '@mui/icons-material/School';

import {grey} from "@mui/material/colors";


type TableRowPackType = {
    _id: string
    name: string
    cardsCount: number
    updated: string
    user_name: string
    user_id: string
    status: RequestStatusType
}


export const TableRowItem = memo((props: TableRowPackType) => {
    const [activeModalDelete, setActiveModalDelete] = useState<boolean>(false)
    const [activeModalUpdate, setActiveModalUpdate] = useState<boolean>(false)
    const [value, setValue] = useState<string>('')

    const {_id, user_id, name, cardsCount, updated, user_name, status} = props;


    const userId = useAppSelector(state => state.profile.myId);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const handleSendPackId = () => {
        dispatch(setUserCardId(_id));
        dispatch(setUserCardName(name));
        navigate(PATH.CARDS + `/${_id}`);
    };

    const confirmRemovePack = (packId: string) => {
        console.log('packId', packId)
        dispatch(deletePackTC(packId))
        closeDeleteModalForm()
    }

    const closeDeleteModalForm = () => {
        setActiveModalDelete(false)
    }

    const closeUpdateModalForm = () => {
        setActiveModalUpdate(false)

    }

    const onChangeTextUpdateHandler = (value: string) => {
        setValue(value)
    }
    const closeUpdateModal = () => {
        closeUpdateModalForm()
        setValue('')
    }

    const updatePack = (packId: string, value: string) => {
        dispatch(updatePackTC(packId, value))
        closeUpdateModalForm()
        setValue('')
    }

    return (
        <>
            <TableRow sx={{display: 'grid', gridTemplateColumns: '25% 8% 24% 15% 28%'}}>
                <TableCell component="th" scope="row" className={styles.sell}>
                    <span style={{display: 'inline-block', flex: '1 1 auto'}}>{name}</span>
                    <IconButton
                        disabled={status === 'loading'}
                        aria-label="expand row"
                        size="small"
                        onClick={handleSendPackId}
                    >
                        <DriveFolderUploadIcon/>
                    </IconButton>
                </TableCell>
                <TableCell className={styles.sell}>{cardsCount}</TableCell>
                <TableCell className={styles.sell}>
                    {new Date(updated).toLocaleDateString()}
                </TableCell>
                <TableCell className={styles.sell}>
                    {user_name}
                </TableCell>
                <TableCell align="center" className={styles.ButtonGroup}>

                    <>
                        <Button onClick={() => {setActiveModalUpdate(true)}} disabled={user_id !== userId || status === 'loading'} startIcon={<SettingsIcon />}/>

                        {activeModalUpdate && <ModalBase
                            packId={_id}
                            isAddingForm={false}
                            closeModal={closeUpdateModal}
                            input={value}
                            onChangeText={onChangeTextUpdateHandler}
                            addTextHandler={updatePack}
                            title='Please, enter new pack name'
                        />}

                        <Button onClick={() => {setActiveModalDelete(true)}} disabled={user_id !== userId || status === 'loading'} startIcon={<DeleteIcon/>}/>

                        {activeModalDelete && <ModalConfirm
                            cardId={'zaglushka'}
                            packID={_id}
                            confirmHandler={confirmRemovePack}
                            cancelHandler={closeDeleteModalForm}
                            title='Are you sure you want to delete this pack?'/>
                        }
                    </>

                    <Button color="secondary" type={'submit'} variant="outlined"
                            disabled={!cardsCount || status === 'loading'}><SchoolIcon/></Button>
                </TableCell>
            </TableRow>
        </>
    )
});