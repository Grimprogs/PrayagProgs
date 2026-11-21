'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ConsultationModal from '@/components/common/ConsultationModal';
import LoginModal from '@/components/common/LoginModal';
import { useCredits } from '@/context/CreditsContext';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

export interface NavbarProps {
  showPanorama?: boolean;
  showSearchBar?: boolean;
  breadcrumbs?: BreadcrumbItem[];
  activeNav?: 'home' | 'explore' | 'about' | 'consult' | 'admin' | string;
}

export default function Navbar({
  breadcrumbs,
  activeNav,
}: NavbarProps) {
  const pathname = usePathname();
  const { credits, addCredits } = useCredits();

  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<{ role: string; name: string } | null>(null);

  // Determine current active navigation link
  const isHomeActive = activeNav === 'home' || pathname === '/';
  const isExploreActive = activeNav === 'explore' || pathname.startsWith('/properties');
  const isAboutActive = activeNav === 'about' || pathname === '/about';
  const isAdminActive = activeNav === 'admin' || pathname.startsWith('/admin');

  return (
    <>
      <header className="w-full sticky top-0 z-40 bg-[#fcfaf6]/95 backdrop-blur-md border-b border-[#ecd9c6] shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 flex items-center justify-between gap-4">
          {/* Logo Branding */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-[#faf2e6] border border-[#eedecb] flex items-center justify-center text-[#7a3e1e] group-hover:scale-105 transition-transform shadow-2xs">
              <svg
                className="w-5 h-5 text-[#7a3e1e]"
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
            <div>
              <div className="flex items-center">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-[#4a240c] font-serif">
                  PragyaaProp.com
                </span>
                <span className="text-[10px] font-bold text-[#4a240c] align-super ml-0.5">®</span>
              </div>
              <span className="block text-[10px] font-medium tracking-wide text-[#86736b] -mt-0.5 font-sans">
                Vastu-Informed Property Discovery
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm font-semibold text-[#53433c]">
            {/* Home */}
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                isHomeActive
                  ? 'text-[#4a240c] font-bold bg-[#faf6ee]'
                  : 'hover:text-[#4a240c] hover:bg-[#faf6ee]/70'
              }`}
            >
              Home
            </Link>

            {/* Explore Properties */}
            <Link
              href="/properties"
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                isExploreActive
                  ? 'bg-[#7a3e1e] text-white shadow-2xs'
                  : 'text-[#7a3e1e] bg-[#ffdea7]/30 hover:bg-[#ffdea7]/60'
              }`}
            >
              <span className="material-symbols-outlined text-base">explore</span>
              <span>Explore Properties</span>
            </Link>

            {/* About Us */}
            <Link
              href="/about"
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                isAboutActive
                  ? 'text-[#4a240c] font-bold bg-[#faf6ee]'
                  : 'hover:text-[#4a240c] hover:bg-[#faf6ee]/70'
              }`}
            >
              About Us
            </Link>

            {/* Request Consultation */}
            <button
              type="button"
              onClick={() => setIsConsultOpen(true)}
              className="px-3 py-1.5 rounded-lg text-[#53433c] hover:text-[#4a240c] hover:bg-[#faf6ee] transition-colors cursor-pointer flex items-center gap-1 font-semibold"
            >
              <span className="material-symbols-outlined text-base text-[#7a3e1e]">support_agent</span>
              <span>Request Consultation</span>
            </button>

            {/* Admin */}
            <Link
              href="/admin"
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                isAdminActive
                  ? 'bg-[#4a240c] text-white'
                  : 'bg-[#fff1dc] text-[#5d2809] hover:bg-[#ffdea7] border border-[#ecd2b4]'
              }`}
              title="Admin Inventory Management"
            >
              <span className="material-symbols-outlined text-xs">admin_panel_settings</span>
              <span>Admin</span>
            </Link>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Demo Credits Badge with Popover */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCreditsOpen(!isCreditsOpen)}
                className="bg-[#f5ede1] hover:bg-[#eedec8] border border-[#d8c3ad] text-[#5d2809] px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition shadow-2xs cursor-pointer active:scale-95"
                title="Click to view & add demo credits"
              >
                <span className="text-sm">🪙</span>
                <span>{credits}</span>
                <span className="hidden sm:inline">Credits</span>
                <span className="material-symbols-outlined text-xs">expand_more</span>
              </button>

              {isCreditsOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-64 bg-white border border-[#dfceba] rounded-2xl shadow-2xl p-3.5 space-y-2.5 animate-in fade-in zoom-in-95 duration-150"
                  style={{ zIndex: 100 }}
                >
                  <div className="flex items-center justify-between border-b border-[#f0e3d3] pb-2">
                    <span className="text-xs font-bold font-serif text-[#4a240c]">Vastu Report Credits</span>
                    <span className="text-[11px] font-bold bg-[#ffdea7] text-[#5d2809] px-2 py-0.5 rounded-full">
                      {credits} Available
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-tight">
                    1 credit unlocks 1 full certified 16-zone Vastu diagram & PDF audit report.
                  </p>
                  <div className="grid grid-cols-2 gap-1.5 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        addCredits(5, 'Demo Top-up');
                        setIsCreditsOpen(false);
                      }}
                      className="bg-[#f8f1e7] hover:bg-[#ebdcc8] text-[#5d2809] py-1.5 px-2 rounded-lg text-xs font-bold transition text-center cursor-pointer border border-[#e4d3c0]"
                    >
                      +5 Demo
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        addCredits(10, 'Demo Top-up');
                        setIsCreditsOpen(false);
                      }}
                      className="bg-[#7a3e1e] hover:bg-[#5d2809] text-white py-1.5 px-2 rounded-lg text-xs font-bold transition text-center cursor-pointer"
                    >
                      +10 Demo
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Phone Link */}
            <a
              href="tel:+919820016800"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#5d2809] hover:text-[#7a3e1e] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">call</span>
              <span className="hidden xl:inline">Contact</span>
            </a>

            {/* Demo User / Login Button */}
            {userProfile ? (
              <div className="flex items-center gap-1.5 bg-[#ffdea7]/40 border border-[#dfceba] px-3 py-1.5 rounded-xl text-xs font-bold text-[#5d2809]">
                <span className="material-symbols-outlined text-sm">verified_user</span>
                <span className="truncate max-w-[120px]">{userProfile.name}</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsLoginOpen(true)}
                className="hidden sm:inline-flex border border-[#ecd9c6] hover:bg-[#faf6ee] text-[#5d2809] px-3 py-1.5 rounded-xl text-xs font-bold transition items-center gap-1 cursor-pointer"
                title="Sign in for demo roles"
              >
                <span className="material-symbols-outlined text-sm">person</span>
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#4a240c] hover:bg-[#faf6ee] rounded-xl border border-[#ecd9c6] transition cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              <span className="material-symbols-outlined text-xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 sm:px-6 py-4 bg-[#fcfaf6] border-t border-[#ecd9c6] space-y-2 text-sm font-semibold animate-in fade-in duration-150">
            {/* Home */}
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-xl transition ${
                isHomeActive ? 'bg-[#faf6ee] text-[#4a240c] font-bold' : 'text-[#53433c] hover:bg-[#faf6ee]'
              }`}
            >
              Home
            </Link>

            {/* Explore Properties */}
            <Link
              href="/properties"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl bg-[#7a3e1e] text-white font-bold flex items-center justify-between shadow-2xs"
            >
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">explore</span>
                <span>Explore Properties</span>
              </span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>

            {/* About Us */}
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-xl transition ${
                isAboutActive ? 'bg-[#faf6ee] text-[#4a240c] font-bold' : 'text-[#53433c] hover:bg-[#faf6ee]'
              }`}
            >
              About Us
            </Link>

            {/* Request Consultation */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsConsultOpen(true);
              }}
              className="w-full text-left px-3 py-2 rounded-xl text-[#53433c] hover:bg-[#faf6ee] flex items-center gap-1.5 font-semibold cursor-pointer"
            >
              <span className="material-symbols-outlined text-base text-[#7a3e1e]">support_agent</span>
              <span>Request Consultation</span>
            </button>

            {/* Admin Portal */}
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl bg-[#fff1dc] text-[#5d2809] font-bold text-xs border border-[#ecd2b4] flex items-center justify-between"
            >
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
                <span>Admin Inventory Portal</span>
              </span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>

            {/* Mobile Sign In */}
            <div className="pt-2 border-t border-[#ecd9c6]">
              {userProfile ? (
                <div className="px-3 py-1.5 text-xs text-[#5d2809] font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">verified_user</span>
                  <span>Signed in as {userProfile.name}</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsLoginOpen(true);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-[#5d2809] bg-[#faf6ee] border border-[#ecd9c6] flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">person</span>
                  <span>Demo Sign In</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Optional Custom Breadcrumbs Strip */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="px-4 sm:px-6 lg:px-8 py-2 bg-[#faf6ee] border-t border-[#ecd9c6] flex items-center gap-1.5 text-xs text-[#86736b] overflow-x-auto whitespace-nowrap scrollbar-none">
            {breadcrumbs.map((item, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-[#dfceba]">/</span>}
                {item.href ? (
                  <Link href={item.href} className="hover:text-[#4a240c] transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className={item.active ? 'font-bold text-[#4a240c]' : 'text-[#86736b]'}>
                    {item.label}
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </header>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultOpen}
        onClose={() => setIsConsultOpen(false)}
      />

      {/* Demo Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSuccess={(role, name) => setUserProfile({ role, name })}
      />
    </>
  );
}
