import React, { useState, useEffect } from "react";
import { getUserDetails,updateUserProfile } from "../Redux/Actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Spin from "../componants/Spin";
import FormContainer from "./FormContainer";
import { ListGroup } from "react-bootstrap";

import { Form ,Row,Col, Table, ListGroupItem} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { toast } from "react-toastify";

import { logOut } from "../Redux/Actions/userAction";
import CheckoutStep from "./CheckoutStep";

import { myOrder } from "../Redux/Actions/orderAction";
 

const MyProfile = () => {


  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username,setUsername]=useState();
  const[mobile,setMobile]=useState();

  const  userDetails=useSelector(state=>state.userDetails);
  const{user,loading,error}= userDetails;

  const myorder=useSelector((state)=>state.myOrderReducer);
    console.log("checking myOrder details",myorder?.orders?.myOrder)

  const userLogin=useSelector(state=>state.userLogin);
  const{userInfo}=userLogin;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getUserDetails());
    dispatch(myOrder());
    if(user){
      setEmail(user?.email);
      setUsername(user?.username)
      setMobile(user?.mobile)
    }
    
  },[dispatch])

  



//  useEffect(()=>{
//               if(!userInfo){
//                 navigate("/login")
//               }else{
//                 if(!user.name){
//                   dispatch(getUserDetails());
//                 }else{
//                   setEmail(user?.email);
//                  setUsername(user?.username)
//             setMobile(user?.mobile)
                  
//                 }
//               }
//  },[])
  

  
   console.log("checking user in my profile",user,loading,error);
  //  console.log("checking user.name",user.username);
    
     
    

  const updateHandler = (e) => {
        
    e.preventDefault();
    console.log("email and password" ,email,password,username,mobile)
    dispatch(
      updateUserProfile(email,password,username,mobile)
    )   

    navigate("/");
    dispatch(logOut())

   

  };

 

  return (
    <>      
        {/* <span>     <CheckoutStep  /> </span> */}
            
        <Row style={{marginTop:"10px"}} >
            <Col md={5} >
            <FormContainer>
         {
          loading?<Spin/>: (<>
                   <h1> Your Profile </h1>
        <Form  onSubmit={updateHandler} >
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label> Your Name</Form.Label>
            <Form.Control type="text" placeholder="Your name" required  value={username} onChange={(e)=>setUsername(e.target.value)}   />
          
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> Your Email </Form.Label>
            <Form.Control type="email" placeholder="Enter email" required  value={email} onChange={(e)=>setEmail(e.target.value)}   />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicMobile">
            <Form.Label> Your Mobile Number</Form.Label>
            <Form.Control type="number" placeholder="mobile number" required  value={mobile} onChange={(e)=>setMobile(e.target.value)}   />
          
          </Form.Group>

          {/* <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label> Your  Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          </Form.Group> */}
      
          <Button variant="primary" type="submit">
            Update Your Profile
          </Button>
         
        </Form>

        {/* <Form.Text  style={{marginTop:'5px'}} > Already Have An Account ? <Link to="/login" > Login Here </Link>   </Form.Text> */}
          </>)
         }
      </FormContainer>
            </Col>
            <Col md={7} >
                <h1>
                  Your Orders
                </h1>

                <Table>
                     <thead>
                        <tr>
                           <td> Id </td>
                           <td> DATE  </td>
                           <td>TOTAL</td>
                           <td>PAID</td>
                           <td> DELEVERED </td>

                        </tr>
                     </thead>
                     <tbody>
                         
                            {
                               myorder?.orders?.myOrder?.map((item,index)=>(
                                 <>
                                 <tr key={index} >
                                   <td> {item._id} </td>  
                                   <td> {item.createdAt.substring(0,10)} </td>                                  
                                   <td>{item.totalPrice} </td>
                                   <td></td>
                                 </tr>

                                 </>
                               ))
                            }
                        
                     </tbody>
                </Table>
            </Col>
        </Row>
    </>
  );
};

export default MyProfile;

