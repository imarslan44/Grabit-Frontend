import React, {useState} from "react";
import { BACKEND_URL } from "../config/env";
const OrderCard = ({ order }) => {

  // --- Button Logic ---
  const [actionLoading, setActionLoading] = useState(false);
  const [ShowAction, setShowAction] = useState(false)
  let {
    _id,
    createdAt,
    status,
    paymentStatus,
    paymentType,
    quantity,
    amount,
    productTitle,
    productImage,
    address,
    returnPolicy,
    updatedAt,
  } = order;
  const [Status, setStatus] = useState(status)

  // Helper: check if order can be cancelled
  const canCancel = status => {
    const s = status.toLowerCase();
    return s === 'placed' || s=== "shipped" || s === "out for delivery";
  };

  // Helper: check if order can be returned
  const canReturn = () => {
    if (status.toLowerCase() !== 'delivered' || !returnPolicy) return false;
    // Use updatedAt as delivery date (assuming status updated to delivered then)
    const deliveredDate = new Date(updatedAt);
    const now = new Date();
    const diffDays = Math.floor((now - deliveredDate) / (1000 * 60 * 60 * 24));
    return diffDays <= returnPolicy;
  };

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    try {
      setActionLoading(true);
     const res = await fetch(`${BACKEND_URL}/api/order/cancel/${_id}`, {
        method: 'PATCH',
        headers : {
          "content-type" : "application/json"
        },
        credentials: 'include',
      });
      const data = await res.json();
      if(data.success){
        setStatus("Cancelation requested")
      }
      console.log(data)

      // window.location.reload();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
      setShowAction(false)
    }
  };

  const handleReturn = async () => {
    if (!window.confirm('Are you sure you want to return this order?')) return;
    try {
      setActionLoading(true);
      await fetch(`${BACKEND_URL}/api/order/return/${_id}`, {
        method: 'PATCH',
        credentials: 'include',
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
      setShowAction(false)
    }
  };

  // --- Card Design ---
  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm p-4 flex flex-col md:flex-row  gap-4 hover:shadow-lg transition-all duration-200 relative">
      {/* PRODUCT IMAGE */}
      <div className="flex w-full space-x-2">
      <div className="w-30 h-28 md:w-36  md:h-36 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden flex items-center justify-center">
        <img
          src={productImage}
          alt={productTitle}
          className="w-full h-full object-cover object-center drop-shadow-md"
        />
        
      </div>
  
      {/* DETAILS */}
      <div className="w-7/10 flex flex-col">
          <h3 className=" text-lg inline font-bold text-gray-900 mb-1">{productTitle}</h3>
          <div className="flex flex-wrap gap-2 text-xs mb-2">
            <span className="bg-gray-100 px-2 py-1 rounded">Order ID: <span className="text-gray-800 font-medium">{_id}</span></span>
            <span className="bg-gray-100 px-2 py-1 rounded">Ordered: <span className="text-gray-800">{new Date(createdAt).toLocaleDateString()}</span></span>
            <span className="bg-gray-100 px-2 py-1 rounded">Qty: <span className="text-gray-800 font-medium">{quantity}</span></span>
            <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-500">Status:</span>
            <StatusBadge status={Status} />
          </div>
          </div>
          <div className="max-sm:-translate-x-28 flex-1 flex flex-col gap- justify-between">
         <div >
          
          <div className="text-sm">
            Payment: <span className="font-medium text-gray-800">{paymentStatus} ({paymentType})</span>
          </div>
        </div>
        {/* ADDRESS */}
        <div className="text-xs text-gray-600 bg-gray-50 rounded p-2 ">
          <div className="font-semibold text-gray-800 mb-1">Delivery Address</div>
          <div>{address.firstName} {address.lastName}, {address.street}, {address.city}</div>
          <div>{address.phone}</div>
        </div>
      </div>
        </div>
      </div>

      
      {/* PRICE + ACTIONS */}
      <div className="flex flex-col justify-between items-end min-w-[120px]">
        
        {/* ACTION BUTTONS */}
        <button onClick={()=>setShowAction(!ShowAction)}
            className=" absolute top-1 right-4  h-10 w-5   text-black font-bold rounded-sm  flex justify-center items-center cursor-pointer">
             <ion-icon name="ellipsis-vertical"></ion-icon>
            </button>
        <div className={`mt-4  flex-col gap-1 w-60 top-1 right-6 absolute p-4 shadow-sm pt-8 bg-white
        ${!ShowAction ? "hidden": "flex"}`}>
          <button onClick={()=>setShowAction(false)} className="absolute hover:bg-red-200 top-1 right-4 px-1 rounded cursor-pointer"><ion-icon name="close"></ion-icon></button>
          {canCancel(status) && (
            <button
              onClick={handleCancel}
              disabled={actionLoading}
              className="px-4 py-2 text-sm rounded-xs  border border-red-500 text-red-600 bg-white hover:bg-red-50 font-semibold shadow-sm disabled:opacity-50 cursor-pointer"
            >
              Cancel Order
            </button>
            
          )}
          {canReturn() && (
            <button
              onClick={handleReturn}
              disabled={actionLoading}
              className="px-4 py-2 text-sm rounded-xs border border-orange-500 text-orange-600 bg-white hover:bg-orange-50 font-semibold shadow-sm disabled:opacity-50 cursror-pointer"
            >
              Return Order
            </button>
          )}
          <button  onClick={handleReturn}
              disabled={true}
              className="px-4 py-2 text-sm rounded-xs border border-red-500 text-red-600 bg-white hover:bg-orange-50 font-semibold shadow-sm disabled:opacity-50 cursot-pointer">
            Delete
          </button>
        </div>

        <div className="flex  w-full md:w-60 justify-between items-center  md:h-10 gap-3  px-2 relative sm:absolute right-4 bottom-4">
          {/* price */}
          <div className="px-4">
               <div className="text-lg w-full font-semibold text-green-700 mb-1">₹ {amount}
               </div>
            </div>
           <button
              disabled={actionLoading}
              className="h-6 max-w-20      text-sm  border-b  border-blue-500 text-blue-600  hover:bg-red-50 font-semibold disabled:opacity-50 flex-1 justify-center items-center cursor-pointer"
            >
              View Order
            </button>
              
       
        </div>
      </div>
    </div>
  );
}

export default  OrderCard;

const StatusBadge = ({ status }) => {
  const s = status?.toLowerCase()

  const config = {
    placed: {
      icon: 'receipt-outline',
      class: 'bg-blue-100 text-blue-700',
    },
    processing: {
      icon: 'time-outline',
      class: 'bg-indigo-100 text-indigo-700',
    },
    delivered: {
      icon: 'checkmark-circle-outline',
      class: 'bg-green-100 text-green-700',
    },
    cancelled: {
      icon: 'close-circle-outline',
      class: 'bg-red-100 text-red-700',
    },
    returned: {
      icon: 'arrow-undo-circle-outline',
      class: 'bg-orange-100 text-orange-700',
    },
  }

  const current = config[s] || {
    icon: 'help-circle-outline',
    class: 'bg-gray-100 text-gray-600',
  }

  return (
    <span
      className={`
        inline-flex items-center gap-2
        px-3 py-1 rounded-full
        text-xs font-semibold capitalize
        ${current.class}
      `}
    >
      <ion-icon name={current.icon} class="text-sm"></ion-icon>
      {s}
    </span>
  )
}