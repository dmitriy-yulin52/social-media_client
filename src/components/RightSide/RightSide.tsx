import * as React from 'react';
import './RightSide.scss'

import Home from '../../assets/img/home.png'
import Noti from '../../assets/img/noti.png'
import Comment from '../../assets/img/comment.png'
import {UilSetting} from '@iconscout/react-unicons'
import {TrendCard} from "../TrendCard/TrendCard";
import {useCallback, useState} from "react";
import {ShareModal} from "../ShareModal/ShareModal";
import {Link} from "react-router-dom";


type RightSideProps = {};
export const RightSide = (props: RightSideProps) => {

    const [modalOpened, SetModalOpened] = useState<boolean>(false)

    const onClickOpenModal = useCallback(() => {
        SetModalOpened(!modalOpened)
    }, [SetModalOpened, modalOpened])

    return (
        <div className={'RightSide'}>
            <div className="navIcons">
                <Link to={'../home'}>
                    <img src={Home} alt="Home"/>
                </Link>
                <UilSetting/>
                <img src={Noti} alt="Notifications"/>
                <img src={Comment} alt="Comment"/>
            </div>
            <TrendCard/>
            <button className={'button r-button'} onClick={onClickOpenModal}>
                Поделиться
            </button>
            <ShareModal open={modalOpened} onOpenModal={onClickOpenModal}/>
        </div>
    );
};