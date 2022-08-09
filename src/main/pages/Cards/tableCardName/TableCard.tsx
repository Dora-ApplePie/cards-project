import * as React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import {addCardTC, setCardsPage, setCardsPageCount} from '../cardsReducer';
import {useNavigate} from 'react-router-dom';
import {TableContainerCards} from './TableContainerCards';
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {PaginationComponent} from "../../Packs/Pagination/PaginationComponent";
import Button from '@mui/material/Button';
import {useState} from "react";
import {ModalCard} from "../../../common/Modal/ModalCard/ModalCard";
import st from './../../Packs/Packs.module.css'

export const TableCard = () => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const myId = useAppSelector(state => state.profile.profile._id)
    const page = useAppSelector(state => state.cardPack.page);
    const totalCardsCount = useAppSelector(state => state.cardPack.cardsTotalCount);
    const pageCount = useAppSelector(state => state.cardPack.pageCount);
    const packName = useAppSelector(state => state.cardPack.name);
    const packUserId = useAppSelector(state => state.cardPack.packUserId);
    const cardsPackId = useAppSelector(state => state.cardPack.cardsPack_id);
    const status = useAppSelector(state => state.app.status);

    const [activeModal, setActiveModal] = useState<boolean>(false)
    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')

    const addNewCardHandler = () => {
        dispatch(addCardTC(cardsPackId, question, answer))
        closeModal()
        setQuestion('')
        setAnswer('')
    }

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

    const onChangeTextAddHandlerFirst = (value: string) => {setQuestion(value)}
    const onChangeTextAddHandlerSecond = (value: string) => {setAnswer(value)}

    const closeModal = () => setActiveModal(false)


    return (
        <>
            <div>
                <span className={st.Addcardbtn}>
                    <IconButton disabled={status === 'loading'} onClick={onChangeNavigateHandler}>
                    <ArrowBackIcon fontSize="small"/>
                </IconButton>

                    <div>
                        <Button onClick={() => {
                            setActiveModal(true)
                        }} disabled={myId !== packUserId || status === 'loading'}>Add card</Button>
                    </div>
                </span>

                {activeModal && <ModalCard onChangeQuestion={onChangeTextAddHandlerFirst}
                                           onChangeAnswer={onChangeTextAddHandlerSecond}
                                           closeModal={closeModal}
                                           question={question}
                                           answer={answer}
                                           addTextHandler={addNewCardHandler}
                                           title='Please, enter the question and answer'
                                           cardId={cardsPackId}
                                           packId={cardsPackId}
                />}


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