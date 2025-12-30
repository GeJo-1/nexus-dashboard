import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import OrdersPage from './pages/OrdersPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';

// Simple placeholder for empty pages
const Placeholder = ({ title }) => (
  <div className="p-8 text-center text-gray-500 text-xl mt-20">
    🚧 {title} Page Under Construction
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-[#0f172a] text-white font-sans">
        
        {/* The Sidebar is outside Routes so it stays visible */}
        <Sidebar />

        {/* The Main Content Area Changes based on the URL */}
        <main className="flex-1 ml-0 md:ml-64 relative z-10">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;