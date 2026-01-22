import React, { useEffect, useState } from 'react'
import { BACKEND_URL } from '../config/env'

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
          <div className="space-y-6">
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



const OrderCard = ({ order }) => {

  const canCancel = (status) =>
  status.toLowerCase() === 'placed' || status.toLowerCase() !== 'returned' || status.toLowerCase() !== "cancelled"

const canReturn = (status) =>
  status === 'delivered'

  const {
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
  } = order

  const [actionLoading, setActionLoading] = React.useState(false)

  const handleCancel = async () => {
    if (!confirm('Are you sure you want to cancel this order?')) return
    try {
      setActionLoading(true)
      await fetch(`${BACKEND_URL}/api/order/cancel/${_id}`, {
        method: 'PATCH',
        credentials: 'include',
      })
      window.location.reload()
    } catch (err) {
      console.error(err)
    } finally {
      setActionLoading(false)
    }
  }

  const handleReturn = async () => {
    if (!confirm('Are you sure you want to return this order?')) return
    try {
      setActionLoading(true)
      await fetch(`${BACKEND_URL}/api/order/return/${_id}`, {
        method: 'PATCH',
        credentials: 'include',
      })
      window.location.reload()
    } catch (err) {
      console.error(err)
    } finally {
      setActionLoading(false)
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 flex flex-col md:flex-row gap-4 md:gap-6">

      {/* PRODUCT IMAGE */}
      <div className="w-full md:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={productImage}
          alt={productTitle}
          className="w-full h-full object-cover"
        />
      </div>

      {/* DETAILS */}
      <div className="flex-1 space-y-2">
        <h3 className="text-base font-semibold text-gray-900">
          {productTitle}
        </h3>

        <p className="text-sm text-gray-500">
          Order ID: <span className="text-gray-800 font-medium">{_id}</span>
        </p>

        <p className="text-sm text-gray-500">
          Ordered on:{' '}
          <span className="text-gray-800">
            {new Date(createdAt).toLocaleDateString()}
          </span>
        </p>

        <p className="text-sm">
          Status:{' '}
          <span
            className={`font-semibold capitalize ${
              status === 'delivered'
                ? 'text-green-600'
                : status === 'cancelled'
                ? 'text-red-600'
                : status === 'returned'
                ? 'text-orange-600'
                : 'text-blue-600'
            }`}
          >
            {status}
          </span>
        </p>

        <p className="text-sm">
          Payment:{' '}
          <span className="font-medium text-gray-800">
            {paymentStatus} ({paymentType})
          </span>
        </p>

        {/* ADDRESS */}
        <div className="text-sm text-gray-600 pt-1">
          <p className="font-medium text-gray-800">Delivery Address</p>
          <p>
            {address.firstName} {address.lastName},{' '}
            {address.street}, {address.city}
          </p>
          <p>{address.phone}</p>
        </div>
      </div>

      {/* PRICE + ACTIONS */}
      <div className="md:text-right flex flex-col justify-between">

        <div>
          <p className="text-sm text-gray-500">
            Qty: <span className="font-medium text-gray-800">{quantity}</span>
          </p>
          <p className="text-lg font-semibold text-gray-900">
            ₹ {amount}
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-4 flex gap-2 md:justify-end">
          {canCancel(status) && (
            <button
              onClick={handleCancel}
              disabled={actionLoading}
              className="px-4 py-2 text-sm rounded-md border border-red-500 text-red-600 hover:bg-red-50 disabled:opacity-50"
            >
              Cancel Order
            </button>
          )}

          {canReturn(status) && (
            <button
              onClick={handleReturn}
              disabled={actionLoading}
              className="px-4 py-2 text-sm rounded-md border border-orange-500 text-orange-600 hover:bg-orange-50 disabled:opacity-50"
            >
              Return Order
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
