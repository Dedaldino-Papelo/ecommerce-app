import axios from 'axios'
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
    UPDATE_USER_FAIL,
    GET_USER_DETAIL_REQUEST,
    GET_USER_DETAIL_SUCCESS,
    GET_USER_DETAIL_FAIL
} from '../Constants/userConstants'
import { MYORDER_LIST_RESET } from '../Constants/orderConstant'

//user login Actions
export const loginActions = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        const { data } = await axios.post(
            'http://localhost:4000/api/users/login',
            { email, password },
            config
        )
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message

        })

    }
}

//user Register Actions
export const RegisterActions = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: { 'content-type': 'application/json' }
        }

        const { data } = await axios.post(
            'http://localhost:4000/api/users/register',
            { name, email, password },
            config
        )


        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        console.log(error)
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

//Logout Action
export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: MYORDER_LIST_RESET })


}

//Get The user details
export const userDetailsActions = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const { userLoginReducers: { userInfo } } = getState()

        const res = await fetch(`http://localhost:4000/api/users/${id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                Authorization: `bearer ${userInfo.token}`,
            }
        })
        const data = await res.json()
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

//Update the User profile
export const userUpdateActions = (name, email, password) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        })

        const { userLoginReducers: { userInfo } } = getState()

        const res = await fetch(`http://localhost:4000/api/users/profile`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                Authorization: `bearer ${userInfo.token}`,
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        })
        const data = await res.json()
        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data
        })
        // localStorage.setItem('userInfo', JSON.stringify(data)) 

    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

//List User
export const listUserAcion = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_ALL_USERS_REQUEST
        })

        const { userLoginReducers: { userInfo } } = getState()

        const res = await fetch(`http://localhost:4000/admin/users`, {
            headers: {
                Authorization: `bearer ${userInfo.token}`,
            },
        })
        const data = await res.json()
        console.log(data)
        dispatch({
            type: LIST_ALL_USERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: LIST_ALL_USERS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

//delete user
export const deleteUserAction = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_USER_REQUEST
        })

        await fetch(`http://localhost:4000/admin/${id}`, {
            method: 'delete'
        })
        dispatch({
            type: DELETE_USER_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })

    }
}

//get user Details Action
export const getUserDetailsActions = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_USER_DETAIL_REQUEST
        })

        const { userLoginReducers: { userInfo } } = getState()

        const res = await fetch(`http://localhost:4000/admin/${id}/edit`, {
            headers: {
                Authorization: `bearer ${userInfo.token}`,
            }
        })
        const data = await res.json()
        dispatch({
            type: GET_USER_DETAIL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_USER_DETAIL_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

//get user Details Action
export const updateUserActions = ({ id, name, email, isAdmin }) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_USER_REQUEST
        })

        const { userLoginReducers: { userInfo } } = getState()

        const res = await fetch(`http://localhost:4000/admin/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                Authorization: `bearer ${userInfo.token}`,
            },
            body: JSON.stringify({
                id,
                name,
                email,
                isAdmin
            })
        })
        const data = res.json()
        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

