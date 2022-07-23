import {
    ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_RESET,
    MYORDER_LIST_REQUEST,MYORDER_LIST_SUCCESS,MYORDER_LIST_FAIL,MYORDER_LIST_RESET,
    GET_ORDERS_REQUEST,GET_ORDERS_SUCCESS,GET_ORDERS_FAIL,
    ORDER_Delivery_REQUEST,
    ORDER_Delivery_SUCCESS,
    ORDER_Delivery_FAIL,
    ORDER_Delivery_RESET
}
    from "../Constants/orderConstant"

export const orderReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {
                loading: true
            }

        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }

        case ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }

}

//Order Details Reducer

export const orderDetailsReducers = (state = {loading: true, orderItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }

        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }

}

//update order to paid
export const orderPay = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return { loading: true }
        case ORDER_PAY_SUCCESS:
            return { success: true }
        case ORDER_PAY_FAIL:
            return { error: action.payload }
        case ORDER_PAY_RESET:
            return {}
        default:
            return state
    }
}

//update order to delivery
export const orderDelivery = (state = {}, action) => {
    switch (action.type) {
        case ORDER_Delivery_REQUEST:
            return { loading: true }
        case ORDER_Delivery_SUCCESS:
            return { success: true }
        case ORDER_Delivery_FAIL:
            return { error: action.payload }
        case ORDER_Delivery_RESET:
            return {}
        default:
            return state
    }
}

//my order lists
export const myorderListReducer = (state = {myOrders: [] }, action) => {
    switch (action.type) {
        case MYORDER_LIST_REQUEST:
            return { 
                loading: true 
            }

        case MYORDER_LIST_SUCCESS:
            return { 
                success: true,
                myOrders: action.payload 
            }

        case MYORDER_LIST_FAIL:
            return { 
                error: action.payload 
            }
            case MYORDER_LIST_RESET:
                return { 
                    myOrders: [] 
                }

        default:
            return state
    }

}

//get all orders
export const getOrders = (state = {orders:[] }, action) => {
    switch(action.type){
        case GET_ORDERS_REQUEST:
            return {
                loading: true
            }
        case GET_ORDERS_SUCCESS:
            return{
                loading: false,
                orders: action.payload
            }
        case GET_ORDERS_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        default:
            return state
    }

}