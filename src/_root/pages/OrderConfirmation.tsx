import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getOrderById } from '@/services/orderService'
import { Spinner } from '@/components/ui/spinner'
import type { Order } from '@/types'

const OrderConfirmation = () => {
  const { id } = useParams<{ id: string }>()

  const { data: order, isLoading, isError } = useQuery({
    queryKey: ['order', id],
    queryFn: () => getOrderById(id!),
    enabled: Boolean(id),
  })

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (isError || !order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-500">Could not load order details.</p>
        <Link to="/orders" className="text-blue-600 underline">
          Back to orders
        </Link>
      </div>
    )
  }

  return (
    <main className="min-h-screen px-6 py-16 max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold">Order Confirmed!</h1>
        <p className="text-gray-500 mt-2">
          Thank you for your purchase. Here's your order summary.
        </p>
      </div>

      {/* Order meta */}
      <div className="border rounded-xl p-6 mb-6 space-y-2">
        <p className="text-sm text-gray-500">Order ID</p>
        <p className="font-mono text-sm font-semibold">{order._id}</p>
        <p className="text-sm text-gray-500 mt-2">Date</p>
        <p className="text-sm">{new Date(order.createdAt).toLocaleString()}</p>
        <p className="text-sm text-gray-500 mt-2">Payment Method</p>
        <p className="text-sm">{order.paymentMethod}</p>
        <div className="flex gap-3 mt-3">
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${
              order.isPaid
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}
          >
            {order.isPaid ? 'Paid' : 'Pending Payment'}
          </span>
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${
              order.isDelivered
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {order.isDelivered ? 'Delivered' : 'Processing'}
          </span>
        </div>
      </div>

      {/* Shipping address */}
      <div className="border rounded-xl p-6 mb-6">
        <h2 className="font-semibold mb-3">Shipping Address</h2>
        <p>{order.shippingAddress.fullName}</p>
        <p className="text-gray-500 text-sm">
          {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
          {order.shippingAddress.postalCode}, {order.shippingAddress.country}
        </p>
      </div>

      {/* Items */}
      <div className="border rounded-xl p-6 mb-6">
        <h2 className="font-semibold mb-4">Items</h2>
        <div className="space-y-4">
          {order.orderItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-14 h-14 rounded-lg object-cover border"
              />
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center text-xl font-bold border-t pt-4">
        <span>Total</span>
        <span>${order.totalPrice.toFixed(2)}</span>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/orders"
          className="inline-block px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
        >
          View All Orders
        </Link>
      </div>
    </main>
  )
}

export default OrderConfirmation
