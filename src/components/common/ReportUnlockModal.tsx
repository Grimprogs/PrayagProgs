'use client';

import React, { useState } from 'react';
import { useToast } from '@/context/ToastContext';
import { useCredits } from '@/context/CreditsContext';

interface ReportUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle: string;
  propertySlug?: string;
  onUnlocked?: () => void;
}

export default function ReportUnlockModal({
  isOpen,
  onClose,
  propertyTitle,
  propertySlug = 'sunrise-residency',
  onUnlocked,
}: ReportUnlockModalProps) {
  const { showToast } = useToast();
  const { credits, deductCredit, addCredits } = useCredits();
  const [option, setOption] = useState<'credit' | 'single' | 'pass'>('credit');

  if (!isOpen) return null;

  const handleAction = () => {
    if (option === 'credit') {
      if (credits < 1) {
        showToast('You have 0 credits! Click +5 Demo below to top up.');
        return;
      }
      const success = deductCredit(propertySlug, propertyTitle);
      if (success) {
        onClose();
        if (onUnlocked) onUnlocked();
      }
    } else if (option === 'single') {
      showToast(`Payment successful (₹ 499)! "${propertyTitle}" 16-Zone PDF Report unlocked.`);
      deductCredit(propertySlug, propertyTitle);
      onClose();
      if (onUnlocked) onUnlocked();
    } else if (option === 'pass') {
      addCredits(10, 'Buyer Pass Purchase (10 Credits)');
      showToast('10 Credits added to your account! You can now unlock any report.');
      setOption('credit');
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs">
      <div className="bg-[#fcfaf6] rounded-3xl border border-[#ecdac2] shadow-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#eae8e4] hover:bg-[#e4e2de] flex items-center justify-center text-[#53433c] transition-colors cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#f0dfc8] text-[#733718] flex items-center justify-center text-lg font-bold shrink-0">
            <i className="fa-solid fa-file-pdf"></i>
          </div>
          <div>
            <h3 className="text-base font-bold font-serif text-stone-900">
              Unlock Certified Vastu PDF Report
            </h3>
            <p className="text-xs text-stone-600 mt-0.5">{propertyTitle}</p>
          </div>
        </div>

        {/* Credits Balance Banner */}
        <div className="mb-4 p-3 bg-[#fdf5eb] rounded-2xl border border-[#eedcc8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">🪙</span>
            <div>
              <div className="text-xs font-bold text-[#5d2809]">
                Your Balance: {credits} {credits === 1 ? 'Credit' : 'Credits'}
              </div>
              <div className="text-[10px] text-stone-500">
                1 credit = 1 complete 16-zone report
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => addCredits(5, 'Quick Demo Top-up')}
            className="text-[11px] font-bold text-[#733718] hover:text-[#5c2b12] bg-white px-2.5 py-1 rounded-lg border border-[#eedcc8] shadow-2xs hover:shadow-xs transition cursor-pointer"
          >
            +5 Demo
          </button>
        </div>

        {/* Radio options */}
        <div className="space-y-2 mb-4 text-xs">
          {/* OPTION 1: Use 1 Credit */}
          <label
            onClick={() => setOption('credit')}
            className={`flex items-center justify-between p-3 rounded-2xl border-2 cursor-pointer transition ${
              option === 'credit'
                ? 'border-[#733718] bg-white shadow-xs'
                : 'border-[#eedecb] bg-white/70 hover:bg-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <input
                type="radio"
                name="report_plan"
                checked={option === 'credit'}
                onChange={() => setOption('credit')}
                className="text-[#733718] focus:ring-[#733718] h-4 w-4"
              />
              <div>
                <div className="font-bold text-stone-900 flex items-center gap-1.5">
                  <span>Use 1 Credit</span>
                  {credits > 0 ? (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                      Available ({credits})
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                      0 Available
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-stone-500">
                  Instant unlock using your demo credits
                </div>
              </div>
            </div>
            <div className="text-sm font-bold font-serif text-[#733718]">1 Credit</div>
          </label>

          {/* OPTION 2: Single Pay ₹ 499 */}
          <label
            onClick={() => setOption('single')}
            className={`flex items-center justify-between p-3 rounded-2xl border-2 cursor-pointer transition ${
              option === 'single'
                ? 'border-[#733718] bg-white shadow-xs'
                : 'border-[#eedecb] bg-white/70 hover:bg-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <input
                type="radio"
                name="report_plan"
                checked={option === 'single'}
                onChange={() => setOption('single')}
                className="text-[#733718] focus:ring-[#733718] h-4 w-4"
              />
              <div>
                <div className="font-bold text-stone-900">Direct Purchase</div>
                <div className="text-[10px] text-stone-500">Pay once via UPI, Cards, NetBanking</div>
              </div>
            </div>
            <div className="text-sm font-bold font-serif text-[#733718]">₹ 499</div>
          </label>

          {/* OPTION 3: Buyer Pass 10 Credits */}
          <label
            onClick={() => setOption('pass')}
            className={`flex items-center justify-between p-3 rounded-2xl border-2 cursor-pointer transition ${
              option === 'pass'
                ? 'border-[#733718] bg-white shadow-xs'
                : 'border-[#eedecb] bg-white/70 hover:bg-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <input
                type="radio"
                name="report_plan"
                checked={option === 'pass'}
                onChange={() => setOption('pass')}
                className="text-[#733718] focus:ring-[#733718] h-4 w-4"
              />
              <div>
                <div className="font-bold text-stone-900">Buyer Pass (10 Credits)</div>
                <div className="text-[10px] text-stone-500">Unlock 10 property reports & save 10%</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold font-serif text-stone-900">₹ 4,499</div>
              <span className="inline-block bg-[#f8e5b8] text-[#865910] text-[9px] font-bold px-1.5 py-0.5 rounded">
                +10 Credits
              </span>
            </div>
          </label>
        </div>

        {/* Report features list */}
        <div className="p-3 bg-white rounded-xl border border-[#eedecb] mb-4 text-[11px] text-stone-600 space-y-1.5">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-check text-emerald-600 text-xs"></i>
            <span>Complete 16-Zone spatial diagram & compass overlay</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-check text-emerald-600 text-xs"></i>
            <span>Brahmasthan centroid & directional energy grades</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-check text-emerald-600 text-xs"></i>
            <span>Detailed non-invasive remedies & zero-demolition fixes</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-check text-emerald-600 text-xs"></i>
            <span>Official digital certificate from Vedic Council</span>
          </div>
        </div>

        {/* Main CTA */}
        <button
          onClick={handleAction}
          type="button"
          className="w-full bg-[#733718] hover:bg-[#5c2b12] text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition active:scale-95 cursor-pointer"
        >
          {option === 'credit' ? (
            <>
              <span>🪙</span>
              <span>
                {credits >= 1 ? 'Unlock with 1 Credit & Open Diagram' : 'Get Credits to Unlock'}
              </span>
            </>
          ) : option === 'single' ? (
            <>
              <i className="fa-solid fa-lock text-xs"></i>
              <span>Pay ₹ 499 & Open Diagram</span>
            </>
          ) : (
            <>
              <i className="fa-solid fa-credit-card text-xs"></i>
              <span>Purchase 10 Credits (₹ 4,499)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
