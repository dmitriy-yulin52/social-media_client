import {ActionType, ActionTypeNames, initialState, InitialStateType} from "./users-types";


export const usersReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {

    switch (action.type) {

        case ActionTypeNames.SET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case ActionTypeNames.SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        default:
            return state
    }
}