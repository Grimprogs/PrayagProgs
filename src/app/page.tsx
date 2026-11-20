'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VastuAiWidget from '@/components/common/VastuAiWidget';
import ConsultationModal from '@/components/common/ConsultationModal';
import { useToast } from '@/context/ToastContext';
import { useProperties } from '@/context/PropertiesContext';
import { ALL_CITIES, getLocalitiesForCity, getStateForCity } from '@/data/locations';
import { mapVastuStatus } from '@/data/discovery';
import { Property } from '@/types';

// Helper to assign consistent demo PP Codes to properties
const getPPCode = (p: Property, index: number): string => {
  const match = p.id.match(/\d+/);
  const num = match ? parseInt(match[0], 10) : index + 1;
  return `PP-${100 + num}`;
};

export default function HomePage() {
  const router = useRouter();
  const { showToast } = useToast();
  const { properties } = useProperties();

  // Consultation modal state
  const [isConsultOpen, setIsConsultOpen] = useState(false);

  // Search entry point state: City, Location, Project name, PP Code
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedLocality, setSelectedLocality] = useState<string>('All');
  const [projectOrCodeQuery, setProjectOrCodeQuery] = useState<string>('');

  // Typology filter for featured properties
  const [activeTypology, setActiveTypology] = useState<string>('All Properties');
  const [savedProps, setSavedProps] = useState<Record<string, boolean>>({});

  // Dynamic localities list based on selected city
  const availableLocalities = useMemo(() => {
    if (!selectedCity || selectedCity === 'All') {
      const locSet = new Set<string>();
      properties.forEach((p) => {
        if (p.locality) locSet.add(p.locality);
      });
      return Array.from(locSet).slice(0, 10);
    }
    return getLocalitiesForCity(selectedCity);
  }, [selectedCity, properties]);

  // Handle City Change
  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setSelectedLocality('All');
    if (city !== 'All') {
      showToast(`Selected City: ${city}`);
    }
  };

  // Execute Search: supports City, Location, Project Name, and PP Code
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const queryTrimmed = projectOrCodeQuery.trim();
    const queryLower = queryTrimmed.toLowerCase();

    // Check if query directly matches a PP Code or property slug/title
    if (queryTrimmed) {
      const directMatch = properties.find((p, idx) => {
        const ppCode = getPPCode(p, idx).toLowerCase();
        return (
          ppCode === queryLower ||
          p.id.toLowerCase() === queryLower ||
          p.slug.toLowerCase() === queryLower ||
          p.title.toLowerCase() === queryLower
        );
      });

      if (directMatch) {
        showToast(`Found flat match: ${directMatch.title} (${getPPCode(directMatch, 0)})`);
        router.push(
          `/properties?city=${encodeURIComponent(directMatch.city)}&locality=${encodeURIComponent(
            directMatch.locality || ''
          )}&q=${encodeURIComponent(directMatch.title)}`
        );
        return;
      }
    }

    // Otherwise, build query parameters for the properties catalog
    const params = new URLSearchParams();

    if (selectedCity && selectedCity !== 'All') {
      params.set('city', selectedCity);
      const autoState = getStateForCity(selectedCity);
      if (autoState) params.set('state', autoState);
    }

    if (selectedLocality && selectedLocality !== 'All') {
      params.set('locality', selectedLocality);
    }

    if (queryTrimmed) {
      params.set('q', queryTrimmed);
    }

    const paramStr = params.toString();
    showToast('Exploring matching properties...');
    router.push(`/properties${paramStr ? `?${paramStr}` : ''}`);
  };

  // Toggle favorite property
  const toggleFavorite = (id: string, title: string) => {
    setSavedProps((prev) => {
      const newState = !prev[id];
      showToast(newState ? `Saved ${title} to your favorites` : `Removed ${title} from favorites`);
      return { ...prev, [id]: newState };
    });
  };

  // Featured Properties list without numerical scores
  const displayedProperties = useMemo(() => {
    let list = [...properties];

    if (activeTypology === 'Apartments') {
      list = list.filter((p) => p.propertyType === 'Apartment');
    } else if (activeTypology === 'Villas & Penthouses') {
      list = list.filter(
        (p) =>
          p.propertyType === 'Villa' ||
          p.propertyType === 'Penthouse' ||
          p.propertyType === 'Independent House'
      );
    } else if (activeTypology === 'Ready to Move') {
      list = list.filter((p) => (p.possession || '').toLowerCase().includes('ready'));
    }

    // Sort: Featured first, then highest vastu score internal ranking
    list.sort((a, b) => {
      const aFeat = a.featured ? 1 : 0;
      const bFeat = b.featured ? 1 : 0;
      if (bFeat !== aFeat) return bFeat - aFeat;
      return b.vastuScore - a.vastuScore;
    });

    return list.slice(0, 4);
  }, [properties, activeTypology]);

  // Featured spotlight property for hero showcase
  const spotlightProperty = useMemo(() => {
    return properties.find((p) => p.featured) || properties[0];
  }, [properties]);

  return (
    <>
      {/* Global Header Navigation */}
      <Navbar showPanorama={false} showSearchBar={false} />

      <main className="grow">
        {/* ======================================================== */}
        {/* 1. HERO SECTION WITH PROMINENT DISCOVERY SEARCH          */}
        {/* ======================================================== */}
        <section className="relative overflow-hidden pt-8 pb-14 lg:pt-14 lg:pb-20 border-b border-[#eadbc8]/60 bg-gradient-to-b from-[#fdfbf7] via-[#fbf9f5] to-[#f7f4ee]">
          {/* Subtle Vedic Mandala Background Watermark */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.035] flex items-center justify-center select-none overflow-hidden">
            <svg className="w-[850px] h-[850px] text-[#5d2809]" viewBox="0 0 100 100" fill="currentColor">
              <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" />
              <circle cx="50" cy="50" r="36" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <rect x="25" y="25" width="50" height="50" fill="none" stroke="currentColor" strokeWidth="0.5" transform="rotate(45 50 50)" />
              <rect x="25" y="25" width="50" height="50" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </div>

          <div className="max-w-7xl xl:max-w-screen-2xl 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
            {/* Hero Main Content & Headline */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              {/* Journey Indicator Badge */}
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#f4ebd9] border border-[#d8c2b9] text-[#7a3e1e] shadow-2xs">
                <span className="material-symbols-outlined text-sm">explore</span>
                <span className="text-[11px] sm:text-xs font-semibold tracking-wide font-sans">
                  City → Location → Project → Wing → Flat → Vastu Status
                </span>
              </div>

              {/* Exact Requested Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-serif text-[#4a240c] font-bold tracking-tight leading-[1.15]">
                Find a Home That Feels Right.
              </h1>

              {/* Exact Requested Supporting Text */}
              <p className="text-sm sm:text-base lg:text-lg text-[#53433c] leading-relaxed max-w-2xl mx-auto font-normal">
                Explore properties through Vastu insights. Discover projects, compare individual flats and understand their Vastu alignment before making a decision.
              </p>
            </div>

            {/* Prominent Property Discovery Search Area */}
            <div className="mt-8 lg:mt-10 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#dfceba] shadow-xl p-4 sm:p-6 transition-shadow hover:shadow-2xl">
                <div className="mb-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#7a3e1e]"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#7a3e1e]">
                      Property Discovery Console
                    </span>
                  </div>
                  <span className="text-[11px] text-[#86736b] hidden sm:inline">
                    Search by City, Location, Project, or PP Code
                  </span>
                </div>

                <form onSubmit={handleSearch} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
                    {/* 1. City Entry Point */}
                    <div className="lg:col-span-3">
                      <label className="block text-[11px] font-bold uppercase text-[#86736b] mb-1">
                        1. City
                      </label>
                      <div className="relative">
                        <select
                          value={selectedCity}
                          onChange={(e) => handleCityChange(e.target.value)}
                          className="w-full bg-[#faf7f2] hover:bg-white focus:bg-white border border-[#dfceba] rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[#4a240c] appearance-none focus:outline-none focus:ring-2 focus:ring-[#7a3e1e] transition-colors cursor-pointer"
                        >
                          <option value="All">All Cities</option>
                          {ALL_CITIES.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                        <span className="material-symbols-outlined text-[#7a3e1e] text-base absolute right-3 top-3 pointer-events-none">
                          expand_more
                        </span>
                      </div>
                    </div>

                    {/* 2. Location / Locality Entry Point */}
                    <div className="lg:col-span-3">
                      <label className="block text-[11px] font-bold uppercase text-[#86736b] mb-1">
                        2. Location
                      </label>
                      <div className="relative">
                        <select
                          value={selectedLocality}
                          onChange={(e) => setSelectedLocality(e.target.value)}
                          className="w-full bg-[#faf7f2] hover:bg-white focus:bg-white border border-[#dfceba] rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[#4a240c] appearance-none focus:outline-none focus:ring-2 focus:ring-[#7a3e1e] transition-colors cursor-pointer"
                        >
                          <option value="All">All Locations</option>
                          {availableLocalities.map((loc) => (
                            <option key={loc} value={loc}>
                              {loc}
                            </option>
                          ))}
                        </select>
                        <span className="material-symbols-outlined text-[#7a3e1e] text-base absolute right-3 top-3 pointer-events-none">
                          expand_more
                        </span>
                      </div>
                    </div>

                    {/* 3. Project Name & PP Code Search */}
                    <div className="sm:col-span-2 lg:col-span-4">
                      <label className="block text-[11px] font-bold uppercase text-[#86736b] mb-1">
                        3. Project Name or PP Code
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined text-[#86736b] text-base absolute left-3 top-3 pointer-events-none">
                          search
                        </span>
                        <input
                          type="text"
                          value={projectOrCodeQuery}
                          onChange={(e) => setProjectOrCodeQuery(e.target.value)}
                          placeholder="e.g. Sunrise Residency or PP-101"
                          className="w-full bg-[#faf7f2] hover:bg-white focus:bg-white border border-[#dfceba] rounded-xl pl-9 pr-3.5 py-2.5 text-xs font-medium text-[#4a240c] focus:outline-none focus:ring-2 focus:ring-[#7a3e1e] transition-colors"
                        />
                      </div>
                    </div>

                    {/* Search Action Button */}
                    <div className="sm:col-span-2 lg:col-span-2 flex items-end">
                      <button
                        type="submit"
                        className="w-full bg-[#7a3e1e] hover:bg-[#5d2809] text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow-md active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer h-[38px]"
                      >
                        <span className="material-symbols-outlined text-base">travel_explore</span>
                        <span>Explore</span>
                      </button>
                    </div>
                  </div>
                </form>

                {/* Popular Discovery Shortcuts */}
                <div className="mt-4 pt-3.5 border-t border-[#f0e3d3] flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-[#86736b] text-[11px] font-semibold">Quick Shortcuts:</span>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCity('Mumbai');
                      setSelectedLocality('Andheri (W)');
                      setProjectOrCodeQuery('Sunrise Residency');
                    }}
                    className="px-2.5 py-1 rounded-full bg-[#fbf8f3] hover:bg-[#f0e4d7] text-[#5d2809] text-[11px] font-medium border border-[#e4d3c0] transition cursor-pointer"
                  >
                    Sunrise Residency (PP-101)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCity('Bangalore');
                      setSelectedLocality('Whitefield');
                      setProjectOrCodeQuery('');
                    }}
                    className="px-2.5 py-1 rounded-full bg-[#fbf8f3] hover:bg-[#f0e4d7] text-[#5d2809] text-[11px] font-medium border border-[#e4d3c0] transition cursor-pointer"
                  >
                    Whitefield, Bangalore
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCity('Pune');
                      setSelectedLocality('All');
                      setProjectOrCodeQuery('');
                    }}
                    className="px-2.5 py-1 rounded-full bg-[#fbf8f3] hover:bg-[#f0e4d7] text-[#5d2809] text-[11px] font-medium border border-[#e4d3c0] transition cursor-pointer"
                  >
                    Pune Residences
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCity('All');
                      setSelectedLocality('All');
                      setProjectOrCodeQuery('PP-103');
                    }}
                    className="px-2.5 py-1 rounded-full bg-[#fbf8f3] hover:bg-[#f0e4d7] text-[#5d2809] text-[11px] font-medium border border-[#e4d3c0] transition cursor-pointer"
                  >
                    PP-103
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Property Spotlight Strip (Clean presentation, NO numerical scores) */}
            {spotlightProperty && (
              <div className="mt-8 max-w-4xl mx-auto bg-[#faf6ee] rounded-2xl border border-[#eedecb] p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#dbdad6] shrink-0 border border-[#dfceba]">
                    <img
                      src={spotlightProperty.heroImage}
                      alt={spotlightProperty.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#785503] bg-[#fdcd75]/40 px-2 py-0.5 rounded">
                        Featured Project
                      </span>
                      <span className="text-xs text-[#86736b]">{getPPCode(spotlightProperty, 0)}</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold font-serif text-[#4a240c]">
                      {spotlightProperty.title}
                    </h3>
                    <p className="text-xs text-[#53433c]">
                      {spotlightProperty.location} • {spotlightProperty.bhk}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-right sm:mr-2">
                    <span className="block text-[10px] font-bold uppercase text-[#86736b]">Vastu Status</span>
                    {(() => {
                      const spotlightStatus = mapVastuStatus(spotlightProperty.vastuStatus);
                      return (
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full ${
                            spotlightStatus === 'Aligned'
                              ? 'bg-[#e6f4ea] text-[#137333] border border-[#ceead6]'
                              : spotlightStatus === 'Balanced'
                              ? 'bg-[#fef7e0] text-[#b06000] border border-[#feefc3]'
                              : 'bg-[#fce8e6] text-[#c5221f] border border-[#fad2cf]'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              spotlightStatus === 'Aligned'
                                ? 'bg-[#137333]'
                                : spotlightStatus === 'Balanced'
                                ? 'bg-[#b06000]'
                                : 'bg-[#c5221f]'
                            }`}
                          ></span>
                          {spotlightStatus}
                        </span>
                      );
                    })()}
                  </div>
                  <Link
                    href={`/properties?city=${encodeURIComponent(spotlightProperty.city)}&locality=${encodeURIComponent(
                      spotlightProperty.locality || ''
                    )}&q=${encodeURIComponent(spotlightProperty.title)}`}
                    className="bg-[#7a3e1e] hover:bg-[#5d2809] text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition shadow-2xs cursor-pointer shrink-0"
                  >
                    <span>Explore</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 2. HOW IT WORKS: 4-STEP CLIENT DISCOVERY JOURNEY         */}
        {/* ======================================================== */}
        <section className="py-14 lg:py-18 bg-[#fdfbf7] border-b border-[#eadbc8]/50" id="how-it-works">
          <div className="max-w-7xl xl:max-w-screen-2xl 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <span className="text-xs text-[#7a3e1e] font-bold uppercase tracking-widest block">
                Discovery Process
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#4a240c] font-bold">
                How It Works
              </h2>
              <p className="text-xs sm:text-sm text-[#53433c]">
                A clear, sequential path from choosing your preferred neighborhood to inspecting the specific Vastu status of your future flat.
              </p>
            </div>

            {/* 4-Step Cards matching exact client journey */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Step 1 */}
              <div className="bg-white rounded-2xl border border-[#ecd9c6] p-6 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-xl bg-[#faede0] text-[#743b19] font-bold text-sm flex items-center justify-center font-serif group-hover:bg-[#743b19] group-hover:text-white transition-colors">
                      01
                    </span>
                    <span className="material-symbols-outlined text-[#7a3e1e] text-2xl">
                      location_on
                    </span>
                  </div>
                  <h3 className="text-base font-bold font-serif text-[#4a240c] mb-2">
                    Find Your Location
                  </h3>
                  <p className="text-xs text-[#53433c] leading-relaxed">
                    Choose a city and locality that matches your lifestyle, daily commute, and preferred living environment.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#f3e7da] text-[11px] font-semibold text-[#7a3e1e]">
                  City → Locality
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-2xl border border-[#ecd9c6] p-6 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-xl bg-[#faede0] text-[#743b19] font-bold text-sm flex items-center justify-center font-serif group-hover:bg-[#743b19] group-hover:text-white transition-colors">
                      02
                    </span>
                    <span className="material-symbols-outlined text-[#7a3e1e] text-2xl">
                      apartment
                    </span>
                  </div>
                  <h3 className="text-base font-bold font-serif text-[#4a240c] mb-2">
                    Explore Projects
                  </h3>
                  <p className="text-xs text-[#53433c] leading-relaxed">
                    Discover residential developments, site plans, and available building wings across your chosen destination.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#f3e7da] text-[11px] font-semibold text-[#7a3e1e]">
                  Project → Wing
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-2xl border border-[#ecd9c6] p-6 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-xl bg-[#faede0] text-[#743b19] font-bold text-sm flex items-center justify-center font-serif group-hover:bg-[#743b19] group-hover:text-white transition-colors">
                      03
                    </span>
                    <span className="material-symbols-outlined text-[#7a3e1e] text-2xl">
                      door_front
                    </span>
                  </div>
                  <h3 className="text-base font-bold font-serif text-[#4a240c] mb-2">
                    Select Your Flat
                  </h3>
                  <p className="text-xs text-[#53433c] leading-relaxed">
                    Explore individual units, room layouts, balcony orientations, and precise architectural configurations.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#f3e7da] text-[11px] font-semibold text-[#7a3e1e]">
                  Unit → Layout
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-white rounded-2xl border border-[#ecd9c6] p-6 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-xl bg-[#faede0] text-[#743b19] font-bold text-sm flex items-center justify-center font-serif group-hover:bg-[#743b19] group-hover:text-white transition-colors">
                      04
                    </span>
                    <span className="material-symbols-outlined text-[#7a3e1e] text-2xl">
                      balance
                    </span>
                  </div>
                  <h3 className="text-base font-bold font-serif text-[#4a240c] mb-2">
                    Understand Vastu
                  </h3>
                  <p className="text-xs text-[#53433c] leading-relaxed">
                    View the flat&apos;s Vastu status, natural elemental balance, and orientation insights before finalizing your decision.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#f3e7da] text-[11px] font-semibold text-[#7a3e1e]">
                  Status & Harmony
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#f5ede1] hover:bg-[#eedec8] text-[#5d2809] border border-[#d8c3ad] text-xs font-bold transition shadow-2xs"
              >
                <span>Start Exploring Available Listings</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 3. WHY PRAGYAAPROP? (GROUNDED, VALUE-DRIVEN MESSAGING)   */}
        {/* ======================================================== */}
        <section className="py-14 lg:py-18 bg-[#f8f5ee] border-b border-[#eadbc8]/60">
          <div className="max-w-7xl xl:max-w-screen-2xl 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <span className="text-xs text-[#7a3e1e] font-bold uppercase tracking-widest block">
                Platform Value
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#4a240c] font-bold">
                Why PragyaaProp?
              </h2>
              <p className="text-xs sm:text-sm text-[#53433c]">
                Thoughtful, practical property discovery built to give buyers clarity at the individual flat level.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Feature 1 */}
              <div className="bg-white rounded-2xl border border-[#ecd9c6] p-6 shadow-2xs space-y-3">
                <div className="w-11 h-11 rounded-xl bg-[#faede0] text-[#743b19] flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">explore</span>
                </div>
                <h3 className="text-base font-bold font-serif text-[#4a240c]">
                  Vastu-Organised Discovery
                </h3>
                <p className="text-xs sm:text-sm text-[#53433c] leading-relaxed">
                  Browse properties with orientation insights clearly laid out from day one, helping you shortlist homes that align with natural sunlight, ventilation, and family balance.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-2xl border border-[#ecd9c6] p-6 shadow-2xs space-y-3">
                <div className="w-11 h-11 rounded-xl bg-[#faede0] text-[#743b19] flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">layers</span>
                </div>
                <h3 className="text-base font-bold font-serif text-[#4a240c]">
                  Flat-Level Information
                </h3>
                <p className="text-xs sm:text-sm text-[#53433c] leading-relaxed">
                  Rather than evaluating an entire tower as a single block, PragyaaProp focuses on individual flats and wings, recognizing that units in the same building can have entirely different orientations.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-2xl border border-[#ecd9c6] p-6 shadow-2xs space-y-3">
                <div className="w-11 h-11 rounded-xl bg-[#faede0] text-[#743b19] flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">verified</span>
                </div>
                <h3 className="text-base font-bold font-serif text-[#4a240c]">
                  Clear and Understandable Status
                </h3>
                <p className="text-xs sm:text-sm text-[#53433c] leading-relaxed">
                  Transparent, easy-to-read Vastu status categories—Aligned, Balanced, or Adaptable—providing actionable insight without confusing superstition or jargon.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white rounded-2xl border border-[#ecd9c6] p-6 shadow-2xs space-y-3">
                <div className="w-11 h-11 rounded-xl bg-[#faede0] text-[#743b19] flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">support_agent</span>
                </div>
                <h3 className="text-base font-bold font-serif text-[#4a240c]">
                  Dedicated Consultation Available
                </h3>
                <p className="text-xs sm:text-sm text-[#53433c] leading-relaxed">
                  Have questions about a specific layout or need advice for your family&apos;s astrological needs? Connect directly with an experienced Vastu advisor before making any commitments.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 4. WHAT IS VASTU? (CONCISE INTRODUCTORY SECTION)         */}
        {/* ======================================================== */}
        <section className="py-14 lg:py-18 bg-[#fdfbf7] border-b border-[#eadbc8]/50">
          <div className="max-w-7xl xl:max-w-screen-2xl 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#faf6ee] via-white to-[#f7f2e7] rounded-3xl border border-[#e8dac8] p-6 sm:p-10 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-8 space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4ebd9] text-[#7a3e1e] text-[11px] font-bold uppercase tracking-wider">
                    <span className="material-symbols-outlined text-sm">spa</span>
                    <span>Ancient Wisdom • Modern Living</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-serif text-[#4a240c] font-bold">
                    What is Vastu?
                  </h2>

                  <p className="text-xs sm:text-sm text-[#53433c] leading-relaxed">
                    Vastu Shastra is the traditional Indian architectural philosophy of spatial design, orientation, and elemental balance. It examines how living spaces interact with natural light, wind circulation, magnetic axes, and the five fundamental elements—Earth, Water, Fire, Air, and Space.
                  </p>

                  <p className="text-xs sm:text-sm text-[#53433c] leading-relaxed">
                    In modern residential planning, Vastu principles help identify homes with auspicious morning sunlight, well-ventilated rooms, and balanced functional zones for cooking, resting, and family gathering.
                  </p>

                  <div className="pt-2">
                    <Link
                      href="/about"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7a3e1e] hover:text-[#5d2809] hover:underline"
                    >
                      <span>Read More on Our About Page</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                  </div>
                </div>

                <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-white/80 rounded-2xl border border-[#ecd9c6] text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-[#f6eee2] flex items-center justify-center text-[#7a3e1e]">
                    <span className="material-symbols-outlined text-3xl">compass_rose</span>
                  </div>
                  <span className="text-sm font-bold font-serif text-[#4a240c]">
                    Pancha Tattva Harmony
                  </span>
                  <p className="text-[11px] text-[#86736b] leading-tight">
                    Water (NE) • Fire (SE) • Earth (SW) • Air (NW) • Space (Brahmasthan)
                  </p>
                  <Link
                    href="/about"
                    className="w-full bg-[#7a3e1e] hover:bg-[#5d2809] text-white py-2 px-3 rounded-xl text-xs font-semibold transition text-center cursor-pointer"
                  >
                    Learn About Vastu
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 5. EXPLORE FEATURED PROPERTIES (CLEAN DISCOVERY GRID)    */}
        {/* ======================================================== */}
        <section className="py-14 lg:py-18 bg-[#f8f5ee] border-b border-[#eadbc8]/60" id="explore">
          <div className="max-w-7xl xl:max-w-screen-2xl 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12">
            <div className="space-y-4 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-xs text-[#7a3e1e] font-bold uppercase tracking-widest block mb-1">
                    Verified Listings
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif text-[#4a240c] font-bold">
                    Featured Properties
                  </h2>
                </div>
                <Link
                  href="/properties"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#7a3e1e] hover:text-[#5d2809]"
                >
                  <span>View All Available Properties</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              </div>

              {/* Typology Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {['All Properties', 'Apartments', 'Villas & Penthouses', 'Ready to Move'].map(
                  (tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => {
                        setActiveTypology(tab);
                        showToast(`Filtered: ${tab}`);
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                        activeTypology === tab
                          ? 'bg-[#7a3e1e] text-white shadow-2xs'
                          : 'bg-white hover:bg-[#f3ede3] text-[#53433c] border border-[#dfceba]'
                      }`}
                    >
                      {tab}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Property Cards Grid (NO NUMERICAL SCORES) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedProperties.map((prop, idx) => (
                <div
                  key={prop.id}
                  className="bg-white rounded-2xl border border-[#ecd9c6] shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden group"
                >
                  <div className="relative h-48 overflow-hidden bg-[#dbdad6]">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      alt={prop.title}
                      src={prop.heroImage}
                    />
                    {/* Directional Facing Tag */}
                    <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-xs text-[#5d2809] text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs z-10 flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs text-[#7a3e1e]">explore</span>
                      <span>{prop.facing || 'North-East'} Facing</span>
                    </div>

                    {/* PP Code Tag */}
                    <div className="absolute bottom-2.5 left-2.5 bg-[#4a240c]/85 text-white text-[10px] font-mono px-2 py-0.5 rounded z-10">
                      {getPPCode(prop, idx)}
                    </div>

                    {/* Favorite Button */}
                    <button
                      type="button"
                      onClick={() => toggleFavorite(prop.id, prop.title)}
                      className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/85 backdrop-blur-xs flex items-center justify-center text-[#1b1c1a] hover:text-red-500 transition-colors cursor-pointer z-10"
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
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="text-[11px] text-[#86736b] mb-1 font-medium">
                        {prop.locality}, {prop.city}
                      </div>
                      <h3 className="text-base font-serif text-[#4a240c] font-bold leading-tight group-hover:text-[#7a3e1e] transition-colors">
                        <Link href={`/properties?city=${encodeURIComponent(prop.city)}&locality=${encodeURIComponent(prop.locality)}&q=${encodeURIComponent(prop.title)}`}>
                          {prop.title}
                        </Link>
                      </h3>
                      <p className="text-xs text-[#53433c] mt-1">
                        {prop.bhk} • {prop.sqft} • {prop.propertyType}
                      </p>
                    </div>

                    {/* Vastu Status Pill (Client Standard Terminology) */}
                    {(() => {
                      const publicStatus = mapVastuStatus(prop.vastuStatus);
                      return (
                        <div className="bg-[#fbf8f3] px-3 py-2 rounded-xl border border-[#ecd9c6] flex items-center justify-between text-xs">
                          <span className="text-[#86736b] font-medium text-[11px]">Vastu Status:</span>
                          <span
                            className={`font-bold text-[11px] px-2 py-0.5 rounded-full ${
                              publicStatus === 'Aligned'
                                ? 'bg-[#e6f4ea] text-[#137333] border border-[#ceead6]'
                                : publicStatus === 'Balanced'
                                ? 'bg-[#fef7e0] text-[#b06000] border border-[#feefc3]'
                                : 'bg-[#fce8e6] text-[#c5221f] border border-[#fad2cf]'
                            }`}
                          >
                            {publicStatus}
                          </span>
                        </div>
                      );
                    })()}

                    {/* Price & Action */}
                    <div className="pt-2 border-t border-[#f0e3d3] flex items-center justify-between">
                      <div>
                        <span className="block text-[10px] text-[#86736b]">Price</span>
                        <span className="text-base font-bold text-[#7a3e1e] font-serif">
                          {prop.price}
                        </span>
                      </div>
                      <Link
                        href={`/properties?city=${encodeURIComponent(prop.city)}&locality=${encodeURIComponent(prop.locality)}&q=${encodeURIComponent(prop.title)}`}
                        className="bg-[#7a3e1e] hover:bg-[#5d2809] text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>Explore</span>
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 6. CONSULTATION & CLOSING CTA                            */}
        {/* ======================================================== */}
        <section className="py-14 lg:py-18 bg-[#fdfbf7]" id="consult">
          <div className="max-w-7xl xl:max-w-screen-2xl 2xl:max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-white via-[#faf6ef] to-[#f4ebe0] rounded-3xl border border-[#e8dac8] p-6 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 text-center md:text-left">
                <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#7a3e1e]">
                  Personalized Guidance
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#4a240c] font-bold">
                  Need Guidance Finding the Right Home?
                </h2>
                <p className="text-xs sm:text-sm text-[#53433c] max-w-lg leading-relaxed">
                  Speak with our Vastu advisors to compare layouts, review wing orientations, and find the home that feels auspiciously right for your family.
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1 text-xs text-[#53433c]">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-[#7a3e1e]">check_circle</span>
                    Flat-by-flat review
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-[#7a3e1e]">check_circle</span>
                    Compass orientation check
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
                <button
                  type="button"
                  onClick={() => setIsConsultOpen(true)}
                  className="w-full sm:w-auto bg-[#7a3e1e] hover:bg-[#5d2809] text-white px-6 py-3 rounded-xl text-xs font-bold transition shadow-sm hover:shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">calendar_month</span>
                  <span>Request Consultation</span>
                </button>
                <Link
                  href="/properties"
                  className="w-full sm:w-auto bg-white hover:bg-[#faf6ee] text-[#5d2809] border border-[#d8c3ad] px-5 py-3 rounded-xl text-xs font-bold transition text-center shadow-2xs"
                >
                  Browse Catalog
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Vastu AI Assistant Float */}
      <VastuAiWidget propertyTitle="Sunrise Residency" />

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

      {/* Global Footer */}
      <Footer />

      {/* Existing Reusable Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultOpen}
        onClose={() => setIsConsultOpen(false)}
      />
    </>
  );
}
