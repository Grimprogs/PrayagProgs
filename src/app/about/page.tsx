'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VastuAiWidget from '@/components/common/VastuAiWidget';
import ConsultationModal from '@/components/common/ConsultationModal';
import ReportUnlockModal from '@/components/common/ReportUnlockModal';
import { useToast } from '@/context/ToastContext';

export default function AboutUsPage() {
  const { showToast } = useToast();
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<string>('Pt. Vidyadhar Shastri');
  const [isUnlockOpen, setIsUnlockOpen] = useState(false);

  const openMentorConsult = (mentor: string) => {
    setSelectedMentor(mentor);
    setIsConsultOpen(true);
  };

  return (
    <div className="bg-[#fbf9f5] text-[#1b1c1a] font-sans antialiased selection:bg-[#ffdea7] selection:text-[#5d2809] min-h-screen flex flex-col">
      {/* Top Navbar */}
      <Navbar activeNav="about" showPanorama={false} showSearchBar={false} />

      <main className="grow">
        {/* ======================================================== */}
        {/* LUXE HERO SAND BANNER WITH VEDIC MOTIFS & 16-ZONE COMPASS*/}
        {/* ======================================================== */}
        <section className="relative bg-gradient-to-b from-[#f5ede1] via-[#FAF4EA] to-[#fbf9f5] border-b border-[#d8c2b9]/40 overflow-hidden pt-8 pb-16">
          {/* Atmospheric Indian Temple Silhouette Graphic Background */}
          <div className="absolute inset-0 pointer-events-none opacity-25 flex justify-between items-end">
            <div
              className="w-80 h-72 bg-contain bg-bottom bg-no-repeat ml-2"
              style={{
                backgroundImage:
                  'radial-gradient(ellipse at bottom, rgba(122, 62, 30, 0.25) 0%, transparent 70%)',
              }}
            >
              <div className="w-full h-full flex items-end opacity-40 text-[#5d2809]">
                <span className="material-symbols-outlined text-9xl leading-none">temple_hindu</span>
              </div>
            </div>

            {/* Right Sacred Compass Rose */}
            <div className="relative w-80 h-80 mr-6 -mb-10 flex items-center justify-center opacity-30 text-[#7b5807]">
              <div
                className="absolute inset-0 rounded-full border border-[#7b5807] border-dashed animate-spin"
                style={{ animationDuration: '90s' }}
              ></div>
              <div className="absolute inset-4 rounded-full border border-[#5d2809]/20"></div>
              <span className="material-symbols-outlined text-9xl text-[#7b5807]">explore</span>
            </div>
          </div>

          <div className="max-w-7xl xl:max-w-screen-2xl 2xl:max-w-[1720px] mx-auto px-6 sm:px-10 relative z-10">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-xs text-[#53433c] mb-6 font-medium">
              <Link href="/" className="hover:text-[#5d2809] transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-base">home</span>
                Home
              </Link>
              <span className="text-[#d8c2b9]">/</span>
              <span className="text-[#5d2809] font-bold">About Us</span>
            </nav>

            {/* Grid Hero Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-8 space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fdcd75]/40 border border-[#7b5807]/30 text-[#7b5807] text-[10px] font-bold tracking-wider uppercase font-sans">
                  <span className="material-symbols-outlined text-sm">spa</span>
                  <span>VEDIC ARCHITECTURE • MODERN LIVING HARMONY</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-serif text-[#5d2809] tracking-tight leading-tight font-bold">
                  Bridging Ancient Vedic Wisdom with Modern Luxury Living.
                </h1>

                <p className="text-sm sm:text-base text-[#53433c] max-w-2xl leading-relaxed">
                  At PragyaaProp.com, we believe a home is an energetic sanctuary. We authenticate residential spaces using ancient Sthapatya Veda principles combined with contemporary CAD floorplan energy analysis and certified 16-zone directional scrutiny.
                </p>

                {/* Core Feature Badges from Header Banner */}
                <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3.5 max-w-3xl">
                  <div className="bg-white/80 border border-[#d8c2b9]/60 rounded-xl p-3 flex items-center gap-2.5 shadow-sm">
                    <span className="material-symbols-outlined text-[#7b5807] text-2xl fill">spa</span>
                    <div>
                      <div className="text-[10px] font-bold text-[#5d2809] uppercase">100% Vastu</div>
                      <div className="text-xs font-bold text-[#1b1c1a]">Verified</div>
                    </div>
                  </div>

                  <div className="bg-white/80 border border-[#d8c2b9]/60 rounded-xl p-3 flex items-center gap-2.5 shadow-sm">
                    <span className="material-symbols-outlined text-[#7b5807] text-2xl">explore</span>
                    <div>
                      <div className="text-[10px] font-bold text-[#5d2809] uppercase">16-Zone</div>
                      <div className="text-xs font-bold text-[#1b1c1a]">Spatial Analysis</div>
                    </div>
                  </div>

                  <div className="bg-white/80 border border-[#d8c2b9]/60 rounded-xl p-3 flex items-center gap-2.5 shadow-sm">
                    <span className="material-symbols-outlined text-[#00420c] text-2xl">verified_user</span>
                    <div>
                      <div className="text-[10px] font-bold text-[#5d2809] uppercase">RERA</div>
                      <div className="text-xs font-bold text-[#1b1c1a]">100% Compliant</div>
                    </div>
                  </div>

                  <div className="bg-white/80 border border-[#d8c2b9]/60 rounded-xl p-3 flex items-center gap-2.5 shadow-sm">
                    <span className="material-symbols-outlined text-[#7b5807] text-2xl">psychology</span>
                    <div>
                      <div className="text-[10px] font-bold text-[#5d2809] uppercase">Expert</div>
                      <div className="text-xs font-bold text-[#1b1c1a]">Guidance Panel</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero Graphic Mandala / Radar Card */}
              <div className="lg:col-span-4 flex justify-center">
                <div className="w-full max-w-sm bg-white border border-[#d8c2b9]/80 rounded-2xl p-6 shadow-md relative overflow-hidden text-center">
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#fdcd75]/20 rounded-full blur-xl pointer-events-none"></div>
                  <div className="w-20 h-20 mx-auto rounded-full bg-[#ffdea7]/30 border border-[#7b5807] flex items-center justify-center text-[#5d2809] mb-4">
                    <span className="material-symbols-outlined text-4xl fill">balance</span>
                  </div>
                  <div className="text-lg font-serif text-[#5d2809] font-bold">The Sthapatya Code</div>
                  <p className="text-xs text-[#53433c] mt-1.5 mb-5">
                    Evaluating the 5 Sacred Elements (Panchabhuta) across cardinal axes for holistic health, wealth & serenity.
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs border-t border-[#d8c2b9]/40 pt-4">
                    <div className="p-2 bg-[#fbf9f5] rounded-lg">
                      <div className="font-bold text-[#5d2809]">Prithvi</div>
                      <div className="text-[#53433c] text-[11px]">Earth • SW</div>
                    </div>
                    <div className="p-2 bg-[#fbf9f5] rounded-lg">
                      <div className="font-bold text-[#5d2809]">Jala</div>
                      <div className="text-[#53433c] text-[11px]">Water • NE</div>
                    </div>
                    <div className="p-2 bg-[#fbf9f5] rounded-lg">
                      <div className="font-bold text-[#5d2809]">Agni</div>
                      <div className="text-[#53433c] text-[11px]">Fire • SE</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* KEY MILESTONES & CREDIBILITY STRIP                       */}
        {/* ======================================================== */}
        <section className="border-y border-[#d8c2b9]/50 bg-white py-8">
          <div className="max-w-7xl xl:max-w-screen-2xl 2xl:max-w-[1720px] mx-auto px-6 sm:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-[#d8c2b9]/40">
              <div className="pt-4 md:pt-0">
                <div className="text-2xl sm:text-3xl font-serif text-[#5d2809] font-extrabold tracking-tight">
                  1,400+
                </div>
                <div className="text-xs text-[#53433c] mt-1">Homes Audited & Certified</div>
              </div>
              <div className="pt-4 md:pt-0">
                <div className="text-2xl sm:text-3xl font-serif text-[#5d2809] font-extrabold tracking-tight">
                  16 Zones
                </div>
                <div className="text-xs text-[#53433c] mt-1">Precision CAD Energy Scrutiny</div>
              </div>
              <div className="pt-4 md:pt-0">
                <div className="text-2xl sm:text-3xl font-serif text-[#005c15] font-extrabold tracking-tight">
                  98.4%
                </div>
                <div className="text-xs text-[#53433c] mt-1">Homeowner Satisfaction Score</div>
              </div>
              <div className="pt-4 md:pt-0">
                <div className="text-2xl sm:text-3xl font-serif text-[#7b5807] font-extrabold tracking-tight">
                  40+
                </div>
                <div className="text-xs text-[#53433c] mt-1">Senior Vedic Astrologers & Architects</div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* OUR METHODOLOGY & CORE PILLARS (BENTO GRID PATTERN)      */}
        {/* ======================================================== */}
        <section className="scroll-mt-28 py-20 bg-[#fbf9f5]" id="methodology">
          <span id="how-it-works" className="scroll-mt-28 block -top-28 relative" />
          <div className="max-w-7xl xl:max-w-screen-2xl 2xl:max-w-[1720px] mx-auto px-6 sm:px-10">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eae8e4] text-[#5d2809] text-[10px] font-bold uppercase tracking-wider mb-2">
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                Our Scientific Methodology
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#5d2809] font-bold">
                Four Pillars of Pragyaa Certification
              </h2>
              <p className="text-xs sm:text-sm text-[#53433c] mt-3">
                We bring complete scientific clarity to the realm of Indian directional energy without superstition or unwarranted structural demolitions.
              </p>
            </div>

            {/* Bento Grid Layout matching Stitch */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Pillar 1: Large Card (7 cols) */}
              <div className="md:col-span-7 bg-white border border-[#d8c2b9]/60 rounded-2xl p-8 relative overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FAF4EA] border border-[#7b5807]/40 flex items-center justify-center text-[#7b5807]">
                    <span className="material-symbols-outlined text-2xl">explore</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#7b5807] uppercase tracking-wider font-sans">Pillar 01</span>
                    <h3 className="text-lg font-serif text-[#5d2809] font-bold">16-Zone Spatial Energy Calibration</h3>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[#53433c] leading-relaxed mb-6">
                  Unlike conventional 8-direction basic charts, our patent-pending algorithmic grid calculates 16 exact micro-zones from true magnetic North. We diagnose directional stresses in Brahmasthan, Ishanya (NE), and Nairutya (SW) with zero-demolition remedy solutions.
                </p>
                <div className="bg-[#f5f3ef] rounded-xl p-4 border border-[#d8c2b9]/40 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-[#1b1c1a] font-medium">
                    <span className="material-symbols-outlined text-[#00420c] text-lg">check_circle</span>
                    Non-Invasive Pyramidal & Metal Balancing
                  </div>
                  <div className="flex items-center gap-2 text-[#1b1c1a] font-medium">
                    <span className="material-symbols-outlined text-[#00420c] text-lg">check_circle</span>
                    Precision Cadastral Orientation
                  </div>
                </div>
              </div>

              {/* Pillar 2: Medium Card (5 cols) */}
              <div className="md:col-span-5 bg-white border border-[#d8c2b9]/60 rounded-2xl p-8 hover:shadow-lg transition-shadow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#a3f69c]/30 border border-[#00420c]/20 flex items-center justify-center text-[#00420c]">
                      <span className="material-symbols-outlined text-2xl">gavel</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#00420c] uppercase tracking-wider font-sans">Pillar 02</span>
                      <h3 className="text-lg font-serif text-[#5d2809] font-bold">100% RERA & Title Verification</h3>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-[#53433c] leading-relaxed">
                    Spiritual harmony requires legal invulnerability. Every listing is cross-examined against state RERA registrations, encumbrance certificates, and verified building plan approvals prior to Vastu evaluation.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#d8c2b9]/30 flex items-center justify-between text-xs text-[#00420c] font-bold">
                  <span>Zero Legal Ambiguity Guaranteed</span>
                  <span className="material-symbols-outlined text-lg">verified</span>
                </div>
              </div>

              {/* Pillar 3: Medium Card (5 cols) */}
              <div className="md:col-span-5 bg-white border border-[#d8c2b9]/60 rounded-2xl p-8 hover:shadow-lg transition-shadow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#F5EEDB] border border-[#7b5807]/40 flex items-center justify-center text-[#5d2809]">
                      <span className="material-symbols-outlined text-2xl">psychology</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#7b5807] uppercase tracking-wider font-sans">Pillar 03</span>
                      <h3 className="text-lg font-serif text-[#5d2809] font-bold">Vetted Astrological Council</h3>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-[#53433c] leading-relaxed">
                    Led by traditional Vedic scholars and Gold Medalist Jyotish Acharyas with over 25 years of empirical study in Indian vastu mandalas, astrological muhurat, and sacred geometry.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#d8c2b9]/30 flex items-center justify-between text-xs text-[#5d2809] font-bold">
                  <button
                    onClick={() => setIsConsultOpen(true)}
                    className="hover:underline flex items-center justify-between w-full cursor-pointer"
                  >
                    <span>Direct 1-on-1 Consultation</span>
                    <span className="material-symbols-outlined text-lg">forum</span>
                  </button>
                </div>
              </div>

              {/* Pillar 4: Large Card (7 cols) */}
              <div className="md:col-span-7 bg-white border border-[#d8c2b9]/60 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FDF1E8] border border-[#5d2809]/20 flex items-center justify-center text-[#5d2809]">
                    <span className="material-symbols-outlined text-2xl">analytics</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#5d2809] uppercase tracking-wider font-sans">Pillar 04</span>
                    <h3 className="text-lg font-serif text-[#5d2809] font-bold">Transparent Digital Vastu Scorecards</h3>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[#53433c] leading-relaxed mb-6">
                  We replace vague superstition with rigorous objective grading (0 to 10 scale). Buyers receive a 16-page audit report with element-by-element radar charts, room-wise directional evaluations, and annotated blueprint overlays.
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-[#f5f3ef] rounded-lg text-center">
                    <div className="text-[10px] text-[#53433c]">Entrance Score</div>
                    <div className="text-[#5d2809] font-bold text-base font-serif">
                      9.5 <span className="text-[10px] text-[#53433c]">/ 10</span>
                    </div>
                  </div>
                  <div className="p-3 bg-[#f5f3ef] rounded-lg text-center">
                    <div className="text-[10px] text-[#53433c]">Master Bed (SW)</div>
                    <div className="text-[#5d2809] font-bold text-base font-serif">
                      8.5 <span className="text-[10px] text-[#53433c]">/ 10</span>
                    </div>
                  </div>
                  <div className="p-3 bg-[#f5f3ef] rounded-lg text-center">
                    <div className="text-[10px] text-[#53433c]">Agni Corner (SE)</div>
                    <div className="text-[#5d2809] font-bold text-base font-serif">
                      8.8 <span className="text-[10px] text-[#53433c]">/ 10</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* MENTORS & LEADERSHIP COUNCIL                             */}
        {/* ======================================================== */}
        <section className="py-20 bg-[#f5f3ef] border-t border-[#d8c2b9]/40">
          <div className="max-w-7xl xl:max-w-screen-2xl 2xl:max-w-[1720px] mx-auto px-6 sm:px-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fdcd75]/40 text-[#7b5807] text-[10px] font-bold uppercase tracking-wider mb-2 font-sans">
                  <span className="material-symbols-outlined text-sm">groups</span>
                  Vedic Advisory Board
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#5d2809] font-bold">
                  Senior Vastu Mentors & Leadership
                </h2>
                <p className="text-xs sm:text-sm text-[#53433c] mt-2 max-w-xl">
                  Our governing board unifies revered temple lineage scholars with contemporary civil engineers and CEPT architectural masters.
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <button
                  type="button"
                  onClick={() => setIsConsultOpen(true)}
                  className="inline-flex items-center gap-2 text-[#5d2809] hover:text-[#7a3e1e] text-xs sm:text-sm font-bold transition-colors cursor-pointer"
                >
                  <span>Meet the entire 40+ panel</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Leaders Profiles Grid matching Stitch */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Mentor 1: Panditji */}
              <div className="bg-white border border-[#d8c2b9]/70 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="h-64 overflow-hidden relative bg-[#F5EEDB]">
                  <img
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                    alt="Pt. Vidyadhar Shastri"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_8fDLUmwGhQwO3SLEolQQvA4BTmoZFS5k_FmAtYLSoIVkHyzxIitwBpLGDXGvygBWYcmrTZgrmexuVk9Efxx4X6wdY9PWrfwYmR8E7p1A76lPw64Q-45DiyhFZdrKckXpvaVY9q5QHT2r1_Iu8LpxFx2ueWJ6LZBcc1fsZSoxO6P43bhY_oqzYxa4RZBK6RNllV1XE_TYoPOd5tcCgOOzhC-B-wCBQ5gPgx5NAmTs"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-[#7b5807] text-[11px] font-bold text-[#5d2809] flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs text-[#7b5807] fill">star</span>
                    Grandmaster Acharya
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-serif text-[#5d2809] font-bold">Pt. Vidyadhar Shastri</h3>
                    <span className="text-[#7b5807] text-xs font-bold">34+ Yrs Exp</span>
                  </div>
                  <div className="text-[10px] text-[#7b5807] font-semibold uppercase mt-0.5 font-sans">
                    Head of Vedic Astro-Architecture
                  </div>
                  <p className="text-xs text-[#53433c] mt-3 leading-relaxed">
                    Former advisor to Tirupati & Kashi heritage restoration councils. Scholar in Mayamata, Manasara, and Brihat Samhita spatial alignments.
                  </p>
                  <div className="mt-5 pt-4 border-t border-[#d8c2b9]/30 flex items-center justify-between">
                    <span className="text-xs text-[#53433c] font-medium">1,100+ Homes Blessed</span>
                    <button
                      type="button"
                      onClick={() => openMentorConsult('Pt. Vidyadhar Shastri')}
                      className="text-[#5d2809] hover:text-[#7b5807] text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Book Session</span>
                      <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Mentor 2: Chief Architect */}
              <div className="bg-white border border-[#d8c2b9]/70 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="h-64 overflow-hidden relative bg-[#FAF4EA]">
                  <img
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                    alt="Ar. Radhika Deshmukh"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIi1LhNFhFg3i7Nc9pL37YzslJ0EfN2hUgpD9ykzOfcG1NMDUJmdh0vcdMNaXLpal06tsbaRd3jFhZIazY2kiJHHJuXnljjhtvi_CH-nIf6l3Ko_jROkMZUJsufHZv-eMSHBIxUnA4kQLMRj-5ISdY3XnVgTR-0HRFuTTh7YrstGGWI-9c9SMYPJ-P7mrV4Z4aChD2MS_XGXa6uU_T8SlSqim6gJKGCXKgsDqecouW"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-[#d8c2b9] text-[11px] font-bold text-[#1b1c1a] flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs text-[#5d2809]">architecture</span>
                    IIT Roorkee / CEPT Alum
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-serif text-[#5d2809] font-bold">Ar. Radhika Deshmukh</h3>
                    <span className="text-[#7b5807] text-xs font-bold">22+ Yrs Exp</span>
                  </div>
                  <div className="text-[10px] text-[#7b5807] font-semibold uppercase mt-0.5 font-sans">
                    Chief Architectural Principal
                  </div>
                  <p className="text-xs text-[#53433c] mt-3 leading-relaxed">
                    Spearheading the convergence of contemporary LEED-certified high-rises with cardinal solar orientation and natural airflow circulation.
                  </p>
                  <div className="mt-5 pt-4 border-t border-[#d8c2b9]/30 flex items-center justify-between">
                    <span className="text-xs text-[#53433c] font-medium">85+ Luxury High-Rises</span>
                    <button
                      type="button"
                      onClick={() => openMentorConsult('Ar. Radhika Deshmukh')}
                      className="text-[#5d2809] hover:text-[#7b5807] text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Credentials</span>
                      <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Mentor 3: Energy Auditing Head */}
              <div className="bg-white border border-[#d8c2b9]/70 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="h-64 overflow-hidden relative bg-[#FAF4EA]">
                  <img
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                    alt="Dr. K. Ananthaswamy"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlC4YtnH5s63V25x-uFPMW9nzQj7hv8Z6lnnFH4QPAbqPecrYjDmchMnkOarfZYPAaP31ciFzXuT9PzaZqE2am6D10nGIrTHP3pJUhI2CNdgcQCfOsh_sWKU99ilO9uZLY0YniRuSl6dhFzFkpPHFIgssNQVbzN8Wd8zscnAB_IxnEzUdsMXqB52mGNknRb4jzg6I4HyMRJMAXEAurS5SEBIeKq7MITJWP1-DDraRs"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-[#d8c2b9] text-[11px] font-bold text-[#1b1c1a] flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs text-[#00420c]">biotech</span>
                    Geo-Biology Specialist
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-serif text-[#5d2809] font-bold">Dr. K. Ananthaswamy</h3>
                    <span className="text-[#7b5807] text-xs font-bold">19+ Yrs Exp</span>
                  </div>
                  <div className="text-[10px] text-[#7b5807] font-semibold uppercase mt-0.5 font-sans">
                    Head of Property Energy Auditing
                  </div>
                  <p className="text-xs text-[#53433c] mt-3 leading-relaxed">
                    Doctorate in Geopathic Stress and Earth Telluric Currents. Developed our proprietary 16-Zone computational harmony score.
                  </p>
                  <div className="mt-5 pt-4 border-t border-[#d8c2b9]/30 flex items-center justify-between">
                    <span className="text-xs text-[#53433c] font-medium">350+ Complex Audits</span>
                    <button
                      type="button"
                      onClick={() => openMentorConsult('Dr. K. Ananthaswamy')}
                      className="text-[#5d2809] hover:text-[#7b5807] text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read Research</span>
                      <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* FEATURED AUDIT PREVIEW: SUNRISE RESIDENCY SPOTLIGHT      */}
        {/* ======================================================== */}
        <section className="py-16 bg-[#fbf9f5]">
          <div className="max-w-7xl xl:max-w-screen-2xl 2xl:max-w-[1720px] mx-auto px-6 sm:px-10">
            <div className="bg-gradient-to-r from-[#FAF4EA] to-white border border-[#d8c2b9]/70 rounded-2xl p-8 lg:p-12 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="space-y-4 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a3f69c]/30 text-[#00420c] border border-[#00420c]/20 text-[10px] font-bold uppercase font-sans">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  Exemplary Case Study
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#5d2809] font-bold">
                  How Pragyaa Evaluates a Residence: Sunrise Residency
                </h2>
                <p className="text-xs sm:text-sm text-[#53433c] leading-relaxed">
                  See our comprehensive methodology applied to Mumbai's premium residential apartments. Explore the exact 16-zone report, elemental scores, and verified RERA paperwork.
                </p>
                <div className="pt-2 flex flex-wrap gap-4 items-center">
                  <Link
                    href="/properties/sunrise-residency"
                    className="bg-[#5d2809] text-white px-6 py-3 rounded-lg text-xs font-bold hover:bg-[#7a3e1e] transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-lg">search</span>
                    <span>Explore Sunrise Residency 3 BHK</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsUnlockOpen(true)}
                    className="border border-[#86736b] text-[#5d2809] hover:bg-[#efeeea] px-6 py-3 rounded-lg text-xs font-bold transition-all cursor-pointer"
                  >
                    Download Sample 16-Zone PDF
                  </button>
                </div>
              </div>

              {/* Mini Visual Card Representation of Sunrise Residency */}
              <div className="w-full max-w-md bg-white border border-[#d8c2b9] rounded-xl p-5 shadow-md">
                <div className="flex items-center justify-between pb-3 border-b border-[#d8c2b9]/30">
                  <div>
                    <div className="text-base font-serif text-[#5d2809] font-bold">Sunrise Residency</div>
                    <div className="text-xs text-[#53433c]">Andheri (W), Mumbai • 3 BHK</div>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-[#2E7D32] bg-[#E8F5E9] text-[#00420c] font-bold text-base font-serif">
                      8.7
                    </div>
                    <div className="text-[10px] text-[#00420c] font-bold tracking-tight">Vastu Score</div>
                  </div>
                </div>
                <div className="py-3 flex items-center justify-between text-xs">
                  <span className="text-[#53433c]">Orientation Status:</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#fdcd75]/40 text-[#5d2809] font-bold text-[11px]">
                    Functionally Balanced
                  </span>
                </div>
                <div className="text-[11px] text-[#53433c] bg-[#fbf9f5] rounded-lg p-2.5 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#7b5807] text-sm">lock_open</span>
                  Full 16-Zone micro-zone remedies unlocked for buyers.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* INTERACTIVE CTA SECTION                                  */}
        {/* ======================================================== */}
        <section className="py-20 bg-[#7a3e1e] text-white relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full border border-white/20 pointer-events-none flex items-center justify-center">
            <div className="w-64 h-64 rounded-full border border-white/20"></div>
          </div>
          <div className="max-w-5xl mx-auto px-6 text-center relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 border border-white/20 text-[#ffad85] text-[10px] font-bold uppercase tracking-widest font-sans">
              Auspicious Spatial Living Awaits
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-serif tracking-tight text-white font-bold">
              Experience Vastu-Harmonized Living in India.
            </h2>
            <p className="text-sm sm:text-base text-[#ffdbcc] max-w-2xl mx-auto leading-relaxed">
              Join over 1,400 satisfied families who found peaceful sanctuaries verified against Vedic geometry, natural energy flows, and verified title clearances.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/properties"
                className="w-full sm:w-auto bg-[#fdcd75] text-[#271900] px-8 py-3.5 rounded-lg text-xs font-bold hover:bg-[#ffdea7] transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">explore</span>
                <span>Explore Verified Properties</span>
              </Link>
              <button
                type="button"
                onClick={() => setIsConsultOpen(true)}
                className="w-full sm:w-auto bg-white text-[#5d2809] px-8 py-3.5 rounded-lg text-xs font-bold hover:bg-[#eae8e4] transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">psychology</span>
                <span>Book Expert Consultation</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <VastuAiWidget propertyTitle="Vedic Heritage Architecture" />

      {/* Floating Back to Top Button */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-24 right-5 z-30 w-11 h-11 rounded-full bg-white/95 hover:bg-[#743b19] text-[#743b19] hover:text-white border border-[#ecd9c6] shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer flex items-center justify-center group"
        title="Scroll to Top"
        aria-label="Scroll to Top"
      >
        <span className="material-symbols-outlined text-xl group-hover:-translate-y-0.5 transition-transform">
          arrow_upward
        </span>
      </button>

      <Footer />

      <ConsultationModal
        isOpen={isConsultOpen}
        onClose={() => setIsConsultOpen(false)}
        preferredExpert={selectedMentor}
      />

      <ReportUnlockModal
        isOpen={isUnlockOpen}
        onClose={() => setIsUnlockOpen(false)}
        propertyTitle="Sample Sunrise Residency Vastu Audit"
      />
    </div>
  );
}
