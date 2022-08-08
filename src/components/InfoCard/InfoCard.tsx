import * as React from 'react';
import './InfoCard.scss'
import {UilPen} from "@iconscout/react-unicons";
import {ReactElement, useCallback, useEffect, useState} from "react";
import {ProfileModal} from "../ProfileModal/ProfileModal";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {useTypedSelector} from "../../utils/hooks/useTypedSelector";
import {userApi} from "../../api/user-api";
import {IUserType} from "../../store/reducers/auth/auth-types";
import {authActions} from "../../store/reducers/auth/auth-actions";

type InfoCardProps = {};


export type UserModalType = {
    profilePicture?: string,
    coverPicture?: string,
    about?: string,
    livesin?: string,
    worksAt?: string,
    country?: string,
    relationship?: string,
}

export type InfoCardUserType = IUserType & UserModalType
export const InfoCard = (props: InfoCardProps) => {

    const [modalOpened, SetModalOpened] = useState<boolean>(false)


    const dispatch = useDispatch();

    const params = useParams()
    const profileUserId = params.id;

    const [profileUser, setProfileUser] = useState<InfoCardUserType>({} as InfoCardUserType)

    const {user} = useTypedSelector(state => state.auth)


    const onClickOpenModal = useCallback(() => {
        SetModalOpened(!modalOpened)
    }, [SetModalOpened, modalOpened])

    const onLogoutHandler = useCallback(() => {
        dispatch(authActions.logout())
    }, [dispatch])


    useEffect(() => {
        (async () => {
            if (user) {
                if (profileUserId !== user._id) {
                    setProfileUser(user)
                } else {
                    const profileUser = await userApi.getUser(profileUserId)
                    setProfileUser(profileUser.data)
                }
            }
        })()
    }, [user])


    return (
        <div className={'InfoCard'}>
            <div className="infoHead">
                <h4>Ваша информация</h4>
                {user && user._id === profileUserId
                    ? <div>
                        <UilPen width={'2rem'} height={'1.2rem'} onClick={onClickOpenModal}/>
                        <ProfileModal
                            open={modalOpened}
                            setModalOpened={onClickOpenModal}
                            data={user}
                        />
                    </div>
                    : null
                }
            </div>
            <div className="info">
                <span>
                    <b>Статус </b>
                </span>
                <span>{profileUser && (profileUser?.relationship ?? 'Без отношений')}</span>
            </div>

            <div className="info">
                <span>
                    <b>Живет в </b>
                </span>
                <span>{user && (profileUser?.livesin ?? 'Городе')}</span>
            </div>
            <div className="info">
                <span>
                    <b>Работа </b>
                </span>
                <span> {user && (profileUser?.worksAt ?? 'Front-end developer')}</span>
            </div>
            <button className={'button logout-button'} onClick={onLogoutHandler}>Выйти</button>
        </div>
    );
};