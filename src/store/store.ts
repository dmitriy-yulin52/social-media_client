import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from 'redux-thunk'
import {authReducer} from "./reducers/auth/auth-reducer";
import {TypedUseSelectorHook, useDispatch} from "react-redux";
import {errorReducer} from "./reducers/error/error-reducer";
import {postReducer} from "./reducers/post/post-reducer";


declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}

export const composeEnhancers =
    (typeof window !== 'undefined' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;


const rootReducers = combineReducers({
    auth: authReducer,
    error:errorReducer,
    posts:postReducer
})


const middlewares = [thunk]

export const store = createStore(rootReducers, composeEnhancers(applyMiddleware(...middlewares)));

export type RootStateType = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch
export const useAppDispatch = () => useDispatch<DispatchType>();



// @ts-ignore
window.store = store