'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VastuAiWidget from '@/components/common/VastuAiWidget';
import ConsultationModal from '@/components/common/ConsultationModal';
import SiteVisitModal from '@/components/common/SiteVisitModal';
import ReportUnlockModal from '@/components/common/ReportUnlockModal';
import VastuReportPdfModal from '@/components/common/VastuReportPdfModal';
import VastuAuditModal from '@/components/common/VastuAuditModal';
import { useToast } from '@/context/ToastContext';
import { useCredits } from '@/context/CreditsContext';
import { useProperties } from '@/context/PropertiesContext';
import { Property } from '@/types';

export default function HomePage() {
  const { showToast } = useToast();
  const { credits, deductCredit, isPropertyUnlocked } = useCredits();
  const { properties } = useProperties();

  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const [siteVisitProperty, setSiteVisitProperty] = useState<string | null>(null);
  const [unlockProperty, setUnlockProperty] = useState<string | null>(null);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isVastuAuditModalOpen, setIsVastuAuditModalOpen] = useState(false);
  const [auditModalTab, setAuditModalTab] = useState<'audit' | 'how-it-works' | 'scoring' | 'sample-report'>('audit');
  const [activeTypology, setActiveTypology] = useState<string>('All Properties');
  const [savedProps, setSavedProps] = useState<Record<string, boolean>>({});

  // Preview Modal state
  const [previewProperty, setPreviewProperty] = useState<Property | null>(null);

  const toggleFavorite = (id: string, title: string) => {
    setSavedProps((prev) => {
      const newState = !prev[id];
      if (newState) {
        showToast(`Saved ${title} to your Auspicious Favorites`);
      } else {
        showToast(`Removed ${title} from Favorites`);
      }
      return { ...prev, [id]: newState };
    });
  };

  const starProperty = properties.find((p) => p.featured) || properties[0];

  // Dynamic Featured Vastu-Verified Properties computed from active catalog & admin toggles
  const displayedFeaturedProperties = React.useMemo(() => {
    let list = [...properties];

    if (activeTypology === '3 BHK Condos') {
      list = list.filter((p) => p.bhk.includes('3') || p.propertyType === 'Apartment');
    } else if (activeTypology === 'Villas & Penthouses') {
      list = list.filter(
        (p) =>
          p.propertyType === 'Villa' ||
          p.propertyType === 'Penthouse' ||
          p.propertyType === 'Independent House' ||
          p.bhkNum >= 4
      );
    } else if (activeTypology === 'Ready to Move') {
      list = list.filter((p) => (p.possession || '').toLowerCase().includes('ready'));
    } else if (activeTypology === 'Highest Vastu Score (9.0+)') {
      list = list.filter((p) => p.vastuScore >= 9.0);
    }

    // Sort: Featured on Homepage first, then by Vastu score descending
    list.sort((a, b) => {
      const aFeat = a.featured ? 1 : 0;
      const bFeat = b.featured ? 1 : 0;
      if (bFeat !== aFeat) return bFeat - aFeat;
      return b.vastuScore - a.vastuScore;
    });

    return list.slice(0, 4);
  }, [properties, activeTypology]);

  return (
    <>
      {/* Top Navbar matching Stitch Image 20 & Image 2 */}
      <Navbar showPanorama={true} showSearchBar={true} />

      <main className="grow">
        {/* ======================================================== */}
        {/* HERO SECTION WITH EMERGING CENTERPIECE SKYSCRAPER        */}
        {/* ======================================================== */}
        <section
          className="relative overflow-hidden pt-8 pb-14 lg:pt-12 lg:pb-16 border-b border-[#d8c2b9]/30 min-h-[640px] xl:min-h-[700px] 2xl:min-h-[760px] flex items-center bg-[#fbf9f5]"
        >
          {/* Centered Skyscraper Building: Freestanding & Clean on natural background with full transparency cutout */}
          <div className="absolute inset-x-0 bottom-0 top-4 flex items-end justify-center pointer-events-none select-none z-10 overflow-hidden">
            <img
              alt="Sunrise Residency Luxury Vedic Vastu Skyscraper Architecture"
              className="h-full max-h-[720px] xl:max-h-[780px] 2xl:max-h-[820px] w-auto max-w-none object-contain object-bottom drop-shadow-2xl"
              src="/images/skyscraper-cutout.png"
            />
          </div>

          {/* Layer 3: Foreground Overlapping Elements with wide screen spanning */}
          <div className="max-w-7xl xl:max-w-screen-2xl 2xl:max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-12 w-full relative z-20 pointer-events-none">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[580px] xl:min-h-[640px]">
              {/* Left Foreground: Value Proposition, Badges, and Stats */}
              <div className="lg:col-span-5 xl:col-span-5 2xl:col-span-4 space-y-5 py-4 pointer-events-auto bg-transparent border-0 shadow-none">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fdcd75]/40 border border-[#eebf69] text-[#785503] shadow-xs">
                  <span
                    className="material-symbols-outlined text-base fill"
                  >
                    eco
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider font-sans">
                    VEDIC ARCHITECTURE MEETS CONTEMPORARY LIVING
                  </span>
                </div>

                <h1
                  className="text-3xl sm:text-4xl lg:text-[44px] 2xl:text-[48px] font-serif leading-tight tracking-tight font-bold text-[#2b1810]"
                  style={{
                    textShadow:
                      'rgba(255, 255, 255, 0.8) 0px 1px 2px, rgba(43, 24, 16, 0.08) 0px 2px 4px',
                  }}
                >
                  Find a Home that
                  <br />
                  Feels{' '}
                  <span className="italic font-normal text-[#7a3e1e]">
                    Auspiciously Right
                  </span>
                </h1>

                <p className="text-sm sm:text-base leading-relaxed max-w-md font-medium text-[#3d2112]">
                  Discover 100% Vastu-certified luxury homes across India, assessed with precision 16-zone spatial energy audits and verified RERA compliance.
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#eaf7e8] border border-[#a3f69c] text-[#00420c] text-xs font-bold shadow-xs">
                    <span className="material-symbols-outlined text-sm font-bold">check_circle</span>{' '}
                    100% Vastu Certified
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#ffffff] border border-[#d8c2b9] text-[#2b1810] text-xs font-semibold shadow-xs">
                    <span className="material-symbols-outlined text-sm text-[#7a3e1e]">shield</span>{' '}
                    RERA Registered
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#ffffff] border border-[#d8c2b9] text-[#2b1810] text-xs font-semibold shadow-xs">
                    <span className="material-symbols-outlined text-sm text-[#7a3e1e]">balance</span>{' '}
                    Architect & Astrologer Verified
                  </span>
                </div>

                <div className="pt-4 grid grid-cols-3 gap-3 border-t border-[#d8c2b9]/60 max-w-md">
                  <div>
                    <span className="text-xl sm:text-2xl text-[#5d2809] font-bold block font-serif">
                      1,400+
                    </span>
                    <span className="text-xs text-[#53433c]">Verified Homes</span>
                  </div>
                  <div>
                    <span className="text-xl sm:text-2xl text-[#5d2809] font-bold block font-serif">
                      16 Zones
                    </span>
                    <span className="text-xs text-[#53433c]">Pranic Alignment</span>
                  </div>
                  <div>
                    <span className="text-xl sm:text-2xl text-[#5d2809] font-bold block font-serif">
                      100%
                    </span>
                    <span className="text-xs text-[#53433c]">Document Clarity</span>
                  </div>
                </div>

                {/* Wide-screen left flank accent */}
                <div className="hidden 2xl:flex items-center gap-2 pt-2 text-xs font-semibold text-[#664b38]">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                  <span>Geographic True North 0.0° Precision Calibrated</span>
                  <span>•</span>
                  <span>Pranic Solar Vector Aligned</span>
                </div>
              </div>

              {/* Middle spacer for skyscraper centerpiece visibility */}
              <div className="hidden lg:block lg:col-span-2 xl:col-span-2 2xl:col-span-4"></div>

              {/* Right Foreground: Floating Spotlight Card and Energy Mapping Card */}
              <div className="lg:col-span-5 xl:col-span-5 2xl:col-span-4 space-y-4 py-4 pointer-events-auto flex flex-col justify-center items-end">
                {/* Star Property Card */}
                <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl border border-[#ffdea7] shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group/card">
                  <div className="p-5 pb-3 border-b border-[#d8c2b9]/30 flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="bg-[#a3f69c]/90 text-[#00420c] text-[10px] font-bold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">check</span> Vastu Certified
                        </span>
                        <span className="bg-[#eae8e4] text-[#1b1c1a] text-[10px] font-medium px-2 py-0.5 rounded">
                          RERA Approved
                        </span>
                      </div>
                      <h3 className="text-lg font-bold font-serif text-[#5d2809]">
                        {starProperty.title}
                      </h3>
                      <p className="text-xs text-[#53433c] flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-xs text-[#7a3e1e]">location_on</span>{' '}
                        {starProperty.location}
                      </p>
                    </div>
                    <div className="bg-white rounded-xl p-2.5 border-2 border-[#ffdea7] shadow-sm text-center min-w-[70px]">
                      <span className="block text-[10px] font-bold text-[#7b5807] uppercase leading-none mb-1">
                        SCORE
                      </span>
                      <span className="text-lg font-bold text-[#5d2809] leading-none font-serif">
                        {starProperty.vastuScore}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 pt-3 space-y-3.5">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs text-[#86736b]">Premium 3 BHK • Ready to Move</span>
                      <div className="text-right">
                        <span className="text-[10px] text-[#86736b] block leading-none">All Inclusive</span>
                        <span className="text-base font-bold text-[#5d2809] font-serif">
                          {starProperty.price}
                        </span>
                      </div>
                    </div>

                    <div className="bg-[#f5f3ef] p-2.5 rounded-lg border border-[#d8c2b9]/40 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between text-[#00420c] font-semibold">
                        <span className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-base">check_circle</span> North Entrance (Kuber Zone)
                        </span>
                        <span className="text-[10px] bg-[#fdcd75]/30 text-[#785503] px-2 py-0.5 rounded font-bold">
                          Balanced
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[#53433c]">
                        <span className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-base text-[#00420c]">check_circle</span> Jalnaya Water Alignment
                        </span>
                        <span className="text-[10px] text-[#00420c] bg-[#a3f69c]/30 px-2 py-0.5 rounded font-bold">
                          Grade A+
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/properties/${starProperty.slug}`}
                      className="w-full bg-[#5d2809] hover:bg-[#7a3e1e] text-white py-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all duration-150 active:scale-95 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-base">home</span>
                      <span>View Full Property Details</span>
                    </Link>
                  </div>
                </div>

                {/* 16-Zone Energy Mapping Floating Card */}
                <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-xl p-3.5 border border-[#d8c2b9]/50 shadow-xs flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-[#fdcd75]/40 flex items-center justify-center text-[#7a3e1e]">
                      <span className="material-symbols-outlined text-xl">settings</span>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-[#5d2809]">16-Zone Energy Mapping</span>
                      <span className="text-[11px] text-[#53433c]">Zero uncontrollable structural faults</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#5d2809] text-lg">verified</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* BROWSE BY AUSPICIOUS TYPOLOGY                            */}
        {/* ======================================================== */}
        <section className="py-12 bg-[#fbf9f5]">
          <div className="max-w-7xl xl:max-w-screen-2xl 2xl:max-w-[1720px] mx-auto px-6 sm:px-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs text-[#7a3e1e] font-bold uppercase tracking-widest block mb-1">
                  Spatial Archetypes
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#5d2809] font-bold">
                  Browse by Auspicious Typology
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#53433c] max-w-md">
                Every property typology is verified against the directional cardinal axes to nurture health, wealth, and family harmony.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                href="/properties?type=Apartment"
                className="bg-white p-5 rounded-xl border border-[#d8c2b9]/60 hover:border-[#5d2809]/50 hover:shadow-md transition-all duration-200 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#eae8e4] flex items-center justify-center text-[#5d2809] group-hover:bg-[#7a3e1e] group-hover:text-white transition-colors mb-3">
                  <span className="material-symbols-outlined text-2xl">apartment</span>
                </div>
                <h3 className="text-base font-serif text-[#5d2809] font-bold mb-1">
                  Residential Apartments
                </h3>
                <p className="text-xs text-[#53433c]">East & North orientation focus</p>
                <span className="text-xs font-bold text-[#7a3e1e] mt-3 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Browse 420+ Units <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </span>
              </Link>

              <Link
                href="/properties?type=Villa"
                className="bg-white p-5 rounded-xl border border-[#d8c2b9]/60 hover:border-[#5d2809]/50 hover:shadow-md transition-all duration-200 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#eae8e4] flex items-center justify-center text-[#5d2809] group-hover:bg-[#7a3e1e] group-hover:text-white transition-colors mb-3">
                  <span className="material-symbols-outlined text-2xl">villa</span>
                </div>
                <h3 className="text-base font-serif text-[#5d2809] font-bold mb-1">
                  Luxury Villas & Plots
                </h3>
                <p className="text-xs text-[#53433c]">Pristine Brahmasthan centers</p>
                <span className="text-xs font-bold text-[#7a3e1e] mt-3 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Browse 180+ Plots <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </span>
              </Link>

              <Link
                href="/properties?type=Commercial"
                className="bg-white p-5 rounded-xl border border-[#d8c2b9]/60 hover:border-[#5d2809]/50 hover:shadow-md transition-all duration-200 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#eae8e4] flex items-center justify-center text-[#5d2809] group-hover:bg-[#7a3e1e] group-hover:text-white transition-colors mb-3">
                  <span className="material-symbols-outlined text-2xl">storefront</span>
                </div>
                <h3 className="text-base font-serif text-[#5d2809] font-bold mb-1">
                  Commercial Spaces
                </h3>
                <p className="text-xs text-[#53433c]">Optimized for capital growth & trade</p>
                <span className="text-xs font-bold text-[#7a3e1e] mt-3 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Browse 95+ Offices <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </span>
              </Link>

              <Link
                href="/properties?type=Penthouse"
                className="bg-white p-5 rounded-xl border border-[#d8c2b9]/60 hover:border-[#5d2809]/50 hover:shadow-md transition-all duration-200 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#eae8e4] flex items-center justify-center text-[#5d2809] group-hover:bg-[#7a3e1e] group-hover:text-white transition-colors mb-3">
                  <span className="material-symbols-outlined text-2xl">roofing</span>
                </div>
                <h3 className="text-base font-serif text-[#5d2809] font-bold mb-1">
                  Penthouse Suites
                </h3>
                <p className="text-xs text-[#53433c]">Panoramic celestial skylines</p>
                <span className="text-xs font-bold text-[#7a3e1e] mt-3 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Browse 64+ Suites <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* CORE FEATURED VASTU-VERIFIED PROPERTIES SECTION          */}
        {/* ======================================================== */}
        <section className="scroll-mt-28 py-14 bg-[#f5f3ef] border-t border-[#d8c2b9]/30" id="explore">
          <div className="max-w-7xl xl:max-w-screen-2xl 2xl:max-w-[1720px] mx-auto px-6 sm:px-10">
            <div className="space-y-4 mb-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <span className="text-xs text-[#7a3e1e] font-bold uppercase tracking-widest block mb-1">
                    Certified Listings
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif text-[#5d2809] font-bold">
                    Featured Vastu-Verified Properties
                  </h2>
                </div>
                <Link
                  href="/properties"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#5d2809] hover:text-[#7a3e1e]"
                >
                  <span>View All 1,400+ Properties</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              </div>

              {/* Filter Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {['All Properties', '3 BHK Condos', 'Villas & Penthouses', 'Ready to Move', 'Highest Vastu Score (9.0+)'].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveTypology(tab);
                        showToast(`Showing: ${tab}`);
                      }}
                      className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                        activeTypology === tab
                          ? 'bg-[#7a3e1e] text-white shadow-xs'
                          : 'bg-white hover:bg-[#eae8e4] text-[#53433c] border border-[#d8c2b9]/60'
                      }`}
                    >
                      {tab}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Property Grid: Featured Vastu-Verified Properties dynamically synced with Admin and Typology */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedFeaturedProperties.length === 0 ? (
                <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-[#d8c2b9]/60 p-6 space-y-2">
                  <span className="text-3xl">✨</span>
                  <p className="text-base font-serif font-bold text-[#5d2809]">No properties currently match this category</p>
                  <button
                    onClick={() => setActiveTypology('All Properties')}
                    className="text-xs text-[#7a3e1e] underline font-bold cursor-pointer"
                  >
                    View All Properties
                  </button>
                </div>
              ) : (
                displayedFeaturedProperties.map((prop, idx) => (
                  <div
                    key={prop.id}
                    className={`bg-white rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden relative group ${
                      prop.featured
                        ? 'border-amber-400 ring-1 ring-amber-400/40'
                        : idx === 0
                        ? 'border-2 border-[#ffdea7]'
                        : 'border-[#d8c2b9]/60'
                    }`}
                  >
                    <div className="relative h-48 overflow-hidden bg-[#dbdad6]">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        alt={prop.title}
                        src={prop.heroImage}
                      />
                      <div className="absolute top-2.5 left-2.5 bg-[#a3f69c] text-[#00420c] text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-xs z-10">
                        <span className="material-symbols-outlined text-xs">check</span> 100% Vastu Certified
                      </div>

                      {prop.featured && (
                        <div className="absolute top-2.5 right-12 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs flex items-center gap-1 z-10">
                          <span className="material-symbols-outlined text-xs">star</span> Featured
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => toggleFavorite(prop.id, prop.title)}
                        className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-[#1b1c1a] hover:text-red-500 transition-colors cursor-pointer z-10"
                        title="Save property"
                      >
                        <span
                          className={`material-symbols-outlined text-base ${
                            savedProps[prop.id] ? 'text-red-500 fill' : ''
                          }`}
                        >
                          favorite
                        </span>
                      </button>
                      <div className="absolute bottom-2.5 right-2.5 bg-white/95 px-2 py-1 rounded text-[10px] font-bold text-[#5d2809] shadow-xs z-10">
                        Score: {prop.vastuScore}/10
                      </div>
                    </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#86736b] mb-1">
                        <span>{prop.location}</span>
                        <span className="text-[#00420c] font-semibold">{prop.vastuGrade}</span>
                      </div>
                      <h3 className="text-base font-serif text-[#5d2809] font-bold leading-tight group-hover:text-[#7a3e1e] transition-colors">
                        <Link href={`/properties/${prop.slug}`}>{prop.title}</Link>
                      </h3>
                      <p className="text-xs text-[#53433c] mt-1">
                        {prop.bhk} • {prop.sqft} • {prop.possession}
                      </p>
                    </div>

                    <div className="bg-[#f5f3ef] px-2.5 py-1.5 rounded border border-[#d8c2b9]/40 flex items-center justify-between text-xs">
                      <span className="text-[#53433c] font-medium">Harmony:</span>
                      <span className="text-[#785503] font-bold">{prop.vastuStatus}</span>
                    </div>

                    <div className="pt-2 border-t border-[#d8c2b9]/40 flex items-center justify-between">
                      <div>
                        <span className="block text-[10px] text-[#86736b]">Price</span>
                        <span className="text-base font-bold text-[#7a3e1e] font-serif">
                          {prop.price}
                        </span>
                      </div>
                      <Link
                        href={`/properties/${prop.slug}`}
                        className="bg-[#7a3e1e] hover:bg-[#5d2809] text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>Details</span>
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )))
            }
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 16-ZONE SCIENTIFIC AUDIT PROCESS SECTION                 */}
        {/* ======================================================== */}
        <section className="scroll-mt-28 py-16 bg-[#fbf9f5]" id="audit">
          <div className="max-w-7xl xl:max-w-screen-2xl 2xl:max-w-[1720px] mx-auto px-6 sm:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs text-[#7a3e1e] font-bold uppercase tracking-widest block">
                  The Science of Vedic Harmony
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#5d2809] leading-tight font-bold">
                  Why Vastu-Verified Homes Matter: <br />
                  <span className="italic font-normal">Our 16-Zone Spatial Energy Audit</span>
                </h2>
                <p className="text-sm sm:text-base text-[#53433c] leading-relaxed">
                  Standard real estate only checks square footage. PragyaaProp superimposes a rigorous 16-directional grid derived from the ancient <em>Mayamatam</em> and <em>Manasara</em> treatises onto modern CAD floorplans.
                </p>

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setAuditModalTab('audit');
                      setIsVastuAuditModalOpen(true);
                    }}
                    className="px-4 py-2.5 bg-[#743b19] hover:bg-[#5e2e12] text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-xs inline-flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">explore</span>
                    <span>Open 16-Zone Interactive Compass</span>
                  </button>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-4 p-3.5 rounded-xl bg-[#f5f3ef] border border-[#d8c2b9]/50">
                    <div className="w-9 h-9 rounded-lg bg-[#fdcd75]/40 text-[#785503] flex items-center justify-center font-bold text-sm shrink-0">
                      01
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#5d2809]">16-Directional Cardinal Mapping</h4>
                      <p className="text-xs text-[#53433c] mt-0.5">
                        We align the exact magnetic north of your building to calibrate 16 distinct angular sub-zones.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-3.5 rounded-xl bg-[#f5f3ef] border border-[#d8c2b9]/50">
                    <div className="w-9 h-9 rounded-lg bg-[#fdcd75]/40 text-[#785503] flex items-center justify-center font-bold text-sm shrink-0">
                      02
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#5d2809]">Elemental Balancing (Pancha Tattva)</h4>
                      <p className="text-xs text-[#53433c] mt-0.5">
                        Verifying Water (NE), Fire (SE), Earth (SW), Air (NW), and Space (Brahmasthan) positions.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-3.5 rounded-xl bg-[#f5f3ef] border border-[#d8c2b9]/50">
                    <div className="w-9 h-9 rounded-lg bg-[#fdcd75]/40 text-[#785503] flex items-center justify-center font-bold text-sm shrink-0">
                      03
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#5d2809]">Remedy-Free vs. Correctable Grading</h4>
                      <p className="text-xs text-[#53433c] mt-0.5">
                        Clear transparency: We explicitly flag structural immovable faults versus simple non-invasive cures.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Live Sample 16-Zone Analysis Card matching Stitch */}
              <div className="lg:col-span-6">
                <div className="bg-white rounded-2xl border border-[#d8c2b9] p-6 shadow-md relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-[#d8c2b9]/50 pb-4 mb-4">
                    <div>
                      <h3 className="text-base font-bold font-serif text-[#5d2809]">
                        16-Zone Analysis (Live Sample)
                      </h3>
                      <p className="text-xs text-[#53433c]">Sunrise Residency - Unit 402</p>
                    </div>
                    <div className="bg-[#a3f69c]/30 text-[#00420c] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">verified</span> Certified Audit
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f5f3ef]">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#00420c] text-lg">check_circle</span>
                        <span className="text-xs font-medium text-stone-900">
                          Main Entrance (N/NE - Kuber Gate)
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#00420c]">9.5 / 10</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f5f3ef]">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#00420c] text-lg">check_circle</span>
                        <span className="text-xs font-medium text-stone-900">
                          Living & Dining Hall (East - Solar Surge)
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#00420c]">9.0 / 10</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f5f3ef]">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#00420c] text-lg">check_circle</span>
                        <span className="text-xs font-medium text-stone-900">
                          Master Bedroom (SW - Stability Axis)
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#00420c]">8.5 / 10</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f5f3ef]">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#7b5807] text-lg">warning</span>
                        <span className="text-xs font-medium text-stone-900">
                          Kitchen Cooktop (SE - Agni Node)
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#7b5807]">7.5 / 10</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f5f3ef]">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#00420c] text-lg">check_circle</span>
                        <span className="text-xs font-medium text-stone-900">
                          Children’s Bedroom (West - Vayu Orbit)
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#00420c]">8.5 / 10</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#d8c2b9]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#fdcd75]/40 flex items-center justify-center text-[#7a3e1e]">
                        <span className="material-symbols-outlined text-xl">picture_as_pdf</span>
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-[#5d2809]">Full 18-Page PDF Report</span>
                        <span className="text-[11px] text-[#53433c]">Includes architectural remedy stamps</span>
                      </div>
                    </div>
                    {isPropertyUnlocked('sunrise-residency') ? (
                      <button
                        type="button"
                        onClick={() => setIsPdfModalOpen(true)}
                        className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">visibility</span>
                        <span>View 16-Zone PDF Diagram</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setUnlockProperty('Sunrise Residency')}
                        className="w-full sm:w-auto bg-[#7a3e1e] hover:bg-[#5d2809] text-white px-5 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">lock_open</span>
                        <span>Unlock Audit (1 Credit / ₹ 499)</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* HOW IT WORKS: 4-STEP VERIFICATION PROTOCOL SECTION       */}
        {/* ======================================================== */}
        <section className="scroll-mt-28 py-16 bg-[#faf6f0] border-t border-[#d8c2b9]/40" id="how-it-works">
          <div className="max-w-7xl xl:max-w-screen-2xl 2xl:max-w-[1720px] mx-auto px-6 sm:px-10">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <span className="text-xs text-[#7a3e1e] font-bold uppercase tracking-widest block">
                Verification Protocol
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#5d2809] font-bold">
                How PragyaaProp Authenticates Real Estate
              </h2>
              <p className="text-xs sm:text-sm text-[#53433c]">
                Bridging ancient Sthapatya Veda treatises with contemporary CAD engineering for total peace of mind.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  num: '01',
                  title: 'CAD 0.0° North Calibration',
                  desc: 'Satellite cadastral orientation eliminates magnetic compass declination error before analyzing rooms.',
                  icon: 'explore'
                },
                {
                  num: '02',
                  title: '16-Sector Energy Grid',
                  desc: 'Dividing the residence into 22.5° angular arcs to map Water, Air, Fire, Earth, and open Brahmasthan.',
                  icon: 'grid_view'
                },
                {
                  num: '03',
                  title: 'Dual Expert Attestation',
                  desc: 'Reviewed by Vedic Jyotish Acharyas and licensed architects alongside state RERA title checks.',
                  icon: 'verified_user'
                },
                {
                  num: '04',
                  title: 'Serialized PDF Ledger',
                  desc: 'Buyers receive an 18-page cryptographic report with room scores and non-invasive cure stamps.',
                  icon: 'picture_as_pdf'
                }
              ].map((step) => (
                <div
                  key={step.num}
                  className="bg-white rounded-2xl border border-[#ecd9c6] p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-10 h-10 rounded-xl bg-[#faede0] text-[#743b19] font-bold text-sm flex items-center justify-center font-serif">
                        {step.num}
                      </span>
                      <span className="material-symbols-outlined text-[#7a3e1e] text-2xl">
                        {step.icon}
                      </span>
                    </div>
                    <h3 className="text-base font-bold font-serif text-[#4a240c] mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => {
                  setAuditModalTab('how-it-works');
                  setIsVastuAuditModalOpen(true);
                }}
                className="px-6 py-3 bg-[#743b19] hover:bg-[#5e2e12] text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-xs inline-flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">view_carousel</span>
                <span>Open Full Interactive 4-Step Walkthrough</span>
              </button>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* EXPERT PANDITJI CONSULTATION BANNER                      */}
        {/* ======================================================== */}
        <section className="scroll-mt-28 py-12 bg-[#f5f3ef] border-y border-[#d8c2b9]/40" id="consult">
          <div className="max-w-7xl xl:max-w-screen-2xl 2xl:max-w-[1720px] mx-auto px-6 sm:px-10">
            <div className="bg-gradient-to-r from-white via-[#fbf9f5] to-[#f5f3ef] rounded-2xl border border-[#ffdea7] p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-2 border-[#ffdea7] p-1 bg-[#eae8e4] shadow-sm overflow-hidden flex items-center justify-center">
                    <img
                      className="w-full h-full object-cover rounded-full"
                      alt="Elderly Indian Vedic Vastu astrologer and consultant"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoegQuia3iyxz-SQ-iWdct7YdeuXYgAbIPy-84HAMPZVpFuQZ_WGfr3jjI9ZaRPBQp2nVs_JPk3Ha_HP9zlgwt9AO2gApUZ9cVCf-KcBqdDI2M94ikdpynWuJZ9kakhTvWgxrdmEWnmY-yO74iUgNjJ0fbZDZMyee60gTSqCMjaPYqIoIz0aepj76nqiW1jSdxPCQ9kCdTl3IQ6Cn7oauA1eepL_7kATpjOmUyUHHw"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#a3f69c] border-2 border-white flex items-center justify-center text-[#00420c] text-xs">
                    <span className="material-symbols-outlined text-xs font-bold">verified</span>
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#7b5807]">
                    Personalized Astrological Alignment
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-[#5d2809] font-bold">
                    Need Guidance Before Buying?
                  </h3>
                  <p className="text-xs sm:text-sm text-[#53433c] max-w-lg">
                    Book a 1-on-1 virtual or on-site consultation with our verified Vedic Vastu Pandit and senior architectural astrologers.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => setIsConsultOpen(true)}
                  className="w-full sm:w-auto bg-[#7a3e1e] hover:bg-[#5d2809] text-white px-6 py-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all duration-150 active:scale-95 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">calendar_month</span>
                  <span>Book Consultation</span>
                </button>
                <a
                  href="https://wa.me/919820016800?text=Namaste,%20I%20would%20like%20to%20consult%20a%20Vastu%20expert"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-[#005c15] hover:bg-[#00420c] text-white px-5 py-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all duration-150 active:scale-95 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">chat</span>
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* ABOUT PRAGYAAPROP & CONTACT DESK                         */}
        {/* ======================================================== */}
        <section className="scroll-mt-28 py-14 bg-[#fbf9f5] border-t border-[#d8c2b9]/30" id="about">
          <div className="max-w-7xl xl:max-w-screen-2xl 2xl:max-w-[1720px] mx-auto px-6 sm:px-10">
            <div className="bg-[#f5f3ef] rounded-2xl border border-[#d8c2b9]/60 p-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="text-xs text-[#7a3e1e] font-bold uppercase tracking-widest block">
                    About PragyaaProp
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-[#5d2809] font-bold">
                    Pioneering India's 16-Zone Certified Vedic Real Estate
                  </h3>
                  <p className="text-xs sm:text-sm text-[#53433c] leading-relaxed">
                    PragyaaProp bridges traditional Mayamatam & Manasara spatial science with modern RERA compliance, ensuring every home offers verified architectural and energetic harmony for lifelong prosperity.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <div className="px-3.5 py-2 rounded-lg bg-white border border-[#d8c2b9]/50 text-xs font-semibold text-[#5d2809] flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#00420c] text-base">verified</span>
                      <span>Certified Architects & Astrologers</span>
                    </div>
                    <div className="px-3.5 py-2 rounded-lg bg-white border border-[#d8c2b9]/50 text-xs font-semibold text-[#5d2809] flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#00420c] text-base">verified_user</span>
                      <span>100% Genuine RERA Records</span>
                    </div>
                  </div>
                </div>

                <div className="scroll-mt-28 bg-white rounded-xl border border-[#ffdea7] p-6 shadow-xs space-y-4" id="contact">
                  <h4 className="text-base font-bold font-serif text-[#5d2809] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#7a3e1e]">support_agent</span>
                    <span>Get in Touch with our Vastu Desk</span>
                  </h4>
                  <p className="text-xs text-[#53433c]">
                    Have questions regarding property verification, audit reports, or scheduling a visit?
                  </p>
                  <div className="space-y-2 text-xs text-[#1b1c1a]">
                    <div className="flex items-center gap-2.5 p-2 rounded-lg bg-[#f5f3ef]">
                      <span className="material-symbols-outlined text-[#5d2809] text-base">call</span>
                      <span className="font-semibold">+91 98200 16800</span>
                      <span className="text-[10px] text-[#86736b] ml-auto">(9 AM - 8 PM IST)</span>
                    </div>
                    <div className="flex items-center gap-2.5 p-2 rounded-lg bg-[#f5f3ef]">
                      <span className="material-symbols-outlined text-[#5d2809] text-base">mail</span>
                      <span className="font-semibold">support@pragyaaprop.com</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsConsultOpen(true)}
                    className="w-full bg-[#5d2809] hover:bg-[#7a3e1e] text-white py-2.5 rounded-lg text-xs font-semibold transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">chat</span>
                    <span>Start Live Consultation</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Vastu AI widget & WhatsApp button */}
      <VastuAiWidget propertyTitle="Sunrise Residency" />

      {/* Floating Back to Top Button for Sustainable Navigation */}
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

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <ConsultationModal
        isOpen={isConsultOpen}
        onClose={() => setIsConsultOpen(false)}
      />

      <SiteVisitModal
        isOpen={!!siteVisitProperty}
        onClose={() => setSiteVisitProperty(null)}
        propertyTitle={siteVisitProperty || ''}
      />

      <ReportUnlockModal
        isOpen={!!unlockProperty}
        onClose={() => setUnlockProperty(null)}
        propertyTitle={unlockProperty || ''}
        propertySlug="sunrise-residency"
        onUnlocked={() => setIsPdfModalOpen(true)}
      />

      {/* 16-Zone PDF Diagram Modal */}
      <VastuReportPdfModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        property={starProperty || properties[0]}
      />

      {/* 16-Zone Interactive Vastu Audit & Methodology Modal */}
      <VastuAuditModal
        isOpen={isVastuAuditModalOpen}
        onClose={() => setIsVastuAuditModalOpen(false)}
        initialTab={auditModalTab}
      />
    </>
  );
}
