import React, {useState} from 'react';
import {setSortCards} from '../cardsReducer';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell/TableCell';
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {TableCardRow} from './TableCardRow';

export const TableContainerCards = () => {

    const cards = useAppSelector(state => state.cardPack.cards)
    const status = useAppSelector(state => state.app.status)
    const [grade, setGrade] = useState<'0grade' | '1grade'>('0grade');
    const dispatch = useAppDispatch();


    const handleSortGrade = () => {
        setGrade(grade === '0grade' ? '1grade' : '0grade');
        grade && dispatch(setSortCards(grade));
    }

    return (
        <Table>
            <Paper elevation={3} style={{background: 'rgba(255, 255, 255, 0.7)'}}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="justify">
                                    <b>Question</b>
                                </TableCell>
                                <TableCell align="justify">
                                    <b>Answer</b>
                                </TableCell>
                                <TableCell align="justify">
                                    <b>Updated</b>
                                </TableCell>
                                <TableCell align="justify">
                                    <TableSortLabel
                                        active={true}
                                        disabled={status === 'loading'}
                                        direction={grade === '1grade' ? 'asc' : 'desc'}
                                        onClick={handleSortGrade}>
                                    </TableSortLabel>
                                    <b>Grade</b>
                                </TableCell>
                                <TableCell align="justify">
                                    <b>Actions</b>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cards.length
                                ? cards.map(({answer, question, updated, _id, grade}) => (<TableCardRow
                                    key={_id}
                                    answer={answer}
                                    question={question}
                                    updated={updated}
                                    _id={_id}
                                    grade={grade}
                                />))
                                : (
                                    <TableRow>
                                        <TableCell><h3>No cards yet</h3></TableCell>
                                    </TableRow>)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Table>
    )
};

