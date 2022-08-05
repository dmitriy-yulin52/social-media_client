import {ActionTypeNames, SetIsOpenType, SetMessageErrorType} from "./error-types";


export const errorActions = {
    setIsOpen: (isOpen: boolean): SetIsOpenType => ({type: ActionTypeNames.SET_IS_OPEN, payload: isOpen}),
    setMessageError: (message: string): SetMessageErrorType => ({type: ActionTypeNames.SET_MESSAGE_ERROR, payload: message}),
}