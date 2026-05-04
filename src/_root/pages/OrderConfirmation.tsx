import { useParams, Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getOrderById } from '@/services/orderService'
import { Spinner } from '@/components/ui/spinner'

const OrderConfirmation = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

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
        <p className="text-red-500 font-medium">Could not load order details.</p>
        <div className="flex gap-4">
          <Link to="/orders" className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
            My Orders
          </Link>
          <Link to="/shop" className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Shop
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen px-6 py-8 max-w-3xl mx-auto">
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

      <div className="text-center mb-10">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M20 6 9 17l-5-5"/></svg>
        </div>
        <h1 className="text-3xl font-bold">Order Confirmed!</h1>
        <p className="text-gray-500 mt-2">
          Thank you for your purchase. Here's your order summary.
        </p>
      </div>

      {/* Order meta */}
      <div className="bg-white border rounded-2xl p-6 mb-6 space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">Order ID</p>
            <p className="font-mono text-sm font-semibold mt-1">{order._id}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">Date</p>
            <p className="text-sm mt-1">{new Date(order.createdAt).toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-center justify-between pt-3 border-t">
          <p className="text-sm"><span className="text-gray-500">Payment:</span> <span className="font-medium">{order.paymentMethod}</span></p>
          <div className="flex gap-2">
            <span className={`text-xs px-3 py-1 rounded-full font-bold ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
              {order.isPaid ? 'Paid' : 'Pending'}
            </span>
            <span className={`text-xs px-3 py-1 rounded-full font-bold ${order.isDelivered ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
              {order.isDelivered ? 'Delivered' : 'Processing'}
            </span>
          </div>
        </div>
      </div>

      {/* Shipping address */}
      <div className="bg-white border rounded-2xl p-6 mb-6">
        <h2 className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-3">Shipping Address</h2>
        <p className="font-medium">{order.shippingAddress.fullName}</p>
        <p className="text-gray-500 text-sm mt-1">
          {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
          {order.shippingAddress.postalCode}, {order.shippingAddress.country}
        </p>
      </div>

      {/* Items */}
      <div className="bg-white border rounded-2xl p-6 mb-6">
        <h2 className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-4">Items ({order.orderItems.length})</h2>
        <div className="space-y-4">
          {order.orderItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <img
                src={item.image || '/assets/images/placeholder.svg'}
                alt={item.name}
                className="w-16 h-16 rounded-xl object-cover border bg-gray-50"
                onError={(e) => { e.currentTarget.src = '/assets/images/placeholder.svg'; }}
              />
              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className="bg-white border rounded-2xl p-6 mb-8 space-y-3">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Items Total</span>
          <span>${(order.itemsPrice || 0).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Shipping</span>
          <span>${(order.shippingPrice || 0).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Tax</span>
          <span>${(order.taxPrice || 0).toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-xl font-bold border-t pt-3 mt-2">
          <span>Total</span>
          <span>${(order.totalPrice || 0).toFixed(2)}</span>
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        <Link to="/shop" className="px-8 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors">
          Continue Shopping
        </Link>
        <Link to="/orders" className="px-8 py-3 border-2 border-black rounded-xl font-semibold hover:bg-gray-50 transition-colors">
          My Orders
        </Link>
      </div>
    </main>
  )
}

export default OrderConfirmation
