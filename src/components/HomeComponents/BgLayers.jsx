import React, {useRef, useEffect} from 'react'
import { smallIcons, largeIcons, mediumIcons } from '../../controllers/Home.controller';
import { handleDrag, handleMouseMove, animate  } from '../../controllers/Home.controller';


const BgLayers = ({heroRef}) => {
 const mouse = useRef({ x: 0, y: 0 });

  const layer1 = useRef(null);
  const layer2 = useRef(null);
  const layer3 = useRef(null);


useEffect(() => {
let animationFrameId;

  const animation = ()=>{
   animate(layer1, layer2, layer3, mouse);
   animationFrameId = requestAnimationFrame(animation);
   } 
 

    const onMousemove = (e)=>{
      mouse.current = handleMouseMove(e);
    }
    const onTouchmove = (e)=>{
      mouse.current = handleDrag(e)
    }
const heroPage = heroRef.current;
    heroPage.addEventListener("mousemove", onMousemove);
    heroPage.addEventListener("touchmove", onTouchmove)

    animation()
   
    return () => {
      heroPage.removeEventListener("mousemove", onMousemove);
      heroPage.removeEventListener("touchmove", onTouchmove);
      cancelAnimationFrame(animationFrameId)
    }
  
  }, []);

  return (
    
      <div className="absolute top-0 left-0 w-full h-full   overflow-hidden ">
          
          {/* render small icons behid medium icon */}
          <div ref={layer1} className='small-icons  h-full 
            text-white-p  absolute top-0 left-0 transition duration-100  bg-black/10 ease-out  w-[130vw] -translate-x-[15vw]'
            >
             {  
              smallIcons.map((icon, index) => {  
                const top = Math.random() * 95;
                const left = Math.random() * 95;  
                return(
                  <div key={index} className='absolute bg-white-p/20 rounded-md p-2 shadow-lg animate-pulse w-8 h-8 flex justify-center items-center '  
                  style={{  
                    top: `${top}%`, left: `${left}%`}} >
                    <ion-icon name={icon} size="small" ></ion-icon>
                    </div>
                )
})
              }
          </div>
          {/* render medium icon behid large icons */}
          <div ref={layer2} className='medium-icons  h-full 
            text-white-p ease-out  absolute top-0 left-0 transition duration-100 bg-black/10 w-[130vw] -translate-x-[15vw]'
           >
             {
              mediumIcons.map((icon, index) => {  
                const top = Math.random() * 95;
                const left = Math.random() * 95;
                return(
                  <div key={index} className='absolute bg-white-p/30 rounded-md p-2 shadow-lg  w-12 h-12 flex justify-center items-center animate-pulse opacity-80'
                  style={{  
                    top: `${top}%`, left: `${left}%`}} >
                    <ion-icon name={icon} size="medium" ></ion-icon>
                    </div>
                )
})
             }
          </div>
          {/* render large icons for hero section */}
          <div ref={layer3} className='large-icons  h-full 
            text-white-p  absolute top-0 left-0  ease-out duration-100 bg-black/10 w-[130vw] -translate-x-[15vw] animate-pulse '>
             {
              largeIcons.map((icon, index) => {
              
                const top = Math.random() * 95;
                const left = Math.random() * 95;

                return(
                  <div key={index} className='absolute bg-white-p/40 rounded-md p-2 shadow-lg  w-16 h-16 flex justify-center items-center border-white-p/20 border opacity-70'
                  style={{
                    top: `${top}%`, left: `${left}%`}} >
                    <ion-icon name={icon} size="large" ></ion-icon>
                    </div>
                )


})
             }
            

          </div>
        </div>
  )
}

export default BgLayers