'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LoginModal from '@/components/common/LoginModal';
import ConsultationModal from '@/components/common/ConsultationModal';
import VastuAuditModal from '@/components/common/VastuAuditModal';
import { useToast } from '@/context/ToastContext';
import { useCredits } from '@/context/CreditsContext';
import {
  STATE_CITIES,
  ALL_STATES,
  ALL_CITIES,
  getStateForCity,
  getCitiesForState,
} from '@/data/locations';

interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

interface NavbarProps {
  showPanorama?: boolean;
  showSearchBar?: boolean;
  breadcrumbs?: BreadcrumbItem[];
  activeNav?: 'explore' | 'audit' | 'consult' | 'how-it-works' | 'about';
}

export default function Navbar({
  showPanorama = true,
  showSearchBar = true,
  breadcrumbs,
  activeNav
}: NavbarProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const { credits, addCredits } = useCredits();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);
  const [isVastuModalOpen, setIsVastuModalOpen] = useState(false);
  const [vastuModalTab, setVastuModalTab] = useState<'audit' | 'how-it-works' | 'scoring' | 'sample-report'>('audit');
  const [isAuditHovered, setIsAuditHovered] = useState(false);
  const [isHowItWorksHovered, setIsHowItWorksHovered] = useState(false);
  const [userProfile, setUserProfile] = useState<{ role: string; name: string } | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFloatingSearchOpen, setIsFloatingSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 220;
      setIsScrolled(scrolled);
      if (!scrolled) {
        setIsFloatingSearchOpen(false);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openVastuModal = (tab: 'audit' | 'how-it-works' | 'scoring' | 'sample-report' = 'audit') => {
    setVastuModalTab(tab);
    setIsVastuModalOpen(true);
    setIsAuditHovered(false);
    setIsHowItWorksHovered(false);
  };

  // Search State with bidirectional City <-> State auto-linking
  const [selectedState, setSelectedState] = useState('Maharashtra');
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [searchQuery, setSearchQuery] = useState('');
  const [isStateOpen, setIsStateOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // When state is selected, pick first city of that state
  const handleStateSelect = (st: string) => {
    setSelectedState(st);
    setIsStateOpen(false);
    const citiesInState = getCitiesForState(st);
    if (citiesInState && citiesInState.length > 0) {
      setSelectedCity(citiesInState[0]);
    }
    showToast(`State: ${st} • City updated to ${citiesInState[0]}`);
  };

  // When city is selected, automatically update state!
  const handleCitySelect = (ct: string) => {
    setSelectedCity(ct);
    setIsCityOpen(false);
    const autoState = getStateForCity(ct);
    if (autoState) {
      setSelectedState(autoState);
      showToast(`Selected City: ${ct} → Auto-set State: ${autoState}`);
    } else {
      showToast(`Selected City: ${ct}`);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Filtering verified homes in ${selectedCity}, ${selectedState}...`);
    const params = new URLSearchParams();
    if (selectedState) params.set('state', selectedState);
    if (selectedCity) params.set('city', selectedCity);
    if (searchQuery.trim()) params.set('q', searchQuery.trim());
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <>
      <header className="w-full relative z-40 pt-3 px-3 sm:px-6 lg:px-8 max-w-7xl xl:max-w-screen-2xl 2xl:max-w-[1720px] mx-auto">
        <div className="w-full bg-[#fcf8f2] rounded-3xl border border-[#e8dac8] shadow-sm relative overflow-visible">
          {/* Top Nav Line (z-50 so hover megamenus float completely above panorama, search bar and breadcrumbs) */}
          <div className="px-5 sm:px-8 py-3.5 flex items-center justify-between relative z-50">
            {/* Logo Branding */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 flex items-center justify-center text-[#7a3e1e] group-hover:scale-105 transition-transform shrink-0">
                <svg
                  className="w-9 h-9"
                  fill="none"
                  stroke="#7a3e1e"
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
                  <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#4a240c] font-serif">
                    PragyaaProp.com
                  </span>
                  <span className="text-[11px] font-bold text-[#4a240c] align-super ml-0.5">®</span>
                </div>
                <span className="block text-[11px] font-medium tracking-wide text-[#7d685c] -mt-0.5 font-sans">
                  Vastu-Verified Real Estate
                </span>
              </div>
            </Link>

            {/* Center Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7 text-sm font-semibold text-[#302722]">
              <Link
                href="/properties"
                className={`py-1 transition-colors hover:text-[#5d2809] ${
                  activeNav === 'explore' ? 'text-[#5d2809] font-bold border-b-2 border-[#5d2809]' : ''
                }`}
              >
                Explore Properties
              </Link>

              {/* Vastu Audit with Rich Hover Megamenu & Direct Interactive Modal */}
              <div
                className="relative py-1"
                onMouseEnter={() => {
                  setIsAuditHovered(true);
                  setIsStateOpen(false);
                  setIsCityOpen(false);
                }}
                onMouseLeave={() => setIsAuditHovered(false)}
              >
                <button
                  type="button"
                  onClick={() => openVastuModal('audit')}
                  className={`py-1 transition-colors hover:text-[#5d2809] flex items-center gap-1 cursor-pointer ${
                    activeNav === 'audit' ? 'text-[#5d2809] font-bold' : ''
                  }`}
                >
                  <span>Vastu Audit</span>
                  <span className={`material-symbols-outlined text-sm transition-transform duration-200 ${isAuditHovered ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>

                {/* Floating Megamenu for Vastu Audit */}
                {isAuditHovered && (
                  <div className="absolute top-full -left-16 pt-2 z-50 w-[520px]">
                    <div className="bg-white border border-[#dfceba] rounded-2xl shadow-2xl p-5 text-left border-t-2 border-t-[#743b19] animate-fade-in">
                      <div className="flex items-center justify-between border-b border-[#f3e8dc] pb-3 mb-3.5">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[#743b19] text-xl">explore</span>
                          <span className="font-serif font-bold text-sm text-[#4a240c]">16-Zone Spatial Vastu Audit</span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#785503] bg-[#fdcd75]/40 px-2 py-0.5 rounded-full">
                          0.0° North Calibrated
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div className="space-y-2">
                          <span className="font-bold text-[11px] text-[#743b19] block uppercase tracking-wide">Pancha Tattva Zones</span>
                          <p className="text-stone-600 text-[11px] leading-relaxed">
                            Every residence is evaluated across 16 cardinal sub-sectors: Water (NE), Air (E/NW), Fire (SE), Earth (SW), and unencumbered Brahmasthan.
                          </p>
                          <div className="flex flex-wrap gap-1 pt-1">
                            {['N - Kuber', 'NE - Ishanya', 'E - Surya', 'SE - Agni', 'SW - Nirriti'].map((z) => (
                              <span key={z} className="text-[10px] bg-[#f8f2e9] text-[#5d2809] px-2 py-0.5 rounded font-medium">
                                {z}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2 border-l border-[#f0e4d7] pl-4">
                          <span className="font-bold text-[11px] text-[#743b19] block uppercase tracking-wide">3 Harmony Tiers</span>
                          <div className="space-y-1.5 text-[11px]">
                            <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                              <span>Inherently Aligned (9.0–10)</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-amber-800 font-semibold">
                              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                              <span>Functionally Balanced (6.5–8.9)</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-orange-800 font-semibold">
                              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                              <span>Remedy-Ready (5.0–6.4)</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#f3e8dc] flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => openVastuModal('audit')}
                          className="px-3.5 py-1.5 bg-[#743b19] hover:bg-[#5e2e12] text-white text-xs font-bold rounded-lg transition shadow-xs cursor-pointer flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-sm">open_in_new</span>
                          <span>Launch Interactive Explorer</span>
                        </button>
                        <Link
                          href="/#audit"
                          onClick={() => setIsAuditHovered(false)}
                          className="text-xs text-[#5d2809] hover:underline font-semibold flex items-center gap-1"
                        >
                          <span>Scroll to On-Page Audit</span>
                          <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setIsConsultOpen(true)}
                className={`py-1 transition-colors hover:text-[#5d2809] cursor-pointer ${
                  activeNav === 'consult' ? 'text-[#5d2809] font-bold' : ''
                }`}
              >
                Consult an Expert
              </button>

              {/* How It Works with Rich Hover Megamenu & Direct Interactive Modal */}
              <div
                className="relative py-1"
                onMouseEnter={() => {
                  setIsHowItWorksHovered(true);
                  setIsStateOpen(false);
                  setIsCityOpen(false);
                }}
                onMouseLeave={() => setIsHowItWorksHovered(false)}
              >
                <button
                  type="button"
                  onClick={() => openVastuModal('how-it-works')}
                  className={`py-1 transition-colors hover:text-[#5d2809] flex items-center gap-1 cursor-pointer ${
                    activeNav === 'how-it-works' ? 'text-[#5d2809] font-bold' : ''
                  }`}
                >
                  <span>How It Works</span>
                  <span className={`material-symbols-outlined text-sm transition-transform duration-200 ${isHowItWorksHovered ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>

                {/* Hover Megamenu for How It Works */}
                {isHowItWorksHovered && (
                  <div className="absolute top-full -left-32 pt-2 z-50 w-[560px]">
                    <div className="bg-white border border-[#dfceba] rounded-2xl shadow-2xl p-5 text-left border-t-2 border-t-[#743b19] animate-fade-in">
                      <div className="flex items-center justify-between border-b border-[#f3e8dc] pb-3 mb-3.5">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[#743b19] text-xl">auto_stories</span>
                          <span className="font-serif font-bold text-sm text-[#4a240c]">Our 4-Step Verification Workflow</span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#785503] bg-[#fdcd75]/40 px-2 py-0.5 rounded-full">
                          100% Non-Destructive
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-2.5 rounded-xl bg-[#fdfcf9] border border-[#f0e4d7]">
                          <span className="font-bold text-[11px] text-[#743b19] block mb-0.5">01. CAD True North 0.0°</span>
                          <p className="text-stone-600 text-[11px] leading-snug">
                            Satellite cadastral alignment eliminates compass declination error.
                          </p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-[#fdfcf9] border border-[#f0e4d7]">
                          <span className="font-bold text-[11px] text-[#743b19] block mb-0.5">02. 16-Zone Energy Grid</span>
                          <p className="text-stone-600 text-[11px] leading-snug">
                            Superimposing ancient Mayamatam 22.5° angular sectors over blueprint.
                          </p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-[#fdfcf9] border border-[#f0e4d7]">
                          <span className="font-bold text-[11px] text-[#743b19] block mb-0.5">03. Dual Council Audit</span>
                          <p className="text-stone-600 text-[11px] leading-snug">
                            Attested by Vedic Jyotish Acharyas, CEPT civil architects, and RERA title.
                          </p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-[#fdfcf9] border border-[#f0e4d7]">
                          <span className="font-bold text-[11px] text-[#743b19] block mb-0.5">04. Serialized PDF Ledger</span>
                          <p className="text-stone-600 text-[11px] leading-snug">
                            18-page cryptographic report with room-by-room radar scores.
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#f3e8dc] flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => openVastuModal('how-it-works')}
                          className="px-3.5 py-1.5 bg-[#743b19] hover:bg-[#5e2e12] text-white text-xs font-bold rounded-lg transition shadow-xs cursor-pointer flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-sm">view_carousel</span>
                          <span>Launch Interactive Walkthrough</span>
                        </button>
                        <Link
                          href="/about#how-it-works"
                          onClick={() => setIsHowItWorksHovered(false)}
                          className="text-xs text-[#5d2809] hover:underline font-semibold flex items-center gap-1"
                        >
                          <span>Full Methodology Guide</span>
                          <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/about"
                className={`py-1 transition-colors hover:text-[#5d2809] ${
                  activeNav === 'about' ? 'text-[#5d2809] font-bold border-b-2 border-[#5d2809]' : ''
                }`}
              >
                About Us
              </Link>
              <Link
                href="/admin"
                className="py-1 px-2.5 rounded-lg bg-[#fff1dc] text-[#5d2809] hover:bg-[#ffdea7] font-bold text-xs border border-[#ecd2b4] transition-all flex items-center gap-1 shadow-2xs"
                title="Admin Management Portal"
              >
                <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
                <span>Admin</span>
              </Link>
            </nav>

            {/* Right Action CTAs */}
            <div className="flex items-center gap-2.5 sm:gap-3.5">
              {/* Demo Credits Badge with Quick Popover */}
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
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-[#dfceba] rounded-2xl shadow-2xl z-[100] p-3.5 space-y-2.5">
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

              <a
                href="tel:+919820016800"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[#5d2809] hover:text-[#7a3e1e] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">call</span>
                <span>Contact</span>
              </a>

              {userProfile ? (
                <div className="flex items-center gap-2 bg-[#ffdea7]/40 border border-[#dfceba] px-3 py-1.5 rounded-lg text-xs font-bold text-[#5d2809]">
                  <span className="material-symbols-outlined text-sm">verified_user</span>
                  <span>{userProfile.name}</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsLoginOpen(true)}
                  className="bg-[#7a3e1e] hover:bg-[#5d2809] text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all duration-150 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">person</span>
                  <span>Login</span>
                </button>
              )}

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 text-[#5d2809] hover:bg-[#eedfc9] rounded-lg"
                aria-label="Toggle navigation menu"
              >
                <span className="material-symbols-outlined text-2xl">
                  {mobileMenuOpen ? 'close' : 'menu'}
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Nav */}
          {mobileMenuOpen && (
            <div className="lg:hidden px-6 py-4 bg-[#fbf8f3] border-t border-[#eedfc9] space-y-3 text-sm font-semibold text-stone-800">
              <Link
                href="/properties"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1 hover:text-[#7a3e1e]"
              >
                Explore Properties
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openVastuModal('audit');
                }}
                className="block text-left w-full py-1 hover:text-[#7a3e1e] font-semibold flex items-center justify-between"
              >
                <span>🧭 Vastu Audit (16-Zone Guide)</span>
                <span className="text-[10px] bg-[#fdcd75]/40 text-[#785503] px-2 py-0.5 rounded font-bold">Interactive</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsConsultOpen(true);
                }}
                className="block text-left w-full py-1 hover:text-[#7a3e1e]"
              >
                Consult an Expert
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openVastuModal('how-it-works');
                }}
                className="block text-left w-full py-1 hover:text-[#7a3e1e] font-semibold flex items-center justify-between"
              >
                <span>📐 How It Works (4-Step Workflow)</span>
                <span className="text-[10px] bg-[#fdcd75]/40 text-[#785503] px-2 py-0.5 rounded font-bold">Interactive</span>
              </button>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1 hover:text-[#7a3e1e]"
              >
                About Us
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-3 rounded-xl bg-[#fff1dc] text-[#5d2809] font-bold text-xs border border-[#ecd2b4] hover:bg-[#ffdea7] transition"
              >
                ⚙️ Admin Portal & Live Website Manager
              </Link>
              <a
                href="tel:+919820016800"
                className="block py-1 text-[#7a3e1e] font-bold"
              >
                📞 Contact: +91 98200 16800
              </a>
              <div className="pt-2 border-t border-[#eedfc9] flex items-center justify-between">
                <span className="text-xs font-bold text-[#5d2809]">🪙 Vastu Credits: {credits}</span>
                <button
                  type="button"
                  onClick={() => addCredits(5, 'Mobile Top-up')}
                  className="bg-[#7a3e1e] text-white text-xs px-2.5 py-1 rounded-lg font-bold cursor-pointer"
                >
                  +5 Credits
                </button>
              </div>
            </div>
          )}

          {/* Illustrated Panorama Middle Band matching Stitch EXACT */}
          {showPanorama && (
            <div className="relative z-10 w-full h-24 sm:h-28 overflow-hidden select-none bg-gradient-to-r from-[#fcf7ee] via-[#faefe1] to-[#fcf7ee] flex items-center justify-between px-4 sm:px-8 border-t border-[#eedfc9]">
              {/* Temple Silhouette Illustration (Left) */}
              <div className="w-1/3 max-w-[260px] h-full relative overflow-hidden flex items-end">
                <div className="w-full h-full relative overflow-hidden">
                  <img
                    alt="Vedic Temple Illustration"
                    className="absolute left-0 top-0 h-[210%] w-auto max-w-none object-cover object-left-top"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqiRGDbJ-39ymjRxTyncMkaH3NFHlSJzs98s-9_aARjLylUlhRyn5dZSLVj_gE3RE2dAZESXQSaeqLud7l78YOjakWIHZ6qg51yGsLS_NRBbmHI4EC2bkCg1wffneL95Hli5bOVK-nqZSniTl2-r14wWbvB18rkKYvhgia3umLGRDmhNzzEpYB0KTtLlG6h3_Unu2ARmLr9y0HBH-KvqeabUVm4K8Fzox-HB7mKlqZj_SOFWA7cwyP4g"
                  />
                </div>
              </div>

              {/* Soft Warm Golden Rolling Sand Dunes Background (Center) */}
              <div className="flex-1 h-full flex items-center justify-center pointer-events-none px-2 sm:px-6">
                <svg
                  className="w-full h-full max-h-20 text-[#edd8bf]"
                  fill="currentColor"
                  preserveAspectRatio="none"
                  viewBox="0 0 900 120"
                >
                  <path
                    d="M0,75 C180,25 360,105 520,40 C680,-10 760,65 900,45 L900,120 L0,120 Z"
                    opacity="0.45"
                  ></path>
                  <path
                    d="M0,90 C220,55 420,110 620,60 C740,35 810,85 900,70 L900,120 L0,120 Z"
                    opacity="0.65"
                  ></path>
                </svg>
              </div>

              {/* Golden Cardinal Compass Rose Illustration (Right) */}
              <div className="w-20 sm:w-24 h-20 sm:h-24 flex items-center justify-center shrink-0 pr-1">
                <img
                  alt="16-Point Cardinal Compass Rose"
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-xs"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSBtL4nPwCpo5P272oO9el6CI5ZNbobnQfxWccqf1IC9rkj4Zea1EYHFpruPd8l-8gz4MplCg_SaGMzWUvoONIS72ySywR-n2F752VFVyDdF8d1W-ycWMpk6brywKXw31wUpI6KBdlv99g0VRlyQ0bYpg6Baeq27ZdwyNuQ_Yobr_g0aMHg0Q8EsekHjapG4XIGQMkGwNB30kGyvLAQ5tT-BThme_xN4mQHWEvbw_IYVy3dyohXAuagA"
                />
              </div>
            </div>
          )}

          {/* Floating Modular Search Strip (z-30 so dropdown menus float above breadcrumbs, while top nav line z-50 floats above search bar) */}
          {showSearchBar && (
            <div className="p-3 sm:p-4 bg-[#fbf9f5] relative z-30">
              <form
                onSubmit={handleSearchSubmit}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
              >
                {/* State Selector Dropdown */}
                <div className="md:col-span-3 relative">
                  <button
                    type="button"
                    onClick={() => {
                      setIsStateOpen(!isStateOpen);
                      setIsCityOpen(false);
                      setIsAuditHovered(false);
                      setIsHowItWorksHovered(false);
                    }}
                    className="w-full bg-[#fbf8f3] hover:bg-white border border-[#dfceba] rounded-xl px-4 py-2.5 text-left flex items-center justify-between shadow-xs transition-colors focus:ring-2 focus:ring-[#7a3e1e] focus:outline-none cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <span className="material-symbols-outlined text-[#7a3e1e] text-xl shrink-0">
                        location_on
                      </span>
                      <div className="truncate">
                        <span className="block text-[10px] uppercase font-bold text-[#86736b] tracking-wider leading-none">
                          Select State
                        </span>
                        <span className="block text-sm font-bold text-[#4a240c] truncate leading-tight mt-0.5">
                          {selectedState}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`material-symbols-outlined text-[#7a3e1e] text-lg transition-transform duration-200 ${
                        isStateOpen ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>

                  {/* State Menu */}
                  {isStateOpen && (
                    <div className="absolute top-full left-0 mt-1.5 w-full bg-white border border-[#dfceba] rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto py-1">
                      {ALL_STATES.map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => handleStateSelect(st)}
                          className="w-full px-4 py-2 text-left text-sm text-stone-800 hover:bg-[#ffdea7]/30 hover:text-[#5d2809] font-medium flex items-center justify-between cursor-pointer"
                        >
                          <span>{st}</span>
                          {selectedState === st && (
                            <span className="text-xs text-[#5d2809] font-bold">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* City Selector Dropdown */}
                <div className="md:col-span-3 relative">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCityOpen(!isCityOpen);
                      setIsStateOpen(false);
                      setIsAuditHovered(false);
                      setIsHowItWorksHovered(false);
                    }}
                    className="w-full bg-[#fbf8f3] hover:bg-white border border-[#dfceba] rounded-xl px-4 py-2.5 text-left flex items-center justify-between shadow-xs transition-colors focus:ring-2 focus:ring-[#7a3e1e] focus:outline-none cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <span className="material-symbols-outlined text-[#7a3e1e] text-xl shrink-0">
                        apartment
                      </span>
                      <div className="truncate">
                        <span className="block text-[10px] uppercase font-bold text-[#86736b] tracking-wider leading-none">
                          Select City (Auto-links State)
                        </span>
                        <span className="block text-sm font-bold text-[#4a240c] truncate leading-tight mt-0.5">
                          {selectedCity}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`material-symbols-outlined text-[#7a3e1e] text-lg transition-transform duration-200 ${
                        isCityOpen ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>

                  {/* City Menu */}
                  {isCityOpen && (
                    <div className="absolute top-full left-0 mt-1.5 w-full bg-white border border-[#dfceba] rounded-xl shadow-xl z-50 max-h-64 overflow-y-auto py-1">
                      <div className="px-3 py-1 text-[10px] uppercase font-bold text-stone-400 bg-stone-50 border-b border-stone-100">
                        Cities in {selectedState}
                      </div>
                      {getCitiesForState(selectedState).map((ct) => (
                        <button
                          key={ct}
                          type="button"
                          onClick={() => handleCitySelect(ct)}
                          className="w-full px-4 py-2 text-left text-sm text-stone-800 hover:bg-[#ffdea7]/30 hover:text-[#5d2809] font-medium flex items-center justify-between cursor-pointer"
                        >
                          <span>{ct}</span>
                          {selectedCity === ct && (
                            <span className="text-xs text-[#5d2809] font-bold">✓</span>
                          )}
                        </button>
                      ))}

                      <div className="px-3 py-1 text-[10px] uppercase font-bold text-[#7a3e1e] bg-[#fdf8f3] border-t border-b border-[#ebdccb] mt-1">
                        All Major Cities (Auto-sets State)
                      </div>
                      {ALL_CITIES.filter((c) => !getCitiesForState(selectedState).includes(c)).map((ct) => (
                        <button
                          key={ct}
                          type="button"
                          onClick={() => handleCitySelect(ct)}
                          className="w-full px-4 py-1.5 text-left text-xs text-stone-600 hover:bg-[#ffdea7]/30 hover:text-[#5d2809] font-medium flex items-center justify-between cursor-pointer"
                        >
                          <span>{ct}</span>
                          <span className="text-[10px] text-stone-400 font-normal">
                            {getStateForCity(ct)}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Locality Search Input */}
                <div className="md:col-span-4 relative">
                  <div className="w-full bg-[#fbf8f3] border border-[#dfceba] rounded-xl px-3.5 py-2.5 flex items-center gap-2 shadow-xs focus-within:ring-2 focus-within:ring-[#7a3e1e] focus-within:bg-white focus-within:border-[#7a3e1e] transition-all">
                    <span className="material-symbols-outlined text-[#7a3e1e] text-xl shrink-0">
                      search
                    </span>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search locality, project or property..."
                      className="w-full bg-transparent border-0 p-0 text-sm text-[#1b1c1a] placeholder:text-[#86736b] focus:ring-0 focus:outline-none"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="text-[#86736b] hover:text-[#5d2809]"
                        title="Clear"
                      >
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Walnut Brown Search Button */}
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-[#7a3e1e] hover:bg-[#5d2809] text-white py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all duration-150 cursor-pointer"
                  >
                    <span>Search</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Breadcrumb Ribbon Strip (z-0 so search bar dropdown menus float above it) */}
          <div className="relative z-0 px-5 sm:px-8 py-2.5 bg-[#f5ede2] border-t border-[#eedfc9] flex items-center gap-2 text-xs sm:text-sm text-[#7a6458] overflow-x-auto whitespace-nowrap scrollbar-none rounded-b-3xl">
            {breadcrumbs ? (
              breadcrumbs.map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="text-[#c4b3a2]">›</span>}
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="hover:text-[#5d2809] font-medium transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span
                      className={
                        item.active
                          ? 'font-bold text-[#7a3e1e]'
                          : 'font-medium text-[#4a240c]'
                      }
                    >
                      {item.label}
                    </span>
                  )}
                </React.Fragment>
              ))
            ) : (
              <>
                <Link href="/" className="hover:text-[#5d2809] font-medium transition-colors">
                  Home
                </Link>
                <span className="text-[#c4b3a2]">›</span>
                <Link
                  href="/properties"
                  className="hover:text-[#5d2809] font-medium transition-colors"
                >
                  Properties
                </Link>
                <span className="text-[#c4b3a2]">›</span>
                <span className="font-medium text-[#4a240c]">{selectedState}</span>
                <span className="text-[#c4b3a2]">›</span>
                <span className="font-medium text-[#4a240c]">{selectedCity}</span>
                <span className="text-[#c4b3a2]">›</span>
                <span className="font-medium text-[#4a240c]">Andheri (W)</span>
                <span className="text-[#c4b3a2]">›</span>
                <span className="font-bold text-[#7a3e1e]">Sunrise Residency – 3 BHK</span>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Floating "Want to search?" Pill when scrolled down (Navbar disappears, floating search pill appears) */}
      {isScrolled && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center pointer-events-auto">
          <button
            type="button"
            onClick={() => setIsFloatingSearchOpen((prev) => !prev)}
            className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#fcf8f2]/95 hover:bg-white backdrop-blur-md border border-[#dfceba] shadow-lg hover:shadow-xl text-[#5d2809] transition-all duration-200 cursor-pointer text-xs font-bold"
            title="Want to search Vastu properties or navigate?"
          >
            <span className="material-symbols-outlined text-[#7a3e1e] text-base group-hover:scale-110 transition-transform">
              search
            </span>
            <span>Want to search?</span>
            <span
              className={`material-symbols-outlined text-sm text-[#7a3e1e] transition-transform duration-200 ${
                isFloatingSearchOpen ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>

          {/* Dropped down Floating Search & Quick Navigation Panel */}
          {isFloatingSearchOpen && (
            <div className="mt-2.5 w-[94vw] max-w-5xl bg-[#fcf8f2]/98 backdrop-blur-xl border border-[#dfceba] rounded-3xl shadow-2xl p-4 sm:p-5 relative animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Top Row: Quick Brand & Nav Links + Close */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#eedfc9]">
                <div className="flex items-center gap-4">
                  <Link href="/" className="font-serif font-bold text-base text-[#5d2809] flex items-center gap-1.5">
                    <span>PragyaaProp</span>
                    <span className="text-[10px] font-sans font-normal uppercase text-[#86736b]">Vedic Homes</span>
                  </Link>
                  <div className="hidden sm:flex items-center gap-3 text-xs font-semibold text-[#53433c]">
                    <Link href="/properties" className="hover:text-[#7a3e1e] transition-colors">
                      Explore Properties
                    </Link>
                    <button
                      type="button"
                      onClick={() => openVastuModal('audit')}
                      className="hover:text-[#7a3e1e] transition-colors cursor-pointer"
                    >
                      Vastu Audit
                    </button>
                    <button
                      type="button"
                      onClick={() => openVastuModal('how-it-works')}
                      className="hover:text-[#7a3e1e] transition-colors cursor-pointer"
                    >
                      How It Works
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsConsultOpen(true)}
                      className="hover:text-[#7a3e1e] transition-colors cursor-pointer"
                    >
                      Consult
                    </button>
                    <Link href="/admin" className="hover:text-[#7a3e1e] transition-colors">
                      Admin Portal
                    </Link>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsFloatingSearchOpen(false)}
                  className="w-7 h-7 rounded-full bg-[#f3e9dc] hover:bg-[#ebd9c4] text-[#5d2809] flex items-center justify-center transition-colors cursor-pointer text-xs font-bold"
                  title="Close search panel"
                >
                  ✕
                </button>
              </div>

              {/* Fast Search Strip */}
              <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-center">
                {/* State */}
                <div className="md:col-span-3 relative">
                  <button
                    type="button"
                    onClick={() => {
                      setIsStateOpen(!isStateOpen);
                      setIsCityOpen(false);
                      setIsAuditHovered(false);
                      setIsHowItWorksHovered(false);
                    }}
                    className="w-full bg-white border border-[#dfceba] rounded-xl px-3 py-2 text-left flex items-center justify-between shadow-xs transition-colors cursor-pointer text-xs"
                  >
                    <div className="truncate">
                      <span className="block text-[9px] uppercase font-bold text-[#86736b]">Select State</span>
                      <span className="text-xs font-bold text-[#5d2809] truncate">{selectedState}</span>
                    </div>
                    <span className="material-symbols-outlined text-xs text-[#7a3e1e]">expand_more</span>
                  </button>
                  {isStateOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#dfceba] rounded-xl shadow-xl z-50 max-h-48 overflow-y-auto py-1">
                      {ALL_STATES.map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => handleStateSelect(st)}
                          className="w-full text-left px-3 py-1.5 text-xs hover:bg-[#fbf8f3] text-[#5d2809]"
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* City */}
                <div className="md:col-span-3 relative">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCityOpen(!isCityOpen);
                      setIsStateOpen(false);
                      setIsAuditHovered(false);
                      setIsHowItWorksHovered(false);
                    }}
                    className="w-full bg-white border border-[#dfceba] rounded-xl px-3 py-2 text-left flex items-center justify-between shadow-xs transition-colors cursor-pointer text-xs"
                  >
                    <div className="truncate">
                      <span className="block text-[9px] uppercase font-bold text-[#86736b]">Select City</span>
                      <span className="text-xs font-bold text-[#5d2809] truncate">{selectedCity}</span>
                    </div>
                    <span className="material-symbols-outlined text-xs text-[#7a3e1e]">expand_more</span>
                  </button>
                  {isCityOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#dfceba] rounded-xl shadow-xl z-50 max-h-48 overflow-y-auto py-1">
                      {(getCitiesForState(selectedState) || ALL_CITIES).map((ct) => (
                        <button
                          key={ct}
                          type="button"
                          onClick={() => handleCitySelect(ct)}
                          className="w-full text-left px-3 py-1.5 text-xs hover:bg-[#fbf8f3] text-[#5d2809]"
                        >
                          {ct}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Search Query Input */}
                <div className="md:col-span-4 bg-white border border-[#dfceba] rounded-xl px-3 py-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#86736b]">search</span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search locality, project, 3 BHK..."
                    className="w-full bg-transparent text-xs text-[#5d2809] focus:outline-none"
                  />
                </div>

                {/* Submit Search CTA */}
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-[#7a3e1e] hover:bg-[#5d2809] text-white py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <span>Search</span>
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Login Selection Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSuccess={(role, name) => setUserProfile({ role, name })}
      />

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultOpen}
        onClose={() => setIsConsultOpen(false)}
      />

      {/* Vastu Audit & Methodology Modal */}
      <VastuAuditModal
        isOpen={isVastuModalOpen}
        onClose={() => setIsVastuModalOpen(false)}
        initialTab={vastuModalTab}
      />
    </>
  );
}
