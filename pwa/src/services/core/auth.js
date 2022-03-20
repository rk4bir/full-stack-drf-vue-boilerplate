import { ACCESS_TOKEN, REFRESH_TOKEN, ISAUTHENTICATED, USER } from './config'
import { privateAPI, publicAPI } from './api'


const loginUser = (username, password) => {
    /* 
    * Login user
    *   - get access & refresh token from username and password
    *   - store the tokens for persistent auth
    */
    const loginBody = { username, password }
    return publicAPI.post('/account/token/both/', loginBody)
        .then((response) => {
            window.localStorage.setItem(ACCESS_TOKEN, response.data.access)
            window.localStorage.setItem(REFRESH_TOKEN, response.data.refresh)
            return Promise.resolve(response.data)
        })
        .catch((error) => {
            console.log(error)
            return Promise.reject(error)
        })
}

const logoutUser = () => {
    /* 
    * Logout user from pwa and reset 
    * private api auth header
    */
    window.localStorage.removeItem(ACCESS_TOKEN)
    window.localStorage.removeItem(REFRESH_TOKEN)
    window.localStorage.removeItem(ISAUTHENTICATED)
    window.localStorage.removeItem(USER)
    privateAPI.defaults.headers["Authorization"] = ''
}

const refreshToken = () => {
    /*
    * Refresh access token from refresh token
    */
    const refreshBody = { refresh: window.localStorage.getItem(REFRESH_TOKEN) }
    return publicAPI.post('/account/token/refresh/', refreshBody)
        .then((response) => {
            window.localStorage.setItem(ACCESS_TOKEN, response.data.access)
            return Promise.resolve(response.data)
        })
        .catch((error) => Promise.reject(error))
}

export {
    loginUser,
    logoutUser,
    refreshToken
}
