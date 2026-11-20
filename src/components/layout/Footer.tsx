'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ConsultationModal from '@/components/common/ConsultationModal';

export default function Footer() {
  const pathname = usePathname();
  const [isConsultOpen, setIsConsultOpen] = useState(false);

  return (
    <>
      <footer className="bg-[#faf6ee] border-t border-[#ecd9c6] text-[#53433c] text-xs pb-20 md:pb-0 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Brand Column (6 cols) */}
            <div className="md:col-span-5 space-y-3">
              <Link href="/" className="inline-flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-xl bg-white border border-[#ecd9c6] flex items-center justify-center text-[#7a3e1e] shadow-2xs">
                  <svg
                    className="w-4 h-4 text-[#7a3e1e]"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    viewBox="0 0 48 48"
                  >
                    <path d="M6 22L24 8L42 22V40H6V22Z"></path>
                    <path d="M24 16V22"></path>
                    <path d="M21 19H27"></path>
                    <path d="M19 40V27H29V40"></path>
                  </svg>
                </div>
                <div className="flex items-center">
                  <span className="font-serif font-bold text-lg text-[#4a240c]">
                    PragyaaProp.com
                  </span>
                  <span className="text-[10px] font-bold text-[#4a240c] align-super ml-0.5">®</span>
                </div>
              </Link>

              <p className="text-xs text-[#53433c] leading-relaxed max-w-sm">
                PragyaaProp helps people explore residential properties with a Vastu-informed perspective, bringing project-level discovery and flat-level information into one simple experience.
              </p>

              <div className="text-[11px] text-[#86736b]">
                Structured exploration across City &rarr; Location &rarr; Project &rarr; Wing &rarr; Flat.
              </div>
            </div>

            {/* Quick Links Column (3 cols) */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="font-serif font-bold text-sm text-[#4a240c] uppercase tracking-wider text-[11px]">
                Platform Navigation
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/" className="hover:text-[#7a3e1e] transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/properties" className="hover:text-[#7a3e1e] font-semibold text-[#7a3e1e] transition-colors">
                    Explore Properties
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-[#7a3e1e] transition-colors">
                    About Us &amp; Vastu Education
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="hover:text-[#7a3e1e] transition-colors">
                    Admin Inventory Portal
                  </Link>
                </li>
              </ul>
            </div>

            {/* Consultation Enquiry Column (4 cols) */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="font-serif font-bold text-sm text-[#4a240c] uppercase tracking-wider text-[11px]">
                Advisory Enquiry
              </h4>
              <p className="text-xs text-[#53433c] leading-relaxed">
                Have questions about a property layout or floorplan series? Submit an enquiry to connect with a consultant.
              </p>
              <div>
                <button
                  type="button"
                  onClick={() => setIsConsultOpen(true)}
                  className="bg-[#7a3e1e] hover:bg-[#5d2809] text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-2xs inline-flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <span className="material-symbols-outlined text-sm">support_agent</span>
                  <span>Request Vastu Consultation</span>
                </button>
              </div>
            </div>
          </div>

          {/* Legal Disclaimer & Bottom Strip */}
          <div className="pt-6 border-t border-[#ecd9c6] space-y-3 text-[#86736b]">
            {/* Required Disclaimer */}
            <div className="p-3.5 rounded-2xl bg-white border border-[#eedecb] text-[11px] leading-relaxed">
              <strong className="text-[#4a240c]">Disclaimer:</strong> Vastu information presented on PragyaaProp is provided for informational and cultural exploration purposes. It should not be treated as a guarantee of property suitability, structural perfection, investment performance, or any specific life outcome.
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] pt-1">
              <div>
                &copy; {new Date().getFullYear()} PragyaaProp.com&reg;. All rights reserved.
              </div>
              <div className="flex items-center gap-4">
                <Link href="/about" className="hover:text-[#4a240c] transition-colors">
                  Methodology
                </Link>
                <span>&bull;</span>
                <Link href="/properties" className="hover:text-[#4a240c] transition-colors">
                  Discovery Flow
                </Link>
                <span>&bull;</span>
                <Link href="/admin" className="hover:text-[#4a240c] transition-colors">
                  Admin Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* MOBILE BOTTOM NAVIGATION BAR (Sticky Touch-Friendly) */}
      <nav className="fixed bottom-0 left-0 w-full z-40 flex md:hidden justify-around items-center px-2 py-2 bg-[#fcfaf6]/95 backdrop-blur-md border-t border-[#ecd9c6] shadow-lg">
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-all ${
            pathname === '/'
              ? 'text-[#4a240c] font-bold bg-[#faf6ee]'
              : 'text-[#86736b] hover:text-[#4a240c]'
          }`}
        >
          <span className="material-symbols-outlined text-xl">home</span>
          <span className="text-[10px] mt-0.5">Home</span>
        </Link>

        {/* Explore (Primary) */}
        <Link
          href="/properties"
          className={`flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-all ${
            pathname.startsWith('/properties')
              ? 'text-white bg-[#7a3e1e] font-bold shadow-2xs'
              : 'text-[#7a3e1e] bg-[#ffdea7]/30 font-semibold'
          }`}
        >
          <span className="material-symbols-outlined text-xl">explore</span>
          <span className="text-[10px] mt-0.5">Explore</span>
        </Link>

        {/* About */}
        <Link
          href="/about"
          className={`flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-all ${
            pathname === '/about'
              ? 'text-[#4a240c] font-bold bg-[#faf6ee]'
              : 'text-[#86736b] hover:text-[#4a240c]'
          }`}
        >
          <span className="material-symbols-outlined text-xl">info</span>
          <span className="text-[10px] mt-0.5">About</span>
        </Link>

        {/* Consult */}
        <button
          type="button"
          onClick={() => setIsConsultOpen(true)}
          className="flex flex-col items-center justify-center text-[#86736b] hover:text-[#4a240c] px-3 py-1 cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl text-[#7a3e1e]">support_agent</span>
          <span className="text-[10px] mt-0.5">Consult</span>
        </button>

        {/* Admin */}
        <Link
          href="/admin"
          className={`flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-all ${
            pathname.startsWith('/admin')
              ? 'text-[#4a240c] font-bold bg-[#faf6ee]'
              : 'text-[#86736b] hover:text-[#4a240c]'
          }`}
        >
          <span className="material-symbols-outlined text-xl">admin_panel_settings</span>
          <span className="text-[10px] mt-0.5">Admin</span>
        </Link>
      </nav>

      {/* Reusable Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultOpen}
        onClose={() => setIsConsultOpen(false)}
      />
    </>
  );
}
