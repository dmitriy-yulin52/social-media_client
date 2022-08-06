import {instance} from "./index";
import {FormDataType} from "../pages/Auth/Auth";
import {IUserType} from "../store/reducers/auth/auth-types";


export const authApi = ()=> ({
    login(data: { username: string, password: string }): Promise<any> {
        return instance.post('/auth/login', data)
    },
    register(data: Omit<FormDataType, 'confirmPassword'>): Promise<any> {
        return instance.post('/auth/register',data)
    }
})