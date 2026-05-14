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
import NavLinks from './components/NavLinks.jsx'

const App = () => {

  return (
   <div className="container   max-sm:h-[100vh]  w-screen  max-sm:overflow-y-scroll bg-gray-200/70 max-sm:overflow-x-hidden">
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
   <div className='sm:hidden p-2'>
    
    <NavLinks textColor={'white'} styles={' absolute bottom-2 left-1/2  -translate-x-1/2 w-9/10   p-3 !bg-black shadow !text-white rounded-xl justify-around items-center !z-100 h-14 '}/>
   </div>
   </div>
  )
}

export default App