import React from 'react';
import { Search, Filter, Eye } from 'lucide-react';

// Mock Data for UI (You can replace this with a backend fetch later)
const orders = [
  { id: '#ORD-7782', customer: 'Alex Carter', item: 'Neon CyberDeck', amount: '$1,200', status: 'Shipped', date: '2 mins ago' },
  { id: '#ORD-7781', customer: 'Sarah Connor', item: 'Quantum Chip', amount: '$2,999', status: 'Pending', date: '15 mins ago' },
  { id: '#ORD-7780', customer: 'David Martinez', item: 'Holo-Headset', amount: '$850', status: 'Delivered', date: '1 hour ago' },
  { id: '#ORD-7779', customer: 'Judy Alvarez', item: 'Neural Link', amount: '$5,400', status: 'Cancelled', date: '3 hours ago' },
  { id: '#ORD-7778', customer: 'V. Serpent', item: 'Mantis Blades', amount: '$900', status: 'Shipped', date: '5 hours ago' },
];

const getStatusColor = (status) => {
  switch(status) {
    case 'Shipped': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    case 'Pending': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    case 'Delivered': return 'text-green-400 bg-green-400/10 border-green-400/20';
    case 'Cancelled': return 'text-red-400 bg-red-400/10 border-red-400/20';
    default: return 'text-gray-400 bg-gray-400/10';
  }
};

export default function OrdersPage() {
  return (
    <div className="p-8 pb-20">
      <header className="flex justify-between items-center mb-8">
        <div>
            <h2 className="text-3xl font-bold">Orders</h2>
            <p className="text-gray-400 text-sm mt-1">Manage recent customer transactions</p>
        </div>
      </header>

      {/* Toolbar */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-gray-500" size={18} />
            <input 
                type="text" 
                placeholder="Search orders..." 
                className="w-full bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-neon transition-colors"
            />
        </div>
        <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg border border-white/10 transition-colors">
            <Filter size={18} /> Filter
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-glass backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
            <thead className="bg-white/5 border-b border-white/10 text-gray-400 text-xs uppercase tracking-wider">
                <tr>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Item</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
                {orders.map((order) => (
                    <tr key={order.id} className="group hover:bg-white/5 transition-colors">
                        <td className="p-4 font-mono text-neon">{order.id}</td>
                        <td className="p-4 text-white font-medium">{order.customer}</td>
                        <td className="p-4 text-gray-400">{order.item}</td>
                        <td className="p-4 text-white font-bold">{order.amount}</td>
                        <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                                {order.status}
                            </span>
                        </td>
                        <td className="p-4 text-gray-500 text-sm">{order.date}</td>
                        <td className="p-4">
                            <button className="text-gray-500 hover:text-white transition-colors">
                                <Eye size={18} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}