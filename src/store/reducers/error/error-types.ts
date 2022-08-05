
export enum ActionTypeNames {
    SET_IS_OPEN = 'error/SET_IS_OPEN',
    SET_MESSAGE_ERROR = 'error/SET_IS_MESSAGE_ERROR'
}

export const initialState:InitialStateType = {
    isOpen:false,
    messageError:null
}

export type InitialStateType = {
    isOpen:boolean
    messageError:null | string
}

export type SetIsOpenType = {
    type:ActionTypeNames.SET_IS_OPEN
    payload:boolean
}
export type SetMessageErrorType = {
    type:ActionTypeNames.SET_MESSAGE_ERROR
    payload:string | null
}


export type ActionsType = SetIsOpenType | SetMessageErrorType