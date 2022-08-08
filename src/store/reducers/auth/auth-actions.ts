import {DispatchType} from "../../store";
import {FormDataType} from "../../../pages/Auth/Auth";
import {authApi} from "../../../api/auth-api";
import {
    ActionTypeNames,
    SetErrorMessageType, SetFollowUserType,
    SetIsAuthType,
    SetIsErrorType,
    SetIsLoadingType, SetUnfollowUserType,
    SetUserType
} from "./auth-types";
import {errorActions} from "../error/error-actions";
import {userApi} from "../../../api/user-api";
import {usersActions} from "../users/users-actions";
import {InfoCardUserType} from "../../../components/InfoCard/InfoCard";


export const authActions = {
    login,
    setIsLoading: (isLoading: boolean): SetIsLoadingType => ({
        type: ActionTypeNames.SET_IS_LOADING,
        payload: isLoading
    }),
    setIsAuth: (isAuth: boolean): SetIsAuthType => ({type: ActionTypeNames.SET_IS_AUTH, payload: isAuth}),
    setUser: (user: InfoCardUserType | null): SetUserType => {
        console.log(user, 'InfoCardUserType')
        return {type: ActionTypeNames.SET_USER, payload: user}
    },
    register,
    setIsError: (isError: boolean): SetIsErrorType => ({type: ActionTypeNames.SET_IS_ERROR, payload: isError}),
    setMessageError: (messageError: string | null): SetErrorMessageType => ({
        type: ActionTypeNames.SET_ERROR_MESSAGE,
        payload: messageError
    }),
    setFollowUser: (id: string): SetFollowUserType => ({type: ActionTypeNames.FOLLOW_USER, payload: id}),
    setUnFollowUser: (id: string): SetUnfollowUserType => ({type: ActionTypeNames.UNFOLLOW_USER, payload: id}),
    logout,
    updateUserTC,
    followUserTC,
    unFollowUserTC

}

function register(formData: FormDataType): any {

    const {confirmPassword, ...rest} = formData

    return async (dispatch: DispatchType) => {
        try {
            dispatch(authActions.setIsLoading(true));
            const {data} = await authApi().register(rest)
            const {token, ...user} = data
            dispatch(authActions.setUser(user.user))
            dispatch(authActions.setIsAuth(true));
            localStorage.setItem('authRegister', 'true')
            localStorage.setItem('token', token)
            localStorage.setItem('profile', JSON.stringify(user.user))
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
            const {token, ...rest} = data
            delete rest.user.password
            dispatch(authActions.setUser(rest.user));
            dispatch(authActions.setIsAuth(true));
            localStorage.setItem('authRegister', 'true')
            localStorage.setItem('token', token)
            localStorage.setItem('profile', JSON.stringify(rest.user))
        } catch (e: any) {
            dispatch(errorActions.setIsOpen(true))
            dispatch(errorActions.setMessageError(e.response.data.message))
        } finally {
            dispatch(authActions.setIsLoading(false));
        }
    }
}


function logout(): any {
    return (dispatch: DispatchType) => {
        try {
            dispatch(authActions.setIsLoading(true));
            dispatch(authActions.setUser(null));
            dispatch(authActions.setIsAuth(false));
            localStorage.removeItem('authRegister')
            localStorage.removeItem('profile')
            localStorage.removeItem('token')
        } catch (e: any) {
            dispatch(errorActions.setIsOpen(true))
            dispatch(errorActions.setMessageError(e.response.data.message))
        } finally {
            dispatch(authActions.setIsLoading(false));
        }
    }
}

function updateUserTC(id: string, formData: InfoCardUserType): any {
    return async (dispatch: DispatchType) => {
        try {
            dispatch(authActions.setIsLoading(true));
            const data = await userApi.updateUser(id, formData)
            dispatch(authActions.setUser(data.data.user))
            localStorage.setItem('profile', JSON.stringify({...formData}))
        } catch (e: any) {
            dispatch(errorActions.setIsOpen(true));
            dispatch(errorActions.setIsOpen(e.response.data.message));

        } finally {
            dispatch(usersActions.setIsLoading(false));
        }
    }
}

function followUserTC(id: string, data: InfoCardUserType): any {
    return async (dispatch: DispatchType) => {
        try {
            dispatch(usersActions.setIsLoading(true))
            await userApi.followUser(id, data)
            dispatch(authActions.setFollowUser(id))
        } catch (e: any) {
            dispatch(errorActions.setIsOpen(true));
            dispatch(errorActions.setIsOpen(e.response.data.message));
        } finally {
            dispatch(usersActions.setIsLoading(false))
        }

    }
}

function unFollowUserTC(id: string, data: InfoCardUserType): any {
    return async (dispatch: DispatchType) => {
        try {
            dispatch(usersActions.setIsLoading(true))
            await userApi.unFollowUser(id, data)
            dispatch(authActions.setUnFollowUser(id))
        } catch (e: any) {
            dispatch(errorActions.setIsOpen(true));
            dispatch(errorActions.setIsOpen(e.response.data.message));
        } finally {
            dispatch(usersActions.setIsLoading(false))
        }
    }
}





