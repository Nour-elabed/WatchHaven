import { Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'
import { Spinner } from '@/components/ui/spinner'
import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContext'
import PrivateRoute from '@/components/PrivateRoute'
import AdminRoute from '@/components/AdminRoute'
import './index.css'

// ─── Lazy-loaded pages (code splitting) ───────────────────────────
const RootLayout = lazy(() => import('./_root/pages/RootLayout'))
const Home = lazy(() => import('./_root/pages/Home'))
const Shop = lazy(() => import('./_root/pages/Shop'))
const Product = lazy(() => import('./_root/pages/Product'))
const Login = lazy(() => import('./_root/pages/Login'))
const Register = lazy(() => import('./_root/pages/Register'))
const Checkout = lazy(() => import('./_root/pages/Checkout'))
const About = lazy(() => import('./_root/pages/About'))
const Orders = lazy(() => import('./_root/pages/Orders'))
const OrderConfirmation = lazy(() => import('./_root/pages/OrderConfirmation'))

// ─── React Query client ───────────────────────────────────────────
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes cache
      retry: 1,
    },
  },
})

// ─── Page-level loading fallback ──────────────────────────────────
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Spinner />
  </div>
)

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <Toaster position="top-right" richColors />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route element={<RootLayout />}>
                {/* Public routes */}
                <Route index element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />

                {/* Protected routes — must be logged in */}
                <Route element={<PrivateRoute />}>
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/orders/:id" element={<OrderConfirmation />} />
                </Route>

                {/* Admin-only routes */}
                <Route element={<AdminRoute />}>
                  {/* Add admin pages here, e.g.: */}
                  {/* <Route path="/admin/products" element={<AdminProducts />} /> */}
                </Route>

                {/* Catch-all */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </Suspense>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App