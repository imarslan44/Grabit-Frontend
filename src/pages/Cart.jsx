import React, { useEffect, useState } from 'react'
import { getCartItems } from '../controllers/cart.controller';
import { Link } from 'react-router-dom';
import { deleteCartItem } from '../controllers/cart.controller.js';


const Cart = () => {


  const [CartItems, setCartItems] = useState([]);



  const fetchCartItems = async()=>{
    const {data} = await getCartItems();
    console.log(data)
    setCartItems(data)
  }

  useEffect(() => {
    fetchCartItems()
  }, [])
  
  const handleDelete = async(id)=>{
    const data = await deleteCartItem(id);
    if(data.success){
      const cartItemsCopy = [...CartItems];
      const leftItems = cartItemsCopy.filter((item)=> item._id !== id);
      setCartItems(leftItems)
    }

  }
 

 

  return (
  <div className="min-h-screen bg-gray-50 pt-20 px-4 md:px-20 text-gray-800">
    
    {/* Header */}
    <div className="max-w-5xl mx-auto mb-8">
      <h1 className="text-3xl font-bold tracking-tight">
        Your Cart
      </h1>
      <p className="text-gray-500 text-sm mt-1">
        {CartItems?.length} item(s) in your cart
      </p>
    </div>

    {/* Main Layout */}
    <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">

      {/* Cart Items */}
      <div className="md:col-span-2 space-y-4">

        {CartItems?.length === 0 && (
          <div className="bg-white p-10 rounded-xl shadow text-center">
            <h2 className="text-xl font-semibold text-gray-600">
              Your cart is empty
            </h2>
            <p className="text-sm text-gray-400 mt-2">
              Looks like you haven't added anything yet.
            </p>
          </div>
        )}

        {CartItems?.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-sm p-4 flex gap-4 relative hover:shadow-md transition"
          >

            {/* Delete */}
           

            {/* Image */}
            <img
              src={item?.variant?.images[0]}
              alt=""
              className="w-28 h-28 object-cover rounded-lg"
            />

            {/* Info */}
            <div className="flex flex-col justify-between w-full">
              <div>
                <Link to={`/product/${item.productId}`}>
                  <h2 className="font-semibold text-lg hover:text-primary-1 transition">
                    {item.title}
                  </h2>
                </Link>

                <p className="text-sm text-gray-500 mt-1">
                  Quantity: {item.quantity}
                </p>
              </div>

              <div className="flex justify-between items-center mt-3">
                <span className="text-lg font-bold text-primary-1">
                  ₹ {item?.variant?.price}
                </span>

 <div className="flex gap-4">          
  <button 
              onClick={() => handleDelete(item._id)}
              className=" text-gray-400 text-xl hover:text-red-500 transition cursor-pointer">
              <ion-icon name="trash-sharp"></ion-icon>
  </button>
                <Link to={`/order/place/${item.productId}`}>
                  <button className="bg-primary-1 text-white px-4 py-1.5 rounded-md text-sm hover:opacity-90 transition cursor-pointer">
                    Buy Now
                  </button>
                </Link>
</div> 
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Section hidden for now*/}
      {CartItems?.length > 0 && (
        <div className="bg-white hidden p-6 rounded-xl shadow-sm h-fit sticky top-24">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

          <div className="flex justify-between text-sm mb-2">
            <span>Subtotal</span>
            <span>
              ₹{" "}
              {CartItems.reduce(
                (acc, item) =>
                  acc + item.quantity * item?.variant?.price,
                0
              )}
            </span>
          </div>

          <div className="flex justify-between text-sm mb-4">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <div className="border-t pt-3 flex justify-between font-bold">
            <span>Total</span>
            <span>
              ₹{" "}
              {CartItems.reduce(
                (acc, item) =>
                  acc + item.quantity * item?.variant?.price,
                0
              )}
            </span>
          </div>

          <button className="w-full mt-5 bg-primary-1 text-white py-2 rounded-lg hover:opacity-90 transition">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  </div>
)

}

export default Cart