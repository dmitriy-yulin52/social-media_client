import {ActionsType, ActionTypeNames, initialState, InitialStateType} from "./error-types";


export const errorReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case ActionTypeNames.SET_IS_OPEN:
            return {
                ...state,
                isOpen: action.payload
            }
        case ActionTypeNames.SET_MESSAGE_ERROR:
            return {
                ...state,
                messageError:action.payload
            }
        default:
            return state
    }
}