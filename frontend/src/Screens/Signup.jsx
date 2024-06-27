import React, { useState, useEffect } from "react";
import { register } from "../Redux/Actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Spin from "../componants/Spin";
import FormContainer from "./FormContainer";

import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';


const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username,setUsername]=useState();
  const[mobile,setMobile]=useState();
  const [confirmPassword,setConfirmPassword]=useState();

  const dispatch = useDispatch();

  const  userRegister=useSelector(state=>state.userRegister);
   const{userInfoReg,loading,error}= userRegister;
   console.log("checking userInfo",userInfoReg,loading,error);
    
     
     useEffect(()=>{
          if(userInfoReg){
            navigate("/login");  
          }
     },[userInfoReg])

  const submitHandler = (e) => {
      
    e.preventDefault();
    console.log("email and password" ,email,password,username,mobile)
    dispatch(
      register(email,password,username,mobile)
    )  
    setEmail("")
    setUsername("")
    setPassword("")
    setMobile("")
    // navigate("/login")
  };

 

  return (
    <>
      <FormContainer>
         {
          loading?<Spin/>: (<>
                   <h1> SIGNUP HERE </h1>
        <Form  onSubmit={submitHandler} >
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Enter Your Name</Form.Label>
            <Form.Control type="text" placeholder="Your name" required  value={username} onChange={(e)=>setUsername(e.target.value)}   />
          
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter Your Email </Form.Label>
            <Form.Control type="email" placeholder="Enter email" required  value={email} onChange={(e)=>setEmail(e.target.value)}   />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicMobile">
            <Form.Label>Enter Your Mobile Number</Form.Label>
            <Form.Control type="number" placeholder="mobile number" required  value={mobile} onChange={(e)=>setMobile(e.target.value)}   />
          
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          </Form.Group>
      
          <Button variant="primary" type="submit">
            Submit
          </Button>
         
        </Form>

        <Form.Text  style={{marginTop:'5px'}} > Already Have An Account ? <Link to="/login" > Login Here </Link>   </Form.Text>
          </>)
         }
      </FormContainer>
    </>
  );
};

export default Signup;
