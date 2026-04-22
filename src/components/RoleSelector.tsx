import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'sonner'

const RoleSelector = () => {
  const { user, login, logout } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'USER' | 'ADMIN' | 'SUPER_ADMIN'>('USER')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRoleSimulation = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Please enter email and password')
      return
    }

    setIsSubmitting(true)
    try {
      // Logout first to clear current session
      logout()
      
      // Login with simulated role
      await login(email, password, role)
      toast.success(`Logged in as ${role} successfully!`)
      
      // Reload page to refresh UI
      window.location.reload()
    } catch (err) {
      toast.error('Login failed. Please check your credentials.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) {
    return (
      <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm z-50">
        <h3 className="font-semibold text-sm mb-3">Role Simulation (Testing)</h3>
        <form onSubmit={handleRoleSimulation} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as 'USER' | 'ADMIN' | 'SUPER_ADMIN')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
            <option value="SUPER_ADMIN">SUPER_ADMIN</option>
          </select>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Logging in...' : 'Login with Role'}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-sm">Current Role</h3>
        <button
          onClick={logout}
          className="text-xs text-red-600 hover:text-red-800"
        >
          Logout
        </button>
      </div>
      <div className="space-y-1">
        <p className="text-xs text-gray-600">User: {user.username}</p>
        <p className="text-xs font-medium text-gray-900">Role: {user.role}</p>
        <p className="text-xs text-gray-500">
          {user.role === 'USER' && 'Can access products, cart, orders'}
          {user.role === 'ADMIN' && 'Can manage products and orders'}
          {user.role === 'SUPER_ADMIN' && 'Full admin access including users'}
        </p>
      </div>
    </div>
  )
}

export default RoleSelector
