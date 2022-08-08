import * as React from 'react';
import {LogoSearch} from "../../components/logoSearch/LogoSearch";
import './Chat.scss'
import {FC, ReactElement, useCallback, useEffect, useRef, useState} from "react";
import {useTypedSelector} from "../../utils/hooks/useTypedSelector";
import {chatApi, ResponseUserChatsType} from "../../api/chat-api";
import {Conversation} from "../../components/Conversation/Conversation";
import '../../components/RightSide/RightSide.scss'
import {NavIcons} from "../../components/NavIcons/NavIcons";
import {ChatBox} from "../../components/ChatBox/ChatBox";
import {io} from 'socket.io-client'
import {Socket} from "socket.io-client/build/esm/socket";


type OnlineUserType = {
    socketId: string
    userId: string
}
export type MessageType = {
    chatId: string
    receiverId: any
    senderId: string
    text: string
}


export const Chat: FC = (): ReactElement => {


    const {user} = useTypedSelector(state => state.auth)

    const userId = user?._id ?? '1'

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [chats, setChats] = useState<ResponseUserChatsType[]>([])
    const [currentChat, setCurrentChat] = useState<ResponseUserChatsType | null>(null)
    const [onlineUsers, setOnlineUsers] = useState<OnlineUserType[]>([])
    const [sendMessage, setSendMessage] = useState<MessageType | null>(null)
    const [recieveMessage, setRecieveMessage] = useState(null)
    const socket = useRef<Socket>()


    const onClickSetCurrentChat = useCallback((chat: ResponseUserChatsType) => {
        setCurrentChat(chat)
    }, [setCurrentChat])



    const checkOnlineStatus = (chat:ResponseUserChatsType)=>{
        const chatMembers = chat.members.find((member)=>member!== user?._id)
        const online = onlineUsers.find((user)=>user.userId === chatMembers)
        return !!online
    }


    useEffect(() => {
        socket.current = io('http://localhost:8888');
        socket.current.emit('new-user-add', userId);
        socket.current.on('get-users', (users) => {
            setOnlineUsers(users)
        });
    }, [user])


    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true)
                const {data} = await chatApi.userChats(userId);
                setChats(data)
            } catch (e) {
                console.log(e)
            } finally {
                setIsLoading(false)
            }
        })()

    }, [user?._id])


    useEffect(() => {
        if (sendMessage !== null) {
            socket.current?.emit('send-message', sendMessage)
        }
    }, [sendMessage])

    useEffect(() => {
        socket.current?.on('recieve-message', (data) => {
            console.log(data,'recieve-message data')
            setRecieveMessage(data)
        })
    }, [])


    return (
        <div className="Chat">
            <div className="Left-side-chat">
                <LogoSearch/>
                <div className="Chat-container">
                    <h2>Чаты</h2>
                    <div className="Chat-list">
                        {isLoading ? <div>Загрузка....</div> :
                            chats.map((chat,index) => {
                                return <div onClick={() => onClickSetCurrentChat(chat)}>
                                    <Conversation online={checkOnlineStatus(chat)}  key={chat._id + `${index}`} chat={chat}
                                                  currentUser={userId}/>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>

            <div className="Right-side-chat">
                <NavIcons/>
                <ChatBox
                    chat={currentChat}
                    currentUser={user?._id ?? '1'}
                    setSendMessage={setSendMessage}
                    recieveMessage={recieveMessage}
                />
            </div>
        </div>
    );
};