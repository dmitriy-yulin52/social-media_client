import * as React from 'react';
import './InfoCard.scss'
import {UilPen} from "@iconscout/react-unicons";
import {useCallback, useState} from "react";
import {ProfileModal} from "../ProfileModal/ProfileModal";

type InfoCardProps = {};
export const InfoCard = (props: InfoCardProps) => {

    const [modalOpened, SetModalOpened] = useState<boolean>(false)


    const onClickOpenModal = useCallback(() => {
        SetModalOpened(!modalOpened)
    }, [SetModalOpened,modalOpened])


    return (
        <div className={'InfoCard'}>
            <div className="infoHead">
                <h4>Ваша информация </h4>
                <div>
                    <UilPen width={'2rem'} height={'1.2rem'} onClick={onClickOpenModal}/>
                    <ProfileModal open={modalOpened} onOpenModal={onClickOpenModal}/>
                </div>
            </div>
            <div className="info">
                <span>
                    <b>Статус </b>
                </span>
                <span>Без отношений</span>
            </div>

            <div className="info">
                <span>
                    <b>Живет в </b>
                </span>
                <span>Н.Новгород</span>
            </div>
            <div className="info">
                <span>
                    <b>Работа </b>
                </span>
                <span>Front-end developer</span>
            </div>
            <button className={'button logout-button'}>Выйти</button>
        </div>
    );
};