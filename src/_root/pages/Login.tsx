import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Spinner } from '@/components/ui/spinner'
import { useAuth } from '@/context/AuthContext'
import axios from 'axios'

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await login(formData.email, formData.password)
      toast.success("Logged in successfully!")
      const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname
      navigate(from || '/')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || err.message || "Login failed")
      } else if (err instanceof Error) {
        toast.error(err.message || "Login failed")
      } else {
        toast.error("Login failed")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-sm w-full max-w-md border border-gray-50">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-2 focus:ring-2 focus:ring-black outline-none"
                placeholder="example@example.com"
                autoComplete='off'
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-2 focus:ring-2 focus:ring-black outline-none"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting} // Disable button while loading
              className="w-full bg-black hover:bg-gray-800 text-white py-2 px-4 mt-4 rounded-full shadow-xl transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isSubmitting ? <><Spinner /> Logging in...</> : "Login"}
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-4">
            Don't have an account?{' '}
            <span onClick={() => navigate('/register')} className="text-black font-medium cursor-pointer hover:underline">
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login