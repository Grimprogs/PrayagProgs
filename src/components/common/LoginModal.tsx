'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/context/ToastContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (role: 'customer' | 'admin', name: string) => void;
}

export default function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [role, setRole] = useState<'customer' | 'admin'>('customer');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userRole = role === 'admin' ? 'Admin' : 'Customer';
    showToast(`Signed in successfully as ${userRole}! Welcome to PragyaaProp.`);
    if (onSuccess) {
      onSuccess(role, identifier || (role === 'admin' ? 'Administrator' : 'Auspicious Buyer'));
    }
    onClose();
    if (role === 'admin') {
      router.push('/admin');
    }
  };

  const handleQuickDemoAdminLogin = () => {
    setRole('admin');
    setIdentifier('admin@pragyaaprop.com');
    setPassword('admin123');
    showToast('Authenticated as PragyaaProp Super Administrator!');
    if (onSuccess) {
      onSuccess('admin', 'Super Administrator');
    }
    onClose();
    router.push('/admin');
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 bg-[#30312e]/60 backdrop-blur-xs transition-opacity duration-200"
      style={{ zIndex: 99999 }}
    >
      <div className="bg-gradient-to-b from-[#fbf8f3] via-[#f7f0e6] to-[#f4ebe0] rounded-3xl border border-[#d8c2b9] shadow-2xl max-w-lg w-full p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#eae8e4] hover:bg-[#e4e2de] flex items-center justify-center text-[#53433c] transition-colors cursor-pointer"
          type="button"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#fdcd75]/40 text-[#5d2809] flex items-center justify-center mx-auto mb-2 shadow-xs">
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="#7a3e1e"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              viewBox="0 0 48 48"
            >
              <path d="M6 22L24 8L42 22V40H6V22Z"></path>
              <path d="M24 16V22"></path>
              <path d="M19 40V27H29V40"></path>
            </svg>
          </div>
          <span className="text-sm font-bold text-[#5d2809] block font-sans">PragyaaProp.com</span>
          <h3 className="text-2xl font-bold font-serif text-[#5d2809]">Welcome Back</h3>
          <p className="text-xs text-[#53433c]">Choose how you want to log in</p>
        </div>

        {/* Login Option Cards matching Stitch IMAGE_22 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          {/* Customer Login Card */}
          <button
            type="button"
            onClick={() => setRole('customer')}
            className={`border rounded-2xl p-4 text-left transition-all group flex flex-col justify-between shadow-xs hover:shadow-md cursor-pointer ${
              role === 'customer'
                ? 'bg-white border-[#5d2809] ring-2 ring-[#7a3e1e]/20'
                : 'bg-white/70 border-[#d8c2b9] hover:border-[#5d2809]'
            }`}
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#faeee2] text-[#7a3e1e] flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-xl">group</span>
              </div>
              <h4 className="text-sm font-bold text-[#5d2809]">Customer Login</h4>
              <p className="text-[11px] text-[#53433c] mt-1 leading-snug">
                Search, unlock reports, book consultations
              </p>
            </div>
            <div className="mt-4 flex items-center justify-end text-[#5d2809] group-hover:translate-x-1 transition-transform">
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </div>
          </button>

          {/* Admin Login Card */}
          <button
            type="button"
            onClick={() => setRole('admin')}
            className={`border rounded-2xl p-4 text-left transition-all group flex flex-col justify-between shadow-xs hover:shadow-md cursor-pointer ${
              role === 'admin'
                ? 'bg-white border-[#5d2809] ring-2 ring-[#7a3e1e]/20'
                : 'bg-white/70 border-[#d8c2b9] hover:border-[#5d2809]'
            }`}
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#faeee2] text-[#7a3e1e] flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-xl">settings</span>
              </div>
              <h4 className="text-sm font-bold text-[#5d2809]">Admin Login</h4>
              <p className="text-[11px] text-[#53433c] mt-1 leading-snug">
                Manage properties, reports, bookings & users
              </p>
            </div>
            <div className="mt-4 flex items-center justify-end text-[#5d2809] group-hover:translate-x-1 transition-transform">
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </div>
          </button>
        </div>

        {/* Quick form */}
        <form onSubmit={handleSubmit} className="space-y-3 pt-2 border-t border-[#eedfc9]">
          {role === 'admin' && (
            <div className="bg-[#fff9ee] border border-[#f0d4a0] rounded-xl p-3 text-left space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#5d2809] flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">vpn_key</span>
                  Demo Admin Credentials
                </span>
                <span className="text-[10px] bg-[#fdcd75] text-[#5d2809] px-2 py-0.5 rounded-full font-bold">
                  Preset Ready
                </span>
              </div>
              <div className="text-[11px] text-[#7a3e1e] font-mono bg-white/80 p-1.5 rounded border border-[#f5e3c3] flex justify-between">
                <span>admin@pragyaaprop.com</span>
                <span>admin123</span>
              </div>
              <button
                type="button"
                onClick={handleQuickDemoAdminLogin}
                className="w-full bg-[#fdcd75] hover:bg-[#ffdea7] text-[#5d2809] py-1.5 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer active:scale-95"
              >
                <span>⚡ 1-Click Demo Admin Login & Enter Portal</span>
              </button>
            </div>
          )}

          <div className="text-xs font-semibold text-[#5d2809]">
            {role === 'customer' ? 'Sign in as Customer:' : 'Or sign in manually:'}
          </div>
          <div>
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder={role === 'customer' ? 'Email or Mobile (+91)' : 'Admin ID or Email (admin@pragyaaprop.com)'}
              className="w-full bg-white border border-[#d8c2b9] rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#5d2809] focus:outline-none placeholder:text-[#86736b]"
            />
          </div>
          <div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password (e.g. admin123)"
              className="w-full bg-white border border-[#d8c2b9] rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#5d2809] focus:outline-none placeholder:text-[#86736b]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#5d2809] hover:bg-[#7a3e1e] text-white py-2.5 rounded-lg text-sm font-bold shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            {role === 'admin' ? 'Enter Admin Dashboard →' : 'Sign In Securely'}
          </button>
        </form>
      </div>
    </div>
  );
}
