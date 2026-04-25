import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Spinner } from '@/components/ui/spinner'
import { useAuth } from '@/context/AuthContext'
import axios from 'axios'

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
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
      // Explicitly send only email and password
      await login(formData.email, formData.password)
      toast.success("Logged in successfully!")
      
      const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || '/'
      navigate(from, { replace: true })
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || err.message || "Invalid credentials")
      } else {
        toast.error("An error occurred during login")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="premium-card p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Enter your credentials to access your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
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
            <div className="flex justify-between items-center px-1">
              <label className="text-sm font-medium">Password</label>
              <button type="button" className="text-sm text-accent hover:underline">Forgot?</button>
            </div>
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
            disabled={isSubmitting}
            className="w-full btn-primary mt-4 py-3 flex items-center justify-center gap-2"
          >
            {isSubmitting ? <Spinner className="w-5 h-5" /> : "Sign In"}
          </button>
        </form>
        
        <div className="mt-8 text-center text-sm">
          <span className="text-muted-foreground">Don't have an account?</span>{' '}
          <button 
            onClick={() => navigate('/register')} 
            className="text-primary font-semibold hover:underline"
          >
            Create account
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login