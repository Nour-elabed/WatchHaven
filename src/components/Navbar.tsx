import { LucideSearch } from "lucide-react"
import DropDown from "./ui/DropDown"
import { useState, useRef } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { toast } from "sonner"
import { useCart } from "@/context/useCart"
import CartDrawer from "./CartDrawer"

import { useAuth } from "@/context/AuthContext"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register'

  const { toggleCart, totalItems } = useCart()

  const { user, logout } = useAuth()

  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    if (!user) setShowPopup(true)
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

      <div className="border-1 w-full fixed top-0 left-0 h-16 flex items-center bg-white z-50 px-6">
        <div className="w-full flex items-center justify-between max-w-7xl mx-auto">

          {/* Logo */}
          <img src="/assets/images/logo.svg" alt="Logo" className="hidden md:block h-8 cursor-pointer" />
          <img src="/assets/icons/logo.svg" alt="mobile_logo" className="w-10 h-10 cursor-pointer md:hidden" />

          {/* Search */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-[180px] sm:max-w-[220px] md:max-w-[300px] lg:max-w-md">
              <LucideSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              <input
                type="text"
                placeholder="Search in products..."
                className="w-full pl-10 pr-3 py-1.5 sm:py-2 border border-gray-300 rounded-full bg-gray-100 shadow-sm outline-none text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-6 ml-auto">
            {user && (
              <button onClick={handleLogout} className="text-sm font-medium text-black hover:underline transition-colors">
                Logout
              </button>
            )}

            <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <div className="flex flex-col items-center cursor-pointer">
                <img src="/assets/icons/user-btn.svg" alt="user" className="h-6 w-6" />
                {user && (
                  <span className="text-[10px] text-gray-500 mt-0.5 leading-none">
                    Hi, {user.username}
                  </span>
                )}
              </div>
              {showPopup && !user && (
                <div
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="absolute right-0 top-10 w-52 bg-white border border-gray-200 rounded-xl shadow-lg p-4 flex flex-col gap-2 z-50"
                >
                  <p className="text-xs text-gray-500 text-center">Don't have an account?</p>
                  <Link to="/register" className="w-full text-center bg-black text-white text-sm py-1.5 rounded-full hover:bg-gray-800 transition-colors">
                    Register
                  </Link>
                  <Link to="/login" className="w-full text-center border border-gray-300 text-sm py-1.5 rounded-full hover:bg-gray-100 transition-colors">
                    Login
                  </Link>
                </div>
              )}
            </div>

            {/* Cart icon with live badge */}
            {!isAuthPage && (
              <button
                onClick={toggleCart}
                className="relative p-1 cursor-pointer hover:opacity-70 transition-opacity"
                aria-label="Open cart"
              >
                <img src="/assets/icons/cart.svg" alt="cart" className="h-8 w-8" />
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
                <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                  <img src="/assets/icons/user-btn.svg" alt="user" className="h-5 w-5" />
                  {user ? (
                    <span className="text-sm text-gray-600">Hi, <span className="font-medium text-black">{user.username}</span></span>
                  ) : (
                    <span className="text-sm text-gray-400">Not logged in</span>
                  )}
                </div>

                {/* Cart — mobile */}
                {!isAuthPage && (
                  <button
                    onClick={() => { toggleCart(); setIsOpen(false); }}
                    className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity w-full text-left"
                  >
                    <div className="relative">
                      <img src="/assets/icons/cart.svg" alt="cart" className="h-6 w-6" />
                      {totalItems > 0 && (
                        <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-0.5">
                          {totalItems > 99 ? "99+" : totalItems}
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-medium">Cart</span>
                  </button>
                )}

                {/* Auth actions */}
                {user ? (
                  <button
                    onClick={() => { handleLogout(); setIsOpen(false) }}
                    className="w-full text-center border border-gray-300 text-sm py-1.5 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    Logout
                  </button>
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