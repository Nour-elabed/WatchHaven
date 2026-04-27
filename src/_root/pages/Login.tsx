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
    role: "AUTO" as "AUTO" | "USER" | "ADMIN" | "SUPER_ADMIN",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address")
      return
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long")
      return
    }

    setIsSubmitting(true)
    try {
      const user = await login(formData.email, formData.password, formData.role)
      toast.success(`Welcome, ${user.username}`)
      
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
    <div className="min-h-screen flex items-center justify-center p-6 bg-background animate-in fade-in duration-700">
      <div className="premium-card p-10 w-full max-w-md border border-border shadow-2xl">
        <div className="text-center mb-10">
          <div className="inline-block p-3 rounded-2xl bg-primary/5 mb-4 mb-4">
             <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Sign In</h1>
          <p className="text-muted-foreground mt-2 text-sm">Enter your credentials to manage your collection</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="name@example.com"
                required
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Password</label>
              <button type="button" className="text-xs text-accent font-semibold hover:underline">Forgot password?</button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-field pl-10 pr-12"
                placeholder="••••••••"
                required
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors p-1"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88L14.12 14.12"/><path d="M2 2l20 20"/><path d="M10.37 4.37a9 9 0 0 1 8 5.63"/><path d="M22 12A9 9 0 0 1 12 21.08"/><path d="M12 7a5 5 0 0 1 5 5"/><path d="M12 17a5 5 0 0 1-5-5"/><path d="M4.37 13.63a9 9 0 0 1 5.63-8"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Access Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role: e.target.value as "AUTO" | "USER" | "ADMIN" | "SUPER_ADMIN",
                })
              }
              className="input-field bg-white"
            >
              <option value="AUTO">Auto (recommended)</option>
              <option value="USER">Login as USER</option>
              <option value="ADMIN">Login as ADMIN</option>
              <option value="SUPER_ADMIN">Login as SUPER_ADMIN</option>
            </select>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-primary mt-4 py-4 rounded-2xl flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-primary/10"
          >
            {isSubmitting ? (
              <><Spinner className="w-5 h-5 border-white/30 border-t-white" /> Authenticating...</>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        
        <div className="mt-10 pt-8 border-t border-border/50 text-center text-sm">
          <span className="text-muted-foreground">New to our store?</span>{' '}
          <button 
            onClick={() => navigate('/register')} 
            className="text-primary font-bold hover:underline underline-offset-4 decoration-2"
          >
            Create an account
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login