import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import {Container} from "react-bootstrap"
import Footer from "./componants/Footer";
import Header from "./componants/Header";
import Homescreen from "./Screens/Homescreen";

import {BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Cart from "./componants/Cart";
import Login from "./Screens/Login";
import ProductDetail from "./Screens/ProductDetail";

import MyProfile from "./Screens/MyProfile";
import Signup from "./Screens/Signup";
import ShippingScreen from "./Screens/ShippingScreen";
import PaymentScreen from "./Screens/PaymentScreen";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PlaceOrder from "./Screens/PlaceOrder";
import OrderDetail from "./Screens/OrderDetail";

function App() {
  return (
    <Router>  
      
      <Header/>
    
    <main  className="" >
      <Container className="" >
        {/* <h1> MERN-ECOMMERCE </h1> */}
        {/* navigate(`/cart/${id?.id}?qty=${qty}`) */}
         <Routes>
         <Route  path="/" element={<Homescreen/>}  exact  />
         <Route  path="/cart/:id?" element={<Cart/>} />
         <Route  path="/login" element={<Login/>} />
         <Route  path="/shipping" element={<ShippingScreen/>}  />
         <Route  path="/placeorder" element={<PlaceOrder/>} />
         <Route   path="/payment" element={<PaymentScreen/>}  />
         <Route  path="/product/:id" element={<ProductDetail/>} />
         <Route  path="/profile" element={<MyProfile/>}  />
         <Route  path="/signup" element={<Signup/>} />
         <Route  path="/order/:id" element={<OrderDetail/>} />  
         </Routes>
      
      </Container>
    
    </main>
    

    <Footer />
    <ToastContainer />
      
    </Router>
  );
}

export default App;
