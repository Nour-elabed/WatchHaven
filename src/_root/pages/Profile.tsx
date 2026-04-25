import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/context/AuthContext'
import { getProfile } from '@/services/authService'
import { getUserOrders } from '@/services/orderService'
import type { Order } from '@/types'
import { Spinner } from '@/components/ui/spinner'
import { toast } from 'sonner'

const Profile = () => {
  const { user, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const { data: profile, isLoading: profileLoading, refetch: refetchProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled: !!user,
  })

  const { data: ordersData, isLoading: ordersLoading } = useQuery({
    queryKey: ['user-orders'],
    queryFn: getUserOrders,
    enabled: !!user,
  })

  useEffect(() => {
    if (profile?.data) {
      setFormData({
        username: profile.data.username,
        email: profile.data.email,
        password: '',
        confirmPassword: ''
      })
    }
  }, [profile])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setIsSubmitting(true)
    try {
      await updateProfile({
        username: formData.username,
        email: formData.email,
        password: formData.password || undefined
      })
      toast.success('Profile updated successfully!')
      setIsEditing(false)
      refetchProfile()
    } catch (error) {
      toast.error('Failed to update profile')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-500/10 text-green-600'
      case 'shipped': return 'bg-blue-500/10 text-blue-600'
      case 'pending': return 'bg-yellow-500/10 text-yellow-600'
      default: return 'bg-gray-500/10 text-gray-600'
    }
  }

  if (profileLoading || ordersLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner className="w-10 h-10" />
      </div>
    )
  }

  const userProfile = profile?.data
  const userOrders = ordersData?.data || []

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Profile Section */}
        <div className="w-full lg:w-1/3 space-y-8">
          <div className="premium-card p-8">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-24 h-24 bg-accent text-white rounded-full flex items-center justify-center text-3xl font-bold mb-4 shadow-xl shadow-accent/20">
                {userProfile?.username?.charAt(0).toUpperCase()}
              </div>
              <h1 className="text-2xl font-bold">{userProfile?.username}</h1>
              <p className="text-muted-foreground text-sm">{userProfile?.email}</p>
              <div className="mt-4 px-3 py-1 bg-secondary rounded-full text-[10px] font-bold uppercase tracking-widest">
                {userProfile?.role}
              </div>
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Username</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    className="input-field py-2"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="input-field py-2"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-muted-foreground ml-1">New Password</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="input-field py-2"
                    placeholder="Leave blank to keep current"
                  />
                </div>
                {formData.password && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Confirm Password</label>
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      className="input-field py-2"
                    />
                  </div>
                )}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 btn-primary py-2 text-sm"
                  >
                    {isSubmitting ? <Spinner className="w-4 h-4" /> : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 btn-secondary py-2 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full btn-primary py-3"
              >
                Edit Profile
              </button>
            )}
          </div>

          <div className="premium-card p-8 bg-black text-white">
            <h3 className="text-lg font-bold mb-4">Account Security</h3>
            <p className="text-sm text-gray-400 mb-6">Keep your account secure by using a strong password and monitoring active sessions.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Account is active</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span>Verified email address</span>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="flex-1 space-y-8">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-3xl font-bold tracking-tight">Order History</h2>
            <span className="text-sm text-muted-foreground font-medium">{userOrders.length} total orders</span>
          </div>

          {userOrders && userOrders.length > 0 ? (
            <div className="space-y-4">
              {userOrders.map((order: Order) => (
                <div key={order._id} className="premium-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center font-bold text-muted-foreground">
                      #{order._id.slice(-4).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-muted-foreground tracking-widest mb-1">
                        {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                      <p className="font-bold">{order.orderItems.length} {order.orderItems.length === 1 ? 'item' : 'items'}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-2">
                    <span className="text-xl font-bold">${order.totalPrice.toLocaleString()}</span>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="premium-card p-20 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
                 <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">No orders yet</h3>
              <p className="text-muted-foreground max-w-xs mb-8">Start your collection today and discover exceptional timepieces.</p>
              <button 
                onClick={() => window.location.href = '/shop'} 
                className="btn-primary"
              >
                Go to Shop
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
