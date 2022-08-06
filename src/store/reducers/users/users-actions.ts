import {DispatchType} from "../../store";
import {ActionTypeNames, SetIsLoadingType} from "./users-types";
import {errorActions} from "../error/error-actions";
import {userApi} from "../../../api/user-api";
import {ProfileDataType} from "../../../components/ProfileModal/ProfileModal";


export const usersActions = {
    setIsLoading: (isLoading: boolean): SetIsLoadingType => ({type: ActionTypeNames.SET_IS_LOADING, payload: isLoading}),
    setUser:()=>({}),
}

