'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LoginModal from '@/components/common/LoginModal';
import ConsultationModal from '@/components/common/ConsultationModal';
import VastuAuditModal from '@/components/common/VastuAuditModal';
import { useToast } from '@/context/ToastContext';

export default function Footer() {
  const pathname = usePathname();
  const { showToast } = useToast();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const [isVastuModalOpen, setIsVastuModalOpen] = useState(false);

  return (
    <>
      <footer className="bg-[#f5f3ef] border-t border-[#d8c2b9]/50 pb-20 md:pb-0 mt-auto">
        <div className="max-w-7xl xl:max-w-screen-2xl 2xl:max-w-[1720px] mx-auto px-6 sm:px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-6 w-full">
          <div className="text-center md:text-left space-y-1">
            <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold text-headline-sm">
              <span className="material-symbols-outlined fill text-2xl text-[#7a3e1e]">temple_hindu</span>
              <span className="font-serif text-xl sm:text-2xl text-[#4a240c]">PragyaaProp.com</span>
            </Link>
            <p className="text-body-sm text-[#53433c]">
              © 2025 PragyaaProp.com. All rights reserved. Vastu-Certified Indian Real Estate.
            </p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-label-md">
            <Link href="/properties" className="text-[#53433c] hover:text-[#5d2809] transition-colors hover:underline">
              Explore Properties
            </Link>
            <button
              type="button"
              onClick={() => setIsVastuModalOpen(true)}
              className="text-[#53433c] hover:text-[#5d2809] transition-colors hover:underline cursor-pointer"
            >
              Vastu Audits
            </button>
            <button
              onClick={() => setIsConsultOpen(true)}
              className="text-[#53433c] hover:text-[#5d2809] transition-colors hover:underline cursor-pointer"
            >
              Consult Panditji
            </button>
            <Link href="/about" className="text-[#53433c] hover:text-[#5d2809] transition-colors hover:underline">
              About Us
            </Link>
            <button
              onClick={() => showToast('All listed properties are 100% verified against state RERA databases.')}
              className="text-[#53433c] hover:text-[#5d2809] transition-colors hover:underline cursor-pointer"
            >
              RERA Verification
            </button>
            <button
              onClick={() => setIsLoginOpen(true)}
              className="text-[#53433c] hover:text-[#5d2809] transition-colors hover:underline cursor-pointer font-bold"
            >
              Admin Portal
            </button>
          </div>
        </div>
      </footer>

      {/* MOBILE BOTTOM NAVIGATION BAR matching Stitch */}
      <nav className="fixed bottom-0 left-0 w-full z-40 flex md:hidden justify-around items-center px-4 py-2 bg-[#fbf9f5]/95 backdrop-blur-md border-t border-[#d8c2b9]/40 shadow-lg">
        <Link
          href="/properties"
          className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-xl transition-all ${
            pathname.startsWith('/properties')
              ? 'text-[#5d2809] bg-[#fdcd75]/30 font-bold'
              : 'text-[#53433c] hover:text-[#5d2809]'
          }`}
        >
          <span className="material-symbols-outlined text-xl">real_estate_agent</span>
          <span className="text-[10px] font-bold mt-0.5">Explore</span>
        </Link>

        <button
          type="button"
          onClick={() => setIsVastuModalOpen(true)}
          className="flex flex-col items-center justify-center text-[#53433c] px-3 py-1.5 hover:text-[#5d2809] cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">explore</span>
          <span className="text-[10px] font-medium mt-0.5">Audit</span>
        </button>

        <button
          onClick={() => setIsConsultOpen(true)}
          className="flex flex-col items-center justify-center text-[#53433c] px-3 py-1.5 hover:text-[#5d2809]"
        >
          <span className="material-symbols-outlined text-xl">psychology</span>
          <span className="text-[10px] font-medium mt-0.5">Consult</span>
        </button>

        <button
          onClick={() => showToast('1 property saved to your Auspicious Shortlist (Sunrise Residency)')}
          className="flex flex-col items-center justify-center text-[#53433c] px-3 py-1.5 hover:text-[#5d2809]"
        >
          <span className="material-symbols-outlined text-xl">favorite</span>
          <span className="text-[10px] font-medium mt-0.5">Saved</span>
        </button>

        <Link
          href="/about"
          className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-xl transition-all ${
            pathname === '/about'
              ? 'text-[#5d2809] bg-[#fdcd75]/30 font-bold'
              : 'text-[#53433c] hover:text-[#5d2809]'
          }`}
        >
          <span className="material-symbols-outlined text-xl">spa</span>
          <span className="text-[10px] font-medium mt-0.5">About</span>
        </Link>
      </nav>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <ConsultationModal isOpen={isConsultOpen} onClose={() => setIsConsultOpen(false)} />
      <VastuAuditModal isOpen={isVastuModalOpen} onClose={() => setIsVastuModalOpen(false)} />
    </>
  );
}
