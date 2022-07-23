import axios from "axios"
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
    UPDATE_PRODUCT_LOADING,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    PRODUCT_REVIEW_LOADING,
    PRODUCT_REVIEW_SUCCESS,
    PRODUCT_REVIEW_FAIL,
    PRODUCT_SEARCH,
    PRODUCT_CARROSEL_LOADING,
    PRODUCT_CARROSEL_SUCCESS,
    PRODUCT_CARROSEL_FAIL
} from "../Constants/productConstant"

//Actions to fecth all products from the Api
export const listProducts = (page) => async (dispatch) => {
    try {

     dispatch({type: PRODUCT_LIST_LOADING})
     const res = await fetch(`http://localhost:4000/api/products?page=${page}`)
     const data = await res.json()
     dispatch({
        type: PRODUCT_LIST_SUCCESS, 
        payload: data
    })  

    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAILED,
        payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
    }
}

//Actions to fetch one product from the Api
export const productDetails = (id) => async(dispatch) => {
  try {
    dispatch({type: PRODUCT_DETAILS_LOADING })
    const res = await fetch(`http://localhost:4000/api/products/${id}`)
    const data = await res.json()
    dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data })

  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAILED,
      payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message
  })
  }
}

//Delete a product
export const deleteProductAction = (id) => async(dispatch, getState) => {
    try {
        dispatch({
            type: DELETE_PRODUCT_LOADING
        })

        const { userLoginReducers: { userInfo }  } = getState()

        await fetch(`http://localhost:4000/admin/product/${id}`, {
          method: 'delete',
            headers: {
                 Authorization: `bearer ${userInfo.token}`,
            }
        })

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
        })
        
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        }) 
    }
}

//CREATE PRODUCT
export const createProductAction = () => async(dispatch, getState) => {
  try {
      dispatch({
          type: CREATE_PRODUCT_LOADING
      })

      const { userLoginReducers: { userInfo }  } = getState()

      const res = await fetch(`http://localhost:4000/admin/product/new`, {
        method: 'post',
          headers: {
               Authorization: `bearer ${userInfo.token}`,
          }
      })
      const data = await res.json()
      dispatch({
          type: CREATE_PRODUCT_SUCCESS,
          payload: data
      })
      
  } catch (error) {
      dispatch({
          type: CREATE_PRODUCT_FAIL,
          payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      }) 
  }
}

//Update PRODUCT
export const updateProductAction = ({id,name,price,image,brand,category,description,countInStock}) => async(dispatch, getState) => {
    console.log("aqui", name)
    try {
        dispatch({
            type: UPDATE_PRODUCT_LOADING
        })
  
        const { userLoginReducers: { userInfo }  } = getState()
  
        const res = await fetch(`http://localhost:4000/admin/product/${id}`, {
          method: 'PUT',
            headers: {
                'content-type':'application/json',
                 Authorization: `bearer ${userInfo.token}`,
            },
            body: JSON.stringify({
                name,
                price,
                image,
                brand,
                category,
                description,
                countInStock
            })
        })
        const data = await res.json()
        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        }) 
    }
  }

  //product reviews action
  export const productReviewAction = (id,rating,comment) => async(dispatch, getState) => {
      try {
          dispatch({
              type: PRODUCT_REVIEW_LOADING
          })

          const { userLoginReducers: { userInfo }  } = getState()
          const token = userInfo.token

          await axios.post(`http://localhost:4000/api/products/${id}/reviews`, {
            //...data
            rating:rating,
            comment:comment
          }, {
            headers: {
              'content-type':'application/json',
              'Authorization': `bearer ${token}` 
            }
          })

          dispatch({
              type: PRODUCT_REVIEW_SUCCESS
          })
          
      } catch (error) {
        dispatch({
            type: PRODUCT_REVIEW_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })     
      }
  }

  //search products
  export const productSeach = (keyword) =>({
          type: PRODUCT_SEARCH,
          payload: keyword
  })

  //Carrosel
  export const productCarrosel = () => async(dispatch) => {
    try {
        dispatch({
            type: PRODUCT_CARROSEL_LOADING
        })
        const res = await fetch(`http://localhost:4000/products/top`)
        const data = await res.json()
        dispatch({
            type: PRODUCT_CARROSEL_SUCCESS, 
            payload: data 
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_CARROSEL_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })     
        
    }
  }
       

  
