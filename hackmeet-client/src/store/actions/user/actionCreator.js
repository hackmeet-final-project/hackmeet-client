import { Axios } from "../../../config/axios"
import { GET_ALL_USER, GET_USER_PROFILE, LOADING_ALL_USER, SET_LOGIN } from "./actionType"

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

export const setAllProfiles = (payload) => {
    return {
        type: GET_ALL_USER,
        payload
    }
}

export const setLoadingAll = (payload) => {
    return {
        type: LOADING_ALL_USER,
        payload
    }
}

export const fetchUserProfile = () => {
    return async (dispatch, getState) => {
        try {
            const { data } = await Axios("/profiles", {
                headers: {
                    access_token: localStorage.access_token
                }
            })
            dispatch(setUserProfile(data))
            // console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

}

export const fetchAllUser = () => {
    return async (dispatch, getState) => {
        try {
            const { data } = await Axios.get("/profiles/all", {
                headers: {
                    access_token: localStorage.access_token
                },
            })
            dispatch(setAllProfiles(data))
            // console.log(data)
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(setLoadingAll(false));
        }
    }
}