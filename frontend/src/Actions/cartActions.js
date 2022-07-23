import { ADD_CART,REMOVE_CART,CART_SAVING_SHIPPING_ADDRESS,
  CART_SAVING_PAYMENT_METHOD } from "../Constants/cartConstant"

//Action to add to cart
export const addToCart = (id,qty) => async (dispatch, getState) => {
    const res = await fetch(`http://localhost:4000/api/products/${id}`)
    const data = await res.json()
    dispatch({
      type: ADD_CART,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty
      }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().addCartReducer.cartItems))
  }
  
  //Remove cart
  export const romoveCart = (id) => (dispatch, getState) => {
    dispatch({
      type: REMOVE_CART,
      payload: id
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().addCartReducer.cartItems))
  }

    //Shipping
    export const shippingAdress = (data) => (dispatch) => {
      dispatch({
        type:CART_SAVING_SHIPPING_ADDRESS,
        payload: data
      })
      localStorage.setItem('shippingAddress', JSON.stringify(data))
    }

      //Payment
      export const savePaymentMethod = (data) => (dispatch) => {
        dispatch({
          type:CART_SAVING_PAYMENT_METHOD,
          payload: data
        })
        localStorage.setItem('PaymentMethod', JSON.stringify(data))
      }