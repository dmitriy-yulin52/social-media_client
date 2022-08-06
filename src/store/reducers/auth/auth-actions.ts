import {DispatchType} from "../../store";
import {FormDataType} from "../../../pages/Auth/Auth";
import {authApi} from "../../../api/auth-api";
import {
    ActionTypeNames,
    SetErrorMessageType,
    SetIsAuthType,
    SetIsErrorType,
    SetIsLoadingType,
    SetUserType,
    UpdateUserType
} from "./auth-types";
import {errorActions} from "../error/error-actions";
import {ProfileDataType} from "../../../components/ProfileModal/ProfileModal";
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
                console.log(user,'InfoCardUserType')
        return {type: ActionTypeNames.SET_USER, payload: user}},
    register,
    setIsError: (isError: boolean): SetIsErrorType => ({type: ActionTypeNames.SET_IS_ERROR, payload: isError}),
    setMessageError: (messageError: string | null): SetErrorMessageType => ({
        type: ActionTypeNames.SET_ERROR_MESSAGE,
        payload: messageError
    }),

    logout,
    updateUserTC,
    updateUserAC:(user:ProfileDataType):UpdateUserType=>({type:ActionTypeNames.UPDATE_USER,payload:user})

}

function register(formData: FormDataType): any {

    const {confirmPassword, ...rest} = formData

    return async (dispatch: DispatchType) => {
        try {
            dispatch(authActions.setIsLoading(true));
            const {data} = await authApi().register(rest)
            const {token,...user} = data
            console.log(data,'data . ergister')
            console.log(user.user,'ergister')
            dispatch(authActions.setUser(user.user))
            dispatch(authActions.setIsAuth(true));
            window.localStorage.setItem('authRegister', 'true')
            window.localStorage.setItem('authRegister-user', JSON.stringify(user.user))
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
            const {token,...rest} = data
            delete rest.user.password
            dispatch(authActions.setUser(rest.user));
            dispatch(authActions.setIsAuth(true));
            localStorage.setItem('authRegister', 'true')
            localStorage.setItem('authRegister-user', JSON.stringify(rest.user))
        } catch (e: any) {
            dispatch(errorActions.setIsOpen(true))
            dispatch(errorActions.setMessageError(e.response.data.message))
        } finally {
            dispatch(authActions.setIsLoading(false));
        }
    }
}


function logout():any{
    return (dispatch:DispatchType)=>{
        try{
            dispatch(authActions.setUser(null));
            dispatch(authActions.setIsAuth(false));
            localStorage.removeItem('authRegister')
            localStorage.removeItem('authRegister-user')
        }catch (e:any) {
            dispatch(errorActions.setIsOpen(true))
            dispatch(errorActions.setMessageError(e.response.data.message))
        }
    }
}

function updateUserTC(id: string, formData:  InfoCardUserType):any {


    console.log(formData,'updateUserTC')

    return async (dispatch: DispatchType) => {

        try {
            dispatch(authActions.setIsLoading(true));
            const data = await userApi.updateUser(id,formData)

            console.log(data,updateUserTC)
            dispatch(authActions.setUser(data.data.user))
            localStorage.setItem('profile',JSON.stringify({...formData}))
        } catch (e:any) {
            dispatch(errorActions.setIsOpen(true));
            dispatch(errorActions.setIsOpen(e.response.data.message));

        } finally {
            dispatch(usersActions.setIsLoading(false));
        }

    }
}


