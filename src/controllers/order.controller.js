import { BACKEND_URL } from "../config/env";
import { fetchUser } from "./user.controller";


// place order logic
export const placeOrderCOD = async (orderData)=>{
    try{

     
      const url = `${BACKEND_URL}/order/place/cod`;
      const order = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(orderData)
      });
  console.log("ordder:", order)
      const data = await order.json();

    
      console.log("data", data)
      if(!data.success) return

      alert("order placed successfully!!");
      

    } catch(error){
     console.log(error)
    }
  }


export const handlePayment = async (orderData)=>{
   const user =  await fetchUser();
   console.log(user)
    try{
      const url = `${BACKEND_URL}/api/order/place/razorpay`;
      
      const order = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        credentials: "include",
        body: JSON.stringify(orderData)
      })

      console.log(order)
      const data = await order.json();
      console.log("data",data);

  // handle checkout uin razorpay forntend

  const options = {
    
    key: data.key_id, // Merchant key from backend 
    amount: data.order.amount, // Amount in paise (e.g. 50000 = ₹500) 
    currency: data.order.currency, // Currency (e.g. INR) 
    name: "Grabit Official", // Merchant/business name
    description: "Order Payment",    // Description shown in checkout
    image: "https://example.com/logo.png",   // Optional logo 
    order_id: data.order.id,    // Razorpay order_id from backend

    handler : async function (response){
      const verifyUrl = `${BACKEND_URL}/api/order/razorpay/verify`;
      const verification = await fetch(verifyUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
           razorpay_payment_id: response.razorpay_payment_id,
           razorpay_order_id: response.razorpay_order_id,
           razorpay_signature: response.razorpay_signature,
           order_id: data.order_id
        })
      });

      const result = await verification.json();

      console.log(result);
      alert(result.message);


    },

    "prefill": {

        "name": user?.name,
        "email": user?.email,
        "contact": user?.phone || "000 000  1234 "

    },

    "notes": {
        "address": "Razorpay Corporate Office"
    },

    "theme": {
        "color": "#3399cc"
    }


  };
  var rzp1 = new Razorpay(options);
rzp1.on('payment.failed', function (response){
        alert(response.error.description);
        navigate("/pyment/failed");
       
});

    rzp1.open();
 



    } catch(error){
      console.log(error)
    }
  }