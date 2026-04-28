import { Outlet, NavLink } from 'react-router';
import { LayoutDashboard, Map, Megaphone } from 'lucide-react';
import { motion } from 'motion/react';

export default function Layout() {
  const navItems = [
    { path: '/', label: 'Обзор', icon: LayoutDashboard },
    { path: '/map', label: 'Карта', icon: Map },
    { path: '/promo', label: 'Промо', icon: Megaphone },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0079C1] to-[#005A94] flex items-center justify-center shadow-lg shadow-blue-500/20">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6L12 3L21 6V18L12 21L3 18V6Z" fill="white" fillOpacity="0.9"/>
                  <path d="M12 3V21M3 6L21 18M21 6L3 18" stroke="white" strokeWidth="1.5" strokeOpacity="0.3"/>
                </svg>
              </div>
              <div>
                <h1 className="text-xl tracking-tight text-slate-900">
                  ВТБ <span className="font-light">Бизнес Аналитика</span>
                </h1>
                <p className="text-xs text-slate-500 tracking-wide">Геолокационная аналитика клиентов</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200/50">
                <span className="text-emerald-700">Баланс промо:</span>
                <span className="ml-2 font-medium text-emerald-900">24 500 ₽</span>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Navigation */}
      <nav className="bg-white/60 backdrop-blur-sm border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1">
            {navItems.map(({ path, label, icon: Icon }, index) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                className={({ isActive }) =>
                  `relative flex items-center gap-2 px-6 py-4 transition-all duration-200 ${
                    isActive
                      ? 'text-[#0079C1]'
                      : 'text-slate-600 hover:text-slate-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={18} />
                    <span className="text-sm tracking-wide">{label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0079C1] to-[#00A0E3]"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
