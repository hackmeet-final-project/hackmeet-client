import { GET_USER_PROFILE, SET_LOGIN } from "../actions/user/actionType"

const initialState = {
    profile: [],
    isLogin: false
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
        default:
            return state
    }
}

export default userReducer