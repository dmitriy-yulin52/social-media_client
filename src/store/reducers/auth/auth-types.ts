import {Action, AnyAction} from "redux";
import {RootStateType} from "../../store";
import {ThunkAction as LibThunkAction, ThunkDispatch} from 'redux-thunk';
import {authApi} from "../../../api/auth-api";
import {InfoCardUserType} from "../../../components/InfoCard/InfoCard";
import {ProfileDataType} from "../../../components/ProfileModal/ProfileModal";

export enum ActionTypeNames {
    SET_IS_AUTH = 'auth/SET_IS_AUTH',
    SET_IS_LOADING = 'auth/SET_IS_LOADING',
    SET_USER = 'auth/SET_USER',
    UPDATE_USER = 'auth/UPDATE_USER',
    SET_IS_ERROR = 'auth/SET_IS_ERROR',
    SET_ERROR_MESSAGE = 'auth/SET_ERROR_MESSAGE',
}


export type IUserType = {
    "username": string,
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
    user: null | InfoCardUserType
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
export type UpdateUserType = {
    type: ActionTypeNames.UPDATE_USER
    payload: ProfileDataType
}


export type ActionsType = SetIsAuthType | SetIsLoadingType | SetUserType | SetIsErrorType | SetErrorMessageType | UpdateUserType

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