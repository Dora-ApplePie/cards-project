import * as React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import {setCardsPage, setCardsPageCount} from '../reducer/packCardReducer';
import {useNavigate} from 'react-router-dom';
import {TableContainerCards} from './tableContainerCards/TableContainerCards';
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {PaginationComponent} from "../../Packs/Pagination/PaginationComponent";


export const TableCard = () => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();


    const page = useAppSelector(state => state.cardPack.page);
    const totalCardsCount = useAppSelector(state => state.cardPack.cardsTotalCount);
    const pageCount = useAppSelector(state => state.cardPack.pageCount);
    const packName = useAppSelector(state => state.cardPack.name);
    const status = useAppSelector(state => state.app.status);


    const onChangePageHandler = (page: number) => {
        dispatch(setCardsPage(page));
    }

    const onChangePageCountHandler = (value: number) => {
        dispatch(setCardsPageCount(value));
        dispatch(setCardsPage(1));
    }

    const onChangeNavigateHandler = () => {
        if (status === 'idle') {
            navigate(-1);
        }
    }

    return (
        <>
            <div>
                <IconButton disabled={status === 'loading'} onClick={onChangeNavigateHandler}>
                    <ArrowBackIcon fontSize="small"/>
                </IconButton>
                <h2>{packName}</h2>
            </div>
            <TableContainerCards/>
            <div>
                <PaginationComponent
                    page={page}
                    pageCount={pageCount}
                    totalCardsCount={totalCardsCount}
                    onChangePage={onChangePageHandler}
                    onChangeValue={onChangePageCountHandler}
                    disable={status === 'loading'}
                    title="Cards per Page"
                />
            </div>
        </>
    )
};