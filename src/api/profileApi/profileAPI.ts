import {instance} from "../instance/instance";

export const profileAPI = {

    updateProfile(name: string | null, avatar: string | null) {
        return instance.put('auth/me', {name, avatar}).then(response => response.data)
    },

    logOut() {
        return instance.delete('auth/me').then(response => response.data)
    }

}
