'use client';

import React, { useState } from 'react';
import { useToast } from '@/context/ToastContext';

interface SiteVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle: string;
}

export default function SiteVisitModal({ isOpen, onClose, propertyTitle }: SiteVisitModalProps) {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('Morning (10 AM - 1 PM)');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Site visit scheduled for ${propertyTitle}! Our astrologer advisor will call you.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-3xl border border-[#eedecb] shadow-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#eae8e4] hover:bg-[#e4e2de] flex items-center justify-center text-[#53433c] transition-colors"
          type="button"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        <div className="flex items-center gap-2 mb-3">
          <span className="w-8 h-8 rounded-lg bg-[#faebd7] text-[#743b19] flex items-center justify-center">
            <span className="material-symbols-outlined text-base">calendar_month</span>
          </span>
          <div>
            <h3 className="text-base font-bold font-serif text-[#47220e]">Schedule a Site Visit</h3>
            <p className="text-[11px] text-stone-500">{propertyTitle}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 pt-2 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-stone-700 mb-1">Your Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ramesh Verma"
              className="w-full bg-[#fdfbf7] border border-[#eedecb] rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#743b19] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-stone-700 mb-1">Phone Number (+91)</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full bg-[#fdfbf7] border border-[#eedecb] rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#743b19] focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-stone-700 mb-1">Preferred Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#fdfbf7] border border-[#eedecb] rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#743b19] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-stone-700 mb-1">Auspicious Time Slot</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full bg-[#fdfbf7] border border-[#eedecb] rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#743b19] focus:outline-none cursor-pointer"
              >
                <option>Morning (10 AM - 1 PM)</option>
                <option>Afternoon (1 PM - 4 PM)</option>
                <option>Evening (4 PM - 7 PM)</option>
              </select>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-[#fdf9f1] border border-[#eedab8] text-[10.5px] text-[#865910] flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">spa</span>
            <span>Accompanied by certified spatial energy advisor on-site.</span>
          </div>
          <button
            type="submit"
            className="w-full bg-[#743b19] hover:bg-[#5e2e12] text-white py-2.5 rounded-xl font-bold text-xs shadow-sm transition active:scale-95 cursor-pointer mt-2"
          >
            Confirm Site Visit
          </button>
        </form>
      </div>
    </div>
  );
}
