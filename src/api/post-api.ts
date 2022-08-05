import {instance} from "./index";
import {PostRequestType} from "../components/PostShare/PostShare";
import {AxiosResponse} from "axios";


export const postApi = {
    uploadImage(data: FormData):Promise<void> {
        return instance.post('/upload', data)
    },
    uploadPost(post: PostRequestType):Promise<AxiosResponse<ResponsePostType>>{
        const data = instance.post<ResponsePostType>('/post', post)
        return data
    },
    getTimeLinePosts(id:string){
        return instance.get(`/post/${id}/timeline`)
    }

}


export type ResponsePostType = {
    createdAt: string
    desc: string
    likes: string[]
    updatedAt: string
    userId: string
    image:string
    __v: number
    _id: string
}