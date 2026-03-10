import React, { useEffect, useState } from 'react'
import { BACKEND_URL } from '../config/env'
import OrderCard from '../components/Order.Card.jsx';

const Orders = () => {
  const [orderList, setOrderList] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/order/user`, {
        credentials: 'include',
      })
      const data = await res.json()
      if (!data.success) return console.log(data.message)
      setOrderList(data.orders)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <section className="w-screen min-h-screen bg-gray-50 pt-20 pb-12 ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Your Orders
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Track and manage your purchases
          </p>
        </div>

        {/* STATES */}
        {loading ? (
          <div className="py-24 text-center text-gray-500">
            Loading orders…
          </div>
        ) : orderList.length === 0 ? (
          <div className="py-24 text-center text-gray-600">
            You haven’t placed any orders yet.
          </div>
        ) : (
          <div className="space-y-4">
            {orderList.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Orders

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




