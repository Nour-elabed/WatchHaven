import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getUserOrders } from '@/services/orderService'
import { Spinner } from '@/components/ui/spinner'
import type { Order } from '@/types'

const Orders = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['orders'],
    queryFn: getUserOrders,
    
  })

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />

      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load orders. Please try again.</p>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-semibold">No orders yet</h2>
        <Link to="/shop" className="text-blue-600 underline">
          Start shopping
        </Link>
      </div>
    )
  }

  return (
    <main className="min-h-screen px-6 py-16 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      <div className="space-y-4">
        {data.map((order) => (
          <Link
            key={order._id}
            to={`/orders/${order._id}`}
            className="block border rounded-xl p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-mono text-sm">{order._id}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">${order.totalPrice.toFixed(2)}</p>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="mt-3 flex gap-3">
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
          </Link>
        ))}
      </div>
    </main>
  )
}

export default Orders
