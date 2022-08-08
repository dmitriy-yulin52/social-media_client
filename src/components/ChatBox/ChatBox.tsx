import * as React from 'react';
import {FC, memo, ReactElement, useCallback, useEffect, useRef, useState,MouseEvent} from "react";
import {ResponseUserChatsType} from "../../api/chat-api";
import {InfoCardUserType} from "../InfoCard/InfoCard";
import {userApi} from "../../api/user-api";
import profileImage from "../../assets/img/defaultProfile.png";
import './ChatBox.scss'
import {hrStyle} from "../Conversation/Conversation";
import {messageApi, ResponseMessageType} from "../../api/message-api";
import {format} from "timeago.js";
// @ts-ignore
import InputEmoji from "react-input-emoji";
import {MessageType} from "../../pages/Chat/Chat";


type ChatBoxProps = {
    chat: ResponseUserChatsType | null
    currentUser: string
    recieveMessage: any
    setSendMessage: (msg: MessageType) => void
};

const style = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
} as const

export const ChatBox: FC<ChatBoxProps> = memo(({chat, currentUser, setSendMessage, recieveMessage}): ReactElement => {


    const [userData, setUserData] = useState<InfoCardUserType | null>(null)
    const [messages, setMessages] = useState<ResponseMessageType[]>([])
    const [newMessage, setNewMessage] = useState<string>('')

    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (chat !== null) {
            (async () => {
                try {
                    const userId = chat.members.find((el) => el !== currentUser)
                    const data = await userApi.getUser(userId)
                    setUserData(data.data)
                } catch (e) {
                    console.log(e)
                }

            })()
        }
    }, [chat, currentUser])


    useEffect(() => {
        if (chat !== null) {
            (async () => {
                try {
                    const data = await messageApi.getMessages(chat._id)
                    setMessages(data.data)
                } catch (e) {
                    console.log(e)
                }
            })()

        }
    }, [chat])


    useEffect(() => {
        if (recieveMessage !== null && recieveMessage.chatId === chat?._id) {
            setMessages([...messages, recieveMessage])
        }
    }, [recieveMessage])

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo(0, 9999);
        }
    }, [messages])

    const onChangeSetNewMessageHandler = useCallback((msg: string) => {
        setNewMessage(msg)
    }, [setNewMessage])


    const onClickHandlerSendMessage = async (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault()

        const message = {
            senderId: currentUser,
            text: newMessage,
            chatId: chat?._id ?? '1',
        }

        try {
            const {data} = await messageApi.addMessage(message);
            setMessages((prevState) => ([...prevState, data]))
            setNewMessage('')
        } catch (e) {
            console.log(e)
        }

        const receiverId = chat?.members.find((id) => id !== currentUser)
        setSendMessage({...message, receiverId})
    }


    return (
        <>
            <div className="ChatBox-container">
                {chat ? (
                    <>
                        <div className="chat-header">
                            <div className="follower">
                                <div className={'follower-block'}>
                                    <img
                                        src={userData?.profilePicture ? 'http://localhost:5555/images/' + userData.profilePicture : profileImage}
                                        alt=""/>
                                    <div className="name">
                                        <span>{userData?.firstname ?? 'user'} {userData?.lastname ?? 'user'}</span>
                                    </div>
                                </div>
                            </div>
                            <hr style={hrStyle}/>
                        </div>
                        <div style={style}>
                            <div ref={scrollRef} className="chat-body" style={{maxHeight: '700px'}}>
                                {messages.map((msg,index) => {
                                    return <>
                                        <div key={msg._id + `${index}`}
                                             className={msg.senderId === currentUser ? 'message own' : 'message'}>
                                            <span>{msg.text}</span>
                                            <span>{format(msg.createdAt)}</span>
                                        </div>
                                    </>
                                })}
                            </div>
                            <div className="chat-sender">
                                <InputEmoji
                                    value={newMessage}
                                    onChange={onChangeSetNewMessageHandler}
                                />
                                <div className={'send-button button'} onClick={onClickHandlerSendMessage}>Отправить
                                </div>
                            </div>
                        </div>
                    </>
                ) : <div className={'chatbox-empty'}>
                    Нажмите на чат, чтобы начать разговор...
                </div>}

            </div>
        </>
    );
});