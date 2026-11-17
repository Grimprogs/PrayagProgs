'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VastuAiWidget from '@/components/common/VastuAiWidget';
import LoginModal from '@/components/common/LoginModal';
import ConsultationModal from '@/components/common/ConsultationModal';
import { useToast } from '@/context/ToastContext';
import { useCredits } from '@/context/CreditsContext';
import { useProperties } from '@/context/PropertiesContext';
import {
  ALL_STATES,
  ALL_CITIES,
  STATE_CITIES,
  getStateForCity,
  getCitiesForState,
  getLocalitiesForCity,
} from '@/data/locations';

function ExplorePropertiesContent() {
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const { credits, addCredits } = useCredits();
  const { properties } = useProperties();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);

  // Search Filters with bidirectional City <-> State auto-linking
  const [selectedState, setSelectedState] = useState<string>(() => searchParams.get('state') || 'All');
  const [selectedCity, setSelectedCity] = useState<string>(() => searchParams.get('city') || 'All');
  const [selectedLocality, setSelectedLocality] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>(() => searchParams.get('q') || '');

  // Synchronize state if URL query params update
  useEffect(() => {
    const st = searchParams.get('state');
    const ct = searchParams.get('city');
    const q = searchParams.get('q');
    if (st) setSelectedState(st);
    if (ct) setSelectedCity(ct);
    if (q) setSearchQuery(q);
  }, [searchParams]);

  // Auto-set state when city is selected
  const handleCityChange = (cityName: string) => {
    setSelectedCity(cityName);
    setSelectedLocality('All');
    if (cityName === 'All') {
      showToast(`Viewing all cities in ${selectedState === 'All' ? 'Pan India' : selectedState}`);
      return;
    }
    const autoState = getStateForCity(cityName);
    if (autoState) {
      setSelectedState(autoState);
      showToast(`City: ${cityName} → State: ${autoState}`);
    } else {
      showToast(`City: ${cityName}`);
    }
  };

  // Auto-set city when state is selected
  const handleStateChange = (stateName: string) => {
    setSelectedState(stateName);
    setSelectedCity('All');
    setSelectedLocality('All');
    if (stateName === 'All') {
      showToast('State: All States (Pan India)');
    } else {
      showToast(`State: ${stateName} • Showing all properties in ${stateName}`);
    }
  };

  // Dynamic available localities based on currently selected State & City
  const availableLocalities = useMemo(() => {
    const locSet = new Set<string>();
    properties.forEach((p) => {
      const matchState = selectedState === 'All' || (p.state || '').toLowerCase() === selectedState.toLowerCase();
      const matchCity = selectedCity === 'All' || (p.city || '').toLowerCase() === selectedCity.toLowerCase();
      if (matchState && matchCity && p.locality) {
        locSet.add(p.locality);
      }
    });
    if (selectedCity && selectedCity !== 'All') {
      getLocalitiesForCity(selectedCity).forEach((loc) => locSet.add(loc));
    }
    return Array.from(locSet).sort();
  }, [properties, selectedState, selectedCity]);

  // Sidebar Filters - Open defaults so ALL properties (including newly added ones) are visible
  const [selectedTypes, setSelectedTypes] = useState<string[]>([
    'Apartment',
    'Villa',
    'Independent House',
    'Plot',
    'Penthouse',
  ]);
  const [selectedBhk, setSelectedBhk] = useState<string>('All');
  const [budgetMax, setBudgetMax] = useState<number>(800); // in Lakhs (up to ₹ 8 Cr)
  const [selectedRatings, setSelectedRatings] = useState<string[]>([
    'Inherently Aligned',
    'Functionally Balanced',
    'Remedy-Ready',
  ]);
  const [reraOnly, setReraOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('relevance');
  const [viewLayout, setViewLayout] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [savedCards, setSavedCards] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string, title: string) => {
    setSavedCards((prev) => {
      const isSaved = !prev[id];
      showToast(isSaved ? `Saved ${title} to Auspicious Favorites` : `Removed ${title} from Favorites`);
      return { ...prev, [id]: isSaved };
    });
  };

  const clearAllFilters = () => {
    setSelectedState('All');
    setSelectedCity('All');
    setSelectedLocality('All');
    setSelectedTypes(['Apartment', 'Villa', 'Independent House', 'Plot', 'Penthouse']);
    setSelectedBhk('All');
    setBudgetMax(800);
    setSelectedRatings(['Inherently Aligned', 'Functionally Balanced', 'Remedy-Ready']);
    setReraOnly(false);
    setSearchQuery('');
    showToast('Filters reset: displaying all properties across India');
  };

  // Filtered and Sorted properties - dynamically tracks all filters and `properties` from PropertiesContext
  const filteredProperties = useMemo(() => {
    return properties
      .filter((prop) => {
        // 1. State Filter (Exact geographic matching)
        if (selectedState && selectedState !== 'All') {
          const targetState = selectedState.toLowerCase().trim();
          const propState = (prop.state || '').toLowerCase().trim();
          if (propState !== targetState) {
            return false;
          }
        }

        // 2. City Filter (Exact city matching)
        if (selectedCity && selectedCity !== 'All') {
          const targetCity = selectedCity.toLowerCase().trim();
          const propCity = (prop.city || '').toLowerCase().trim();
          if (propCity !== targetCity) {
            return false;
          }
        }

        // 3. Locality Filter
        if (selectedLocality && selectedLocality !== 'All' && selectedLocality !== 'All Localities') {
          const targetLoc = selectedLocality.toLowerCase().trim();
          const propLoc = (prop.locality || prop.location || '').toLowerCase().trim();
          if (!propLoc.includes(targetLoc)) {
            return false;
          }
        }

        // 4. Type filter
        if (selectedTypes.length > 0 && !selectedTypes.includes(prop.propertyType)) {
          return false;
        }

        // 5. BHK filter
        if (selectedBhk !== 'All') {
          if (selectedBhk === '4+ BHK') {
            if (prop.bhkNum < 4) return false;
          } else if (prop.bhk !== selectedBhk) {
            return false;
          }
        }

        // 6. Budget
        if (prop.priceNumeric / 100000 > budgetMax) {
          return false;
        }

        // 7. Vastu rating
        if (selectedRatings.length > 0 && !selectedRatings.includes(prop.vastuStatus)) {
          return false;
        }

        // 8. RERA filter
        if (reraOnly) {
          const reraText = (prop.reraStatus || '').toLowerCase();
          if (!reraText.includes('registered') && !reraText.includes('verified')) {
            return false;
          }
        }

        // 9. Search Query filter (matches title, location, locality, city, state, bhk, propertyType)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matches =
            prop.title.toLowerCase().includes(q) ||
            prop.location.toLowerCase().includes(q) ||
            prop.locality.toLowerCase().includes(q) ||
            prop.city.toLowerCase().includes(q) ||
            prop.state.toLowerCase().includes(q) ||
            prop.propertyType.toLowerCase().includes(q) ||
            prop.bhk.toLowerCase().includes(q);
          if (!matches) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.priceNumeric - b.priceNumeric;
        if (sortBy === 'price-high') return b.priceNumeric - a.priceNumeric;
        if (sortBy === 'vastu-score') return b.vastuScore - a.vastuScore;
        return 0;
      });
  }, [
    properties,
    selectedState,
    selectedCity,
    selectedLocality,
    selectedTypes,
    selectedBhk,
    budgetMax,
    selectedRatings,
    reraOnly,
    searchQuery,
    sortBy,
  ]);

  return (
    <div className="bg-[#f5f2eb] text-[#2c221e] font-sans antialiased min-h-screen flex flex-col">
      {/* Unified Global Navbar with rich Vastu Audit & How It Works hover megamenus */}
      <Navbar showPanorama={false} showSearchBar={false} activeNav="explore" />

      {/* Atmospheric Vedic Title Banner matching Stitch (z-10 so Navbar popups float on top) */}
      <div className="relative z-10 bg-[#faede0] border-b border-[#ecd9c6] overflow-hidden mt-4 pt-6 pb-6">
        {/* Hero Illustration Overlays: Vedic Temple (Left) and Vastu Compass Rose (Right) */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-40 select-none overflow-hidden">
          {/* Temple Silhouette Illustration (Left) */}
          <svg className="absolute -left-6 bottom-0 h-44 text-[#a66a3d] opacity-50" fill="currentColor" viewBox="0 0 200 160">
            <path d="M70 160V120H50V160H10V100L40 70V50H50V30H60V10L70 0L80 10V30H90V50H100V70L130 100V160H90V120H70Z"></path>
            <path d="M140 160V110L160 90V60H170V40H180V15L190 5L200 15V40H210V60H220L240 110V160H140Z" opacity="0.7"></path>
          </svg>
          {/* Subtle Dune Contours in center */}
          <svg className="absolute inset-x-0 bottom-0 w-full h-24 text-[#e8d5be]" fill="currentColor" preserveAspectRatio="none" viewBox="0 0 1200 120">
            <path d="M0,60 C300,10 600,100 1200,40 L1200,120 L0,120 Z" opacity="0.3"></path>
          </svg>
          {/* Golden Vastu Compass Rose (Right) */}
          <svg className="absolute right-6 -top-4 w-48 h-48 text-[#98582d] opacity-45" fill="none" stroke="currentColor" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80" strokeDasharray="2 2" strokeWidth="1.2"></circle>
            <circle cx="100" cy="100" r="70" strokeWidth="0.8"></circle>
            <polygon fill="currentColor" points="100,16 106,94 100,88 94,94" stroke="none"></polygon>
            <polygon fill="currentColor" points="100,184 106,106 100,112 94,106" stroke="none"></polygon>
            <polygon fill="currentColor" points="184,100 106,106 112,100 106,94" stroke="none"></polygon>
            <polygon fill="currentColor" points="16,100 94,106 88,100 94,94" stroke="none"></polygon>
            <text fill="currentColor" fontFamily="'Cinzel', serif" fontSize="10" fontWeight="bold" x="96" y="12">N</text>
            <text fill="currentColor" fontFamily="'Cinzel', serif" fontSize="10" x="97" y="198">S</text>
            <text fill="currentColor" fontFamily="'Cinzel', serif" fontSize="10" x="190" y="104">E</text>
            <text fill="currentColor" fontFamily="'Cinzel', serif" fontSize="10" x="2" y="104">W</text>
          </svg>
        </div>

        {/* PAGE TITLE AREA & 4 VASTU BADGES */}
        <div className="max-w-7xl xl:max-w-screen-2xl 2xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center text-xs text-[#7d5d48] mb-2 space-x-1.5 font-medium">
            <Link href="/" className="hover:underline">Home</Link>
            <svg className="w-3 h-3 text-[#a88d79]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
            <span className="text-[#51311f] font-semibold">Explore Properties</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#351b0f] tracking-tight">
                Explore Vastu-Verified Properties
              </h1>
              <p className="text-sm md:text-base text-[#6f4b36] mt-1.5 font-medium max-w-2xl font-sans">
                Discover homes aligned with Vastu, verified through our 16-Zone audit and expert assessment.
              </p>
            </div>

            {/* 4 Key Vastu Verification Badges */}
            <div className="bg-white/85 backdrop-blur-sm border border-[#e5d4c3] shadow-sm rounded-xl px-4 py-2.5 flex items-center divide-x divide-[#edd9c7] gap-3 text-xs self-start lg:self-center overflow-x-auto max-w-full">
              <div className="flex items-center gap-2 pr-3 shrink-0">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-[#8e4822]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="M12 3c-1.5 3-4 6-4 9a4 4 0 008 0c0-3-2.5-6-4-9z"></path>
                    <path d="M12 12c-3-2-7-1-9 2 2 3 6 4 9 1z"></path>
                    <path d="M12 12c3-2 7-1 9 2-2 3-6 4-9 1z"></path>
                  </svg>
                </span>
                <div className="leading-tight">
                  <span className="block font-bold text-[#3d2012]">100% Vastu</span>
                  <span className="text-[#785744]">Verified</span>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 shrink-0">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-[#8e4822]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <rect height="17" rx="2" width="14" x="5" y="4"></rect>
                    <path d="M9 9h6M9 13h6M9 17h4"></path>
                    <path d="M9 2h6v3H9z"></path>
                  </svg>
                </span>
                <div className="leading-tight">
                  <span className="block font-bold text-[#3d2012]">16-Zone</span>
                  <span className="text-[#785744]">Analysis</span>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 shrink-0">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-[#8e4822]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="M12 2l7 4v6c0 5-3.5 9.5-7 11-3.5-1.5-7-6-7-11V6l7-4z"></path>
                    <path d="M9 12l2 2 4-4"></path>
                  </svg>
                </span>
                <div className="leading-tight">
                  <span className="block font-bold text-[#3d2012]">RERA</span>
                  <span className="text-[#785744]">Compliant</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pl-3 shrink-0">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-[#8e4822]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <circle cx="12" cy="7" r="4"></circle>
                    <path d="M5.5 21v-2a6.5 6.5 0 0113 0v2"></path>
                  </svg>
                </span>
                <div className="leading-tight">
                  <span className="block font-bold text-[#3d2012]">Expert</span>
                  <span className="text-[#785744]">Guidance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SEARCH BAR SECTION (-mt-4 matching Stitch)               */}
      {/* ======================================================== */}
      <div className="max-w-7xl xl:max-w-screen-2xl 2xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 -mt-4 relative z-20 w-full">
        <div className="bg-white rounded-2xl shadow-md border border-[#e5dcd0] p-2.5 sm:p-3 flex flex-col lg:flex-row items-center gap-3">
          {/* Select State */}
          <div className="w-full lg:w-1/5 flex items-center gap-2.5 px-3 py-2 bg-[#fdfcf9] rounded-xl border border-gray-200">
            <svg className="w-5 h-5 text-[#884e27] shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path clipRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" fillRule="evenodd"></path>
            </svg>
            <div className="flex-1 leading-none">
              <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider block">Select State</span>
              <select
                value={selectedState}
                onChange={(e) => handleStateChange(e.target.value)}
                className="w-full bg-transparent border-0 p-0 text-sm font-bold text-gray-800 focus:ring-0 cursor-pointer"
              >
                <option value="All">All States (Pan India)</option>
                {ALL_STATES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Select City (Auto-links State) */}
          <div className="w-full lg:w-1/5 flex items-center gap-2.5 px-3 py-2 bg-[#fdfcf9] rounded-xl border border-gray-200">
            <svg className="w-5 h-5 text-[#884e27] shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path clipRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" fillRule="evenodd"></path>
            </svg>
            <div className="flex-1 leading-none">
              <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider block">
                Select City <span className="text-[#884e27] font-bold">⚡ Auto-sets State</span>
              </span>
              <select
                value={selectedCity}
                onChange={(e) => handleCityChange(e.target.value)}
                className="w-full bg-transparent border-0 p-0 text-sm font-bold text-gray-800 focus:ring-0 cursor-pointer"
              >
                <option value="All">
                  {selectedState === 'All' ? 'All Cities (Pan India)' : `All Cities in ${selectedState}`}
                </option>
                {selectedState !== 'All' ? (
                  <>
                    <optgroup label={`Cities in ${selectedState}`}>
                      {getCitiesForState(selectedState).map((ct) => (
                        <option key={ct} value={ct}>
                          {ct}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Other States' Cities (Auto-sets State)">
                      {ALL_CITIES.filter((c) => !getCitiesForState(selectedState).includes(c)).map((ct) => (
                        <option key={ct} value={ct}>
                          {ct} ({getStateForCity(ct)})
                        </option>
                      ))}
                    </optgroup>
                  </>
                ) : (
                  ALL_STATES.map((st) => (
                    <optgroup key={st} label={st}>
                      {getCitiesForState(st).map((ct) => (
                        <option key={ct} value={ct}>
                          {ct}
                        </option>
                      ))}
                    </optgroup>
                  ))
                )}
              </select>
            </div>
          </div>

          {/* Select Locality */}
          <div className="w-full lg:w-1/5 flex items-center gap-2.5 px-3 py-2 bg-[#fdfcf9] rounded-xl border border-gray-200">
            <svg className="w-5 h-5 text-[#884e27] shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path clipRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" fillRule="evenodd"></path>
            </svg>
            <div className="flex-1 leading-none">
              <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider block">Select Locality</span>
              <select
                value={selectedLocality}
                onChange={(e) => setSelectedLocality(e.target.value)}
                className="w-full bg-transparent border-0 p-0 text-sm font-bold text-gray-800 focus:ring-0 cursor-pointer"
              >
                <option value="All">All Localities</option>
                {availableLocalities.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Project Input */}
          <div className="w-full lg:flex-1 flex items-center gap-2.5 px-3.5 py-2.5 bg-[#fdfcf9] rounded-xl border border-gray-200">
            <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search project, society or property..."
              className="w-full bg-transparent border-none p-0 text-sm text-gray-800 placeholder-gray-500 focus:ring-0 focus:outline-none"
            />
          </div>

          {/* Search CTA Button */}
          <button
            type="button"
            onClick={() => showToast(`Filtered ${filteredProperties.length} Vastu-certified properties`)}
            className="w-full lg:w-auto px-8 py-3 bg-[#743b19] hover:bg-[#5e2e12] text-white font-semibold rounded-xl transition flex items-center justify-center shadow-sm cursor-pointer"
          >
            Search
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MAIN CONTENT GRID: SIDEBAR & LISTINGS                     */}
      {/* ======================================================== */}
      <main className="max-w-7xl xl:max-w-screen-2xl 2xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full grow">
        <div className="flex flex-col lg:flex-row gap-7">
          {/* ==================================================== */}
          {/* FILTER SIDEBAR                                       */}
          {/* ==================================================== */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="bg-white rounded-2xl border border-[#e6ddd2] p-5 shadow-sm space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#743b19]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                  <h2 className="text-base font-bold text-gray-900">Filters</h2>
                </div>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-xs font-semibold text-[#8b451f] hover:underline cursor-pointer"
                >
                  Clear All
                </button>
              </div>

              {/* Property Type Filter */}
              <div className="space-y-3">
                <div className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Property Type</span>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M5 15l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                </div>
                <div className="space-y-2 text-sm">
                  {[
                    { label: 'Apartment', count: '320' },
                    { label: 'Villa', count: '34' },
                    { label: 'Independent House', count: '18' },
                    { label: 'Plot', count: '65' },
                    { label: 'Penthouse', count: '12' },
                  ].map((item) => (
                    <label key={item.label} className="flex items-center space-x-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(item.label)}
                        onChange={() => {
                          setSelectedTypes((prev) =>
                            prev.includes(item.label)
                              ? prev.filter((t) => t !== item.label)
                              : [...prev, item.label]
                          );
                        }}
                        className="rounded text-[#743b19] focus:ring-[#743b19] border-gray-300 w-4 h-4"
                      />
                      <span className="text-gray-700 font-medium text-xs">
                        {item.label} <span className="text-gray-400">({item.count})</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* BHK Chips */}
              <div className="space-y-3">
                <div className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-700">BHK</span>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M5 15l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                </div>
                <div className="grid grid-cols-5 gap-1">
                  {['All', '1 BHK', '2 BHK', '3 BHK', '4+ BHK'].map((bhk) => (
                    <button
                      key={bhk}
                      type="button"
                      onClick={() => setSelectedBhk(bhk)}
                      className={`py-1.5 text-[11px] font-semibold rounded-lg border transition cursor-pointer text-center ${selectedBhk === bhk
                        ? 'bg-[#743b19] text-white border-[#743b19]'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                      {bhk}
                    </button>
                  ))}
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Budget Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Budget <span className="font-normal normal-case text-gray-400">(All Inclusive)</span>
                  </span>
                  <span className="text-xs font-bold text-[#743b19]">
                    ₹50 L – ₹{(budgetMax / 100).toFixed(2)} Cr
                  </span>
                </div>
                <div className="pt-1">
                  <input
                    type="range"
                    min="50"
                    max="800"
                    value={budgetMax}
                    onChange={(e) => setBudgetMax(Number(e.target.value))}
                    className="custom-slider w-full"
                  />
                  <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                    <span>₹50 L</span>
                    <span>₹8 Cr</span>
                  </div>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Vastu Rating Filter */}
              <div className="space-y-3">
                <div className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Vastu Rating</span>
                    <span className="text-gray-400 hover:text-gray-600" title="Based on Vedic 16-zone audit">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" strokeWidth="2"></circle>
                        <line strokeWidth="2" x1="12" x2="12" y1="16" y2="12"></line>
                        <line strokeWidth="2" x1="12" x2="12.01" y1="8" y2="8"></line>
                      </svg>
                    </span>
                  </div>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M5 15l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                </div>
                <div className="space-y-2 text-sm">
                  {[
                    { label: 'Inherently Aligned', sub: '(9.0 – 10)' },
                    { label: 'Functionally Balanced', sub: '(6.5 – 8.9)' },
                    { label: 'Remedy-Ready', sub: '(5.0 – 6.4)' }
                  ].map((r) => (
                    <label key={r.label} className="flex items-center space-x-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedRatings.includes(r.label)}
                        onChange={() => {
                          setSelectedRatings((prev) =>
                            prev.includes(r.label)
                              ? prev.filter((item) => item !== r.label)
                              : [...prev, r.label]
                          );
                        }}
                        className="rounded text-[#743b19] focus:ring-[#743b19] border-gray-300 w-4 h-4"
                      />
                      <span className="text-gray-700 text-xs">
                        {r.label} <span className="text-gray-400">{r.sub}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* RERA Status */}
              <div className="space-y-2">
                <div className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-700">RERA Status</span>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M5 15l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                </div>
                <label className="flex items-center space-x-2.5 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={reraOnly}
                    onChange={(e) => setReraOnly(e.target.checked)}
                    className="rounded text-[#743b19] focus:ring-[#743b19] border-gray-300 w-4 h-4"
                  />
                  <span className="text-gray-700 text-xs">
                    RERA Registered Only <span className="text-gray-400">(312)</span>
                  </span>
                </label>
              </div>
            </div>
          </aside>

          {/* ==================================================== */}
          {/* RESULTS AREA                                         */}
          {/* ==================================================== */}
          <section className="flex-1">
            {/* Results Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 gap-3">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-gray-900">
                  {selectedCity !== 'All' && selectedState !== 'All'
                    ? `Properties in ${selectedCity}, ${selectedState}`
                    : selectedCity !== 'All'
                      ? `Properties in ${selectedCity}`
                      : selectedState !== 'All'
                        ? `Properties in ${selectedState}`
                        : 'All Properties Across India'}{' '}
                  <span className="text-gray-500 font-normal text-sm">
                    ({filteredProperties.length} Results)
                  </span>
                </h2>
              </div>

              <div className="flex items-center space-x-3 self-end sm:self-auto">
                {/* Sort dropdown */}
                <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-1.5 shadow-sm text-xs">
                  <span className="text-gray-500 mr-1.5">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent border-0 p-0 text-xs font-bold text-gray-800 focus:ring-0 cursor-pointer"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="vastu-score">Vastu Score: Highest First</option>
                  </select>
                </div>

                {/* View Layout Toggle */}
                <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
                  <button
                    type="button"
                    onClick={() => setViewLayout('grid')}
                    className={`p-1 rounded cursor-pointer ${viewLayout === 'grid' ? 'bg-[#743b19] text-white' : 'text-gray-400 hover:text-gray-700'
                      }`}
                    title="Grid View"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewLayout('list')}
                    className={`p-1 rounded ml-0.5 cursor-pointer ${viewLayout === 'list' ? 'bg-[#743b19] text-white' : 'text-gray-400 hover:text-gray-700'
                      }`}
                    title="List View"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Grid of Property Cards or Empty State */}
            {filteredProperties.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#ecd9c6] p-10 text-center my-6 shadow-xs max-w-xl mx-auto">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#faede0] text-[#743b19] flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" strokeDasharray="3 3"></circle>
                    <path d="M12 8v4m0 4h.01"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold font-serif text-[#3d2012] mb-1">
                  No Vastu-Certified Properties Found
                </h3>
                <p className="text-xs text-gray-600 mb-5 leading-relaxed">
                  No active listings match your current filters in{' '}
                  <span className="font-semibold text-gray-800">
                    {selectedCity !== 'All' && selectedState !== 'All'
                      ? `${selectedCity}, ${selectedState}`
                      : selectedState !== 'All'
                        ? selectedState
                        : 'Pan India'}
                  </span>
                  . Try resetting filters or choosing another city.
                </p>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 bg-[#743b19] hover:bg-[#5e2e12] text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-xs inline-flex items-center gap-2"
                >
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : (
              <>
                <div
                  className={
                    viewLayout === 'grid'
                      ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'
                      : 'space-y-4'
                  }
                >
                  {filteredProperties.map((prop) => {
                    const percentage = Math.round((prop.vastuScore / 10) * 100);
                    return (
                      <article
                        key={prop.id}
                        className={`bg-white rounded-2xl border border-[#e8dfd5] shadow-sm overflow-hidden flex hover:shadow-md transition group ${viewLayout === 'grid' ? 'flex-col' : 'flex-col sm:flex-row'
                          }`}
                      >
                        {/* Image Container */}
                        <div
                          className={`relative overflow-hidden bg-gray-100 ${viewLayout === 'grid' ? 'h-52 w-full' : 'sm:w-64 h-52 shrink-0'
                            }`}
                        >
                          <img
                            alt={prop.title}
                            src={prop.heroImage}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          />
                          <div className="absolute top-3 left-3 bg-[#e6f4ea] text-[#137333] border border-[#ceead6] text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm backdrop-blur-sm">
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                              <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd"></path>
                            </svg>
                            Vastu Certified
                          </div>
                          <button
                            type="button"
                            onClick={() => toggleFavorite(prop.id, prop.title)}
                            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 flex items-center justify-center hover:text-red-500 shadow-sm transition cursor-pointer"
                            title="Save Property"
                          >
                            <svg
                              className={`w-4 h-4 ${savedCards[prop.id] ? 'text-red-500 fill-current' : ''}`}
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                          </button>
                          <div className="absolute bottom-2.5 inset-x-0 flex justify-center gap-1.5 pointer-events-none">
                            <span className="w-2 h-2 rounded-full bg-white shadow-sm"></span>
                            <span className="w-2 h-2 rounded-full bg-white/50 shadow-sm"></span>
                            <span className="w-2 h-2 rounded-full bg-white/50 shadow-sm"></span>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className="font-serif font-bold text-lg text-gray-900 group-hover:text-[#743b19] transition">
                                  <Link href={`/properties/${prop.slug}`}>{prop.title}</Link>
                                </h3>
                                <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                  <svg className="w-3.5 h-3.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path clipRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" fillRule="evenodd"></path>
                                  </svg>
                                  {prop.location}
                                </p>
                              </div>

                              {/* Vastu Score Circular Gauge matching Stitch */}
                              <div
                                className="vastu-gauge w-12 h-12 shrink-0"
                                style={{ ['--percentage' as string]: `${percentage}%` }}
                              >
                                <span className="relative z-10 text-[11px] font-bold text-gray-900 leading-none">
                                  {prop.vastuScore}
                                  <span className="text-[8px] text-gray-500 font-normal block text-center">/10</span>
                                </span>
                              </div>
                            </div>

                            {/* Specs */}
                            <div className="flex items-center gap-2 text-xs text-gray-600 mt-2 font-medium">
                              <span className="flex items-center gap-1">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"></path>
                                </svg>
                                {prop.bhk}
                              </span>
                              <span className="text-gray-300">|</span>
                              <span>{prop.sqft}</span>
                            </div>

                            {/* Price */}
                            <div className="mt-3">
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-xl font-bold text-gray-900 font-serif">{prop.price}</span>
                                <span className="text-[11px] text-gray-500">({prop.priceDetail})</span>
                              </div>
                            </div>

                            {/* Classification Tag */}
                            <div className="mt-2.5">
                              <span
                                className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-md border ${prop.vastuStatus === 'Inherently Aligned'
                                  ? 'bg-[#e8f5e9] text-[#2e7d32] border-[#c8e6c9]'
                                  : 'bg-[#fcf1e5] text-[#854d0e] border-[#f5dfc6]'
                                  }`}
                              >
                                {prop.vastuStatus}
                              </span>
                            </div>
                          </div>

                          {/* CTA View Details */}
                          <div className="mt-4 pt-3 border-t border-gray-100">
                            <Link
                              href={`/properties/${prop.slug}`}
                              className="w-full py-2.5 px-4 bg-[#743b19] hover:bg-[#5e2e12] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
                            >
                              <span>View Details</span>
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round"></path>
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>

                {/* Pagination Bar matching Stitch */}
                <div className="mt-8 pt-5 border-t border-[#e2d8cb] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                  <p className="text-gray-600 font-medium">
                    Showing <span className="font-bold text-gray-900">1 – {filteredProperties.length}</span> of{' '}
                    <span className="font-bold text-gray-900">{filteredProperties.length}</span> properties
                  </p>
                  <nav aria-label="Pagination Navigation" className="flex items-center space-x-1.5">
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className="w-8 h-8 rounded-lg border border-gray-200 bg-white text-gray-400 hover:text-gray-700 flex items-center justify-center transition disabled:opacity-50"
                      aria-label="Previous page"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                      </svg>
                    </button>
                    {[1, 2, 3].map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => {
                          setCurrentPage(page);
                          showToast(`Navigated to page ${page}`);
                        }}
                        className={`w-8 h-8 rounded-lg font-bold flex items-center justify-center transition cursor-pointer ${currentPage === page
                          ? 'bg-[#743b19] text-white shadow-sm'
                          : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                          }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentPage((p) => p + 1);
                        showToast(`Navigated to page ${currentPage + 1}`);
                      }}
                      className="w-8 h-8 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 flex items-center justify-center transition"
                      aria-label="Next page"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                      </svg>
                    </button>
                  </nav>
                </div>
              </>
            )}
          </section>
        </div>
      </main>

      <VastuAiWidget propertyTitle="Properties in India" />

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

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <ConsultationModal isOpen={isConsultOpen} onClose={() => setIsConsultOpen(false)} />
    </div>
  );
}

export default function ExplorePropertiesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f5f2eb] flex items-center justify-center font-serif text-[#743b19]">
          Loading PragyaaProp Listings...
        </div>
      }
    >
      <ExplorePropertiesContent />
    </Suspense>
  );
}
