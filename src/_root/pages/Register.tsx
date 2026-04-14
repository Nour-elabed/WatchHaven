import { useState } from 'react'
import api from '@/services/api.ts'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Spinner } from '@/components/ui/spinner'
const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await api.post("/api/users/register", formData)
      toast.success(`Account created! Please log in, ${response.data.data.username}.`)
      navigate('/login')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Registration failed")
      } else {
        toast.error("Registration failed")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-sm w-full max-w-md border border-gray-50">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-2 focus:ring-2 focus:ring-black outline-none"
                placeholder="johndoe"
                autoComplete='off'
                required
              />
            </div>
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
                onChange={handleChange} // Note: The onChange handler is necessary to update the formData state as the user types.
                className="mt-1 block w-full border border-gray-300 rounded-xl shadow-sm p-2 focus:ring-2 focus:ring-black outline-none"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black hover:bg-gray-800 text-white py-2 px-4 mt-4 rounded-full shadow-xl transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isLoading ? <><Spinner /> Registering...</> : "Register"} 
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{' '}  
            <span onClick={() => navigate('/login')} className="text-black font-medium cursor-pointer hover:underline"> 
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register