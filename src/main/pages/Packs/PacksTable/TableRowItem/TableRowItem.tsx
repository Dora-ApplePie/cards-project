import React from 'react';
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

type TableRowPackType = {
    _id: string
    name: string | null
    cardsCount: number | null
    updated: Date | null
    user_name: string | null
    user_id: string | null
    status: RequestStatusType
}


export const TableRowItem = memo((props: TableRowPackType) => {
    const {_id, user_id, name, cardsCount, updated, user_name, status} = props;

    const userId = useAppSelector(state => state.login._id);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const handleSendPackId = () => {
        dispatch(setUserCardId(_id));
        dispatch(setUserCardName(name));
        navigate(PATH.PACKS + '/' + PATH.CARDS);
    };

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
                    {new Date().toLocaleDateString()}
                </TableCell>
                <TableCell className={styles.sell}>
                    {user_name}
                </TableCell>
                <TableCell align="center" className={styles.ButtonGroup}>
                    {userId === user_id
                        ? <>
                        </> : null}
                    <Button color="secondary" type={'submit'} variant="outlined"
                            disabled={!cardsCount || status === 'loading'}>Learn</Button>
                </TableCell>
            </TableRow>
        </>
    )
});