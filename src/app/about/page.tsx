'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VastuAiWidget from '@/components/common/VastuAiWidget';
import ConsultationModal from '@/components/common/ConsultationModal';

// 5-Frame Vastu Verification Animation Sequence for Scroll & Interactive Play
interface VastuFrame {
  id: number;
  phase: string;
  title: string;
  subtitle: string;
  tagline: string;
  badge: string;
  description: string;
  keyPoints: string[];
  visualTheme: string;
}

const VASTU_FRAMES: VastuFrame[] = [
  {
    id: 1,
    phase: 'FRAME 01 / 05',
    title: 'Satellite Cadastral GIS & 0.0° True North Calibration',
    subtitle: 'Cosmic Axis Alignment',
    tagline: 'Zero magnetic compass declination error.',
    badge: '0.0° True North',
    description:
      'Standard magnetic compasses drift up to 2.5° due to localized ferrous rebar in modern RCC high-rises. PragyaaProp locks directly onto satellite cadastral survey coordinates to establish absolute geographic True North 0.0° before evaluating any residence.',
    keyPoints: [
      'Satellite GIS eliminates local magnetic distortion',
      'Geodetic datum calibration across all building wings',
      'True cardinal baseline for all subsequent calculations',
    ],
    visualTheme: 'from-[#1e293b] via-[#334155] to-[#0f172a]',
  },
  {
    id: 2,
    phase: 'FRAME 02 / 05',
    title: 'Mayamatam 16-Zone Energy Radial Superimposition',
    subtitle: 'The 22.5° Sacred Mandala Grid',
    tagline: 'Ancient Shastras mapped onto modern architectural CAD.',
    badge: '16 Divine Sectors',
    description:
      'Rather than treating an entire residential tower as one monolithic block, we superimpose ancient Mayamatam 22.5° angular sectors centered on the flat’s exact Brahmasthan. This reveals the specific energetic orientation of every room in your unit.',
    keyPoints: [
      '16 cardinal sub-sectors: Kuber (N), Ishanya (NE), Surya (E), Agni (SE), Yama (S), Nirriti (SW), Varuna (W), Vayu (NW)',
      'Sub-divided down to 22.5° angular precision',
      'Separate evaluations for Wing A, Wing B, and individual unit series',
    ],
    visualTheme: 'from-[#4a240c] via-[#633013] to-[#3a1b07]',
  },
  {
    id: 3,
    phase: 'FRAME 03 / 05',
    title: 'Pancha Tattva Elemental Balancing & Prana Flow',
    subtitle: 'Harmonizing the Five Cosmic Elements',
    tagline: 'Sunlight, air circulation, and bio-magnetic resonance.',
    badge: '5 Great Elements',
    description:
      'Every quadrant corresponds to an elemental tattva: Water (NE - mental clarity), Fire (SE - metabolic vigor), Earth (SW - leadership & grounding), Air (NW/E - financial circulation), and Space (Center - cosmic vitality). We inspect how natural daylight and airflow interact with these zones.',
    keyPoints: [
      'Jal (Water) in Northeast brings intellectual serenity & clear prana',
      'Agni (Fire) in Southeast fuels digestive and financial vitality',
      'Prithvi (Earth) in Southwest anchors deep REM sleep & family leadership',
    ],
    visualTheme: 'from-[#134e4a] via-[#115e59] to-[#042f2e]',
  },
  {
    id: 4,
    phase: 'FRAME 04 / 05',
    title: '100% Non-Destructive Energy Harmonization',
    subtitle: 'Zero Structural Demolition Guaranteed',
    tagline: 'Scientific threshold seals, metallic waveguides, and elemental balancing.',
    badge: 'Non-Invasive',
    description:
      'Ancient Vedic architecture never mandated breaking walls. When a doorway or bathroom sits outside optimal coordinates, PragyaaProp applies subtle elemental remedies—such as calibrated brass strips, copper threshold wires, natural crystals, and directional colors—neutralizing negative deflections.',
    keyPoints: [
      'Zero demolition: no breaking of beams, columns, or masonry',
      'Subtle metallic threshold strips placed beneath door thresholds',
      'Natural element remedies pre-tested for resonance stability',
    ],
    visualTheme: 'from-[#78350f] via-[#92400e] to-[#451a03]',
  },
  {
    id: 5,
    phase: 'FRAME 05 / 05',
    title: 'Cryptographic 16-Zone Ledger & PDF Certificate',
    subtitle: 'Verifiable Property Provenance',
    tagline: 'Permanent serial number, radar diagram, and expert attestation.',
    badge: 'Official Certified PDF',
    description:
      'The audit concludes with an official serialized report (e.g. PP-VR-2026-10492-A) and high-resolution 16-zone diagram. Each unlocked PDF permanently verifies your home’s alignment, empowering buyers, families, and future resale valuation.',
    keyPoints: [
      'Unique serialized certificate number and immutable audit ledger',
      'Room-by-room radar score breakdown across all 16 directions',
      'Print-ready high-resolution spatial energy chakra diagram',
    ],
    visualTheme: 'from-[#14532d] via-[#166534] to-[#052e16]',
  },
];

