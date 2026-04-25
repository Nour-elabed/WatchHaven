import { useState } from 'react'
import api from '@/services/api.ts'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Spinner } from '@/components/ui/spinner'

const Register = () => {
  const [formData, setFormData] = useState({ 
    username: "", 
    email: "", 
    password: "" 
  })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await api.post("/auth/register", formData)
      toast.success(`Welcome aboard, ${response.data.data.username}! Please sign in.`)
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
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="premium-card p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Create Account</h1>
          <p className="text-muted-foreground mt-2">Join our premium watch community</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
           <div className="space-y-2">
            <label className="text-sm font-medium px-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="input-field"
              placeholder="johndoe"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium px-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              placeholder="name@example.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium px-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary mt-4 py-3 flex items-center justify-center gap-2"
          >
            {isLoading ? <Spinner className="w-5 h-5" /> : "Sign Up"}
          </button>
        </form>
        
        <div className="mt-8 text-center text-sm">
          <span className="text-muted-foreground">Already have an account?</span>{' '}
          <button 
            onClick={() => navigate('/login')} 
            className="text-primary font-semibold hover:underline"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register