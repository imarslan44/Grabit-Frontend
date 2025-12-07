//name properties for backgroundIcons
export const largeIcons = [
  "book-outline",
  "",
  "bookmarks-outline",
  "book-outline",
  "pencil-outline",
  "newspaper-outline",
  "document-outline",
  "map-outline",
  "",
  "gift-outline",
  "map-outline",
  "pencil-outline"

];
 export const mediumIcons = [
  "book-outline",
  "bookmark-outline",
  "",
  "",
  "pencil-outline",
  "newspaper-outline",
  "document-outline",
  "map-outline",
  "",
  "gift-outline",
  "map-outline",
  "pencil-outline"
  ];
  export const smallIcons = [
   
    "bookmark-outline",
    "",
    "book-outline",
    "pencil-outline",
    "newspaper-outline",
    "document-outline",
    "",
    "map-outline",
    "gift-outline",
    "map-outline",
    "pencil-outline"
    ];



    // three functions to animate hero section 
  export   const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5);
      const y = (e.clientY / window.innerHeight - 0.5);
     return { x, y };
     
    };

    export const handleDrag = (e)=>{
       
        let touch = e.touches[0];
        const x = (touch.clientX / window.innerWidth -0.5);
        const y = (touch.clientY / window.innerHeight -0.5);
        
       return {x, y}
    

    }

    export  const animate = (layer1, layer2, layer3, mouse) => {
    // Apply transforms based on latest mouse position
    
      layer1.current.style.transform = `translate(${mouse.current.x * 60}px, ${mouse.current.y * 60}px)`;
      layer2.current.style.transform = `translate(${mouse.current.x * 120}px, ${mouse.current.y * 120}px)`;
      layer3.current.style.transform = `translate(${mouse.current.x * 180}px, ${mouse.current.y * 180}px)`;
    
    }
  
