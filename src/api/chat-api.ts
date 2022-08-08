import {instance} from "./index";
import {AxiosResponse} from "axios";


export const chatApi = {
    userChats(id: string):Promise<AxiosResponse<ResponseUserChatsType[]>> {
        return instance.get<ResponseUserChatsType[]>(`/chat/${id}`)
    }
}

export type ResponseUserChatsType = {
    createdAt: string
    members: string []
    updatedAt: string
    __v: number
    _id: string
}