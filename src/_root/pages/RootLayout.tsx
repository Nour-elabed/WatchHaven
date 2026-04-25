import Navbar from '@/components/Navbar';
import { Outlet } from 'react-router-dom';
import CookieConsent from '@/components/CookieConsent';

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* Added pt-16 to offset the fixed navbar and provide breathing room */}
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <CookieConsent />
    </div>
  )
}

export default RootLayout;