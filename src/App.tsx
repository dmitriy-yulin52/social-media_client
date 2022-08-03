import React from 'react';
import './App.scss'
import {Home} from "./pages/home/Home";
import {Profile} from "./pages/Profile/Profile";
import {Auth} from "./pages/Auth/Auth";

function App() {
    return (
        <div className={'App'}>
            <div className={'blur'}></div>
            <div className={'blur'}></div>
            {/*<Home/>*/}
            <Profile/>
            {/*<Auth/>*/}
        </div>
    );
}

export default App;
