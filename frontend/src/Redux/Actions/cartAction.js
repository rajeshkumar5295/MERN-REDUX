import axios from "axios";

import { CART_ADD_ITEM ,CART_PAYMENT_METHOD,CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS} from "../Constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BACKENDURL}/api/v1/productroute/product/${id}`
  );
    console.log( "checking product in cartAction.js", data.product)

  dispatch({
     type:CART_ADD_ITEM,
     payload:{
        product:data?.product?._id,
        name:data?.product?.name,
        image:data?.product?.image,
        price:data?.product?.price,
        countInStock:data?.product?.countInStock,
        qty
     }
  })

    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));
};


export const removeFromCart=(id)=> async (dispatch,getState)=> {


          dispatch({
            type:CART_REMOVE_ITEM,
            payload:id,
          });

          localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
           
}

export const saveShippingAddress=(data)=>(dispatch)=> { 
              console.log("Checking the shipping data",data);
                
            dispatch({
              type:CART_SAVE_SHIPPING_ADDRESS,
              payload:data        
            });
             localStorage.setItem("shippingAddress",JSON.stringify(data));

}

export const paymentMethod=(data)=>(dispatch)=>{
       
    console.log("checking payment method",data);
      dispatch({
          type:CART_PAYMENT_METHOD,
          payload:data,
      })

      localStorage.setItem("paymentMethod",JSON.stringify(data));


}