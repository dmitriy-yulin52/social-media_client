


export enum ActionTypeNames {
    SET_USERS = 'users/SET_USERS',
    SET_USER = 'users/SET_USER',
    SET_IS_LOADING = 'users/SET_IS_LOADING'
}


export const initialState:InitialStateType = {
    users:[],
    isLoading:false
}

export type InitialStateType = {
     users:any[],
    isLoading:boolean
}


export type SetUsersType = {
    type:ActionTypeNames.SET_USERS
    payload:any
}
export type SetUserType = {
    type:ActionTypeNames.SET_USER
    payload:any
}
export type SetIsLoadingType = {
    type:ActionTypeNames.SET_IS_LOADING
    payload:boolean
}


export type ActionType = SetUsersType | SetIsLoadingType