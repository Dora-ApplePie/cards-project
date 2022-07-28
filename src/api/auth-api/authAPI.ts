import axios from "axios"


export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true
})


export const profileAPI = {
    authMe() {
        return instance.post('/auth/me').then(response => response.data)
    },

    updateProfile(name: string | null) {
        return instance.put('auth/me', {name}).then(response => response.data)
    },
    logOut() {
        return instance.delete('auth/me').then(response => response.data)
    }

}



