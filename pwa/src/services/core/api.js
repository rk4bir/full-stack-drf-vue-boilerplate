import axios from "axios"
import { ACCESS_TOKEN, API_BASE_URL, AUTH_HEADER_NAME } from "./config"
import { logoutUser, refreshToken } from "./auth"


/* Public API that handles public requests */
const publicAPI = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        "accept": 'application/json',
    },
})


/* Private API that handles the auth based/private requests */
const privateAPI = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
    headers: {
        "Authorization": `${AUTH_HEADER_NAME} ${window.localStorage.getItem(ACCESS_TOKEN)}`,
        "Content-Type": 'application/json',
    },
})


// authentication error: 401
const isCorrectRefreshError = (status) => status === 401

const errorInterceptor = (error) => {
    /* error interceptor for private API */
    const originalRequest = error.config;
    const { status } = error.response;
    if (isCorrectRefreshError(status)) {
        return refreshToken()
            .then(() => {
                // update tokens and auth header of private API
                const headerAuthorization = `${AUTH_HEADER_NAME} ${window.localStorage.getItem(ACCESS_TOKEN)}`;
                privateAPI.defaults.headers["Authorization"] = headerAuthorization;
                originalRequest.headers.Authorization = headerAuthorization;
                return privateAPI(originalRequest)
            })
            .catch((tokenRefreshError) => {
                // if token refresh fails, logout the user 
                // to avoid potential security risks.
                logoutUser()
                return Promise.reject(tokenRefreshError)
            })
    }
    return Promise.reject(error)
}

// register privateAPI response interceptors
privateAPI.interceptors.response.use(
    (response) => response, // this is for all successful requests.
    (error) => errorInterceptor(error), // handle the request
)


export {
    publicAPI,
    privateAPI
}