import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './Screens/HomeScreen'
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import Login from './components/Login'
import Register from './components/Register'
import ProfileScreen from './Screens/ProfileScreen';
import ShippingScreen from './Screens/ShippingScreen'
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderScreen from './Screens/OrderScreen';
import AdminScreen from './Screens/AdminScreen';
import AdminEditUser from './Screens/AdminEditUser';
import AdminProductsScreen from './Screens/AdminProductsScreen'
import AdminEditProductScreen from './Screens/AdminEditProductScreen';
import AdminOrdersScreen from './Screens/AdminOrdersScreen';

function App() {
  return (
    <Router>
        <Header />
        <main className='py-3'>
          <Container>
          <Routes>
            <Route path="/" element={<HomeScreen/>} exact/> 
            <Route path="/admin/:id/edit" element={<AdminEditUser/>}/> 
            <Route path="/admin/product/:id/edit" element={<AdminEditProductScreen/>}/>
            <Route path="/admin/orders" element={<AdminOrdersScreen />}/>
            <Route path="/admin/users" element={<AdminScreen/>}/>
            <Route path="/admin/products" element={<AdminProductsScreen/>}/>                       
            <Route path="/product/:id" element={<ProductScreen/>}/>
            <Route path="/cart/:id" element={<CartScreen/>} />
            <Route path="/user/login" element={<Login />} />
            <Route path='/user/register' element={<Register/>} />
            <Route path='/user/profile' element={<ProfileScreen/>} />
            <Route path="/user/login/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />     
          </Routes>
          </Container>
        </main>
        <Footer />
    </Router>
  );
}

export default App;
