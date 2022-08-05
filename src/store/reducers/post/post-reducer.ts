import {ActionType, ActionTypeNames, initialState, InitialStateType} from "./post-types";

export const postReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {


    switch (action.type) {
        case ActionTypeNames.SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case ActionTypeNames.SET_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            }
        case ActionTypeNames.SET_POSTS:
            return {
                ...state,
                posts: action.payload
            }
            return state
        default:
            return state
    }
}