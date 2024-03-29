import * as React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import {addCardTC, setCardsPage, setCardsPageCount, setSearchQuestion} from '../cardsReducer';
import {useNavigate} from 'react-router-dom';
import {TableContainerCards} from './TableContainerCards';
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {PaginationComponent} from "../../Packs/PaginationComponent/PaginationComponent";
import Button from '@mui/material/Button';
import {ChangeEvent, useEffect, useState} from "react";
import {ModalCard} from "../../../common/Modal/ModalCard";
import {Search} from "../../../common/Search/Search";
import useDebounce from "../../../utils/useDebounce";

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

    const [value, setValue] = useState('');
    const [activeModal, setActiveModal] = useState<boolean>(false)
    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')

    const debouncedValue = useDebounce<string>(value, 500);

    useEffect(() => {
        dispatch(setSearchQuestion(debouncedValue));
        dispatch(setCardsPage(1));
    }, [debouncedValue])

    const changeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    }

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

    const onChangeTextAddHandlerFirst = (value: string) => {
        setQuestion(value)
    }
    const onChangeTextAddHandlerSecond = (value: string) => {
        setAnswer(value)
    }

    const closeModal = () => setActiveModal(false)


    return (
        <>
            <div>
                <div>
                    <IconButton disabled={status === 'loading'} onClick={onChangeNavigateHandler}>
                        <ArrowBackIcon fontSize='medium'/>
                    </IconButton>
                    <span>Back to Packs list</span>
                </div>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <h2>{packName}</h2>
                        <Button style={{backgroundColor: "#eece00", color: "purple"}} variant="contained"
                                onClick={() => {
                                    setActiveModal(true)
                                }} disabled={myId !== packUserId || status === 'loading'}>Add new card</Button>
                    </div>
                <Search value={value} callback={changeValueHandler}/>
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