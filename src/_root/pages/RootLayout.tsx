import Navbar from '@/components/Navbar';
import { Outlet } from 'react-router-dom';
import CookieConsent from '@/components/CookieConsent';

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <CookieConsent />
    </div>
  )
}

export default RootLayout;