import { LucideSearch, Sun, Moon } from "lucide-react"
import DropDown from "./ui/DropDown"
import { useState, useRef } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { toast } from "sonner"
import { useCart } from "@/context/useCart"
import CartDrawer from "./CartDrawer"
import { useAuth } from "@/context/AuthContext"
import { useTheme } from "@/context/ThemeContext"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register'

  const { toggleCart, totalItems } = useCart()

  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setShowPopup(true)
  }

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setShowPopup(false), 300)
  }

  const handleLogout = () => {
    logout()
    toast.success("Logged out successfully")
    navigate('/login')
  }

  return (
    <>
      {/* CartDrawer lives here — always in the DOM, toggled by isOpen */}
      <CartDrawer />

      <div className="border-b border-border w-full fixed top-0 left-0 h-16 flex items-center bg-white dark:bg-gray-950 z-50 px-6 transition-colors duration-300">
        <div className="w-full flex items-center justify-between max-w-7xl mx-auto">

          {/* Logo */}
          <Link to="/" className="hidden md:block">
            <img src="/assets/images/logo.svg" alt="Logo" className="h-8 cursor-pointer hover:opacity-80 transition-opacity" />
          </Link>
          <Link to="/" className="md:hidden">
            <img src="/assets/icons/logo.svg" alt="mobile_logo" className="w-10 h-10 cursor-pointer hover:opacity-80 transition-opacity" />
          </Link>

          {/* Search */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-[180px] sm:max-w-[220px] md:max-w-[300px] lg:max-w-md">
              <LucideSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              <input
                type="text"
                placeholder="Search in products..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                    navigate(`/shop?q=${encodeURIComponent(e.currentTarget.value.trim())}`)
                  }
                }}
                className="w-full pl-10 pr-3 py-1.5 sm:py-2 border border-gray-300 rounded-full bg-gray-100 shadow-sm outline-none text-xs sm:text-sm transition-shadow focus:ring-2 focus:ring-black/5"
              />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-6 ml-auto">
            {(user?.role === "ADMIN" || user?.role === "SUPER_ADMIN") && (
              <Link to="/admin/dashboard" className="text-sm font-medium text-black hover:underline transition-colors">
                Admin Dashboard
              </Link>
            )}
            <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              {user ? (
                <Link 
                  to="/profile" 
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200 group"
                >
                  <div className="relative">
                    <img src="/assets/icons/user-btn.svg" alt="user" className="h-6 w-6 group-hover:scale-110 transition-transform" />
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <span className="text-xs font-semibold text-gray-700 hidden lg:block">
                    Hi, {user.username}
                  </span>
                </Link>
              ) : (
                <div className="flex flex-col items-center cursor-pointer p-2 hover:bg-gray-50 rounded-full transition-colors">
                  <img src="/assets/icons/user-btn.svg" alt="user" className="h-6 w-6" />
                </div>
              )}
              {showPopup && (
                <div
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="absolute right-0 top-10 w-52 bg-white border border-gray-100 rounded-2xl shadow-xl p-3 flex flex-col gap-1 z-50 animate-in fade-in zoom-in duration-200"
                >
                  {user ? (
                    <>
                      <div className="px-3 py-2 border-b border-gray-50 mb-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Account</p>
                        <p className="text-sm font-bold text-gray-900 truncate">{user.username}</p>
                      </div>
                      <Link to="/profile" className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        My Profile
                      </Link>
                      {(user.role === "ADMIN" || user.role === "SUPER_ADMIN") && (
                        <Link to="/admin/dashboard" className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                          Admin Panel
                        </Link>
                      )}
                      <button 
                        onClick={handleLogout} 
                        className="w-full text-left px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-xs text-gray-500 text-center py-1">Welcome to WatchHaven</p>
                      <Link to="/register" className="w-full text-center bg-black text-white text-sm py-2.5 rounded-xl font-bold hover:bg-gray-800 transition-all active:scale-95 shadow-sm">
                        Create Account
                      </Link>
                      <Link to="/login" className="w-full text-center border border-gray-200 text-sm py-2.5 rounded-xl font-bold hover:bg-gray-50 transition-all active:scale-95 mt-1">
                        Login
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <Sun size={18} className="text-yellow-500" /> : <Moon size={18} className="text-gray-600" />}
            </button>

            {/* Cart icon with live badge */}
            {!isAuthPage && (
              <button
                onClick={toggleCart}
                className="relative p-1 cursor-pointer hover:opacity-70 transition-opacity"
                aria-label="Open cart"
              >
                <img src="/assets/icons/Cart.png" alt="cart" className="h-8 w-8" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 leading-none">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </button>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="flex md:hidden ml-auto">
            <DropDown
              isOpen={isOpen}
              onOpenChange={setIsOpen}
              trigger={
                <button>
                  <img
                    src={isOpen ? "/assets/icons/close.png" : "/assets/icons/hamburger-menu.svg"}
                    alt="menu"
                    className="h-8 w-8"
                  />
                </button>
              }
            >
              <div className="flex flex-col gap-3 p-4">

                {/* User greeting or icon */}
                {user ? (
                  <Link 
                    to="/profile" 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 pb-3 border-b border-gray-100 group"
                  >
                    <div className="relative">
                      <img src="/assets/icons/user-btn.svg" alt="user" className="h-8 w-8" />
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">My Account</span>
                      <span className="text-sm font-black text-black">Hi, {user.username}</span>
                    </div>
                  </Link>
                ) : (
                  <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                    <img src="/assets/icons/user-btn.svg" alt="user" className="h-8 w-8" />
                    <span className="text-sm text-gray-400 font-bold">Not logged in</span>
                  </div>
                )}

                {/* Cart — mobile */}
                {!isAuthPage && (
                  <button
                    onClick={() => { toggleCart(); setIsOpen(false); }}
                    className="flex items-center gap-3 px-1 py-2 cursor-pointer hover:bg-gray-50 rounded-xl transition-all"
                  >
                    <div className="relative">
                      <img src="/assets/icons/Cart.png" alt="cart" className="h-8 w-8" />
                      {totalItems > 0 && (
                        <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                          {totalItems > 99 ? "99+" : totalItems}
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-bold">Shopping Cart</span>
                  </button>
                )}

                {/* Dark Mode Toggle — Mobile */}
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-3 px-1 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all"
                >
                  {theme === 'dark' ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-gray-600" />}
                  <span className="text-sm font-bold">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>

                {/* Auth actions */}
                {user ? (
                  <>
                    {(user.role === "ADMIN" || user.role === "SUPER_ADMIN") && (
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="w-full text-left px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-xl transition-colors flex items-center gap-3"
                      >
                         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => { handleLogout(); setIsOpen(false) }}
                      className="w-full text-left px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-3"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="w-full text-center bg-black text-white text-sm py-1.5 rounded-full hover:bg-gray-800 transition-colors"
                    >
                      Register
                    </Link>
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="w-full text-center border border-gray-300 text-sm py-1.5 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>
            </DropDown>
          </div>

        </div>
      </div>
    </>
  )
}

export default Navbar