import {DispatchType} from "../../store";
import {postApi, ResponsePostType} from "../../../api/post-api";
import {errorActions} from "../error/error-actions";
import {PostRequestType} from "../../../components/PostShare/PostShare";
import {ActionTypeNames, SetPostsType, SetPostType} from "./post-types";
import {Dispatch} from "redux";


export const postActions = {
    uploadImage,
    uploadPost,
    getTimeLinePosts,
    setPosts: (data: ResponsePostType[]):SetPostsType => ({type: ActionTypeNames.SET_POSTS, payload: data}),
    setPost: (data: ResponsePostType): SetPostType => ({type: ActionTypeNames.SET_POST, payload: data}),
    setIsLoading: (isLoading: boolean) => ({type: ActionTypeNames.SET_IS_LOADING, payload: isLoading})
}


function uploadImage(data: FormData): any {
    return async (dispatch: DispatchType) => {
        try {
            await postApi.uploadImage(data)
        } catch (e: any) {
            console.log(e)
            // dispatch(errorActions.setIsOpen(true))
            // dispatch(errorActions.setMessageError(e.response.data.message))
        }
    }
}

function uploadPost(data: PostRequestType): any {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(postActions.setIsLoading(true))
            const post = await postApi.uploadPost(data)
            dispatch(postActions.setPost(post.data))
        } catch (e: any) {
            dispatch(errorActions.setIsOpen(true))
            dispatch(errorActions.setMessageError(e.response.data.message))
        } finally {
            dispatch(postActions.setIsLoading(false))
        }
    }
}

function getTimeLinePosts(id: string): any {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(postActions.setIsLoading(true))
            const post = await postApi.getTimeLinePosts(id)
            dispatch(postActions.setPosts(post.data))
        } catch (e: any) {
            dispatch(errorActions.setIsOpen(true))
            dispatch(errorActions.setMessageError(e.response.data.message))
        } finally {
            dispatch(postActions.setIsLoading(false))
        }
    }
}