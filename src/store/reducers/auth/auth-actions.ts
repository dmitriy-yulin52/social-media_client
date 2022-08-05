import {DispatchType} from "../../store";
import {FormDataType} from "../../../pages/Auth/Auth";
import {authApi} from "../../../api/auth-api";
import {
    ActionTypeNames,
    IUserType,
    SetErrorMessageType,
    SetIsAuthType,
    SetIsErrorType,
    SetIsLoadingType,
    SetUserType
} from "./auth-types";
import {errorActions} from "../error/error-actions";


export const authActions = {
    login,
    setIsLoading: (isLoading: boolean): SetIsLoadingType => ({
        type: ActionTypeNames.SET_IS_LOADING,
        payload: isLoading
    }),
    setIsAuth: (isAuth: boolean): SetIsAuthType => ({type: ActionTypeNames.SET_IS_AUTH, payload: isAuth}),
    setUser: (user: IUserType): SetUserType => ({type: ActionTypeNames.SET_USER, payload: user}),
    register,
    setIsError: (isError: boolean): SetIsErrorType => ({type: ActionTypeNames.SET_IS_ERROR, payload: isError}),
    setMessageError: (messageError: string | null): SetErrorMessageType => ({
        type: ActionTypeNames.SET_ERROR_MESSAGE,
        payload: messageError
    }),

}

function register(formData: Pick<FormDataType, 'confirmPassword'>): any {

    const {confirmPassword, ...rest} = formData

    return async (dispatch: DispatchType) => {
        try {
            dispatch(authActions.setIsLoading(true));
            const {data} = await authApi().register(rest as Pick<FormDataType, 'confirmPassword'>)
            const {token, user} = data
            dispatch(authActions.setUser(user))
            dispatch(authActions.setIsAuth(true));
            window.localStorage.setItem('authRegister', 'true')
            window.localStorage.setItem('authRegister-user', JSON.stringify(user))
        } catch (e: any) {
            dispatch(errorActions.setIsOpen(true))
            dispatch(errorActions.setMessageError(e.response.data.message))
        } finally {
            dispatch(authActions.setIsLoading(false));
        }
    }
}

function login(formData: { password: string, username: string }): any {
    return async (dispatch: DispatchType) => {
        try {
            dispatch(authActions.setIsLoading(true));
            const {data} = await authApi().login(formData)
            const {token, user} = data
            dispatch(authActions.setUser(user));
            dispatch(authActions.setIsAuth(true));
            localStorage.setItem('authRegister', 'true')
            localStorage.setItem('authRegister-user', JSON.stringify(user))
        } catch (e: any) {
            dispatch(errorActions.setIsOpen(true))
            dispatch(errorActions.setMessageError(e.response.data.message))
        } finally {
            dispatch(authActions.setIsLoading(false));
        }
    }
}


