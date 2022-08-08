import {InfoCardUserType} from "../../../components/InfoCard/InfoCard";


export enum ActionTypeNames {
    SET_USERS = 'users/SET_USERS',
    SET_IS_LOADING = 'users/SET_IS_LOADING',
    FOLLOW_USER = 'users/FOLLOW_USER',
    UNFOLLOW_USER = 'users/UNFOLLOW_USER',
}


export const initialState: InitialStateType = {
    users: [],
    isLoading: false
}

export type InitialStateType = {
    users: InfoCardUserType[],
    isLoading: boolean
}


export type SetUsersType = {
    type: ActionTypeNames.SET_USERS
    payload: InfoCardUserType[]
}

export type SetIsLoadingType = {
    type: ActionTypeNames.SET_IS_LOADING
    payload: boolean
}



export type ActionType = SetUsersType | SetIsLoadingType