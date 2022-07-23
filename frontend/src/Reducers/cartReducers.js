import { ADD_CART, REMOVE_CART,CART_SAVING_SHIPPING_ADDRESS,
    CART_SAVING_PAYMENT_METHOD } from "../Constants/cartConstant"

const inialstateCartSate = {
    cartItems: [],
    shippingAddress: {}
}
//Reducer to add cart
export const addCartReducer = (state = inialstateCartSate, action) => {
    switch(action.type){

        case ADD_CART:
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product)

        if(existItem){
            return{
                ...state,
                cartItems: state.cartItems.map((x) => 
                x.product === existItem.product ? item: x 
                ),
            }
        
        } else {
            return{
                ...state, 
                cartItems: [...state.cartItems, item]
            }
        }
        case REMOVE_CART:
            return{
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== action.payload),
            }
        case CART_SAVING_SHIPPING_ADDRESS:
            return{
                ...state,
                shippingAddress: action.payload
            }

            case CART_SAVING_PAYMENT_METHOD:
                return{
                    ...state,
                    paymentMethod: action.payload
                }
    
        default: 
        return state
    }
}