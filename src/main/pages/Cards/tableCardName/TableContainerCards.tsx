import React, {useState} from 'react';
import {deleteCardTC, setSortCards, updateCardTC} from '../cardsReducer';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell/TableCell';
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import FavoriteIcon from '@mui/icons-material/Grade';
import FavoriteBorderIcon from '@mui/icons-material/Grade';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CreateIcon from '@mui/icons-material/Create';
import {Rating} from '@mui/material';
import {ModalConfirmDelete} from "../../../common/Modal/ModalConfirmDelete";
import {ModalCard} from '../../../common/Modal/ModalCard';

export const TableContainerCards = () => {
    const [question, setQuestion] = useState<'0question' | '1question'>('0question');
    const [answer, setAnswer] = useState<'0answer' | '1answer'>('0answer');
    const [updated, setUpdated] = useState<'0updated' | '1updated'>('1updated');
    const [grade, setGrade] = useState<'0grade' | '1grade'>('0grade');
    const [activeModalDelete, setActiveModalDelete] = useState<boolean>(false)
    const [activeModalUpdate, setActiveModalUpdate] = useState<boolean>(false)
    const [updateQuestion, setUpdateQuestion] = useState<string>('')
    const [updateAnswer, setUpdateAnswer] = useState<string>('')


    const myId = useAppSelector(state => state.profile.myId)
    const userId = useAppSelector(state => state.cardPack.packUserId)
    const cards = useAppSelector(state => state.cardPack.cards)
    const status = useAppSelector(state => state.app.status)
    const cardsPack_id = useAppSelector(state => state.cardPack.cardsPack_id)

    const dispatch = useAppDispatch();

    const disabled = myId !== userId || status === 'loading'


    const confirmRemoveCard = (cardsId: string) => {
        dispatch(deleteCardTC(cardsPack_id, cardsId))
        closeDeleteModalForm()
    }

    const closeDeleteModalForm = () => {
        setActiveModalDelete(false)
    }

    const closeUpdateModalForm = () => {
        setActiveModalUpdate(false)
    }


    const handleSortQuestion = () => {
        setQuestion(question === '0question' ? '1question' : '0question');
        question && dispatch(setSortCards(question));
    }

    const handleSortAnswer = () => {
        setAnswer(answer === '0answer' ? '1answer' : '0answer');
        answer && dispatch(setSortCards(answer));
    }

    const handleSortUpdated = () => {
        setUpdated(updated === '0updated' ? '1updated' : '0updated');
        updated && dispatch(setSortCards(updated));
    }

    const handleSortGrade = () => {
        setGrade(grade === '0grade' ? '1grade' : '0grade');
        grade && dispatch(setSortCards(grade));
    }

    const onChangeQuestionUpdateHandler = (value: string) => {
        setUpdateQuestion(value)
    }
    const onChangeAnswerUpdateHandler = (value: string) => {
        setUpdateAnswer(value)
    }

    const updateCard = (cardId: string, question: string, answer: string) => {
        dispatch(updateCardTC(cardsPack_id, cardId, question, answer))
        closeUpdateModalForm()
        setUpdateQuestion('')
        setUpdateAnswer('')
    }


    return (
        <Table>
            <Paper elevation={3} style={{background: 'rgba(255, 255, 255, 0.7)'}}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="justify">
                                    <TableSortLabel
                                        active={true}
                                        disabled={status === 'loading'}
                                        direction={question === '1question' ? 'asc' : 'desc'}
                                        onClick={handleSortQuestion}>
                                    </TableSortLabel>
                                    <b>Question</b>
                                </TableCell>
                                <TableCell align="justify">
                                    <TableSortLabel
                                        active={true}
                                        disabled={status === 'loading'}
                                        direction={answer === '1answer' ? 'asc' : 'desc'}
                                        onClick={handleSortAnswer}>
                                    </TableSortLabel>
                                    <b>Answer</b>
                                </TableCell>
                                <TableCell align="justify">
                                    <TableSortLabel
                                        active={true}
                                        disabled={status === 'loading'}
                                        direction={updated === '1updated' ? 'asc' : 'desc'}
                                        onClick={handleSortUpdated}>
                                    </TableSortLabel>
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
                                ? cards.map(({answer, question, updated, _id, grade}) =>
                                    <TableRow key={_id}>
                                        <TableCell component="th" scope="row">
                                        <span style={{display: 'inline-block', flex: '1 1 auto'}}>
                                            {question}
                                        </span>
                                        </TableCell>
                                        <TableCell align="justify">{answer}</TableCell>
                                        <TableCell align="justify">
                                            {new Date(updated).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell align="justify">
                                            <Rating
                                                value={Number(grade.toFixed(1))}
                                                precision={0.1}
                                                icon={<FavoriteIcon fontSize="inherit" color="error"/>}
                                                emptyIcon={<FavoriteBorderIcon fontSize="inherit"/>}
                                                size="medium"
                                                disabled={status === 'loading'}
                                                readOnly
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <TableRow>
                                                <IconButton onClick={() => setActiveModalDelete(true)}
                                                            disabled={disabled}
                                                            aria-label="delete"
                                                >
                                                    <DeleteForeverIcon/>
                                                </IconButton>

                                                {activeModalDelete &&
                                                <ModalConfirmDelete
                                                    confirmHandler={confirmRemoveCard}
                                                    closeModal={closeDeleteModalForm}
                                                    title='Are you sure you want to delete this card?'
                                                    cardId={_id}
                                                />}
                                                <IconButton
                                                    onClick={() => setActiveModalUpdate(true)}
                                                    disabled={disabled}
                                                    aria-label="delete"
                                                >
                                                    <CreateIcon/>
                                                </IconButton>

                                                {activeModalUpdate && <ModalCard
                                                    onChangeQuestion={onChangeQuestionUpdateHandler}
                                                    onChangeAnswer={onChangeAnswerUpdateHandler}
                                                    closeModal={closeUpdateModalForm}
                                                    question={updateQuestion}
                                                    answer={updateAnswer}
                                                    addTextHandler={updateCard}
                                                    cardId={_id}
                                                    title='You can update this card'/>}
                                            </TableRow>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    <TableRow>
                                        <TableCell>Loading cards..</TableCell>
                                    </TableRow>)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Table>
    )
};

