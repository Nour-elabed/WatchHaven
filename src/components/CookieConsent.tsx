import { useState, useEffect } from "react"

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if the user has already answered the cookie prompt
    const consent = localStorage.getItem("cookie_consent")
    if (!consent) {
      // Delay slightly for better UX so it slides in after mount
      const timer = setTimeout(() => setIsVisible(true), 500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted")
    setIsVisible(false)
  }

  const handleReject = () => {
    localStorage.setItem("cookie_consent", "rejected")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border-t border-gray-100 animate-in slide-in-from-bottom duration-500">
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-1 text-center lg:text-left">
          <h3 className="text-gray-900 font-bold text-lg">Cookie Preferences</h3>
          <p className="text-sm text-gray-500 font-medium max-w-3xl">
            We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By clicking "Accept All", you consent to our use of cookies in accordance with our Privacy Policy.
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0 w-full lg:w-auto">
          <button 
            onClick={handleReject}
            className="flex-1 lg:flex-none px-6 py-2.5 text-sm font-bold text-gray-700 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Reject All
          </button>
          <button 
            onClick={handleAccept}
            className="flex-1 lg:flex-none px-6 py-2.5 text-sm font-bold rounded-full bg-black text-white hover:bg-gray-800 transition-colors shadow-md"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent
