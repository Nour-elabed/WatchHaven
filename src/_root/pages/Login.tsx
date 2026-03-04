import Navbar from '@/components/Navbar'
import { useState } from 'react'

const Login = () => {
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const handleChange=(e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center p-4">
        
        <div className="bg-white p-8 rounded-lg shadow-sm w-full max-w-md border border-gray-50">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
          
          {error && <p className="text-red-400 mb-4 text-center text-sm">{error}</p>}
          
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
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
              className="w-full bg-black hover:bg-gray-800 text-white py-2 px-4 mt-4 rounded-4xl shadow-xl transition-colors cursor-pointer"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login