import axios from "axios"
import {
    ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL,
    MYORDER_LIST_REQUEST,MYORDER_LIST_SUCCESS,MYORDER_LIST_FAIL,
    GET_ORDERS_REQUEST,GET_ORDERS_SUCCESS,GET_ORDERS_FAIL,
    ORDER_Delivery_REQUEST,
    ORDER_Delivery_SUCCESS,
    ORDER_Delivery_FAIL
} from "../Constants/orderConstant"

export const orderActions = (order) => async (dispatch, getState) => {
    try {

        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const { userLoginReducers: { userInfo } } = getState()

        const resp = await fetch(`http://localhost:4000/api/orders`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                //Autorization
                Authorization: `bearer ${userInfo.token}`,
            },
            body: JSON.stringify({
                orderItems: order.orderItems,
                shippingAddress: order.shippingAddress,
                paymentMethod: order.paymentMethod,
                itemsPrice: order.itemsPrice,
                shippingPrice: order.shippingPrice,
                taxPrice: order.taxPrice,
                totalPrice: order.totalPrice
            })
        })
        const data = await resp.json()
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data })
        //localStorage.setItem("order", JSON.stringify(data)) 

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })

    }
}

//Action to get Order by Id
export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {

        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        const { userLoginReducers: { userInfo } } = getState()

        const { data } = await axios.get(`http://localhost:4000/api/order/${id}`,{
            headers:{
                Authorization: `bearer ${userInfo.token}`,
            },
        })

        dispatch({ 
            type: ORDER_DETAILS_SUCCESS, 
            payload: data 
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })

    }
}


//orderpay Action
export const orderPayAction = (id) => async (dispatch, getState) => {
    console.log("Aqui", id)
    try {
        dispatch({
            type: ORDER_PAY_REQUEST
        })

        const { userLoginReducers: { userInfo } } = getState()

        const res = await fetch(`http://localhost:4000/api/order/${id}/pay`, {
            method: 'PUT',
            headers: {
                Authorization: `bearer ${userInfo.token}`
            },
        })

        const data = res.json()

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

//order delivery Action
export const orderDelivery = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_Delivery_REQUEST
        })

        const { userLoginReducers: { userInfo } } = getState()

        const res = await fetch(`http://localhost:4000/api/order/deliery/${id}`, {}, {
            method: 'PUT',
            headers: {
                Authorization: `bearer ${userInfo.token}`
            },
        })

        const data = res.json()

        dispatch({
            type: ORDER_Delivery_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_Delivery_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

//List My orders
export const listMyOrders = () => async (dispatch, getState) => {
    try {

        dispatch({
            type: MYORDER_LIST_REQUEST
        })

        const { userLoginReducers: { userInfo } } = getState()

        const { data } = await axios.get(`http://localhost:4000/api/orders/myorders`,{
            headers:{
                Authorization: `bearer ${userInfo.token}`,
            },
        })

        dispatch({ 
            type: MYORDER_LIST_SUCCESS, 
            payload: data 
        })

    } catch (error) {
        dispatch({
            type: MYORDER_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })

    }
}

//get all orders
export const getOrdersAction = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: GET_ORDERS_REQUEST
        })
    
        const { userLoginReducers:{userInfo} } = getState()
    
        const resp = await fetch(`http://localhost:4000/admin/orders`,{
            headers:{
                Authorization: `bearer ${userInfo.token}`
            }
        })
        const data = await resp.json()
        dispatch({
            type: GET_ORDERS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: GET_ORDERS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
        
    }
}
