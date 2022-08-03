import * as React from 'react';
import './RightSide.scss'

import Home from '../../assets/img/home.png'
import Noti from '../../assets/img/noti.png'
import Comment from '../../assets/img/comment.png'
import {UilSetting} from '@iconscout/react-unicons'
import {TrendCard} from "../TrendCard/TrendCard";


type RightSideProps = {};
export const RightSide = (props: RightSideProps) => {
    return (
        <div className={'RightSide'}>
            <div className="navIcons">
                <img src={Home} alt="Home"/>
                <UilSetting/>
                <img src={Noti} alt="Notifications"/>
                <img src={Comment} alt="Comment"/>
            </div>
            <TrendCard/>
            <button className={'button r-button'}>
                Поделиться
            </button>
        </div>
    );
};