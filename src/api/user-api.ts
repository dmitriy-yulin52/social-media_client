import {instance} from "./index";
import {ProfileDataType} from "../components/ProfileModal/ProfileModal";


export const userApi = {
    getUser(userId?:string){
        return instance.get(`/user/${userId}`)
    },
    updateUser(id:string,formData: any){
        console.log(formData,'api')
        return instance.put(`/user/${id}`,formData)
    }
}