import {
    PRODUCT_LIST_LOADING,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAILED,
    PRODUCT_DETAILS_LOADING,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAILED,
    DELETE_PRODUCT_LOADING,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    CREATE_PRODUCT_LOADING,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
    CREATE_PRODUCT_RESET,
    UPDATE_PRODUCT_LOADING,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_RESET,
    UPDATE_PRODUCT_FAIL,
    PRODUCT_REVIEW_LOADING,
    PRODUCT_REVIEW_SUCCESS,
    PRODUCT_REVIEW_FAIL,
    PRODUCT_REVIEW_RESET,
    PRODUCT_SEARCH,
    PRODUCT_CARROSEL_LOADING,
    PRODUCT_CARROSEL_SUCCESS,
    PRODUCT_CARROSEL_FAIL
} from "../Constants/productConstant"

const initialState = {
    products: []
}
//Reducer to list all products
export const productListReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_LIST_LOADING:
            return {
                loading: true,
                products: []
            }

        case PRODUCT_LIST_SUCCESS:
            return {
                products: action.payload.product,
                totalPages: action.payload.pageCount,
                loading: false
            }

        case PRODUCT_LIST_FAILED:
            return {
                error: action.payload,
                loading: false
            }
        default:
            return state
    }
}

//Reducer to display product details
export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_LOADING:
            return { loading: true, product: {} }
        case PRODUCT_DETAILS_SUCCESS:
            return { product: action.payload, loading: false }
        case PRODUCT_DETAILS_FAILED:
            return { error: action.payload, loading: false }
        default:
            return state
    }
}

//Reducer to Delete a Product
export const deleteProductReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_PRODUCT_LOADING:
            return {
                loading: true,
            }

        case DELETE_PRODUCT_SUCCESS:
            return {
                success: true,
                loading: false
            }

        case DELETE_PRODUCT_FAIL:
            return {
                error: action.payload,
                loading: false
            }
        default:
            return state
    }
}

//Create product
export const createProductReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_PRODUCT_LOADING:
            return {
                loading: true,
            }

        case CREATE_PRODUCT_SUCCESS:
            return {
                success: true,
                product: action.payload,
                loading: false
            }

        case CREATE_PRODUCT_FAIL:
            return {
                error: action.payload,
                loading: false
            }
        case CREATE_PRODUCT_RESET:
            return {}

        default:
            return state
    }
}

//Create product
export const updateProductReducer = (state = { Product: {} }, action) => {
    switch (action.type) {
        case UPDATE_PRODUCT_LOADING:
            return {
                Loading: true,
            }

        case UPDATE_PRODUCT_SUCCESS:
            return {
                Success: true,
                Product: action.payload,
                loading: false
            }

        case UPDATE_PRODUCT_FAIL:
            return {
                error: action.payload,
                loading: false
            }
        case UPDATE_PRODUCT_RESET:
            return {}

        default:
            return state
    }
}

//Product reviewing
export const productReviewReducers = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_REVIEW_LOADING:
            return {
                loading: true
            }
        case PRODUCT_REVIEW_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case PRODUCT_REVIEW_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case PRODUCT_REVIEW_RESET:
            return {}
        default:
            return state
    }
}

//search product
export const productSeachReducer = (state = { keyword: '' }, action) => {
    switch (action.type) {
        case PRODUCT_SEARCH:
            return {
                ...state,
                keyword: action.payload
            }
        default:
            return state
    }
}

//carrosel
export const productCarroselReducer = (state = {products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_CARROSEL_LOADING:
            return {
                loading: true
            }
        case PRODUCT_CARROSEL_SUCCESS:
            return {
                loading: false,
                products: action.payload
            }
        case PRODUCT_CARROSEL_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}