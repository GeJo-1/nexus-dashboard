import React, { useState } from 'react'; // Removed useEffect since we don't need it anymore
import { User, Bell, Lock, Save, Trash2, CheckCircle, AlertTriangle, X, Loader2 } from 'lucide-react';

// --- REUSABLE CONFIRMATION MODAL ---
const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, type = 'danger' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#1e293b] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
        {/* Glow Effect */}
        <div className={`absolute top-0 left-0 w-full h-1 ${type === 'danger' ? 'bg-red-500' : 'bg-neon'}`}></div>
        
        {/* Close Button */}
        <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/5"
        >
            <X size={20} />
        </button>

        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 rounded-full ${type === 'danger' ? 'bg-red-500/20 text-red-500' : 'bg-neon/20 text-neon'}`}>
              {type === 'danger' ? <AlertTriangle size={24} /> : <CheckCircle size={24} />}
            </div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>
          
          <p className="text-gray-400 mb-8 leading-relaxed">
            {message}
          </p>

          <div className="flex justify-end gap-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm}
              className={`px-6 py-2 rounded-lg font-bold text-white transition-all shadow-lg ${
                type === 'danger' 
                  ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' 
                  : 'bg-neon text-black hover:bg-cyan-400 shadow-neon/20'
              }`}
            >
              {type === 'danger' ? 'Yes, Delete It' : 'Confirm Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SECTION COMPONENT ---
const Section = ({ icon, title, children }) => {
  const LucideIcon = icon; // Assign to variable to fix "unused" warning

  return (
    <div className="bg-glass backdrop-blur-md border border-white/10 rounded-xl p-6 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-neon/10 rounded-lg">
          <LucideIcon className="text-neon" size={24} />
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      {children}
    </div>
  );
};

// --- TOGGLE COMPONENT ---
const Toggle = ({ label, enabled, onChange }) => (
  <div className="flex items-center justify-between py-3 group">
    <span className="text-gray-300 group-hover:text-white transition-colors">{label}</span>
    <button 
      onClick={onChange}
      className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-neon/50 ${enabled ? 'bg-neon' : 'bg-gray-700'}`}
    >
      <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 shadow-sm ${enabled ? 'translate-x-6' : 'translate-x-0'}`} />
    </button>
  </div>
);

export default function SettingsPage() {
  
  // FIX: Lazy Initialization
  // We check localStorage INSIDE useState so it happens before the first render.
  
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('nexus_profile');
    return saved ? JSON.parse(saved) : { name: 'Admin User', email: 'admin@nexus.com' };
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('nexus_notifs');
    return saved ? JSON.parse(saved) : { email: true, push: false, sales: true };
  });
  
  // State for UI Feedback
  const [isLoading, setIsLoading] = useState(false);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'success', title: '', message: '', action: null });

  // --- HANDLERS ---

  // 1. Trigger Save Modal
  const handleSaveClick = () => {
    setModalConfig({
      isOpen: true,
      type: 'success',
      title: 'Save Changes?',
      message: 'Are you sure you want to update your profile and notification settings?',
      action: performSave 
    });
  };

  // 2. Perform the Actual Save
  const performSave = () => {
    setModalConfig({ ...modalConfig, isOpen: false }); 
    setIsLoading(true); 

    setTimeout(() => {
      localStorage.setItem('nexus_profile', JSON.stringify(profile));
      localStorage.setItem('nexus_notifs', JSON.stringify(notifications));
      setIsLoading(false);
    }, 1500);
  };

  // 3. Trigger Delete Modal
  const handleDeleteClick = () => {
    setModalConfig({
      isOpen: true,
      type: 'danger',
      title: 'Delete Account',
      message: 'This action will permanently remove your account and all associated data. This cannot be undone.',
      action: performDelete
    });
  };

  // 4. Perform Delete
  const performDelete = () => {
    setModalConfig({ ...modalConfig, isOpen: false });
    localStorage.clear();
    window.location.reload(); 
  };

  return (
    <div className="p-8 pb-20 max-w-4xl mx-auto relative">
      
      {/* Confirmation Modal */}
      <ConfirmationModal 
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
        onConfirm={modalConfig.action}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
      />

      <header className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold">Settings</h2>
          <p className="text-gray-400 text-sm mt-1">Manage your account preferences</p>
        </div>
        <button 
          onClick={handleSaveClick}
          disabled={isLoading}
          className="hidden md:flex items-center gap-2 bg-neon text-black font-bold px-6 py-2 rounded-lg hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(0,243,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </header>

      {/* 1. Profile Section */}
      <Section icon={User} title="My Profile">
        <div className="flex items-center gap-6 mb-6">
            <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-neon to-purple-500 shadow-[0_0_20px_rgba(0,243,255,0.3)] flex items-center justify-center text-2xl font-bold text-black border-2 border-white">
                {profile.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase()}
            </div>
            <div>
                <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-colors border border-white/10">
                    Change Avatar
                </button>
                <p className="text-xs text-gray-500 mt-2">Max file size: 5MB</p>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="text-sm text-gray-400">Display Name</label>
                <input 
                    type="text" 
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-neon transition-colors"
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm text-gray-400">Email Address</label>
                <input 
                    type="email" 
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-neon transition-colors"
                />
            </div>
        </div>
      </Section>

      {/* 2. Notifications Section */}
      <Section icon={Bell} title="Notifications">
        <div className="space-y-2 divide-y divide-white/5">
            <Toggle 
                label="Email Notifications" 
                enabled={notifications.email} 
                onChange={() => setNotifications({...notifications, email: !notifications.email})} 
            />
            <Toggle 
                label="Push Notifications" 
                enabled={notifications.push} 
                onChange={() => setNotifications({...notifications, push: !notifications.push})} 
            />
            <Toggle 
                label="New Sales Alerts" 
                enabled={notifications.sales} 
                onChange={() => setNotifications({...notifications, sales: !notifications.sales})} 
            />
        </div>
      </Section>

      {/* 3. Security Section */}
      <Section icon={Lock} title="Security">
        <div className="flex items-center justify-between py-4">
            <div>
                <p className="text-white font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
            </div>
            <button className="text-neon hover:text-cyan-300 font-medium text-sm transition-colors uppercase tracking-wider">
                Enable
            </button>
        </div>
        <div className="flex items-center justify-between py-4 border-t border-white/5">
            <div>
                <p className="text-white font-medium">Change Password</p>
                <p className="text-sm text-gray-400">Last changed: 3 months ago</p>
            </div>
            <button className="bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg text-sm hover:bg-white/10 transition-colors">
                Update
            </button>
        </div>
      </Section>

      {/* 4. Danger Zone */}
      <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-500/20 rounded-lg">
                <Trash2 className="text-red-500" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-red-500">Danger Zone</h3>
        </div>
        <p className="text-gray-400 text-sm mb-6 max-w-xl">
            Once you delete your account, there is no going back. Please be certain. All your local data will be wiped immediately.
        </p>
        <button 
          onClick={handleDeleteClick}
          className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 px-6 py-2 rounded-lg font-medium transition-colors w-full sm:w-auto flex items-center justify-center gap-2"
        >
            <Trash2 size={18} /> Delete Account
        </button>
      </div>

      {/* Mobile Save Button */}
      <div className="md:hidden fixed bottom-6 right-6 left-6 z-40">
        <button 
          onClick={handleSaveClick}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-neon text-black font-bold py-4 rounded-xl shadow-2xl shadow-neon/20 active:scale-95 transition-transform"
        >
          {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

    </div>
  );
}