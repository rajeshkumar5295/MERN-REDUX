import {createStore ,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from '@redux-devtools/extension';

import { productListReducer,productDetailReducer } from "./Redux/Reducers/ProductReducer";
import {cartReducer} from "./Redux/Reducers/cartReducer"
import { userLoginReducer,userRegisterReducer,userDetailsReducer,userUpadateReducer } from "./Redux/Reducers/userReducer";
import { orderReducer,orderDetailReducer,orderPayReducer,myOrderReducer } from "./Redux/Reducers/orderReducer";


const cartItemsFromStorage=localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[];

const userInfoFromStorage=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null

const shippingAddressfromStorage=localStorage.getItem("shippingAddress")?JSON.parse(localStorage.getItem("shippingAddress")):{}

const rootReducer=combineReducers({
     productList:productListReducer,
     productReducer:productDetailReducer,
     cart:cartReducer,
     userLogin:userLoginReducer,
     userRegister:userRegisterReducer,
     userDetails:userDetailsReducer,
     updateReducer:userUpadateReducer,
     orderReducer:orderReducer,
     orderDetailReducer:orderDetailReducer,
     orderPayReducer:orderPayReducer,
     myOrderReducer:myOrderReducer
});

const intialState={
      cart:{cartItems:cartItemsFromStorage,shippingAddress:shippingAddressfromStorage},
      userLogin:{userInfo:userInfoFromStorage},
};

const middleware=[thunk];

const store = createStore(
    rootReducer,
    intialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

