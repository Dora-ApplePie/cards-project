import react from 'React';
import {HashRouter} from "react-router-dom";
import Routes from "./Routes/Routes";
import Header from "./Header/Header";
import React from "react";

const Main = () => {
    return (
        <>
            <HashRouter>

            <Header/>
            <Routes/>

            </HashRouter>
        </>
    )
}

export default Main