import {ResponsePostType} from "../../../api/post-api";

export enum ActionTypeNames {
    SET_IS_LOADING = 'post/SET_IS_LOADING',
    SET_POST = 'post/SET_POST',
    SET_POSTS= 'post/SET_POSTS',
}



export const initialState = {
    posts: [],
    isLoading: false,
}


export type InitialStateType = {
    posts: ResponsePostType[],
    isLoading: boolean
}


export type SetIsLoadingType = {
    type: ActionTypeNames.SET_IS_LOADING
    payload: boolean
}
export type SetPostType = {
    type: ActionTypeNames.SET_POST
    payload: ResponsePostType
}
export type SetPostsType = {
    type: ActionTypeNames.SET_POSTS
    payload: ResponsePostType[]
}



export type ActionType = SetIsLoadingType | SetPostType | SetPostsType
