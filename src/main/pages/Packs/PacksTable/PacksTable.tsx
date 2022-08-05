import React, {useState} from 'react';
import styles from './PacksTable.module.css';
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableCell from "@mui/material/TableCell";
import {TableRowItem} from "./TableRowItem/TableRowItem";
import {setCardsPageCount, setPage, setSortPackName} from "./packsTableReducer";
import {PaginationComponent} from "../Pagination/PaginationComponent";


const PacksTable = () => {

    const status = useAppSelector(state => state.app.status)
    const cardPacks = useAppSelector(state => state.packList.cardPacks);

    const [name, setName] = useState<'0name' | '1name'>('0name');
    const [cardsCount, setCardsCount] = useState<'0cardsCount' | '1cardsCount'>('0cardsCount');
    const [updated, setUpdated] = useState<'0updated' | '1updated'>('0updated');
    const [userName, setUserName] = useState<'0user_name' | '1user_name'>('0user_name');

    const dispatch = useAppDispatch();

    //pagination

    const totalCardsCount = useAppSelector(state => state.packList.cardPacksTotalCount);
    const pageCount = useAppSelector(state => state.tablePacks.pageCount);
    const page = useAppSelector(state => state.tablePacks.page);

    const handleChangePage = (page: number) => {
        dispatch(setPage(page));
    }

    const handleChangeValueSelect = (value: number) => {
        dispatch(setCardsPageCount(value));
    }

    const handleNameSort = () => {
        setName(name === '0name' ? '1name' : '0name');
        name && dispatch(setSortPackName(name));
    }

    const handleCardsCount = () => {
        setCardsCount(cardsCount === '0cardsCount' ? '1cardsCount' : '0cardsCount');
        cardsCount && dispatch(setSortPackName(cardsCount));
    }

    const handleSortUpdated = () => {
        setUpdated(updated === '0updated' ? '1updated' : '0updated');
        updated && dispatch(setSortPackName(updated));
    }

    const handleSortUserName = () => {
        setUserName(userName === '0user_name' ? '1user_name' : '0user_name');
        userName && dispatch(setSortPackName(userName));
    }

    return (
        <div className={styles.table_wrapper}>
            <TableContainer className={styles.table_container}>
                <Table>
                    <TableHead>
                        <TableRow sx={{display: 'grid', gridTemplateColumns: '21% 15% 19% 17% 28%'}}>
                            <TableCell>
                                <TableSortLabel
                                    active={true}
                                    disabled={status === 'loading'}
                                    direction={name === '1name' ? 'asc' : 'desc'}
                                    onClick={handleNameSort}
                                >
                                </TableSortLabel>
                                <b>Name</b>
                            </TableCell>
                            <TableCell align="center">
                                <TableSortLabel
                                    active={true}
                                    disabled={status === 'loading'}
                                    direction={cardsCount === '1cardsCount' ? 'asc' : 'desc'}
                                    onClick={handleCardsCount}
                                >
                                </TableSortLabel>
                                <b>Cards</b>
                            </TableCell>
                            <TableCell align="center">
                                <TableSortLabel
                                    active={true}
                                    disabled={status === 'loading'}
                                    direction={updated === '1updated' ? 'asc' : 'desc'}
                                    onClick={handleSortUpdated}
                                >
                                </TableSortLabel>
                                <b>Last Updated</b>
                            </TableCell>
                            <TableCell align="center">
                                <TableSortLabel
                                    active={true}
                                    disabled={status === 'loading'}
                                    direction={userName === '1user_name' ? 'asc' : 'desc'}
                                    onClick={handleSortUserName}
                                >
                                </TableSortLabel>
                                <b>Created by</b>
                            </TableCell>
                            <TableCell align="center">
                                <b>Actions</b>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cardPacks.length ? cardPacks.map(({_id, name, cardsCount, updated, user_name, user_id}) => (
                            <TableRowItem
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
                                <TableCell className={styles.loading_packs}>{'Loading packs...'}</TableCell>
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
        </div>
    )
};

export default PacksTable;