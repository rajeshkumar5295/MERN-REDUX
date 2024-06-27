import axios from "axios";
import { toast } from "react-toastify";

import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_FAIL,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "../Constants/userConstant";

export const login = (email, password) => async (dispatch) => {
  console.log("email and password in userAction", email, password);
  try {
    // dispatch({type:USER_LOGIN_REQUEST})
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKENDURL}/api/v1/auth/login`,
      { email, password },
      config
    );
    console.log("checking data in userAction login", data);

    if (data.success) {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } else {
      toast.error(data.message);
      // dispatch({
      //     type:USER_LOGIN_FAIL
      // })
      // window.location.reload()
    }
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.resposnse.data.message
          : error.message,
    });
  }
};

export const logOut = () => async (dispatch) => {
  dispatch({ type: USER_LOGOUT });

  localStorage.removeItem("userInfo");
};

export const register =
  (email, password, username, mobile) => async (dispatch) => {
    console.log(
      "email and password in userAction",
      email,
      password,
      username,
      mobile
    );
    try {
      //    dispatch({type:USER_REGISTER_REQUEST })
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKENDURL}/api/v1/auth/signup`,
        { email, password, username, mobile },
        config
      );
      console.log(data);

      if (data.success) {
        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: data?.user,
        });
      } else {
        toast.error(data.message);
      }

      //  localStorage.setItem('userInfo',JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.resposnse.data.message
            : error.message,
      });
    }
  };

export const getUserDetails = () => async (dispatch,getState ) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKENDURL}/api/v1/auth/myprofile`,config
    );
  console.log("my userDetails data",data)
    dispatch({
       type:USER_DETAILS_SUCCESS,
       payload:data?.user
    })
 } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.resposnse.data.message
          : error.message,
    });
  }
};


export const updateUserProfile=(email,password,username,mobile)=>async(dispatch,getState)=> {  
  try {         
              console.log("checking details in updated fn",email,password,username,mobile);
             dispatch({type:USER_UPDATE_REQUEST});
             const {userLogin:{userInfo}}=getState();
               console.log("checking token in updatuseraction ",userInfo.token);
             const config={
                headers:{
                  "Content-Type":"Application/json",
                  Authorization:`Bearer ${userInfo?.token}`
                }
             }
            
             const { data } = await axios.put(
              `${process.env.REACT_APP_BACKENDURL}/api/v1/auth/myprofile`, {email,password,username,mobile} ,config
            );

            console.log("checing updated data",data);
            dispatch({type:USER_UPDATE_SUCCESS,payload:data?.updateUser})
             

            
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.resposnse.data.message
          : error.message,
    });
    
  }

}
