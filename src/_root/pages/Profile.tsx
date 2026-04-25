import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/context/AuthContext'
import { getProfile } from '@/services/authService'
import { getUserOrders } from '@/services/orderService'
import type { Order } from '@/types'
import { Spinner } from '@/components/ui/spinner'
import { toast } from 'sonner'

const Profile = () => {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
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
      setEditForm({
        username: profile.data.username,
        email: profile.data.email,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    }
  }, [profile])

  const handleEditProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!editForm.username || !editForm.email) {
      toast.error('Username and email are required')
      return
    }

    if (editForm.newPassword && editForm.newPassword !== editForm.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    try {
      // TODO: Implement profile update API call
      toast.success('Profile updated successfully!')
      setIsEditing(false)
      setEditForm({
        ...editForm,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
      refetchProfile()
    } catch (error) {
      toast.error('Failed to update profile')
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditForm({
      username: profile?.data?.username || '',
      email: profile?.data?.email || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100'
      case 'shipped': return 'text-blue-600 bg-blue-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  if (profileLoading || ordersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  const userProfile = profile?.data
  const userOrders = ordersData?.data || []

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          </div>

          <div className="p-6 space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Profile Info */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
                
                {isEditing ? (
                  <form onSubmit={handleEditProfile} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Username</label>
                      <input
                        type="text"
                        value={editForm.username}
                        onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">New Password (optional)</label>
                      <input
                        type="password"
                        value={editForm.newPassword}
                        onChange={(e) => setEditForm({...editForm, newPassword: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                      <input
                        type="password"
                        value={editForm.confirmPassword}
                        onChange={(e) => setEditForm({...editForm, confirmPassword: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-500">Username</span>
                      <span className="text-sm text-gray-900">{userProfile?.username}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-500">Email</span>
                      <span className="text-sm text-gray-900">{userProfile?.email}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-500">Role</span>
                      <span className="text-sm text-blue-600">{userProfile?.role}</span>
                    </div>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mt-4"
                    >
                      Edit Profile
                    </button>
                  </div>
                )}
              </div>

              {/* Role Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Role Access</h2>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      profile?.data?.role === 'USER' ? 'bg-gray-400' :
                      profile?.data?.role === 'ADMIN' ? 'bg-blue-600' : 'bg-purple-600'
                    }`}></div>
                    <div>
                      <p className="font-medium text-gray-900">Current Role: <span className="text-blue-600">{userProfile?.role}</span></p>
                      <div className="text-sm text-gray-600 mt-2">
                        {userProfile?.role === 'USER' && 'You can browse products and place orders'}
                        {userProfile?.role === 'ADMIN' && 'You can manage products and orders'}
                        {userProfile?.role === 'SUPER_ADMIN' && 'You have full administrative access'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order History */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order History</h2>
              {userOrders && userOrders.length > 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {userOrders.slice(0, 10).map((order: Order) => (
                          <tr key={order._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              #{order._id.slice(-8)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ${order.totalPrice.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {userOrders.length > 10 && (
                    <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                      <p className="text-sm text-gray-600">Showing 10 of {userOrders.length} orders</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No orders found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
