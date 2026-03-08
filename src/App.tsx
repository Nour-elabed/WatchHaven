import { Routes, Route } from 'react-router-dom'
import Home from './_root/pages/Home'
import Shop from './_root/pages/Shop'
import Product from './_root/pages/Product'
import './index.css'
import RootLayout from './_root/pages/RootLayout'
import Login from './_root/pages/Login'
import Register from './_root/pages/Register'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Toaster } from '@/components/ui/sonner'
import { Spinner } from '@/components/ui/spinner'

type User = {
  _id: string
  username: string
  email: string
  token: string
}

const App = () => {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token")
      if (token) {
        try {
          const response = await axios.get("/api/users/profile", {
            headers: { Authorization: `Bearer ${token}` }
          })
          setUser(response.data)
        } catch {
          localStorage.removeItem("token")
          setError("Session expired, please log in again")
        }
      }
      setIsLoading(false)
    }
    fetchUser()
  }, [])

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Spinner/> // Simple loading spinner while checking for user authentication status on app load
    </div>
  )

  return (
    <>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route element={<RootLayout user={user} setUser={setUser} />}> //setUser passed to RootLayout to manage user state across the app
          <Route index element={<Home user={user} error={error} />} /> //user and error passed to Home for personalized greeting and error display
          <Route path='/shop' element={<Shop />} />
          <Route path='/product' element={<Product />} /> 
          <Route path='/login' element={<Login setUser={setUser} />} />
          <Route path='/register' element={<Register />} />
        </Route>
      </Routes>
    </>
  )
}

export default App