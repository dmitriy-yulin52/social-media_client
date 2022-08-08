import * as React from 'react';
import {ResponseUserChatsType} from "../../api/chat-api";
import {FC, memo, ReactElement, useEffect, useState} from "react";
import {userApi} from "../../api/user-api";
import {InfoCardUserType} from "../InfoCard/InfoCard";
import profileImage from '../../assets/img/defaultProfile.png';
import './Conversation.scss'

type ConversationProps = {
    chat: ResponseUserChatsType
    currentUser: string
    online: boolean
};

export const hrStyle = {
    width: '85%',
    border: '0.1px solid #ececec'
} as const


export const Conversation: FC<ConversationProps> = memo((props): ReactElement => {

    const {chat, currentUser,online} = props


    const [userData, setUserData] = useState<InfoCardUserType | null>(null)


    useEffect(() => {
        (async () => {
            try {
                const userId = chat.members.find((el) => el !== currentUser)
                const data = await userApi.getUser(userId)
                setUserData(data.data)
            } catch (e) {
                console.log(e)
            }
        })()
    }, [])

    return (
        <>
            <div className={'follower conversation'}>
                <div className={'follower-block'}>
                    {online && <div className="online-dot"></div>}
                    <img
                        src={userData?.profilePicture ? 'http://localhost:5555/images/' + userData.profilePicture : profileImage}
                        alt=""/>
                    <div className="name">
                        <span>{userData?.firstname} {userData?.lastname}</span>
                        <span>{online ? 'Online' : 'Offline'}</span>
                    </div>
                </div>
            </div>
            <hr style={hrStyle}/>
        </>
    );
});