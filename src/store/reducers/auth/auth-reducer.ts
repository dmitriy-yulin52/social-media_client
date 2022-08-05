import {ActionsType, ActionTypeNames, initialState, InitialStateType} from "./auth-types";


export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {

        case ActionTypeNames.SET_IS_AUTH:
            return {
                ...state,
                isAuth: action.payload
            }
        case ActionTypeNames.SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case ActionTypeNames.SET_USER:
            return {
                ...state,
                user: action.payload,
            }
        case ActionTypeNames.SET_ERROR_MESSAGE:
            return {
                ...state,
                messageError: action.payload
            }
        case ActionTypeNames.SET_IS_ERROR:
            return {
                ...state,
                isError: action.payload
            }
        default:
            return state
    }

}