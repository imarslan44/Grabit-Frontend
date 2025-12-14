import React from 'react'
import { assets } from '../assets/assets'
const Home = () => {
  return (
    // home page
    <section id="/" className="w-screen h-screen  flex justify-end px-10  pb-4 pt-16 max-md:h-80 max-md:px-6 max-sm:px-3 max-sm:pb-1">
      {/* hero page wraper */}
      <main className="w-full h-full flex-1 flex bg-primary-2 rounded-lg overflow-hidden ">
     
      {/* left side / text side */}
      <div className="w-1/2 flex-1 h-full flex justify-center items-center bg-blend-lighten    transition-all duration-400 md:px-10  px-4">
        <div>
        <h1 className="md:font-extrabold font-bold md:text-4xl text-black   uppercase">Online <span className="text-lite-1">Market</span>Place
          </h1>
        <p className="text-md text-secondary-2/70 max-md:hidden">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat asperiores ab tempora odit quos voluptatum iusto, possimus dicta voluptates eius!</p>
        </div>
      </div>

      {/* right side / image side */}
      <div className=' w-1/2 h-full flex justify-center items-center p-10 '>
        <img src={assets.hero_image} alt="" />
      </div>
       </main>
    </section>
  )
}

export default Home