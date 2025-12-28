import { BACKEND_URL } from "../config/env"

export const addToCart = async (cartData) =>{
    
    const url = `${BACKEND_URL}/api/cart`

    const response = await fetch(url, {
       method: "POST", 
       headers: { 
        "Content-Type": "application/json"
       }, 
       credentials: "include",
       body: JSON.stringify(cartData)

    });

  
        
  const data = await response.json();
  console.log(data);
  const status = response.status;
 
  return {status, data}
}

export const getCartItems = async () =>{
    try{
   const url = `${BACKEND_URL}/api/cart`
   const response = await fetch(url, {
    credentials: "include"
   });
   const data = await response.json();


   const status = response.status
   
  if(status === 401){

  };
   return data;
  
    }catch(error){
        console.log(error);
    }

}

export const  deleteCartItem = async (id)=>{
  try{
    const url = `${BACKEND_URL}/api/cart/${id}`;
    const response = await fetch(url,{
      method: 'DELETE',
      header: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })

    console.log(response);


  } catch(error){
    console.log(error)
  }
}