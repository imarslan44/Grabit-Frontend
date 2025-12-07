import React,{useState, useEffect, useRef} from 'react'
import  assets  from '../assets/assets.js';
import BgLayers from '../components/HomeComponents/bgLayers.jsx';

const Home = () => {
  
  
 




  return (
    <div className="w-screen    relative max-md:h-[50vh]  max-md:scale-90 max-md:w-[120vw] mx-auto " >
      <main id="hero" className={` w-screen h-screen bg-cover bg-center flex  `}
      >
       <BgLayers/>
     
        {/* main text  */}
        <div className='absolute top-1/2 left-1/2 max-md:left-7/15 max-md:top-3/8 -translate-[50%]  text-white text-shadow-lg text-shadow-gray-s'>
          <h1 className="text-white/80 font-extrabold text-5xl max-md:text-4xl tracking-tight w-screen md:text-center font-Anton uppercase  ">All kinds  of Stationaries </h1>
          <p className="text-2xl md:text-center text-gray-300">Extra ordinary starts here...</p>
        </div>
       
  {/* hero image section */} 
  
      <div className="absolute h-4/5 left-[50%] max-md:left-[40%] top-[80%] -translate-x-1/2 tran w-7/8 mx-auto rounded-lg   bg-white-p/20 backdrop-blur-md  -shadow-2xl flex justify-center items-center overflow-hidden max-lg:pl-4 max-md:flex-col-reverse max-md:h-auto ">
      {/* button for shoping page */}
     
     
     {/* logo image */}
        <div id="right" className=" w-full  flex-1  h-full flex flex-col
        justify-center items-center z-10 pt-20 max-md:hidden ">
           <div className="absolute top-5 left-10 max-md:left-0 bg-gray-s/70  px-6 max-md:px-3 py-4 max-md:py-2 rounded-md mx-3  ">

          <button className=" text-medium md:text-lg lg:text-xl bg-gray-s cursor-pointer border border-orange-p/80 shadow-2xl shadow-orange-p rounded-sm p-2  text-white-p      hover:bg-orange-p  ">
            Start Shoping
          </button>
          <p className="text-xl tracking-wide text-white text-shadow-gray-s text-shadow-xl rounded mt-2">Start discovering products and choose the best for yourself.</p>
      </div>

          <img src={assets.logo} alt="" className="    mx-auto drop-shadow-2xl " />
     

        </div>

        {/* stationaries image side */}
        <div className="w-full  flex-1   h-screen flex flex-col
        justify-center items-center z-10 pt-20  ">

       <img src={assets.stationaries} alt=""  className=" w-full 
       "/>
        </div>
        </div>
      
      </main>
        
    </div>
  )
}

export default Home