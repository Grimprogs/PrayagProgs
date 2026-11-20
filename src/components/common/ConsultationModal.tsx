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
  const [expert, setExpert] = useState(preferredExpert || 'Vedic Spatial Planning Advisor');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [mode, setMode] = useState('Video Consultation');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Consultation enquiry submitted for ${expert}! (Demonstration Mode)`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-3xl border border-[#eedecb] shadow-2xl max-w-md w-full p-6 relative animate-in fade-in duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#eae8e4] hover:bg-[#e4e2de] flex items-center justify-center text-[#53433c] transition-colors cursor-pointer"
          type="button"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        <div className="flex items-center gap-2 mb-3">
          <span className="w-8 h-8 rounded-lg bg-[#faebd7] text-[#743b19] flex items-center justify-center">
            <span className="material-symbols-outlined text-base">support_agent</span>
          </span>
          <div>
            <h3 className="text-base font-bold font-serif text-[#47220e]">Request a Vastu Consultation</h3>
            <p className="text-[11px] text-[#86736b]">Personalized guidance for property floorplan evaluation</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 pt-2 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-stone-700 mb-1">Select Consultation Focus</label>
            <select
              value={expert}
              onChange={(e) => setExpert(e.target.value)}
              className="w-full bg-[#fdfbf7] border border-[#eedecb] rounded-xl px-3 py-2 text-xs text-[#4a240c] font-medium focus:ring-1 focus:ring-[#743b19] focus:outline-hidden cursor-pointer"
            >
              <option value="Vedic Spatial Planning Advisor">Vedic Spatial Planning Advisor</option>
              <option value="Architectural Orientation Consultant">Architectural Orientation Consultant</option>
              <option value="Residential Layout & Daylight Specialist">Residential Layout &amp; Daylight Specialist</option>
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
              className="w-full bg-[#fdfbf7] border border-[#eedecb] rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#743b19] focus:outline-hidden"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-stone-700 mb-1">Contact Phone</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 98200 12345"
              className="w-full bg-[#fdfbf7] border border-[#eedecb] rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#743b19] focus:outline-hidden"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-stone-700 mb-1">Consultation Mode</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMode('Video Consultation')}
                className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
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
                className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                  mode === 'On-Site Assessment'
                    ? 'border-[#743b19] bg-[#faebd7] text-[#743b19] font-bold'
                    : 'border-[#eedecb] bg-white text-stone-600'
                }`}
              >
                🏛️ On-Site Review
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#7a3e1e] hover:bg-[#5d2809] text-white py-2.5 rounded-xl font-bold text-xs shadow-2xs transition active:scale-95 cursor-pointer mt-2"
          >
            Submit Consultation Enquiry
          </button>
          <p className="text-[10px] text-[#86736b] text-center pt-1 italic">
            Demonstration Notice: Submitting this form simulates the consultation booking flow for evaluation purposes.
          </p>
        </form>
      </div>
    </div>
  );
}
