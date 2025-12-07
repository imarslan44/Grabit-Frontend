import React from 'react'
import './index.css'
import './output.css'
import Nav from './components/Nav.jsx'
import Home from './pages/Home.jsx'
import BestSeller from './components/BestSeller.jsx'
import Products from "./pages/Products.jsx"

const App = () => {
  return (
    <main className="container  ">
      <Nav/>
      <Home/>
      <BestSeller/>
      <Products/>

    </main>
  )
}

export default App