import React from 'react'

import './index.css'
import './output.css'
import Nav from './components/Nav.jsx'
import Home from './pages/Home.jsx'

import Products from "./pages/Products.jsx"
import{ Routes, Route} from "react-router-dom";
import Product from "./pages/Product.jsx"
import About from "./pages/About.jsx"
import Contact from "./pages/Contact.jsx"
import Login from './pages/Login.jsx'
import Cart from './pages/Cart.jsx'
import ProtectedRoutes from './routes/ProtectedRoutes.jsx'
import PlaceOrder from './pages/PlaceOrder.jsx'
import Footer from './components/Footer.jsx'
import Productlist from './components/Productlist.jsx'
import Orders from './pages/Orders.jsx'


const App = () => {

  return (
   <div className="container w-screen relative max-sm:overflow-hidden">
   <Nav/>
   <Routes>

      <Route path="/" element={(<><Home/><Productlist/><Footer/></>)}/>
      <Route path={"/product/:id"} element={<><Product/>
      <Productlist/><Footer/></>}/>
      <Route path={"/products"} element={<><Products/></>}/>
      {/* <Route path="/about" element={<><About/></>}/>
      <Route path="/contact" element={<><Nav/><Contact/></>}/> */}
      <Route path="/Login" element={<><Login/></>}/>
      <Route element={<ProtectedRoutes />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/order/place/:id" element={<><PlaceOrder/></>} />
          <Route path="/orders" element={<><Orders/></>} />
      </Route>

   </Routes>
   </div>
  )
}

export default App