import React, {useEffect} from 'react';
import './App.css';
import Main from "../main/Main";
import {CircularProgress, LinearProgress} from "@mui/material";
import {useAppDispatch, useAppSelector} from "./hooks";
import {initializeAppTC} from "./app-reducer";

function App() {

    const dispatch = useAppDispatch();
    const isInitialized = useAppSelector((state) => state.app.initialized)

    useEffect(() => {
        dispatch(initializeAppTC())
    },[dispatch])

    if(!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <Main/>
        </div>
    );
}

export default App;
