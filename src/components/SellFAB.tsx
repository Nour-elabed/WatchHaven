import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Plus } from 'lucide-react';

const SellFAB = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // Hide on auth pages, admin pages, and checkout
  const hiddenPaths = ['/login', '/register', '/setup', '/admin', '/checkout'];
  const shouldHide = hiddenPaths.some(p => location.pathname.startsWith(p));

  if (shouldHide || !user) return null;

  return (
    <button
      onClick={() => navigate('/profile?tab=seller')}
      className="fixed bottom-24 right-6 z-[9998] group"
      aria-label="Sell a product"
    >
      <div className="relative flex items-center">
        {/* Expanding label */}
        <div className="absolute right-full mr-3 whitespace-nowrap bg-black dark:bg-white text-white dark:text-black text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none shadow-lg">
          Start Selling
        </div>
        {/* FAB */}
        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 hover:scale-110 active:scale-95 transition-all duration-300">
          <Plus size={22} strokeWidth={2.5} />
        </div>
      </div>
    </button>
  );
};

export default SellFAB;
