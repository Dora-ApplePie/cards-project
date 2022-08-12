import * as React from 'react';
import Slider from '@mui/material/Slider';
import styles from './CardSlider.module.css';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {setMaxNumberCards, setMinNumberCards} from "../../pages/Packs/PacksTable/packsTableReducer";


export const CardSlider = () => {

    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const min = useAppSelector(state => state.tablePacks.min)
    const max = useAppSelector(state => state.tablePacks.max)

    const [value, setValue] = React.useState<number[]>([min, max]);

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[])
    }

    const handleClick = () => {
        dispatch(setMinNumberCards(value[0]))
        dispatch(setMaxNumberCards(value[1]))
    }

    return (
        <div>

            <h3>Number of cards</h3>
            <div>
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    onChange={handleSliderChange}
                    valueLabelDisplay="auto"
                    color={"secondary"}
                    max={110}
                    disabled={status === 'loading'}
                    onChangeCommitted={handleClick}
                />
            </div>
        </div>
    )
}