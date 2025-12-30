import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LayoutDashboard, ShoppingCart, Activity, Plus, X, Trash2 } from 'lucide-react';
import API_URL from '../api'; // Imported and now USED below

// Import your custom components
import ProductScene from '../components/ProductScene';
import SalesChart from '../components/SalesChart';

// Local StatCard Component
const StatCard = ({ title, value, icon }) => {
  const LucideIcon = icon; 
  return (
    <div className="p-6 bg-glass backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/5 transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-400 text-sm mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-white">{value}</h3>
        </div>
        <div className="p-2 bg-neon/10 rounded-lg">
          <LucideIcon className="text-neon" size={24} />
        </div>
      </div>
    </div>
  );
};

export default function DashboardPage() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', price: '', stock: '' });

  // 1. Fetch Data (Using API_URL for deployment)
  const fetchProducts = () => {
    axios.get(`${API_URL}/api/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. Handle Add Product (Using API_URL)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.name || !formData.price) return;

    try {
      await axios.post(`${API_URL}/api/products`, {
        name: formData.name,
        price: Number(formData.price),
        stock: Number(formData.stock),
        sales: 0
      });
      setIsModalOpen(false);
      setFormData({ name: '', price: '', stock: '' });
      fetchProducts(); 
    } catch {
      alert("Error adding product");
    }
  };

  // 3. Handle Delete (Using API_URL)
  const handleDelete = async (id) => {
      await axios.delete(`${API_URL}/api/products/${id}`);
      fetchProducts();
  };

  return (
    <div className="p-8 pb-20 overflow-y-auto h-full">
      
      {/* --- MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-[#1e293b] p-8 rounded-2xl border border-white/10 w-96 shadow-2xl relative">
                <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <X size={20} />
                </button>
                <h2 className="text-2xl font-bold mb-6 text-neon">Add New Item</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        type="text" placeholder="Product Name" 
                        className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-neon"
                        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                    {/* Placeholder in Cedis */}
                    <input 
                        type="number" placeholder="Price (₵)" 
                        className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-neon"
                        value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})}
                    />
                    <input 
                        type="number" placeholder="Stock Quantity" 
                        className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-neon"
                        value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})}
                    />
                    <button type="submit" className="w-full bg-neon text-black font-bold py-3 rounded-lg hover:bg-cyan-400 transition-colors">
                        Confirm Add
                    </button>
                </form>
            </div>
        </div>
      )}

      {/* --- HEADER --- */}
      <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Dashboard Overview</h2>
            <p className="text-gray-400 text-sm mt-1">Welcome back, Admin</p>
          </div>
          <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-neon hover:bg-cyan-400 text-black font-bold px-6 py-2 rounded-full transition-all shadow-[0_0_15px_rgba(0,243,255,0.3)] hover:shadow-[0_0_25px_rgba(0,243,255,0.5)]"
          >
              <Plus size={20} /> Add Product
          </button>
      </header>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Static Value in Cedis */}
          <StatCard title="Total Sales" value="₵12,450" icon={Activity} />
          <StatCard title="Active Orders" value="24" icon={ShoppingCart} />
          <StatCard title="Conversion Rate" value="3.2%" icon={LayoutDashboard} />
      </div>

      {/* --- CHART SECTION --- */}
      <div className="mb-8">
          <SalesChart />
      </div>

      {/* --- 3D & DATA TABLE --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
          {/* Left: 3D Visualization */}
          <div className="space-y-4">
              <div className="flex justify-between items-end">
                <h3 className="text-xl font-semibold text-gray-300">Top Product (3D View)</h3>
                <span className="text-xs text-neon border border-neon/30 px-2 py-1 rounded">Interactive</span>
              </div>
              <ProductScene />
          </div>

          {/* Right: Data Table */}
          <div className="bg-glass backdrop-blur-md border border-white/10 rounded-xl p-6 h-[400px] overflow-hidden flex flex-col">
              <h3 className="text-xl font-semibold mb-4 text-gray-300">Live Inventory</h3>
              <div className="overflow-y-auto pr-2 custom-scrollbar flex-1">
                  <table className="w-full text-left border-collapse">
                      <thead className="sticky top-0 bg-[#0f172a]/90 backdrop-blur-sm z-10">
                          <tr className="text-gray-500 border-b border-white/10">
                              <th className="pb-3 pl-2 font-medium uppercase text-xs">Name</th>
                              <th className="pb-3 font-medium uppercase text-xs">Price</th>
                              <th className="pb-3 font-medium uppercase text-xs">Action</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                          {products.map((product) => (
                              <tr key={product._id} className="group hover:bg-white/5 transition-colors">
                                  <td className="py-4 pl-2 text-white font-medium">{product.name}</td>
                                  {/* Dynamic Price in Cedis */}
                                  <td className="py-4 text-gray-400">₵{product.price}</td>
                                  <td className="py-4">
                                      <button 
                                          onClick={() => handleDelete(product._id)}
                                          className="text-gray-500 hover:text-red-400 transition-colors p-1"
                                      >
                                          <Trash2 size={16} />
                                      </button>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
    </div>
  );
}