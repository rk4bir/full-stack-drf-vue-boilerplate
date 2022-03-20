import { ACCESS_TOKEN, REFRESH_TOKEN } from './core/config'
import { privateAPI, publicAPI } from './core/api'

const BASE_URL = `/account`



export const getProfile = async (username) => {
    /*
    * fetch user profile
    */
    try {
        let endPoint = `${BASE_URL}/${username}/`
        const resp = await privateAPI.get(endPoint)
        return { status: resp.status, data: resp.data }
    } catch (err) {
        let errResp = err.response
        return { status: errResp.status, data: errResp.data }
    }
}

export const updateProfile = async (payload, username) => {
    /*
    * update user profile
    */
    try {
        let endPoint = `${BASE_URL}/${username}/update/`
        const resp = await privateAPI.put(endPoint, payload)
        return { status: resp.status, data: resp.data }
    } catch (err) {
        let errResp = err.response
        return { status: errResp.status, data: errResp.data }
    }
}

const loginUser = (username, password) => {
    const loginBody = { username, password }
    return publicAPI.post(`${BASE_URL}/token/both/`, loginBody)
        .then((response) => {
            window.localStorage.setItem(ACCESS_TOKEN, response.data.access)
            window.localStorage.setItem(REFRESH_TOKEN, response.data.refresh)
            return Promise.resolve(response.data)
        })
        .catch((error) => {
            return Promise.reject(error)
        })
}

const logoutUser = () => {
    window.localStorage.removeItem(ACCESS_TOKEN)
    window.localStorage.removeItem(REFRESH_TOKEN)
    privateAPI.defaults.headers["Authorization"] = ''
}

const refreshToken = () => {
    const refreshBody = { refresh: window.localStorage.getItem(REFRESH_TOKEN) }
    return publicAPI.post(`${BASE_URL}/token/refresh/`, refreshBody)
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
