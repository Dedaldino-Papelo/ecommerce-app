import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk  from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer,
         productDetailsReducer,
         deleteProductReducer,
        createProductReducer, 
        updateProductReducer,
        productReviewReducers,
        productSeachReducer,
        productCarroselReducer
      } from './Reducers/productReducers'

import { addCartReducer } from './Reducers/cartReducers'

import { userLoginReducers, 
        userRegisterReducers,
        userDetailsReducers,
        userUpdateReducers,
        listAllReducers,
        DeleteUserReducers,
        getDetailsUserReducers,
        updateUserReducers,
        
 } 
 from './Reducers/userLoginReducers';

import { orderReducer,
        orderDetailsReducers,
        orderPay,
        myorderListReducer,
        orderDelivery,
        getOrders  } from './Reducers/orderReducers';

const middleware = [thunk]

const reducer = combineReducers({
    productListReducer, 
    productDetailsReducer,
    addCartReducer,
    userLoginReducers,
    userRegisterReducers,
    userDetailsReducers,
    userUpdateReducers,
    orderReducer,
    orderDetailsReducers,
    orderPay,
    myorderListReducer,
    listAllReducers,
    DeleteUserReducers,
    getDetailsUserReducers,
    updateUserReducers,
    deleteProductReducer,
    createProductReducer,
    updateProductReducer,
    getOrders,
    orderDelivery,
    productReviewReducers,
    productSeachReducer,
    productCarroselReducer
    
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
JSON.parse(localStorage.getItem('userInfo')) : null 

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
JSON.parse(localStorage.getItem('shippingAddress')) : {}


     const initialState = {
       cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage },
      userLogin: {userInfo: userInfoFromStorage }
    } 
  
  const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

  export default store