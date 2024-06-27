import React, { useState, useEffect } from "react";
import { login } from "../Redux/Actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Spin from "../componants/Spin";
import FormContainer from "./FormContainer";

import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch();

  const userLogin=useSelector(state=>state.userLogin);
   const{userInfo,loading,error}=userLogin;
   console.log("checking userInfo",userInfo,loading,error);
    
     
     useEffect(()=>{
          if(userInfo){
            navigate("/");  
          }
     },[userInfo])

  const submitHandler = (e) => {
      
    e.preventDefault();
    console.log("email and password" ,email,password)
    dispatch(
        login(email,password)
    )  
  };

 

  return (
    <>
      <FormContainer>
         {
          loading?<Spin/>: (<>
                   <h1> SIGN IN </h1>
        <Form  onSubmit={submitHandler} >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email"  value={email} onChange={(e)=>setEmail(e.target.value)}   />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}       />
          </Form.Group>
      
          <Button variant="primary" type="submit">
            Submit
          </Button>
         
        </Form>

        <Form.Text  style={{marginTop:'5px'}} > Not Have an Account ? <Link to="/signup" > Register Here </Link>   </Form.Text>
          </>)
         }
      </FormContainer>
    </>
  );
};

export default Login;
