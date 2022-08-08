import {instance} from "./index";
import {AxiosResponse} from "axios";


export const messageApi = {
    getMessages(id: string): Promise<AxiosResponse<ResponseMessageType[]>> {
        return instance.get<ResponseMessageType[]>(`/message/${id}`)
    },
    addMessage(data:any):Promise<AxiosResponse<any>>{
        return instance.post('/message/',data)

    }
}


export type ResponseMessageType = {
    chatId: string
    createdAt: string
    senderId: string
    text: string
    updatedAt: string
    __v: number
    _id: string
}