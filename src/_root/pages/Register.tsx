import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Spinner } from '@/components/ui/spinner'
import { register } from '@/services/authService'

const Register = () => {
  const [formData, setFormData] = useState({ 
    username: "", 
    email: "", 
    password: "" 
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const validateEmail = (email: string) => {
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (formData.username.length < 3) {
      toast.error("Username must be at least 3 characters")
      return
    }
    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address")
      return
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters")
      return
    }

    setIsLoading(true)
    try {
      const userData = await register(formData)
      toast.success(`Welcome to the collection, ${userData.username}!`)
      navigate('/login')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Registration failed. Check your data.")
      } else {
        toast.error("Something went wrong. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="premium-card p-10 w-full max-w-md border border-border shadow-2xl">
        <div className="text-center mb-10">
          <div className="inline-block p-3 rounded-2xl bg-primary/5 mb-4">
             <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Create Account</h1>
          <p className="text-muted-foreground mt-2 text-sm">Join our community of watch enthusiasts</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
           <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Username</label>
            <div className="relative">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="johndoe"
                required
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
          </div>

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
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Password</label>
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
            <p className="text-[10px] text-muted-foreground mt-1 ml-1 uppercase font-bold tracking-tighter">Min 6 characters</p>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary mt-6 py-4 rounded-2xl flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-primary/10"
          >
            {isLoading ? (
              <><Spinner className="w-5 h-5 border-white/30 border-t-white" /> Creating Account...</>
            ) : (
              "Join Now"
            )}
          </button>
        </form>
        
        <div className="mt-10 pt-8 border-t border-border/50 text-center text-sm">
          <span className="text-muted-foreground">Already a member?</span>{' '}
          <button 
            onClick={() => navigate('/login')} 
            className="text-primary font-bold hover:underline underline-offset-4 decoration-2"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register