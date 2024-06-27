import React from 'react'
import { Navbar,Nav,Container, NavLink } from 'react-bootstrap'

import {useSelector,useDispatch} from 'react-redux'
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import {logOut} from "../Redux/Actions/userAction"

const Header = () => {
              
     const userLogin=useSelector(state=>state.userLogin);
          const {userInfo,loading,error}=userLogin;

          const dispatch=useDispatch();
               const navigate = useNavigate();
          console.log( "checking usr  in header", userInfo)

           const logOutHandler=()=>{  
                  dispatch(logOut());
               console.log("logout successfully");
               navigate("/")
           }

  return (
    <Navbar expand="lg" className="bg-dark  "variant='dark' collapseOnSelect style={{marginBottom:"40px"}}  > 
    <Container>
          
          <Link to="/"  style={{textDecoration:'none'}}  > <Navbar.Brand >Shope Here</Navbar.Brand>   </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={{marginLeft:"auto"}}>
          <Nav.Link  >  <Link to="/cart" style={{color:"white" ,textDecoration:"none"}} >  <i class="fa-solid fa-cart-shopping"></i> Cart </Link> </Nav.Link> 

               {
                userInfo?(
                  <NavDropdown title={userInfo?.username} id="nav-dropdown">
        <NavDropdown.Item > <Link  to="/profile" style={{textDecoration:'none'}} > My Profile </Link> </NavDropdown.Item>
        <NavDropdown.Item  onClick={logOutHandler}   >LogOut</NavDropdown.Item>
       
      </NavDropdown> 
                        
                        ):(
                  <Nav.Link > 
                  <Link  to="/login"  style={{color:"white" ,textDecoration:'none'}} > <i class="fa-solid fa-user"></i>  LogIn </Link> 
                </Nav.Link>
                )
               }

         
         
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
      

  )
}

export default Header
