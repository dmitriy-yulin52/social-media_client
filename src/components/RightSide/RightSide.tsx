import * as React from 'react';
import './RightSide.scss'
import {TrendCard} from "../TrendCard/TrendCard";
import {useCallback, useState} from "react";
import {ShareModal} from "../ShareModal/ShareModal";
import {NavIcons} from "../NavIcons/NavIcons";


type RightSideProps = {};
export const RightSide = (props: RightSideProps) => {

    const [modalOpened, SetModalOpened] = useState<boolean>(false)

    const onClickOpenModal = useCallback(() => {
        SetModalOpened(!modalOpened)
    }, [SetModalOpened, modalOpened])

    return (
        <div className={'RightSide'}>
            <NavIcons/>
            <TrendCard/>
            <button className={'button r-button'} onClick={onClickOpenModal}>
                Поделиться
            </button>
            <ShareModal open={modalOpened} onOpenModal={onClickOpenModal}/>
        </div>
    );
};