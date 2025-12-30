import React from 'react';
import { 
  BarChart, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, Download, Users, DollarSign, MousePointer } from 'lucide-react';

// --- MOCK DATA ---
const revenueData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
];

const sourceData = [
  { name: 'Direct', value: 400 },
  { name: 'Social', value: 300 },
  { name: 'Organic', value: 300 },
  { name: 'Referral', value: 200 },
];

const performanceData = [
  { subject: 'Speed', A: 120, fullMark: 150 },
  { subject: 'Reliability', A: 98, fullMark: 150 },
  { subject: 'Traffic', A: 86, fullMark: 150 },
  { subject: 'Conversion', A: 99, fullMark: 150 },
  { subject: 'Retention', A: 85, fullMark: 150 },
  { subject: 'Security', A: 65, fullMark: 150 },
];

// Neon Color Palette
const COLORS = ['#00f3ff', '#8b5cf6', '#ec4899', '#10b981'];

// FIX: We assign the 'icon' prop to 'LucideIcon' to satisfy the linter
const KPICard = ({ title, value, change, isPositive, icon }) => {
  const LucideIcon = icon;
  
  return (
    <div className="bg-glass backdrop-blur-md border border-white/10 p-6 rounded-xl relative overflow-hidden group hover:bg-white/5 transition-all">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <LucideIcon size={60} />
      </div>
      <p className="text-gray-400 text-sm mb-2">{title}</p>
      <h3 className="text-3xl font-bold text-white mb-4">{value}</h3>
      <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          <span>{change} vs last month</span>
      </div>
    </div>
  );
};

export default function AnalyticsPage() {
  return (
    <div className="p-8 pb-20">
      <header className="flex justify-between items-center mb-8">
        <div>
            <h2 className="text-3xl font-bold">Analytics & Reports</h2>
            <p className="text-gray-400 text-sm mt-1">Deep dive into your store performance</p>
        </div>
        <button className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-4 py-2 rounded-lg transition-colors">
            <Download size={18} /> Export Report
        </button>
      </header>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* CHANGED: Using Ghana Cedis (₵) */}
        <KPICard title="Total Revenue" value="₵54,230" change="12%" isPositive={true} icon={DollarSign} />
        <KPICard title="Site Visits" value="120,500" change="5%" isPositive={false} icon={Users} />
        <KPICard title="Bounce Rate" value="42.3%" change="2.1%" isPositive={true} icon={MousePointer} />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        {/* 1. Bar Chart (Revenue) */}
        <div className="bg-glass backdrop-blur-md border border-white/10 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-6 text-gray-300">Revenue Trends</h3>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                        <Tooltip 
                            cursor={{fill: 'rgba(255,255,255,0.05)'}}
                            contentStyle={{ backgroundColor: '#1e293b', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
                            // ADDED: Formatting for Cedis in Tooltip
                            formatter={(value) => [`₵${value.toLocaleString()}`, 'Revenue']}
                        />
                        <Bar dataKey="value" fill="#00f3ff" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* 2. Radar Chart (Store Health) */}
        <div className="bg-glass backdrop-blur-md border border-white/10 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2 text-gray-300">System Health (Radar)</h3>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performanceData}>
                        <PolarGrid stroke="rgba(255,255,255,0.1)" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                        <Radar
                            name="Performance"
                            dataKey="A"
                            stroke="#ec4899"
                            strokeWidth={3}
                            fill="#ec4899"
                            fillOpacity={0.3}
                        />
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }} />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
        {/* 3. Donut Chart (Traffic Sources) */}
        <div className="bg-glass backdrop-blur-md border border-white/10 p-6 rounded-xl lg:col-span-1">
            <h3 className="text-xl font-semibold mb-4 text-gray-300">Traffic Sources</h3>
            <div className="h-[250px] relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={sourceData}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {sourceData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }} />
                    </PieChart>
                </ResponsiveContainer>
                {/* Center Text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                        <span className="text-2xl font-bold text-white">4.2k</span>
                        <p className="text-xs text-gray-400">Visits</p>
                    </div>
                </div>
            </div>
            {/* Legend */}
            <div className="flex justify-center gap-4 mt-4 flex-wrap">
                {sourceData.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs text-gray-400">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                        {entry.name}
                    </div>
                ))}
            </div>
        </div>

        {/* 4. Progress Bars (Top Categories) */}
        <div className="bg-glass backdrop-blur-md border border-white/10 p-6 rounded-xl lg:col-span-2">
            <h3 className="text-xl font-semibold mb-6 text-gray-300">Top Performing Categories</h3>
            <div className="space-y-6">
                {[
                    { label: 'Electronics', percent: 85, color: 'bg-cyan-400' },
                    { label: 'Cyberware', percent: 65, color: 'bg-purple-500' },
                    { label: 'Software', percent: 45, color: 'bg-pink-500' },
                    { label: 'Accessories', percent: 30, color: 'bg-green-400' },
                ].map((item, idx) => (
                    <div key={idx}>
                        <div className="flex justify-between mb-2 text-sm">
                            <span className="text-white">{item.label}</span>
                            <span className="text-gray-400">{item.percent}%</span>
                        </div>
                        <div className="w-full bg-white/5 rounded-full h-2">
                            <div 
                                className={`h-2 rounded-full ${item.color} shadow-[0_0_10px_currentColor] transition-all duration-1000`} 
                                style={{ width: `${item.percent}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
}