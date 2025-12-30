import React from 'react';
import { LayoutDashboard, ShoppingCart, Activity, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: ShoppingCart, label: 'Orders', path: '/orders' },
    { icon: Activity, label: 'Analytics', path: '/analytics' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];

  return (
    <aside className="w-64 bg-black/20 backdrop-blur-xl border-r border-white/5 p-6 hidden md:block fixed h-full z-20">
      <h1 className="text-2xl font-bold mb-10 tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
        NEXUS
      </h1>
      <nav className="space-y-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-neon/10 text-neon border-r-2 border-neon' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}