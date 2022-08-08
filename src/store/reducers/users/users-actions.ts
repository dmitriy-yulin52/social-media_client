import {ActionTypeNames, SetIsLoadingType, SetUsersType} from "./users-types";
import {InfoCardUserType} from "../../../components/InfoCard/InfoCard";


export const usersActions = {
    setIsLoading: (isLoading: boolean): SetIsLoadingType => ({
        type: ActionTypeNames.SET_IS_LOADING,
        payload: isLoading
    }),
    setUsers: (data: InfoCardUserType[]): SetUsersType => ({type: ActionTypeNames.SET_USERS, payload: data}),

}



