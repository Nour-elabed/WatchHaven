import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useCart } from '@/context/useCart'
import { createOrder } from '@/services/orderService'
import type { ShippingAddress } from '@/types'

type PaymentMethod = 'Cash on Delivery' | 'Card' | 'PayPal'
type Step = 'shipping' | 'payment' | 'confirm'

const Checkout = () => {
  const { items, cartTotal, clearCart } = useCart()
  const navigate = useNavigate()

  const [step, setStep] = useState<Step>('shipping')
  const [form, setForm] = useState<ShippingAddress>({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  })

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Cash on Delivery')
  const [loading, setLoading] = useState(false)

  // Card payment fields
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCVV, setCardCVV] = useState('')
  const [cardName, setCardName] = useState('')

  // PayPal fields
  const [paypalEmail, setPaypalEmail] = useState('')
  const [paypalPassword, setPaypalPassword] = useState('')
  const [paypalVerified, setPaypalVerified] = useState(false)

  const shippingPrice = cartTotal > 1000 ? 0 : 50
  const taxPrice = Number((0.15 * cartTotal).toFixed(2))
  const totalPrice = cartTotal + shippingPrice + taxPrice

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 16)
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ')
  }

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4)
    if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2)
    return digits
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length === 0) {
      toast.error('Your cart is empty.')
      return
    }
    setStep('payment')
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (paymentMethod === 'Card') {
      if (cardNumber.replace(/\s/g, '').length < 16) {
        toast.error('Please enter a valid 16-digit card number')
        return
      }
      if (cardExpiry.length < 5) {
        toast.error('Please enter a valid expiry date (MM/YY)')
        return
      }
      if (cardCVV.length < 3) {
        toast.error('Please enter a valid CVV')
        return
      }
      if (!cardName.trim()) {
        toast.error('Please enter the cardholder name')
        return
      }
    }

    if (paymentMethod === 'PayPal') {
      if (!paypalEmail.includes('@')) {
        toast.error('Please enter a valid PayPal email')
        return
      }
      if (paypalPassword.length < 4) {
        toast.error('Please enter your PayPal password')
        return
      }
    }

    setStep('confirm')
  }

  const handlePaypalLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!paypalEmail.includes('@')) {
      toast.error('Please enter a valid PayPal email')
      return
    }
    if (paypalPassword.length < 4) {
      toast.error('Please enter your PayPal password')
      return
    }
    setPaypalVerified(true)
    toast.success('PayPal account verified!')
  }

  const handlePlaceOrder = async () => {
    setLoading(true)
    try {
      const orderItems = items.map((item) => ({
        product: item.productId,
        name: item.name,
        image: item.image?.startsWith('data:') ? '/assets/images/placeholder.svg' : (item.image || '/assets/images/placeholder.svg'),
        price: item.price,
        quantity: item.quantity,
      }))

      const payload = {
        orderItems,
        shippingAddress: form,
        paymentMethod,
        itemsPrice: cartTotal,
        shippingPrice,
        taxPrice,
        totalPrice,
      }

      const order = await createOrder(payload)
      await clearCart()
      toast.success('Order placed successfully!')
      navigate(`/orders/${order._id}`)
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? 'Failed to place order.')
    } finally {
      setLoading(false)
    }
  }

  const steps: { key: Step; label: string; num: number }[] = [
    { key: 'shipping', label: 'Shipping', num: 1 },
    { key: 'payment', label: 'Payment', num: 2 },
    { key: 'confirm', label: 'Confirm', num: 3 },
  ]

  const stepIndex = steps.findIndex(s => s.key === step)

  return (
    <main className="min-h-screen px-6 py-8 max-w-5xl mx-auto">
      {/* Back Button */}
      <button 
        onClick={() => step === 'shipping' ? navigate(-1) : setStep(step === 'confirm' ? 'payment' : 'shipping')} 
        className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors mb-6 group"
      >
        <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-black transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </div>
        <span className="font-medium">{step === 'shipping' ? 'Back to Cart' : 'Back'}</span>
      </button>

      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {steps.map((s, i) => (
          <div key={s.key} className="flex items-center gap-2">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${i <= stepIndex ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'}`}>
              {i < stepIndex ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17l-5-5"/></svg>
              ) : s.num}
            </div>
            <span className={`text-sm font-medium hidden sm:inline ${i <= stepIndex ? 'text-black' : 'text-gray-400'}`}>{s.label}</span>
            {i < steps.length - 1 && (
              <div className={`w-12 h-0.5 mx-1 ${i < stepIndex ? 'bg-black' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* ── Left: Form Area ── */}
        <div className="md:col-span-3">
          {/* STEP 1: Shipping */}
          {step === 'shipping' && (
            <form onSubmit={handleShippingSubmit} className="space-y-5">
              <h2 className="text-2xl font-bold">Shipping Details</h2>
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
                  <label className="block text-sm font-medium mb-1.5">{label}</label>
                  <input
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required
                    className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black transition-shadow"
                  />
                </div>
              ))}

              <div className="pt-4">
                <h2 className="text-lg font-bold mb-3">Payment Method</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(['Cash on Delivery', 'Card', 'PayPal'] as PaymentMethod[]).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${paymentMethod === method ? 'border-black bg-black/5' : 'border-gray-200 hover:border-gray-400'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === method ? 'border-black' : 'border-gray-300'}`}>
                          {paymentMethod === method && <div className="w-2.5 h-2.5 rounded-full bg-black" />}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{method === 'Cash on Delivery' ? 'Cash' : method}</p>
                          <p className="text-[11px] text-gray-400">
                            {method === 'Cash on Delivery' && 'Pay when delivered'}
                            {method === 'Card' && 'Visa, Mastercard'}
                            {method === 'PayPal' && 'PayPal account'}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition mt-4"
              >
                Continue to Payment
              </button>
            </form>
          )}

          {/* STEP 2: Payment Details */}
          {step === 'payment' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Payment Details</h2>

              {paymentMethod === 'Cash on Delivery' && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-600"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
                    </div>
                    <div>
                      <h3 className="font-bold">Cash on Delivery</h3>
                      <p className="text-sm text-amber-700">Pay with cash when your order arrives</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Please have the exact amount ready. Our delivery agent will collect <span className="font-bold">${totalPrice.toFixed(2)}</span> upon delivery.</p>
                  <button
                    onClick={() => setStep('confirm')}
                    className="w-full bg-black text-white py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition mt-2"
                  >
                    Review Order
                  </button>
                </div>
              )}

              {paymentMethod === 'Card' && (
                <form onSubmit={handlePaymentSubmit} className="space-y-5">
                  <div className="bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl p-6 text-white space-y-4">
                    <div className="flex justify-between items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                      <div className="flex gap-1">
                        <div className="w-6 h-6 rounded-full bg-red-500 opacity-80" />
                        <div className="w-6 h-6 rounded-full bg-yellow-400 opacity-80 -ml-2" />
                      </div>
                    </div>
                    <div className="pt-2">
                      <p className="text-lg tracking-[0.25em] font-mono">
                        {cardNumber || '•••• •••• •••• ••••'}
                      </p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase">Card Holder</p>
                        <p className="font-medium">{cardName || 'YOUR NAME'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-gray-400 uppercase">Expires</p>
                        <p className="font-medium">{cardExpiry || 'MM/YY'}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      required
                      className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black font-mono tracking-wider"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">Cardholder Name</label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value.toUpperCase())}
                      placeholder="JOHN DOE"
                      required
                      className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black uppercase"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Expiry Date</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                        placeholder="MM/YY"
                        maxLength={5}
                        required
                        className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">CVV</label>
                      <input
                        type="password"
                        value={cardCVV}
                        onChange={(e) => setCardCVV(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        placeholder="•••"
                        maxLength={4}
                        required
                        className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-black text-white py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition"
                  >
                    Review Order
                  </button>
                </form>
              )}

              {paymentMethod === 'PayPal' && (
                <div className="space-y-5">
                  <div className="bg-[#003087] rounded-2xl p-6 text-center">
                    <div className="flex items-center justify-center gap-1 mb-4">
                      <span className="text-2xl font-bold text-white">Pay</span>
                      <span className="text-2xl font-bold text-[#009cde]">Pal</span>
                    </div>
                    {!paypalVerified ? (
                      <form onSubmit={handlePaypalLogin} className="space-y-4 max-w-sm mx-auto">
                        <p className="text-white/80 text-sm mb-4">Log in to your PayPal account to continue</p>
                        <input
                          type="email"
                          value={paypalEmail}
                          onChange={(e) => setPaypalEmail(e.target.value)}
                          placeholder="PayPal email address"
                          required
                          className="w-full rounded-lg px-4 py-3 text-sm outline-none text-black"
                        />
                        <input
                          type="password"
                          value={paypalPassword}
                          onChange={(e) => setPaypalPassword(e.target.value)}
                          placeholder="Password"
                          required
                          className="w-full rounded-lg px-4 py-3 text-sm outline-none text-black"
                        />
                        <button
                          type="submit"
                          className="w-full bg-[#ffc439] text-[#003087] py-3 rounded-lg font-bold hover:bg-[#f0b72d] transition"
                        >
                          Log In
                        </button>
                        <p className="text-white/50 text-[11px]">This is a simulated PayPal login for demo purposes</p>
                      </form>
                    ) : (
                      <div className="space-y-3">
                        <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6 9 17l-5-5"/></svg>
                        </div>
                        <p className="text-white font-bold text-lg">Account Verified</p>
                        <p className="text-white/70 text-sm">{paypalEmail}</p>
                        <p className="text-white/60 text-sm">Amount: <span className="font-bold text-white">${totalPrice.toFixed(2)}</span></p>
                      </div>
                    )}
                  </div>
                  {paypalVerified && (
                    <button
                      onClick={() => setStep('confirm')}
                      className="w-full bg-black text-white py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition"
                    >
                      Review Order
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Confirm */}
          {step === 'confirm' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Review & Confirm</h2>

              {/* Shipping Summary */}
              <div className="bg-gray-50 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500">Shipping</h3>
                  <button onClick={() => setStep('shipping')} className="text-xs text-blue-600 font-medium hover:underline">Edit</button>
                </div>
                <p className="font-medium">{form.fullName}</p>
                <p className="text-sm text-gray-500">{form.address}, {form.city}, {form.postalCode}, {form.country}</p>
              </div>

              {/* Payment Summary */}
              <div className="bg-gray-50 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500">Payment</h3>
                  <button onClick={() => setStep('payment')} className="text-xs text-blue-600 font-medium hover:underline">Edit</button>
                </div>
                <p className="font-medium">{paymentMethod}</p>
                {paymentMethod === 'Card' && <p className="text-sm text-gray-500">•••• •••• •••• {cardNumber.replace(/\s/g, '').slice(-4)}</p>}
                {paymentMethod === 'PayPal' && <p className="text-sm text-gray-500">{paypalEmail}</p>}
              </div>

              {/* Items */}
              <div className="bg-gray-50 rounded-2xl p-5">
                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-4">Items ({items.length})</h3>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.productId} className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover border" onError={(e) => { e.currentTarget.src = '/assets/images/placeholder.svg' }} />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.name}</p>
                        <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition disabled:opacity-50"
              >
                {loading ? 'Processing Payment...' : `Pay $${totalPrice.toFixed(2)}`}
              </button>
            </div>
          )}
        </div>

        {/* ── Right: Order Summary ── */}
        <div className="md:col-span-2">
          <div className="sticky top-8 bg-gray-50 rounded-2xl p-6">
            <h2 className="font-bold text-lg mb-5">Order Summary</h2>
            {items.length === 0 ? (
              <p className="text-gray-500 text-sm">No items in cart.</p>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.productId} className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover border" onError={(e) => { e.currentTarget.src = '/assets/images/placeholder.svg' }} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.name}</p>
                      <p className="text-gray-400 text-xs">x{item.quantity}</p>
                    </div>
                    <p className="font-semibold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Shipping</span>
                    <span>{shippingPrice === 0 ? 'Free' : `$${shippingPrice.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Tax (15%)</span>
                    <span>${taxPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center font-bold text-lg pt-3 border-t">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Checkout
