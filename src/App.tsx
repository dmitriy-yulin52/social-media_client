import React from 'react';
import './App.scss'
import {Home} from "./pages/home/Home";

function App() {
    return (
        <div className={'App'}>
            <div className={'blur'}></div>
            <div className={'blur'}></div>
            <Home/>
        </div>
    );
}

export default App;
