import {instance} from "./index";
import {InfoCardUserType} from "../components/InfoCard/InfoCard";






export const userApi = {
    getUser(userId?: string) {
        return instance.get(`/user/${userId}`)
    },
    updateUser(id: string, formData: InfoCardUserType) {
        return instance.put(`/user/${id}`, formData)
    },
    getAllUser() {
        return instance.get('/user')
    },
    followUser(id: string, data: InfoCardUserType):Promise<void> {
        return instance.put(`/user/${id}/follow`, data)
    },
    unFollowUser(id: string, data: InfoCardUserType):Promise<void> {
        return instance.put(`/user/${id}/unfollow`, data)
    }
}