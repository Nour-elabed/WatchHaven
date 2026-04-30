import { Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'
import { Spinner } from '@/components/ui/spinner'
import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContext'
import PrivateRoute from '@/routes/PrivateRoute'
import AdminRoute from '@/routes/AdminRoute'
import SuperAdminRoute from '@/routes/SuperAdminRoute'
import './index.css'

// ─── Lazy-loaded pages (code splitting) ───────────────────────────
const RootLayout = lazy(() => import('./_root/pages/RootLayout'))
const Home = lazy(() => import('./_root/pages/Home'))
const Shop = lazy(() => import('./_root/pages/Shop'))
const ProductDetail = lazy(() => import('./_root/pages/ProductDetail'))
const Login = lazy(() => import('./_root/pages/Login'))
const Register = lazy(() => import('./_root/pages/Register'))
const Setup = lazy(() => import('./_root/pages/Setup'))
const Checkout = lazy(() => import('./_root/pages/Checkout'))
const About = lazy(() => import('./_root/pages/About'))
const Contact = lazy(() => import('./_root/pages/Contact'))
const Orders = lazy(() => import('./_root/pages/Orders'))
const OrderConfirmation = lazy(() => import('./_root/pages/OrderConfirmation'))
const Profile = lazy(() => import('./_root/pages/Profile'))
const AdminLayout = lazy(() => import('./admin/components/AdminLayout'))
const AdminDashboard = lazy(() => import('./admin/pages/AdminDashboard'))
const ManageProducts = lazy(() => import('./admin/pages/ManageProducts'))
const ManageUsers = lazy(() => import('./admin/pages/ManageUsers'))
const ManageOrders = lazy(() => import('./admin/pages/ManageOrders'))
const AdminChecklist = lazy(() => import('./admin/pages/AdminChecklist'))

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
              {/* Public dev-only setup page (no navbar/footer, no auth) */}
              <Route path="/setup" element={<Setup />} />

              <Route element={<RootLayout />}>
                {/* Public routes */}
                <Route index element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

                {/* Protected routes — must be logged in */}
                <Route element={<PrivateRoute />}>
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/orders/:id" element={<OrderConfirmation />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>

                {/* Admin-only routes */}
                <Route element={<AdminRoute />}>
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Navigate to="/admin/dashboard" replace />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="products" element={<ManageProducts />} />
                    <Route path="orders" element={<ManageOrders />} />
                    <Route path="checklist" element={<AdminChecklist />} />
                    <Route element={<SuperAdminRoute />}>
                      <Route path="users" element={<ManageUsers />} />
                    </Route>
                  </Route>
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