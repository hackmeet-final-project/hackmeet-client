import { GET_USER_PROFILE, SET_LOGIN } from "./actionType"

export const setUserProfile = (payload) => {
    return {
        type: GET_USER_PROFILE,
        payload
    }
}

export const setLogin = (payload) => {
    return {
        type: SET_LOGIN,
        payload
    }
}

export const fetchUserProfile = () => {
    return async(dispatch, getState) => {
        return fetch("http://localhost/profiles", {
            headers: {
                access_token: localStorage.access_token
            }
        })
        .then(response => {
            if(!response.ok) {
                return response.json().then(error => {
                   throw new Error(error)}
                )
            }
            return response.json()
        })
        .then(data => {
            dispatch(setUserProfile(data))
            return data
        })
        .catch(error => {
            console.log(`data`)
            throw(error)
        })
    }
}