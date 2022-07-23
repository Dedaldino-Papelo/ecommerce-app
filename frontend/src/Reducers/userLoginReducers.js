import { 
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL, 
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL, 
    USER_DETAILS_RESET,
    LIST_ALL_USERS_REQUEST,
    LIST_ALL_USERS_SUCCESS,
    LIST_ALL_USERS_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_RESET,
    UPDATE_USER_FAIL,
    GET_USER_DETAIL_REQUEST,
    GET_USER_DETAIL_SUCCESS,
    GET_USER_DETAIL_FAIL

} 
    from '../Constants/userConstants'


export const userLoginReducers = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {loading: true}
        case USER_LOGIN_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case USER_LOGIN_FAIL: 
            return {
                loading:false, 
                error: action.payload
            }
        case USER_LOGOUT: 
            return {}   
        default:
            return state
    }
}

//User register Reducer
export const userRegisterReducers = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {loading: true}
        case USER_REGISTER_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case USER_REGISTER_FAIL: 
            return {loading:false, error: action.payload}  
        default:
            return state
    }
}

//User Details Reducer
export const userDetailsReducers = (state = {user: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return {...state, loading: true}

        case USER_DETAILS_SUCCESS:
            return {loading: false, user: action.payload}

        case USER_DETAILS_FAIL: 
            return {loading:false, error: action.payload}

            case USER_DETAILS_RESET: 
            return {
                user: {}
            }
          
        default:
            return state
    }
}

//User Update Profile
export const userUpdateReducers = (state = { }, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return {loading: true}
        case USER_UPDATE_SUCCESS:
            return {loading: false, success:true, userInfo: action.payload}
        case USER_UPDATE_FAIL: 
            return {loading:false, error: action.payload}  
        default:
            return state
    }
}


//List All user Reducer
export const listAllReducers = (state = { user: [] }, action) => {
    switch (action.type) {
        case LIST_ALL_USERS_REQUEST:
            return {
                loading: true
            }

        case LIST_ALL_USERS_SUCCESS:
            return {
                loading: false,  
                user: action.payload
            }

        case LIST_ALL_USERS_FAIL: 
            return {
                loading:false, 
                error: action.payload
            }

        default:
            return state
    }
}

//Delete user Reducer
export const DeleteUserReducers = (state = { }, action) => {
    switch (action.type) {
        case DELETE_USER_REQUEST:
            return {
                loading: true
            }

        case DELETE_USER_SUCCESS:
            return {
                loading: false,  
                success: true
            }

        case DELETE_USER_FAIL: 
            return {
                loading:false, 
                error: action.payload
            }

        default:
            return state
    }
}

//Get user Details
export const getDetailsUserReducers = (state = { user:{} }, action) => {
    switch (action.type) {
        case GET_USER_DETAIL_REQUEST:
            return {
                    ...state, 
                    loading: true
                }

        case GET_USER_DETAIL_SUCCESS:
            return {
                loading: false,  
                user:action.payload
            }

        case GET_USER_DETAIL_FAIL: 
            return {
                loading:false, 
                error: action.payload
            }

        default:
            return state
    }
}

//Admin update users
export const updateUserReducers = (state = { user: {} }, action) => {
    switch (action.type) {
        case UPDATE_USER_REQUEST:
            return { 
                    loading: true
                }

        case UPDATE_USER_SUCCESS:
            return {
                loading: false,
                success: true  
            }

        case UPDATE_USER_FAIL: 
            return {
                loading:false, 
                error: action.payload
            }

        case UPDATE_USER_RESET: 
            return {
               user: {}
            }

        default:
            return state
    }
}
