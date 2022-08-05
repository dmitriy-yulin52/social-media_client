import {Action, AnyAction} from "redux";
import {RootStateType} from "../../store";
import {ThunkAction as LibThunkAction, ThunkDispatch} from 'redux-thunk';
import {authApi} from "../../../api/auth-api";

export enum ActionTypeNames {
    SET_IS_AUTH = 'auth/SET_IS_AUTH',
    SET_IS_LOADING = 'auth/SET_IS_LOADING',
    SET_USER = 'auth/SET_USER',
    SET_IS_ERROR = 'auth/SET_IS_ERROR',
    SET_ERROR_MESSAGE = 'auth/SET_ERROR_MESSAGE',
}


export type IUserType = {
    "username": string,
    "password": string,
    "firstname": string,
    "lastname": string,
    "isAdmin": boolean,
    "followers": string[],
    "following": string[],
    "_id": string,
    "createdAt": string,
    "updatedAt": string,
    "__v": number
}

export const initialState: InitialStateType = {
    isAuth: false,
    isLoading: false,
    user: null,
    isError: false,
    messageError: null
}


export type InitialStateType = {
    isAuth: boolean
    isLoading: boolean
    user: null | IUserType
    isError: boolean
    messageError: string | null
}

export type SetIsAuthType = {
    type: ActionTypeNames.SET_IS_AUTH
    payload: boolean
}
export type SetIsLoadingType = {
    type: ActionTypeNames.SET_IS_LOADING
    payload: boolean
}
export type SetUserType = {
    type: ActionTypeNames.SET_USER
    payload: IUserType | null
}
export type SetIsErrorType = {
    type: ActionTypeNames.SET_IS_ERROR
    payload: boolean
}
export type SetErrorMessageType = {
    type: ActionTypeNames.SET_ERROR_MESSAGE
    payload: string | null
}


export type ActionsType = SetIsAuthType | SetIsLoadingType | SetUserType | SetIsErrorType | SetErrorMessageType

export interface ThunkData {
    api?: ReturnType<typeof authApi>;
}

export type ThunkAction<A extends AnyAction> = LibThunkAction<
    void,
    RootStateType,
    ThunkData,
    A
>;

export type Dispatcher = ThunkDispatch<RootStateType, undefined, AnyAction>;