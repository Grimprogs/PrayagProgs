'use client';

import React, { useState } from 'react';
import { useToast } from '@/context/ToastContext';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferredExpert?: string;
}

export default function ConsultationModal({ isOpen, onClose, preferredExpert }: ConsultationModalProps) {
  const { showToast } = useToast();
  const [expert, setExpert] = useState(preferredExpert || 'Pt. Vidyadhar Shastri (Senior Acharya)');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [mode, setMode] = useState('Video Consultation');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Consultation booked with ${expert}! Our scheduling desk will confirm your slot via WhatsApp.`);
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
            <span className="material-symbols-outlined text-base">psychology</span>
          </span>
          <div>
            <h3 className="text-base font-bold font-serif text-[#47220e]">Consult a Vedic Vastu Expert</h3>
            <p className="text-[11px] text-stone-500">1-on-1 personalized floorplan alignment</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 pt-2 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-stone-700 mb-1">Select Vastu Mentor / Astrologer</label>
            <select
              value={expert}
              onChange={(e) => setExpert(e.target.value)}
              className="w-full bg-[#fdfbf7] border border-[#eedecb] rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#743b19] focus:outline-none cursor-pointer"
            >
              <option>Pt. Vidyadhar Shastri (Head of Vedic Astro-Architecture, 34+ Yrs Exp)</option>
              <option>Ar. Radhika Deshmukh (Chief Architectural Principal, CEPT/IIT)</option>
              <option>Dr. K. Ananthaswamy (Head of Energy Auditing & Geobiology)</option>
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-stone-700 mb-1">Your Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Anand Murthy"
              className="w-full bg-[#fdfbf7] border border-[#eedecb] rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#743b19] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-stone-700 mb-1">Mobile (+91)</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98200 12345"
              className="w-full bg-[#fdfbf7] border border-[#eedecb] rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#743b19] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-stone-700 mb-1">Consultation Mode</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMode('Video Consultation')}
                className={`p-2 rounded-xl border text-center transition-all ${
                  mode === 'Video Consultation'
                    ? 'border-[#743b19] bg-[#faebd7] text-[#743b19] font-bold'
                    : 'border-[#eedecb] bg-white text-stone-600'
                }`}
              >
                📹 Video Call (45m)
              </button>
              <button
                type="button"
                onClick={() => setMode('On-Site Assessment')}
                className={`p-2 rounded-xl border text-center transition-all ${
                  mode === 'On-Site Assessment'
                    ? 'border-[#743b19] bg-[#faebd7] text-[#743b19] font-bold'
                    : 'border-[#eedecb] bg-white text-stone-600'
                }`}
              >
                🏛️ On-Site Visit
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#743b19] hover:bg-[#5e2e12] text-white py-2.5 rounded-xl font-bold text-xs shadow-sm transition active:scale-95 cursor-pointer mt-2"
          >
            Confirm Consultation Request
          </button>
        </form>
      </div>
    </div>
  );
}
