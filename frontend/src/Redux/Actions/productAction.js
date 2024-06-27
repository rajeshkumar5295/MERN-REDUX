import axios from "axios"

import {PRODUCT_LIST_FAILS,PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS,
        PRODUCT_DETAILS_FAILS,PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS
} from "../Constants/productConstant"


export const listProducts=()=>async(dispatch)=> {
    try { 
        dispatch({type:PRODUCT_LIST_REQUEST});

        const {data}=await axios.get(`${process.env.REACT_APP_BACKENDURL}/api/v1/productroute/products`);

        // console.log("checking data in productAction",data.products);
        dispatch({
             type:PRODUCT_LIST_SUCCESS,
             payload:data?.products,
        })
        
    } catch (error) {
      dispatch({
        type:PRODUCT_LIST_FAILS,
        payload:
        error.response && error.response.data.message?
        error.response.data.message
        :error.message
      })
        
        
    }
}

export const productDetail=(id)=> async(dispatch)=> { 
  try {  
        dispatch({type:PRODUCT_DETAILS_REQUEST});
        const {data}=await axios.get(`${process.env.REACT_APP_BACKENDURL}/api/v1/productroute/product/${id?.id}`);

        console.log("checking single productDetail", data);
        dispatch({
           type:PRODUCT_DETAILS_SUCCESS,
           payload:data?.product,
        }) 
      
      } catch (error) {

    dispatch({
      type:PRODUCT_DETAILS_FAILS,
      payload:
      error.response && error.response.data.message?
      error.response.data.message
      :error.message
    })
    
  }
}