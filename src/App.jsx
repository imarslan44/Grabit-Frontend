import React from 'react'

import './index.css'
import './output.css'
import Nav from './components/Nav.jsx'
import Home from './pages/Home.jsx'
import BestSeller from './components/BestSeller.jsx'
import Products from "./pages/Products.jsx"
import{ Routes, Route} from "react-router-dom";
import Product from "./pages/Product.jsx"
import About from "./pages/About.jsx"
import Contact from "./pages/Contact.jsx"
import Login from './pages/Login.jsx'
import Cart from './pages/Cart.jsx'

const App = () => {

  return (
    <main className="container ">
<Routes>
 <Route path="/" element={(<>
      <Nav/>
      <Home/>
      <BestSeller/>
      <Products/>
      </>)
      }/>
  <Route path={"/product/:id"} element={<><Nav/><Product/><Products/></>}/>
  <Route path={"/products"} element={
    <>
    <Nav></Nav>
    <Products/>
    </>
}/>
 <Route path="/about" element={<>
 <Nav></Nav>
 <About/>
  </>}/>
 <Route path="/contact" element={<><Nav/><Contact/></>}/>
 <Route path="/signIn/signUp" element={<><Login/></>}/>
 <Route path="/cart" element={<><Nav/><Cart/></>}/>


   
</Routes>

    </main>
  )
}

export default App