export default function AboutUsPage() {
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const [activeFrame, setActiveFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [demoPreviewTab, setDemoPreviewTab] = useState<'quick' | 'full'>('full');
  const scrollSectionRef = useRef<HTMLDivElement>(null);

  // Auto-play interval for the Vastu frames
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveFrame((prev) => (prev + 1) % VASTU_FRAMES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Frame scroll tracking: as user scrolls past the frame showcase, frame shifts smoothly
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollSectionRef.current) return;
      const rect = scrollSectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // If section is in middle of viewport, calculate progress (0 to 1)
      if (rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.3) {
        const totalDist = rect.height - windowHeight * 0.4;
        const scrolledDist = Math.max(0, (windowHeight * 0.5) - rect.top);
        const progress = Math.min(0.99, Math.max(0, scrolledDist / totalDist));
        const frameIndex = Math.floor(progress * VASTU_FRAMES.length);
        setActiveFrame(frameIndex);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const curFrame = VASTU_FRAMES[activeFrame];

  return (
    <div className="bg-[#fcfaf6] text-[#1b1c1a] font-sans antialiased selection:bg-[#ffdea7] selection:text-[#5d2809] min-h-screen flex flex-col">
      {/* Top Navigation */}
      <Navbar activeNav="about" />

      <main className="grow">
        {/* ================================================================== */}
        {/* SECTION 1: SIGNATURE PANORAMA BAND (MATCHING HEADER MOTIF)        */}
        {/* ================================================================== */}
        <section className="pt-4 px-3 sm:px-6 lg:px-8 max-w-7xl xl:max-w-screen-2xl 2xl:max-w-[1720px] mx-auto w-full">
          <div className="w-full bg-[#fcf8f2] rounded-3xl border border-[#e8dac8] shadow-sm overflow-hidden relative">
            {/* Upper Panorama Illustration Strip */}
            <div className="relative z-10 w-full h-28 sm:h-36 overflow-hidden select-none bg-gradient-to-r from-[#fcf7ee] via-[#faefe1] to-[#fcf7ee] flex items-center justify-between px-4 sm:px-8 border-b border-[#eedfc9]">
              {/* Temple Silhouette Illustration (Left) */}
              <div className="w-1/3 max-w-[280px] h-full relative overflow-hidden flex items-end">
                <div className="w-full h-full relative overflow-hidden">
                  <img
                    alt="Vedic Temple Silhouette Illustration"
                    className="absolute left-0 top-0 h-[210%] w-auto max-w-none object-cover object-left-top opacity-95"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqiRGDbJ-39ymjRxTyncMkaH3NFHlSJzs98s-9_aARjLylUlhRyn5dZSLVj_gE3RE2dAZESXQSaeqLud7l78YOjakWIHZ6qg51yGsLS_NRBbmHI4EC2bkCg1wffneL95Hli5bOVK-nqZSniTl2-r14wWbvB18rkKYvhgia3umLGRDmhNzzEpYB0KTtLlG6h3_Unu2ARmLr9y0HBH-KvqeabUVm4K8Fzox-HB7mKlqZj_SOFWA7cwyP4g"
                  />
                </div>
              </div>

              {/* Soft Warm Golden Rolling Sand Dunes Background (Center) */}
              <div className="flex-1 h-full flex items-center justify-center pointer-events-none px-2 sm:px-6">
                <svg
                  className="w-full h-full max-h-24 text-[#edd8bf]"
                  fill="currentColor"
                  preserveAspectRatio="none"
                  viewBox="0 0 900 120"
                >
                  <path
                    d="M0,75 C180,25 360,105 520,40 C680,-10 760,65 900,45 L900,120 L0,120 Z"
                    opacity="0.5"
                  ></path>
                  <path
                    d="M0,90 C220,55 420,110 620,60 C740,35 810,85 900,70 L900,120 L0,120 Z"
                    opacity="0.75"
                  ></path>
                </svg>
              </div>

              {/* Golden Cardinal Compass Rose Illustration (Right) with subtle rotation */}
              <div className="w-24 sm:w-28 h-24 sm:h-28 flex items-center justify-center shrink-0 pr-2">
                <img
                  alt="16-Point Cardinal Compass Rose"
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-md animate-spin-slow"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSBtL4nPwCpo5P272oO9el6CI5ZNbobnQfxWccqf1IC9rkj4Zea1EYHFpruPd8l-8gz4MplCg_SaGMzWUvoONIS72ySywR-n2F752VFVyDdF8d1W-ycWMpk6brywKXw31wUpI6KBdlv99g0VRlyQ0bYpg6Baeq27ZdwyNuQ_Yobr_g0aMHg0Q8EsekHjapG4XIGQMkGwNB30kGyvLAQ5tT-BThme_xN4mQHWEvbw_IYVy3dyohXAuagA"
                />
              </div>
            </div>

            {/* Breadcrumb Strip */}
            <div className="px-5 sm:px-8 py-2.5 bg-[#f5ede2] border-b border-[#eedfc9] flex items-center gap-2 text-xs text-[#7a6458]">
              <Link href="/" className="hover:text-[#5d2809] font-medium transition-colors">
                Home
              </Link>
              <span className="text-[#c4b3a2]">›</span>
              <span className="font-bold text-[#7a3e1e]">About &amp; Spatial Vastu Architecture</span>
            </div>

            {/* Hero Main Presentation with 3D Skyscraper Cutout Depth */}
            <div className="p-6 sm:p-10 lg:p-12 relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffdea7]/60 border border-[#ecd9c6] text-[#5d2809] text-[11px] font-bold tracking-wider uppercase">
                    <span className="material-symbols-outlined text-sm">explore</span>
                    <span>16-Zone Spatial Vastu Architecture</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#4a240c] font-bold tracking-tight leading-[1.15]">
                    Where Ancient Mayamatam Meets Modern Architectural Precision.
                  </h1>

                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#eedecb] shadow-xs">
                    <p className="text-sm sm:text-base text-[#4a240c] font-serif font-semibold italic leading-relaxed">
                      &ldquo;PragyaaProp empowers homebuyers to inspect residences with unit-level Vastu certainty, bridging 5,000-year-old Vedic directional wisdom with satellite cadastral accuracy.&rdquo;
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#53433c] leading-relaxed">
                    Most real estate portals treat an entire 40-story residential tower as identical. In reality, sunlight, air ionization, and directional prana shift dramatically from one wing to another and from one individual flat series to the next.
                  </p>

                  <div className="pt-2 flex flex-wrap gap-3 items-center">
                    <Link
                      href="/properties"
                      className="bg-[#7a3e1e] hover:bg-[#5d2809] text-white px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition shadow-sm inline-flex items-center gap-2 active:scale-95 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-base">explore</span>
                      <span>Explore Verified Flats</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => setIsConsultOpen(true)}
                      className="bg-white hover:bg-[#faf6ee] text-[#5d2809] border border-[#ecd9c6] px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition shadow-xs inline-flex items-center gap-2 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-base">support_agent</span>
                      <span>Consult a Vastu Architect</span>
                    </button>
                  </div>
                </div>

                {/* 3D Elevated Cutout Showcase (Using Building Cutout & 16-Zone Glow) */}
                <div className="lg:col-span-5 relative flex items-center justify-center">
                  {/* Outer Golden Glow Aura */}
                  <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-[#ffdea7]/50 via-[#fcd38d]/30 to-transparent blur-3xl pointer-events-none"></div>

                  <div className="relative w-full max-w-sm rounded-3xl bg-gradient-to-b from-white/90 via-[#fdfbf7]/95 to-white/90 border-2 border-[#eedecb] p-6 shadow-2xl backdrop-blur-md transform hover:-translate-y-1.5 transition-all duration-300">
                    {/* Floating 3D Badge (Top Left) */}
                    <div className="absolute -top-3 -left-3 bg-[#4a240c] text-white px-3 py-1 rounded-full text-[10px] font-mono font-bold shadow-md flex items-center gap-1.5 z-20">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>0.0° NORTH LOCKED</span>
                    </div>

                    {/* Floating 3D Badge (Top Right) */}
                    <div className="absolute -top-3 -right-3 bg-[#ffdea7] text-[#5d2809] px-3 py-1 rounded-full text-[10px] font-bold shadow-md border border-[#e4c48f] z-20">
                      <span>16-ZONE CADASTRE</span>
                    </div>

                    {/* Skyscraper Cutout with 3D Depth */}
                    <div className="relative h-64 sm:h-72 w-full flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#f8efe3] to-[#f4e4cf] border border-[#ecd4b5]">
                      {/* Compass watermark in background */}
                      <img
                        alt="Watermark Compass"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSBtL4nPwCpo5P272oO9el6CI5ZNbobnQfxWccqf1IC9rkj4Zea1EYHFpruPd8l-8gz4MplCg_SaGMzWUvoONIS72ySywR-n2F752VFVyDdF8d1W-ycWMpk6brywKXw31wUpI6KBdlv99g0VRlyQ0bYpg6Baeq27ZdwyNuQ_Yobr_g0aMHg0Q8EsekHjapG4XIGQMkGwNB30kGyvLAQ5tT-BThme_xN4mQHWEvbw_IYVy3dyohXAuagA"
                        className="absolute w-48 h-48 opacity-25 select-none animate-spin-slow pointer-events-none"
                      />

                      {/* Skyscraper Cutout */}
                      <img
                        alt="Modern Residential Tower Cutout"
                        src="/images/skyscraper-cutout.png"
                        className="relative z-10 h-full w-auto object-contain filter drop-shadow-xl transform hover:scale-105 transition-transform duration-300"
                      />

                      {/* Cardinal Zone Indicator Overlay */}
                      <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-md rounded-xl p-2 text-white text-[10px] flex items-center justify-between z-20">
                        <span className="font-semibold flex items-center gap-1 text-emerald-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          Ishanya (NE) Water
                        </span>
                        <span className="font-mono text-amber-200">22.5° Slices</span>
                      </div>
                    </div>

                    {/* Bottom Quick Stats */}
                    <div className="mt-4 pt-3 border-t border-[#f0dfcb] grid grid-cols-3 text-center text-xs">
                      <div>
                        <span className="block font-serif font-bold text-[#4a240c] text-sm">16</span>
                        <span className="text-[10px] text-[#86736b]">Cardinal Zones</span>
                      </div>
                      <div className="border-x border-[#f0dfcb]">
                        <span className="block font-serif font-bold text-[#166534] text-sm">100%</span>
                        <span className="text-[10px] text-[#86736b]">Non-Destructive</span>
                      </div>
                      <div>
                        <span className="block font-serif font-bold text-[#7a3e1e] text-sm">0.0°</span>
                        <span className="text-[10px] text-[#86736b]">True North</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 2: SCROLL-DRIVEN 5-FRAME VASTU TRANSFORMATION SHOWCASE     */}
        {/* ================================================================== */}
        <section
          ref={scrollSectionRef}
          className="py-16 sm:py-24 bg-gradient-to-b from-[#fcfaf6] via-[#f7f0e3] to-[#fcfaf6] border-b border-[#ecd9c6] relative overflow-hidden"
          id="vastu-frames"
        >
          <div className="max-w-7xl xl:max-w-screen-2xl 2xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#7a3e1e] bg-[#ffdea7]/60 px-3.5 py-1 rounded-full border border-[#ecd9c6]">
                Interactive Frame-by-Frame Scrollytelling
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#4a240c]">
                How Vastu Science Works: The 5-Frame Verification Journey
              </h2>
              <p className="text-xs sm:text-sm text-[#53433c] leading-relaxed">
                Scroll through the 5 architectural phases below, or tap any frame step to experience how satellite data transforms into certified energetic peace.
              </p>
            </div>

            {/* Frame Scrubber / Step Controller */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
              {VASTU_FRAMES.map((f, idx) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    setActiveFrame(idx);
                    setIsPlaying(false);
                  }}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-2xs ${
                    activeFrame === idx
                      ? 'bg-[#7a3e1e] text-white shadow-md scale-105'
                      : 'bg-white hover:bg-[#faf4ec] text-[#5d2809] border border-[#eedecb]'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${
                      activeFrame === idx ? 'bg-white/20 text-white' : 'bg-[#faf2e6] text-[#7a3e1e]'
                    }`}
                  >
                    0{f.id}
                  </span>
                  <span className="hidden md:inline">{f.subtitle}</span>
                </button>
              ))}

              {/* Play / Pause Toggle */}
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-3 py-2 rounded-xl border border-[#ecd9c6] bg-white hover:bg-[#faf4ec] text-[#5d2809] text-xs font-bold flex items-center gap-1.5 transition shadow-2xs cursor-pointer ml-1"
                title={isPlaying ? 'Pause Auto-Play' : 'Play Auto Sequence'}
              >
                <span className="material-symbols-outlined text-sm">
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
                <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Auto Play'}</span>
              </button>
            </div>

            {/* Main Cinema-Style Frame Presentation Box */}
            <div className="bg-white rounded-3xl border-2 border-[#ecd9c6] shadow-2xl overflow-hidden max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                {/* Left Visual Player (Interactive Animated Screen) */}
                <div
                  className={`lg:col-span-7 bg-gradient-to-br ${curFrame.visualTheme} text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden min-h-[380px] sm:min-h-[440px]`}
                >
                  {/* Subtle Grid / Matrix Pattern */}
                  <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

                  {/* Top Bar of the Frame Screen */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="font-mono text-xs font-bold tracking-wider text-amber-300">
                      {curFrame.phase}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-white">
                      {curFrame.badge}
                    </span>
                  </div>

                  {/* Dynamic Graphic Representation based on Current Frame */}
                  <div className="relative z-10 my-6 flex flex-col items-center justify-center text-center">
                    {activeFrame === 0 && (
                      <div className="relative w-48 h-48 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-300/40 animate-spin-slow"></div>
                        <div className="w-36 h-36 rounded-full bg-white/10 backdrop-blur-sm flex flex-col items-center justify-center border border-white/30 shadow-inner">
                          <span className="material-symbols-outlined text-4xl text-amber-300">satellite_alt</span>
                          <span className="font-mono text-xs font-bold text-white mt-1">TRUE NORTH</span>
                          <span className="text-[10px] text-emerald-400 font-bold">0.00° CALIBRATED</span>
                        </div>
                      </div>
                    )}

                    {activeFrame === 1 && (
                      <div className="relative w-48 h-48 flex items-center justify-center">
                        {/* 16 Radial Rays SVG */}
                        <svg className="w-full h-full" viewBox="0 0 200 200">
                          <circle cx="100" cy="100" r="80" fill="none" stroke="#fdba74" strokeWidth="1" strokeDasharray="3 3"></circle>
                          <circle cx="100" cy="100" r="50" fill="none" stroke="#fdba74" strokeWidth="1"></circle>
                          {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((deg) => (
                            <line
                              key={deg}
                              x1="100"
                              y1="100"
                              x2={100 + 80 * Math.cos((deg * Math.PI) / 180)}
                              y2={100 + 80 * Math.sin((deg * Math.PI) / 180)}
                              stroke="#fdba74"
                              strokeWidth="1.2"
                              opacity="0.8"
                            />
                          ))}
                          <circle cx="100" cy="100" r="16" fill="#7a3e1e" stroke="#fbbf24" strokeWidth="2"></circle>
                          <text x="100" y="104" textAnchor="middle" fill="#fef3c7" fontSize="8" fontWeight="bold">BRAHMA</text>
                        </svg>
                      </div>
                    )}

                    {activeFrame === 2 && (
                      <div className="grid grid-cols-3 gap-2 w-full max-w-xs text-xs font-semibold">
                        <div className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-400/40 text-cyan-200">
                          <span className="block text-[10px] text-cyan-300 uppercase">Jal (NE)</span>
                          <span>Water Prana</span>
                        </div>
                        <div className="p-2 rounded-xl bg-amber-950/60 border border-amber-400/40 text-amber-200">
                          <span className="block text-[10px] text-amber-300 uppercase">Brahma</span>
                          <span>Pure Space</span>
                        </div>
                        <div className="p-2 rounded-xl bg-orange-950/60 border border-orange-400/40 text-orange-200">
                          <span className="block text-[10px] text-orange-300 uppercase">Agni (SE)</span>
                          <span>Hearth Fire</span>
                        </div>
                        <div className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-400/40 text-emerald-200 col-span-3">
                          <span className="block text-[10px] text-emerald-300 uppercase">Prithvi (SW) + Vayu (NW)</span>
                          <span>Solid Earth Foundation &amp; Atmospheric Airflow</span>
                        </div>
                      </div>
                    )}

                    {activeFrame === 3 && (
                      <div className="relative w-52 h-44 flex flex-col items-center justify-center p-3 rounded-2xl bg-black/40 border border-amber-400/40 backdrop-blur-sm space-y-2">
                        <span className="material-symbols-outlined text-3xl text-amber-400">shield</span>
                        <div className="text-center">
                          <span className="text-xs font-bold text-amber-200 block">Brass Waveguide Threshold</span>
                          <span className="text-[10px] text-stone-300">Neutralizes directional deflection without demolition</span>
                        </div>
                        <span className="text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2 py-0.5 rounded-full font-bold">
                          Zero Civil Alterations Required
                        </span>
                      </div>
                    )}

                    {activeFrame === 4 && (
                      <div className="relative w-52 h-44 flex flex-col items-center justify-center p-4 rounded-2xl bg-white/10 border border-emerald-400/50 backdrop-blur-sm space-y-2">
                        <span className="material-symbols-outlined text-3xl text-emerald-300">verified</span>
                        <div className="text-center">
                          <span className="text-xs font-serif font-bold text-emerald-100 block">PP-VR-2026-SERIES</span>
                          <span className="text-[10px] text-emerald-200">Certified 16-Zone PDF Diagram</span>
                        </div>
                        <span className="text-[9px] bg-white text-emerald-950 px-2.5 py-0.5 rounded-full font-bold shadow-xs">
                          Lifelong Verification Provenance
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Navigation Control on the Visual Screen */}
                  <div className="relative z-10 flex items-center justify-between text-xs pt-3 border-t border-white/20">
                    <span className="text-stone-300 text-[11px] font-sans">{curFrame.tagline}</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setActiveFrame((prev) => (prev - 1 + VASTU_FRAMES.length) % VASTU_FRAMES.length)}
                        className="w-7 h-7 rounded-lg bg-white/15 hover:bg-white/30 flex items-center justify-center transition cursor-pointer"
                        title="Previous Frame"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveFrame((prev) => (prev + 1) % VASTU_FRAMES.length)}
                        className="w-7 h-7 rounded-lg bg-white/15 hover:bg-white/30 flex items-center justify-center transition cursor-pointer"
                        title="Next Frame"
                      >
                        ›
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Content Presentation */}
                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4 bg-white">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#7a3e1e] uppercase tracking-wider block mb-1">
                      {curFrame.phase} • Architectural Deep Dive
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#4a240c]">
                      {curFrame.title}
                    </h3>
                    <p className="text-xs text-[#53433c] leading-relaxed mt-2.5">
                      {curFrame.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-[#f2e5d5] space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#86736b] block">
                        Engineered Methodology
                      </span>
                      {curFrame.keyPoints.map((pt, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-[#4a240c]">
                          <span className="material-symbols-outlined text-sm text-[#7a3e1e] shrink-0 mt-0.5">
                            check_circle
                          </span>
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-[#f2e5d5]">
                    <Link
                      href="/properties"
                      className="text-xs text-[#7a3e1e] hover:text-[#5d2809] font-bold flex items-center gap-1 group"
                    >
                      <span>Explore properties verified in this framework</span>
                      <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 3: TWO CREATIVE VISUAL COMPARISON SECTIONS (LEFT IMAGE)    */}
        {/* ================================================================== */}
        <section className="py-16 sm:py-24 bg-white border-b border-[#ecd9c6]">
          <div className="max-w-7xl xl:max-w-screen-2xl 2xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
            {/* Visual Block A: 3D Layered Isometric Cadastre & Flat Certainty */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* Left Visual Card with 3D Effect */}
              <div className="lg:col-span-6 relative">
                <div className="relative rounded-3xl bg-gradient-to-tr from-[#faf4ea] via-white to-[#fbf7f0] border-2 border-[#eedecb] p-6 shadow-xl transform hover:-rotate-1 transition-all duration-300 group">
                  {/* Floating Badges */}
                  <div className="absolute top-4 left-4 bg-[#7a3e1e] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm z-20">
                    SATELLITE 0.0° NORTH
                  </div>
                  <div className="absolute top-4 right-4 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm z-20">
                    FLAT-LEVEL RESOLUTION
                  </div>

                  {/* 3D Visual Art (Building Blueprint Overlay with Compass Rose) */}
                  <div className="relative h-72 sm:h-84 w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#f8f1e5] to-[#eedecb] flex items-center justify-center border border-[#ebd8bf]">
                    <img
                      alt="Cadastral Overlay"
                      src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                      className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-55 group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Glowing Compass Overlay */}
                    <div className="relative z-10 w-44 h-44 rounded-full bg-white/80 backdrop-blur-md border-2 border-[#eedecb] flex items-center justify-center shadow-2xl">
                      <img
                        alt="Compass"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSBtL4nPwCpo5P272oO9el6CI5ZNbobnQfxWccqf1IC9rkj4Zea1EYHFpruPd8l-8gz4MplCg_SaGMzWUvoONIS72ySywR-n2F752VFVyDdF8d1W-ycWMpk6brywKXw31wUpI6KBdlv99g0VRlyQ0bYpg6Baeq27ZdwyNuQ_Yobr_g0aMHg0Q8EsekHjapG4XIGQMkGwNB30kGyvLAQ5tT-BThme_xN4mQHWEvbw_IYVy3dyohXAuagA"
                        className="w-36 h-36 object-contain"
                      />
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-xl bg-[#faf6ee] border border-[#eedecb] text-[11px] text-[#53433c] flex items-center justify-between">
                    <span className="font-semibold text-[#4a240c]">Wing A vs Wing B Differentiation</span>
                    <span className="text-[#7a3e1e] font-mono font-bold">100% Granular</span>
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="lg:col-span-6 space-y-5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7a3e1e] bg-[#ffdea7]/50 px-3 py-1 rounded-full">
                  Visual Pillar 01
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#4a240c]">
                  From Tower-Level Assumptions to Flat-Level Certainty
                </h3>
                <p className="text-xs sm:text-sm text-[#53433c] leading-relaxed">
                  Traditional property portals stamp a single broad &ldquo;North-Facing&rdquo; badge on a building with 200 apartments. But a unit on Wing A facing the North-East receives early ultraviolet prana, while a unit on Wing B facing South-West handles intense afternoon solar heat.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-[#faf6ee] border border-[#ecd9c6] flex items-start gap-3">
                    <span className="material-symbols-outlined text-lg text-[#7a3e1e] shrink-0 mt-0.5">check_box</span>
                    <div>
                      <strong className="text-xs text-[#4a240c] block">Floorplan Series Identification</strong>
                      <p className="text-[11px] text-[#53433c] leading-normal">
                        Every residence is mapped by its exact series number so buyers inspect the actual orientation of their living room, bedrooms, and kitchen.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#faf6ee] border border-[#ecd9c6] flex items-start gap-3">
                    <span className="material-symbols-outlined text-lg text-[#7a3e1e] shrink-0 mt-0.5">check_box</span>
                    <div>
                      <strong className="text-xs text-[#4a240c] block">0.0° Cadastral True North Baseline</strong>
                      <p className="text-[11px] text-[#53433c] leading-normal">
                        Municipal satellite geodetic alignment prevents common magnetic deviation errors caused by elevator motors and steel reinforcement.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Block B: 3D Non-Destructive Living & Certified PDF Provenance */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* Left Visual Card with 3D Effect */}
              <div className="lg:col-span-6 relative order-1 lg:order-1">
                <div className="relative rounded-3xl bg-gradient-to-tr from-[#faf4ea] via-white to-[#fbf7f0] border-2 border-[#eedecb] p-6 shadow-xl transform hover:rotate-1 transition-all duration-300 group">
                  {/* Floating Badges */}
                  <div className="absolute top-4 left-4 bg-emerald-700 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm z-20">
                    ZERO WALL BREAKING
                  </div>
                  <div className="absolute top-4 right-4 bg-[#ffdea7] text-[#5d2809] border border-[#e4c48f] text-[10px] font-bold px-3 py-1 rounded-full shadow-sm z-20">
                    CRYPTOGRAPHIC CERTIFICATE
                  </div>

                  {/* 3D Visual Art (Architectural Interior & Vastu Grid) */}
                  <div className="relative h-72 sm:h-84 w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#f8f1e5] to-[#eedecb] flex items-center justify-center border border-[#ebd8bf]">
                    <img
                      alt="Vedic Living Room"
                      src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80"
                      className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-50 group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Overlay Certified Report Card */}
                    <div className="relative z-10 w-5/6 max-w-sm rounded-2xl bg-white/95 backdrop-blur-md p-4 border border-[#ecd9c6] shadow-xl text-left space-y-2.5">
                      <div className="flex items-center justify-between border-b border-[#f3e7da] pb-2">
                        <span className="font-serif font-bold text-xs text-[#4a240c]">
                          PragyaaProp Certified 16-Zone Report
                        </span>
                        <span className="text-[9px] font-bold bg-[#e6f4ea] text-[#137333] px-2 py-0.5 rounded-full">
                          AUDIT UNLOCKED
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="p-2 rounded-lg bg-[#faf6ee]">
                          <span className="text-[#86736b] block text-[9px] uppercase font-bold">Pancha Tattva</span>
                          <span className="font-bold text-[#166534]">Water / Fire Balanced</span>
                        </div>
                        <div className="p-2 rounded-lg bg-[#faf6ee]">
                          <span className="text-[#86736b] block text-[9px] uppercase font-bold">Ledger ID</span>
                          <span className="font-mono font-bold text-[#7a3e1e]">MANDALA-16Z</span>
                        </div>
                      </div>
                      <div className="text-[10px] text-stone-500 italic">
                        Permanent PDF downloadable via demo credit or single property pass.
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-xl bg-[#faf6ee] border border-[#eedecb] text-[11px] text-[#53433c] flex items-center justify-between">
                    <span className="font-semibold text-[#4a240c]">Remedy Type:</span>
                    <span className="text-emerald-800 font-bold">Non-Destructive Threshold Seals</span>
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="lg:col-span-6 space-y-5 order-2 lg:order-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7a3e1e] bg-[#ffdea7]/50 px-3 py-1 rounded-full">
                  Visual Pillar 02
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#4a240c]">
                  100% Non-Destructive Living &amp; Certified Peace of Mind
                </h3>
                <p className="text-xs sm:text-sm text-[#53433c] leading-relaxed">
                  Homeownership should be joyful, not anxious. We eliminate superstition and structural demolition. When an apartment has secondary areas requiring alignment, our advisors specify subtle, non-destructive remedies that respect your home’s aesthetic.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-[#faf6ee] border border-[#ecd9c6] text-center">
                    <span className="text-xl font-serif font-bold text-[#166534] block">Aligned</span>
                    <span className="text-[10px] text-[#53433c] mt-0.5 block">Naturally in harmony with primary orientations</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#faf6ee] border border-[#ecd9c6] text-center">
                    <span className="text-xl font-serif font-bold text-[#b06000] block">Balanced</span>
                    <span className="text-[10px] text-[#53433c] mt-0.5 block">Solid everyday living with practical layout</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#faf6ee] border border-[#ecd9c6] text-center">
                    <span className="text-xl font-serif font-bold text-[#c5221f] block">Adaptable</span>
                    <span className="text-[10px] text-[#53433c] mt-0.5 block">Flexible with pre-calculated non-destructive remedies</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 4: WHAT IS "QUICK PREVIEW" VS "FULL PROPERTY AUDIT"?       */}
        {/* ================================================================== */}
        <section className="py-14 sm:py-20 bg-[#faf6ee] border-b border-[#ecd9c6]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7a3e1e] bg-[#ffdea7]/60 px-3 py-1 rounded-full">
                Platform Architecture Explained
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#4a240c]">
                Quick Preview vs Full Property Audit
              </h2>
              <p className="text-xs sm:text-sm text-[#53433c]">
                We designed two complementary ways to evaluate residential flats based on where you are in your buying journey.
              </p>
            </div>

            {/* Toggle Tabs */}
            <div className="flex justify-center">
              <div className="bg-white p-1 rounded-2xl border border-[#eedecb] inline-flex shadow-xs">
                <button
                  type="button"
                  onClick={() => setDemoPreviewTab('quick')}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    demoPreviewTab === 'quick'
                      ? 'bg-[#7a3e1e] text-white shadow-xs'
                      : 'text-[#5d2809] hover:bg-[#faf6ee]'
                  }`}
                >
                  01. Quick Spec Preview (Modal)
                </button>
                <button
                  type="button"
                  onClick={() => setDemoPreviewTab('full')}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    demoPreviewTab === 'full'
                      ? 'bg-[#7a3e1e] text-white shadow-xs'
                      : 'text-[#5d2809] hover:bg-[#faf6ee]'
                  }`}
                >
                  02. Full Property Page &amp; PDF Report
                </button>
              </div>
            </div>

            {/* Tab Details Card */}
            <div className="bg-white rounded-3xl border border-[#eedecb] p-6 sm:p-8 shadow-sm">
              {demoPreviewTab === 'quick' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#7a3e1e] bg-[#ffdea7]/50 px-2.5 py-0.5 rounded">
                      On-Page Modal Overlay
                    </span>
                    <h3 className="text-xl font-serif font-bold text-[#4a240c]">
                      Fast, In-Context Specification Inspection
                    </h3>
                    <p className="text-xs text-[#53433c] leading-relaxed">
                      While browsing through the 5-stage discovery journey (City &rarr; Location &rarr; Project &rarr; Wing &rarr; Flat), clicking <strong>&ldquo;Quick Spec Preview&rdquo;</strong> instantly pops up an in-place modal.
                    </p>
                    <ul className="space-y-1.5 text-xs text-[#4a240c]">
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-[#7a3e1e]">check</span>
                        <span>Reveals the confidential architectural Series Number</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-[#7a3e1e]">check</span>
                        <span>Displays qualitative Vastu Status (Aligned / Balanced / Adaptable)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-[#7a3e1e]">check</span>
                        <span>Keeps your spot in the discovery hierarchy without leaving the page</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#faf6ee] border border-[#ecd9c6] text-xs space-y-2.5">
                    <div className="flex items-center justify-between border-b border-[#ebd8bf] pb-2">
                      <span className="font-mono font-bold text-[#4a240c]">PP CODE: A001</span>
                      <span className="text-[10px] font-bold bg-[#e6f4ea] text-[#137333] px-2 py-0.5 rounded-full">
                        Aligned
                      </span>
                    </div>
                    <div className="space-y-1 text-[11px] text-[#53433c]">
                      <div><strong>Configuration:</strong> 2 BHK in Wing A</div>
                      <div><strong>Series Revealed:</strong> Series #1 (North-East Facing)</div>
                      <div><strong>Next Step:</strong> Click &ldquo;Explore Flat &amp; Unlock PDF&rdquo; to access the full 16-zone report.</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded">
                      Complete Property Experience
                    </span>
                    <h3 className="text-xl font-serif font-bold text-[#4a240c]">
                      Deep Spatial Audit with 1-Credit PDF Unlock
                    </h3>
                    <p className="text-xs text-[#53433c] leading-relaxed">
                      Clicking <strong>&ldquo;Explore Flat &amp; Unlock PDF Report&rdquo;</strong> opens the full property detail page. Here you receive the complete scientific assessment and download your certified 16-zone diagram.
                    </p>
                    <ul className="space-y-1.5 text-xs text-[#4a240c]">
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-[#7a3e1e]">check</span>
                        <span>Interactive 8-direction spider radar chart with live score polygon</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-[#7a3e1e]">check</span>
                        <span>Instant unlock using 1 demo credit (or single property pass)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-[#7a3e1e]">check</span>
                        <span>Download high-resolution official 16-Zone PDF diagram with print/save support</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-5 rounded-2xl bg-gradient-to-br from-[#f0f9f3] to-white border border-[#bce8cb] text-xs space-y-3">
                    <div className="flex items-center gap-2 text-emerald-900 font-bold">
                      <span className="material-symbols-outlined text-xl text-emerald-600">file_download</span>
                      <span>Certified 16-Zone PDF Diagram Active</span>
                    </div>
                    <p className="text-[11px] text-[#53433c]">
                      Includes serialized certificate number, Pancha Tattva breakdown, and room-by-room radar scores.
                    </p>
                    <Link
                      href="/properties"
                      className="block text-center bg-[#7a3e1e] hover:bg-[#5d2809] text-white py-2 px-4 rounded-xl text-xs font-bold transition shadow-xs"
                    >
                      Try Unlocking a Flat Report Now →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 5: EXPERT CONSULTATION & NEXT STEPS                        */}
        {/* ================================================================== */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#faf6ee] via-white to-[#faf6ee] border border-[#ecd9c6] shadow-sm text-center space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-[#ffdea7]/50 text-[#7a3e1e] flex items-center justify-center mx-auto border border-[#ecd9c6] shadow-2xs">
                <span className="material-symbols-outlined text-2xl">support_agent</span>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7a3e1e] bg-[#ffdea7]/60 px-3 py-1 rounded-full">
                  Personalized Guidance
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#4a240c]">
                  Ready to Find Your Auspicious Residence?
                </h2>
                <p className="text-xs sm:text-sm text-[#53433c] max-w-xl mx-auto leading-relaxed">
                  Explore verified catalog flats or speak directly with our Vedic architects to compare floorplans, analyze room orientations, and ensure lasting peace of mind.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-3 items-center justify-center">
                <Link
                  href="/properties"
                  className="bg-[#7a3e1e] hover:bg-[#5d2809] text-white px-7 py-3 rounded-xl text-xs sm:text-sm font-bold transition shadow-sm inline-flex items-center gap-2 active:scale-95 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">explore</span>
                  <span>Browse Flats by Wing</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setIsConsultOpen(true)}
                  className="bg-white hover:bg-[#faf6ee] text-[#5d2809] border border-[#ecd9c6] px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition shadow-xs inline-flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">support_agent</span>
                  <span>Request Consultation</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Vastu AI widget */}
      <VastuAiWidget propertyTitle="About PragyaaProp & Vastu Architecture" />

      {/* Footer */}
      <Footer />

      {/* Reusable Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultOpen}
        onClose={() => setIsConsultOpen(false)}
        preferredExpert="Vedic Architecture Advisor"
      />
    </div>
  );
}