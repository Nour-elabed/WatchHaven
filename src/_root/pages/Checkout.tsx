import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useCart } from '@/context/useCart'
import { createOrder } from '@/services/orderService'
import type { ShippingAddress } from '@/types'

type PaymentMethod = 'Cash on Delivery' | 'Card' | 'PayPal'

const PAYMENT_METHODS: PaymentMethod[] = ['Cash on Delivery', 'Card', 'PayPal']

const Checkout = () => {
  const { items, cartTotal, clearCart } = useCart()
  const navigate = useNavigate()

  const [form, setForm] = useState<ShippingAddress>({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  })

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Cash on Delivery')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (items.length === 0) {
      toast.error('Your cart is empty.')
      return
    }

    setLoading(true)
    try {
      const orderItems = items.map((item) => ({
        product: item.productId,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
      }))

      const order = await createOrder({
        orderItems,
        shippingAddress: form,
        paymentMethod,
        totalPrice: cartTotal,
      })

      await clearCart()
      toast.success('Order placed successfully!')
      navigate(`/orders/${order._id}`)
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? 'Failed to place order.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen px-6 py-16 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-10">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* ── Checkout Form ── */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <h2 className="text-xl font-semibold">Shipping Details</h2>

          {(
            [
              { label: 'Full Name', name: 'fullName', placeholder: 'John Doe' },
              { label: 'Address', name: 'address', placeholder: '123 Main St' },
              { label: 'City', name: 'city', placeholder: 'New York' },
              { label: 'Postal Code', name: 'postalCode', placeholder: '10001' },
              { label: 'Country', name: 'country', placeholder: 'United States' },
            ] as { label: string; name: keyof ShippingAddress; placeholder: string }[]
          ).map(({ label, name, placeholder }) => (
            <div key={name}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input
                name={name}
                value={form[name]}
                onChange={handleChange}
                placeholder={placeholder}
                required
                className="w-full border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          ))}

          <div>
            <h2 className="text-xl font-semibold mb-3">Payment Method</h2>
            <div className="space-y-2">
              {PAYMENT_METHODS.map((method) => (
                <label key={method} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)}
                    className="accent-black"
                  />
                  <span className="text-sm">{method}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? 'Placing Order…' : 'Place Order'}
          </button>
        </form>

        {/* ── Order Summary ── */}
        <div>
          <h2 className="text-xl font-semibold mb-5">Order Summary</h2>
          {items.length === 0 ? (
            <p className="text-gray-500 text-sm">No items in cart.</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.productId} className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-lg object-cover border"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-sm">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}

              <div className="border-t pt-4 flex justify-between items-center font-bold text-lg">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default Checkout
