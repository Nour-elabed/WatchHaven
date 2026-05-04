import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getUserOrders } from '@/services/orderService'
import { Spinner } from '@/components/ui/spinner'

const Orders = () => {
  const navigate = useNavigate()
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
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-500 font-medium">Failed to load orders. Please try again.</p>
        <Link to="/shop" className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
          Back to Shop
        </Link>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
        </div>
        <h2 className="text-2xl font-bold">No orders yet</h2>
        <p className="text-gray-500">Start shopping to see your orders here</p>
        <Link to="/shop" className="px-8 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors mt-2">
          Browse Collection
        </Link>
      </div>
    )
  }

  return (
    <main className="min-h-screen px-6 py-8 max-w-4xl mx-auto">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors mb-6 group"
      >
        <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-black transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </div>
        <span className="font-medium">Back</span>
      </button>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <Link to="/shop" className="text-sm font-medium text-gray-500 hover:text-black transition-colors flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          Home
        </Link>
      </div>
      <div className="space-y-4">
        {data.map((order) => (
          <Link
            key={order._id}
            to={`/orders/${order._id}`}
            className="block bg-white border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">Order #{order._id.slice(-6).toUpperCase()}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(order.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', month: 'long', day: 'numeric' 
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">${order.totalPrice.toFixed(2)}</p>
                <p className="text-xs text-gray-400 mt-1">{order.orderItems.length} item{order.orderItems.length !== 1 ? 's' : ''}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <span className={`text-xs px-3 py-1 rounded-full font-bold ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {order.isPaid ? 'Paid' : 'Pending Payment'}
              </span>
              <span className={`text-xs px-3 py-1 rounded-full font-bold ${order.isDelivered ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                {order.isDelivered ? 'Delivered' : 'Processing'}
              </span>
            </div>
            <div className="mt-3 text-xs text-gray-400 group-hover:text-black transition-colors flex items-center gap-1">
              View details
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}

export default Orders
