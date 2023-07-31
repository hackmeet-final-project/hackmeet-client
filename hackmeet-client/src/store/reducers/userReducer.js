import { GET_ALL_USER, GET_USER_PROFILE, LOADING_ALL_USER, SET_LOGIN } from "../actions/user/actionType"

const initialState = {
    profile: {},
    isLogin: false,
    profiles: [],
    loadingAll: true
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_USER_PROFILE:
            return {
                ...state,
                profile: action.payload
            }
        case SET_LOGIN:
            return {
                ...state,
                isLogin: action.payload
            }
        case GET_ALL_USER:
            return {
                ...state,
                profiles: action.payload
            }
        case LOADING_ALL_USER: 
        return {
            ...state,
            loadingAll: action.payload
        }
        default:
            return state
    }
}

export default userReducer