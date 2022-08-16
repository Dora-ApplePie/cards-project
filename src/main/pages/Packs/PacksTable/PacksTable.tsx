import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from './PacksTable.module.css';
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import TableCell from "@mui/material/TableCell";
import {TableRowItem} from "./TableRowItem/TableRowItem";
import {setCardsPageCount, setPage, setSearchPackName, setSortPackName} from "./packsTableReducer";
import {PaginationComponent} from "../PaginationComponent/PaginationComponent";
import {Search} from '../../../common/Search/Search';
import useDebounce from "../../../utils/useDebounce";


const PacksTable = () => {

    const status = useAppSelector(state => state.app.status)
    const cardPacks = useAppSelector(state => state.packList.cardPacks);

    const [value, setValue] = useState('');
    const debouncedValue = useDebounce<string>(value, 1000);

    useEffect(() => {
        dispatch(setSearchPackName(debouncedValue));
        dispatch(setPage(1));
    }, [debouncedValue])

    const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    }

    const [cardsCount, setCardsCount] = useState<'0cardsCount' | '1cardsCount'>('0cardsCount');
    const [updated, setUpdated] = useState<'0updated' | '1updated'>('1updated');
    const dispatch = useAppDispatch();

    const totalCardsCount = useAppSelector(state => state.packList.cardPacksTotalCount);
    const pageCount = useAppSelector(state => state.tablePacks.pageCount);
    const page = useAppSelector(state => state.tablePacks.page);

    //pagination
    const handleChangePage = (page: number) => {
        dispatch(setPage(page));
    }

    const handleChangeValueSelect = (value: number) => {
        dispatch(setCardsPageCount(value));
    }

    //sort
    const handleCardsCount = () => {
        setCardsCount(cardsCount === '0cardsCount' ? '1cardsCount' : '0cardsCount');
        cardsCount && dispatch(setSortPackName(cardsCount));
    }

    const handleSortUpdated = () => {
        setUpdated(updated === '0updated' ? '1updated' : '0updated');
        updated && dispatch(setSortPackName(updated));
    }

    return (
        <>
            <Search value={value} callback={handleChangeValue}/>
            <Paper elevation={3} style={{background: 'rgba(255, 255, 255, 0.7)'}}>
                <div className={styles.search}>
                </div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{display: 'grid', gridTemplateColumns: '21% 15% 19% 17% 28%'}}>
                                <TableCell>
                                    <b>Name</b>
                                </TableCell>
                                <TableCell align="center">
                                    <TableSortLabel
                                        active={true}
                                        disabled={status === 'loading'}
                                        direction={cardsCount === '0cardsCount' ? 'asc' : 'desc'}
                                        onClick={handleCardsCount}
                                    >
                                    </TableSortLabel>
                                    <b>Cards</b>
                                </TableCell>
                                <TableCell align="center">
                                    <TableSortLabel
                                        active={true}
                                        disabled={status === 'loading'}
                                        direction={updated === '0updated' ? 'asc' : 'desc'}
                                        onClick={handleSortUpdated}
                                    >
                                    </TableSortLabel>
                                    <b>Last Updated</b>
                                </TableCell>
                                <TableCell align="center">
                                    <b>Created by</b>
                                </TableCell>
                                <TableCell align="center">
                                    <b>Actions</b>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cardPacks.length ? cardPacks.map(({
                                                                   _id,
                                                                   name,
                                                                   cardsCount,
                                                                   updated,
                                                                   user_name,
                                                                   user_id
                                                               }) => (<TableRowItem
                                    key={_id}
                                    _id={_id}
                                    name={name}
                                    cardsCount={cardsCount}
                                    updated={updated}
                                    user_name={user_name}
                                    user_id={user_id}
                                    status={status}/>
                            )) : (
                                <TableRow>
                                    <TableCell className={styles.loading_packs}>{'No packs yet'}</TableCell>
                                </TableRow>)}
                        </TableBody>
                    </Table>
                </TableContainer>
                <PaginationComponent
                    totalCardsCount={totalCardsCount}
                    pageCount={pageCount}
                    page={page}
                    title="Cards per Page"
                    disable={status === 'loading'}
                    onChangePage={handleChangePage}
                    onChangeValue={handleChangeValueSelect}
                />
            </Paper>
        </>
    )
};

export default PacksTable;