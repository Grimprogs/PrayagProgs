'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VastuAiWidget from '@/components/common/VastuAiWidget';
import ConsultationModal from '@/components/common/ConsultationModal';
import { useToast } from '@/context/ToastContext';
import { useProperties } from '@/context/PropertiesContext';
import {
  buildDiscoveryData,
  DiscoveryProject,
  DiscoveryWing,
  DiscoveryFlat,
  PublicVastuStatus,
} from '@/data/discovery';

type DiscoveryStage = 1 | 2 | 3 | 4 | 5;

function GuidedDiscoveryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const { properties, discoveryProjects: contextDiscoveryProjects } = useProperties();

  // Consultation modal state
  const [isConsultOpen, setIsConsultOpen] = useState(false);

  // Active Stage in the Guided Discovery Journey:
  // Stage 1 = City
  // Stage 2 = Location
  // Stage 3 = Project
  // Stage 4 = Wing
  // Stage 5 = Flat
  const [currentStage, setCurrentStage] = useState<DiscoveryStage>(1);

  // Selections made by user across the 5 stages
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<DiscoveryProject | null>(null);
  const [selectedWing, setSelectedWing] = useState<DiscoveryWing | null>(null);
  const [inspectedFlat, setInspectedFlat] = useState<DiscoveryFlat | null>(null);

  // Live discovery tree synchronized with PropertiesContext & admin management
  const discoveryProjects = useMemo(() => {
    return contextDiscoveryProjects && contextDiscoveryProjects.length > 0
      ? contextDiscoveryProjects
      : buildDiscoveryData(properties);
  }, [contextDiscoveryProjects, properties]);

  // Stage 1: Cities available in verified demo & client sample data
  const availableCities = useMemo(() => {
    const cityMap = new Map<string, { name: string; state: string; count: number; hasClientSample: boolean }>();
    discoveryProjects.forEach((p) => {
      const existing = cityMap.get(p.city);
      if (existing) {
        existing.count += 1;
        if (p.isClientSample) existing.hasClientSample = true;
      } else {
        cityMap.set(p.city, {
          name: p.city,
          state: p.state,
          count: 1,
          hasClientSample: p.isClientSample,
        });
      }
    });
    // Put Mumbai (client sample location) first, then alphabetical
    return Array.from(cityMap.values()).sort((a, b) => {
      if (a.hasClientSample && !b.hasClientSample) return -1;
      if (!a.hasClientSample && b.hasClientSample) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [discoveryProjects]);

  // Stage 2: Locations belonging only to selected city
  const availableLocations = useMemo(() => {
    if (!selectedCity) return [];
    const locMap = new Map<string, { name: string; count: number; hasClientSample: boolean }>();
    discoveryProjects
      .filter((p) => p.city.toLowerCase() === selectedCity.toLowerCase())
      .forEach((p) => {
        const existing = locMap.get(p.locality);
        if (existing) {
          existing.count += 1;
          if (p.isClientSample) existing.hasClientSample = true;
        } else {
          locMap.set(p.locality, {
            name: p.locality,
            count: 1,
            hasClientSample: p.isClientSample,
          });
        }
      });
    return Array.from(locMap.values()).sort((a, b) => {
      if (a.hasClientSample && !b.hasClientSample) return -1;
      if (!a.hasClientSample && b.hasClientSample) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [discoveryProjects, selectedCity]);

  // Stage 3: Projects belonging to selected location & city
  const availableProjects = useMemo(() => {
    if (!selectedCity || !selectedLocation) return [];
    return discoveryProjects.filter(
      (p) =>
        p.city.toLowerCase() === selectedCity.toLowerCase() &&
        p.locality.toLowerCase() === selectedLocation.toLowerCase()
    );
  }, [discoveryProjects, selectedCity, selectedLocation]);

  // Handle URL query parameters from homepage search integration
  useEffect(() => {
    const paramCity = searchParams.get('city');
    const paramLocality = searchParams.get('locality');
    const paramQuery = searchParams.get('q');

    if (!paramCity || paramCity === 'All') return;

    const timer = setTimeout(() => {
      const foundCity = availableCities.find(
        (c) => c.name.toLowerCase() === paramCity.toLowerCase()
      );
      if (foundCity) {
        setSelectedCity(foundCity.name);
        setCurrentStage(2);

        if (paramLocality && paramLocality !== 'All') {
          const foundLoc = availableLocations.find(
            (l) =>
              l.name.toLowerCase() === paramLocality.toLowerCase() ||
              l.name.toLowerCase().includes(paramLocality.toLowerCase()) ||
              paramLocality.toLowerCase().includes(l.name.toLowerCase())
          );
          if (foundLoc) {
            setSelectedLocation(foundLoc.name);
            setCurrentStage(3);

            if (paramQuery) {
              const foundProj = discoveryProjects.find(
                (p) =>
                  p.city.toLowerCase() === foundCity.name.toLowerCase() &&
                  p.locality.toLowerCase() === foundLoc.name.toLowerCase() &&
                  p.name.toLowerCase().includes(paramQuery.toLowerCase())
              );
              if (foundProj) {
                setSelectedProject(foundProj);
                setCurrentStage(4);
              }
            }
          }
        }
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [searchParams, availableCities, availableLocations, discoveryProjects]);

  // Stage Selection Handlers
  const handleSelectCity = (city: string) => {
    setSelectedCity(city);
    setSelectedLocation(null);
    setSelectedProject(null);
    setSelectedWing(null);
    setInspectedFlat(null);
    setCurrentStage(2);
    showToast(`Selected City: ${city}`);
  };

  const handleSelectLocation = (location: string) => {
    setSelectedLocation(location);
    setSelectedProject(null);
    setSelectedWing(null);
    setInspectedFlat(null);
    setCurrentStage(3);
    showToast(`Selected Location: ${location}`);
  };

  const handleSelectProject = (project: DiscoveryProject) => {
    setSelectedProject(project);
    setSelectedWing(null);
    setInspectedFlat(null);
    setCurrentStage(4);
    showToast(`Selected Project: ${project.name}`);
  };

  const handleSelectWing = (wing: DiscoveryWing) => {
    setSelectedWing(wing);
    setInspectedFlat(null);
    setCurrentStage(5);
    showToast(`Selected Wing: ${wing.name}`);
  };

  // Back button navigation
  const handleGoBack = () => {
    if (inspectedFlat) {
      setInspectedFlat(null);
      return;
    }
    if (currentStage === 5) {
      setSelectedWing(null);
      setCurrentStage(4);
    } else if (currentStage === 4) {
      setSelectedProject(null);
      setCurrentStage(3);
    } else if (currentStage === 3) {
      setSelectedLocation(null);
      setCurrentStage(2);
    } else if (currentStage === 2) {
      setSelectedCity(null);
      setCurrentStage(1);
    }
  };

  // Reset / Start Over
  const handleStartOver = () => {
    setSelectedCity(null);
    setSelectedLocation(null);
    setSelectedProject(null);
    setSelectedWing(null);
    setInspectedFlat(null);
    setCurrentStage(1);
    router.replace('/properties');
    showToast('Started new property discovery journey');
  };

  // Vastu Status badge helper with required terminology
  const renderVastuStatusBadge = (status: PublicVastuStatus) => {
    if (status === 'Aligned') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
          Aligned
        </span>
      );
    }
    if (status === 'Balanced') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
          Balanced
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-50 text-orange-800 border border-orange-200">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
        Adaptable
      </span>
    );
  };

  // Helper text explaining Vastu Status grounded in natural living principles
  const getVastuStatusDescription = (status: PublicVastuStatus) => {
    if (status === 'Aligned') {
      return 'This flat layout aligns harmoniously with primary directional orientations, supporting natural morning sunlight and continuous air circulation across key living zones.';
    }
    if (status === 'Balanced') {
      return 'This flat layout maintains functional balance across living and sleeping spaces, offering practical elemental harmony for family living.';
    }
    return 'This flat layout provides comfortable living spaces with adaptable room orientations and straightforward placement recommendations for elemental harmony.';
  };

  return (
    <div className="bg-[#fbf9f5] text-[#1b1c1a] font-sans min-h-screen flex flex-col selection:bg-[#ffdea7] selection:text-[#5d2809]">
      {/* Top Navbar */}
      <Navbar showPanorama={false} showSearchBar={false} activeNav="explore" />

      <main className="grow py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="text-center max-w-2xl mx-auto mb-6 space-y-2">
            <span className="text-xs text-[#7a3e1e] font-bold uppercase tracking-widest block">
              Guided Discovery Journey
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif text-[#4a240c] font-bold">
              Find Your Flat Step by Step
            </h1>
            <p className="text-xs sm:text-sm text-[#53433c]">
              Follow the guided path from city to flat-level Vastu clarity. Move forward or backward at any time.
            </p>
          </div>

          {/* Sample Data Disclaimer Banner */}
          <div className="bg-[#faf6ee] border border-[#eedecb] rounded-2xl p-4 sm:px-5 sm:py-3.5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#7a3e1e] shadow-2xs">
            <div className="flex items-start sm:items-center gap-2.5">
              <span className="material-symbols-outlined text-base text-[#7a3e1e] shrink-0 mt-0.5 sm:mt-0">
                info
              </span>
              <span>
                <strong>Demonstration / Sample Data:</strong> Displaying client-provided sample records for{' '}
                <em>Godrej (Andheri, Mumbai)</em>. All cataloged inventory is illustrative for UI/UX demonstration until client inventory approval.
              </span>
            </div>
            <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider bg-[#ffdea7] text-[#5d2809] px-2.5 py-1 rounded-full border border-[#f0d49f]">
              Sample Data
            </span>
          </div>

          {/* ======================================================== */}
          {/* VISIBLE STEPPER INDICATOR                                */}
          {/* ======================================================== */}
          <div className="bg-white rounded-2xl border border-[#ecd9c6] p-3 sm:p-5 shadow-2xs mb-8">
            <div className="flex items-center justify-between border-b border-[#f3e7da] pb-3 mb-3">
              <span className="text-xs font-bold text-[#7a3e1e] uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">route</span>
                Stage {currentStage} of 5
              </span>
              <button
                type="button"
                onClick={handleStartOver}
                className="text-xs font-semibold text-[#86736b] hover:text-[#5d2809] flex items-center gap-1 transition cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">restart_alt</span>
                <span>Start Over</span>
              </button>
            </div>

            {/* Stepper Steps (Clickable to jump back) */}
            <div className="grid grid-cols-5 gap-2 text-center text-xs">
              {/* Step 1: City */}
              <button
                type="button"
                onClick={() => {
                  if (currentStage > 1) {
                    setCurrentStage(1);
                    setInspectedFlat(null);
                  }
                }}
                disabled={currentStage === 1}
                className={`p-2 rounded-xl border text-left sm:text-center transition cursor-pointer ${
                  currentStage === 1
                    ? 'bg-[#7a3e1e] text-white border-[#7a3e1e] shadow-2xs'
                    : selectedCity
                    ? 'bg-[#faf6ee] text-[#5d2809] border-[#d8c2b9] hover:bg-[#f3ede3]'
                    : 'bg-white text-[#86736b] border-[#ecd9c6] opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between sm:justify-center gap-1 mb-0.5">
                  <span className="font-bold text-[10px] uppercase tracking-wider">1. City</span>
                  {selectedCity && currentStage > 1 && (
                    <span className="material-symbols-outlined text-xs text-emerald-700">check</span>
                  )}
                </div>
                <div className="font-semibold text-xs truncate">
                  {selectedCity || 'Choose City'}
                </div>
              </button>

              {/* Step 2: Location */}
              <button
                type="button"
                onClick={() => {
                  if (currentStage > 2) {
                    setCurrentStage(2);
                    setInspectedFlat(null);
                  }
                }}
                disabled={currentStage <= 2}
                className={`p-2 rounded-xl border text-left sm:text-center transition cursor-pointer ${
                  currentStage === 2
                    ? 'bg-[#7a3e1e] text-white border-[#7a3e1e] shadow-2xs'
                    : selectedLocation
                    ? 'bg-[#faf6ee] text-[#5d2809] border-[#d8c2b9] hover:bg-[#f3ede3]'
                    : 'bg-white text-[#86736b] border-[#ecd9c6] opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between sm:justify-center gap-1 mb-0.5">
                  <span className="font-bold text-[10px] uppercase tracking-wider">2. Location</span>
                  {selectedLocation && currentStage > 2 && (
                    <span className="material-symbols-outlined text-xs text-emerald-700">check</span>
                  )}
                </div>
                <div className="font-semibold text-xs truncate">
                  {selectedLocation || 'Locality'}
                </div>
              </button>

              {/* Step 3: Project */}
              <button
                type="button"
                onClick={() => {
                  if (currentStage > 3) {
                    setCurrentStage(3);
                    setInspectedFlat(null);
                  }
                }}
                disabled={currentStage <= 3}
                className={`p-2 rounded-xl border text-left sm:text-center transition cursor-pointer ${
                  currentStage === 3
                    ? 'bg-[#7a3e1e] text-white border-[#7a3e1e] shadow-2xs'
                    : selectedProject
                    ? 'bg-[#faf6ee] text-[#5d2809] border-[#d8c2b9] hover:bg-[#f3ede3]'
                    : 'bg-white text-[#86736b] border-[#ecd9c6] opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between sm:justify-center gap-1 mb-0.5">
                  <span className="font-bold text-[10px] uppercase tracking-wider">3. Project</span>
                  {selectedProject && currentStage > 3 && (
                    <span className="material-symbols-outlined text-xs text-emerald-700">check</span>
                  )}
                </div>
                <div className="font-semibold text-xs truncate">
                  {selectedProject ? selectedProject.name : 'Project'}
                </div>
              </button>

              {/* Step 4: Wing */}
              <button
                type="button"
                onClick={() => {
                  if (currentStage > 4) {
                    setCurrentStage(4);
                    setInspectedFlat(null);
                  }
                }}
                disabled={currentStage <= 4}
                className={`p-2 rounded-xl border text-left sm:text-center transition cursor-pointer ${
                  currentStage === 4
                    ? 'bg-[#7a3e1e] text-white border-[#7a3e1e] shadow-2xs'
                    : selectedWing
                    ? 'bg-[#faf6ee] text-[#5d2809] border-[#d8c2b9] hover:bg-[#f3ede3]'
                    : 'bg-white text-[#86736b] border-[#ecd9c6] opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between sm:justify-center gap-1 mb-0.5">
                  <span className="font-bold text-[10px] uppercase tracking-wider">4. Wing</span>
                  {selectedWing && currentStage > 4 && (
                    <span className="material-symbols-outlined text-xs text-emerald-700">check</span>
                  )}
                </div>
                <div className="font-semibold text-xs truncate">
                  {selectedWing ? selectedWing.name : 'Wing'}
                </div>
              </button>

              {/* Step 5: Flat */}
              <div
                className={`p-2 rounded-xl border text-left sm:text-center transition ${
                  currentStage === 5
                    ? 'bg-[#7a3e1e] text-white border-[#7a3e1e] shadow-2xs'
                    : 'bg-white text-[#86736b] border-[#ecd9c6] opacity-60'
                }`}
              >
                <div className="font-bold text-[10px] uppercase tracking-wider mb-0.5">
                  5. Flat
                </div>
                <div className="font-semibold text-xs truncate">
                  {inspectedFlat ? inspectedFlat.ppCode : 'Flat'}
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* STAGE 1: SELECT CITY                                     */}
          {/* ======================================================== */}
          {currentStage === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#ecd9c6]/60 pb-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif text-[#4a240c] font-bold">
                    Stage 1 — Select City
                  </h2>
                  <p className="text-xs text-[#53433c]">
                    Showing cities supported by available verified demonstration and client sample listings.
                  </p>
                </div>
                <span className="text-xs text-[#86736b]">
                  {availableCities.length} Cities Available
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {availableCities.map((city) => (
                  <button
                    key={city.name}
                    type="button"
                    onClick={() => handleSelectCity(city.name)}
                    className={`p-5 rounded-2xl border text-left flex items-start justify-between group cursor-pointer transition-all ${
                      city.hasClientSample
                        ? 'bg-white border-[#ffdea7] ring-1 ring-[#ffdea7]/60 hover:shadow-md'
                        : 'bg-white border-[#ecd9c6] hover:border-[#7a3e1e] hover:shadow-md'
                    }`}
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-[#faede0] text-[#743b19] flex items-center justify-center group-hover:bg-[#743b19] group-hover:text-white transition-colors mb-3">
                        <span className="material-symbols-outlined text-xl">location_city</span>
                      </div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <h3 className="text-base font-bold font-serif text-[#4a240c] group-hover:text-[#7a3e1e]">
                          {city.name}
                        </h3>
                        {city.hasClientSample && (
                          <span className="text-[9px] font-bold bg-[#ffdea7] text-[#5d2809] px-1.5 py-0.2 rounded font-sans">
                            Client Sample
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#86736b]">{city.state}</p>
                    </div>
                    <span className="text-[11px] font-bold bg-[#faf6ee] text-[#7a3e1e] border border-[#ecd9c6] px-2 py-0.5 rounded-full">
                      {city.count} {city.count === 1 ? 'Project' : 'Projects'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* STAGE 2: SELECT LOCATION                                 */}
          {/* ======================================================== */}
          {currentStage === 2 && selectedCity && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#ecd9c6]/60 pb-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif text-[#4a240c] font-bold">
                    Stage 2 — Select Location in {selectedCity}
                  </h2>
                  <p className="text-xs text-[#53433c]">
                    Choose a locality to explore verified projects.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleGoBack}
                  className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl border border-[#dfceba] bg-white hover:bg-[#faf7f2] text-xs font-bold text-[#5d2809] flex items-center gap-1 transition shadow-2xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                  <span>Back to Cities</span>
                </button>
              </div>

              {availableLocations.length === 0 ? (
                /* Empty state for location */
                <div className="bg-white rounded-2xl border border-[#ecd9c6] p-10 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#f6eee2] text-[#7a3e1e] flex items-center justify-center mx-auto">
                    <span className="material-symbols-outlined text-2xl">location_off</span>
                  </div>
                  <h3 className="text-base font-serif font-bold text-[#4a240c]">
                    No locations cataloged in {selectedCity}
                  </h3>
                  <p className="text-xs text-[#53433c] max-w-md mx-auto">
                    We do not currently have verified projects for this city in the demo. Please choose another city to continue your journey.
                  </p>
                  <button
                    type="button"
                    onClick={handleGoBack}
                    className="bg-[#7a3e1e] hover:bg-[#5d2809] text-white px-4 py-2 rounded-xl text-xs font-bold transition"
                  >
                    Choose Another City
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {availableLocations.map((loc) => (
                    <button
                      key={loc.name}
                      type="button"
                      onClick={() => handleSelectLocation(loc.name)}
                      className={`p-5 rounded-2xl border text-left flex items-start justify-between group cursor-pointer transition-all ${
                        loc.hasClientSample
                          ? 'bg-white border-[#ffdea7] ring-1 ring-[#ffdea7]/60 hover:shadow-md'
                          : 'bg-white border-[#ecd9c6] hover:border-[#7a3e1e] hover:shadow-md'
                      }`}
                    >
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-[#faede0] text-[#743b19] flex items-center justify-center group-hover:bg-[#743b19] group-hover:text-white transition-colors mb-3">
                          <span className="material-symbols-outlined text-xl">pin_drop</span>
                        </div>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <h3 className="text-base font-bold font-serif text-[#4a240c] group-hover:text-[#7a3e1e]">
                            {loc.name}
                          </h3>
                          {loc.hasClientSample && (
                            <span className="text-[9px] font-bold bg-[#ffdea7] text-[#5d2809] px-1.5 py-0.2 rounded font-sans">
                              Client Sample
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#86736b]">{selectedCity}</p>
                      </div>
                      <span className="text-[11px] font-bold bg-[#faf6ee] text-[#7a3e1e] border border-[#ecd9c6] px-2 py-0.5 rounded-full">
                        {loc.count} {loc.count === 1 ? 'Project' : 'Projects'}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* STAGE 3: SELECT PROJECT                                  */}
          {/* ======================================================== */}
          {currentStage === 3 && selectedCity && selectedLocation && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#ecd9c6]/60 pb-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif text-[#4a240c] font-bold">
                    Stage 3 — Select Project in {selectedLocation}
                  </h2>
                  <p className="text-xs text-[#53433c]">
                    Showing residential developments in {selectedLocation}, {selectedCity}.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleGoBack}
                  className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl border border-[#dfceba] bg-white hover:bg-[#faf7f2] text-xs font-bold text-[#5d2809] flex items-center gap-1 transition shadow-2xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                  <span>Back to Locations</span>
                </button>
              </div>

              {availableProjects.length === 0 ? (
                /* Empty state for projects */
                <div className="bg-white rounded-2xl border border-[#ecd9c6] p-10 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#f6eee2] text-[#7a3e1e] flex items-center justify-center mx-auto">
                    <span className="material-symbols-outlined text-2xl">domain_disabled</span>
                  </div>
                  <h3 className="text-base font-serif font-bold text-[#4a240c]">
                    No projects found in {selectedLocation}
                  </h3>
                  <p className="text-xs text-[#53433c] max-w-md mx-auto">
                    There are no residential projects cataloged in this location. Please choose another location in {selectedCity}.
                  </p>
                  <button
                    type="button"
                    onClick={handleGoBack}
                    className="bg-[#7a3e1e] hover:bg-[#5d2809] text-white px-4 py-2 rounded-xl text-xs font-bold transition"
                  >
                    Select Another Location
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableProjects.map((proj) => (
                    <div
                      key={proj.id}
                      className={`bg-white rounded-2xl border transition-all flex flex-col overflow-hidden group ${
                        proj.isClientSample
                          ? 'border-[#ffdea7] ring-1 ring-[#ffdea7]/60 shadow-xs hover:shadow-md'
                          : 'border-[#ecd9c6] hover:border-[#7a3e1e] hover:shadow-md'
                      }`}
                    >
                      <div className="h-44 overflow-hidden bg-[#dbdad6] relative">
                        <img
                          src={proj.heroImage}
                          alt={proj.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-xs text-[#4a240c] text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs">
                          {proj.propertyType}
                        </span>
                        {proj.sampleBadgeText && (
                          <span className="absolute top-2.5 right-2.5 bg-[#ffdea7] text-[#5d2809] text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs">
                            {proj.sampleBadgeText}
                          </span>
                        )}
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <div className="text-[11px] text-[#86736b] mb-1 font-medium">
                            {proj.location}
                          </div>
                          <h3 className="text-lg font-bold font-serif text-[#4a240c] group-hover:text-[#7a3e1e]">
                            {proj.name}
                          </h3>
                          <p className="text-xs text-[#53433c] line-clamp-2 mt-1">
                            {proj.overview}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[#f3e7da] flex items-center justify-between">
                          <span className="text-xs font-semibold text-[#86736b]">
                            {proj.wings.length} Wings Listed
                          </span>
                          <button
                            type="button"
                            onClick={() => handleSelectProject(proj)}
                            className="bg-[#7a3e1e] hover:bg-[#5d2809] text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-2xs flex items-center gap-1 cursor-pointer"
                          >
                            <span>Select Project</span>
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* STAGE 4: SELECT WING                                     */}
          {/* ======================================================== */}
          {currentStage === 4 && selectedProject && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#ecd9c6]/60 pb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl sm:text-2xl font-serif text-[#4a240c] font-bold">
                      Stage 4 — Select Wing in {selectedProject.name}
                    </h2>
                    {selectedProject.isClientSample && (
                      <span className="text-[10px] font-bold bg-[#ffdea7] text-[#5d2809] px-2 py-0.5 rounded">
                        Client Sample
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#53433c]">
                    Select an architectural wing to inspect individual units.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleGoBack}
                  className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl border border-[#dfceba] bg-white hover:bg-[#faf7f2] text-xs font-bold text-[#5d2809] flex items-center gap-1 transition shadow-2xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                  <span>Back to Projects</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {selectedProject.wings.map((wing) => (
                  <div
                    key={wing.id}
                    className={`bg-white p-6 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                      wing.isSimulatedDemo
                        ? 'border-dashed border-[#dfceba] bg-[#faf8f5]'
                        : 'border-[#ecd9c6] hover:border-[#7a3e1e] hover:shadow-md'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 rounded-xl bg-[#faede0] text-[#743b19] flex items-center justify-center font-bold text-base font-serif">
                          {wing.name.includes('A') ? 'A' : 'B'}
                        </div>
                        {wing.isSimulatedDemo ? (
                          <span className="text-[10px] font-semibold bg-[#eae8e4] text-[#53433c] px-2 py-0.5 rounded">
                            Simulated Demo State
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded">
                            Active Sample
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold font-serif text-[#4a240c]">
                        {wing.name}
                      </h3>
                      <p className="text-xs text-[#53433c] mt-1">
                        {wing.orientation || 'Standard Residential Wing'}
                      </p>
                      {wing.isSimulatedDemo && (
                        <p className="text-[11px] text-[#86736b] mt-2 italic leading-tight">
                          Demonstration empty state — Not present in supplied client sample.
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-[#f3e7da] flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#86736b]">
                        {wing.flats.length > 0
                          ? `${wing.flats.length} Sample Flat${wing.flats.length > 1 ? 's' : ''}`
                          : '0 Units (Simulated)'}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleSelectWing(wing)}
                        className={`text-xs font-bold px-4 py-2 rounded-xl transition shadow-2xs flex items-center gap-1 cursor-pointer ${
                          wing.isSimulatedDemo
                            ? 'bg-[#eae8e4] hover:bg-[#dbdad6] text-[#53433c]'
                            : 'bg-[#7a3e1e] hover:bg-[#5d2809] text-white'
                        }`}
                      >
                        <span>Choose {wing.name}</span>
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* STAGE 5: SELECT FLAT                                     */}
          {/* ======================================================== */}
          {currentStage === 5 && selectedProject && selectedWing && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#ecd9c6]/60 pb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl sm:text-2xl font-serif text-[#4a240c] font-bold">
                      Stage 5 — Select Flat in {selectedWing.name}
                    </h2>
                    {selectedProject.isClientSample && (
                      <span className="text-[10px] font-bold bg-[#ffdea7] text-[#5d2809] px-2 py-0.5 rounded">
                        6 Sample Records
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#53433c]">
                    Project: <span className="font-semibold text-[#4a240c]">{selectedProject.name}</span> • Locality:{' '}
                    <span className="font-semibold text-[#4a240c]">{selectedProject.locality}</span> • Wing:{' '}
                    <span className="font-semibold text-[#4a240c]">{selectedWing.name}</span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleGoBack}
                  className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl border border-[#dfceba] bg-white hover:bg-[#faf7f2] text-xs font-bold text-[#5d2809] flex items-center gap-1 transition shadow-2xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                  <span>Back to Wings</span>
                </button>
              </div>

              {/* Clean Empty State for Wing with 0 flats (e.g. Wing B) */}
              {selectedWing.flats.length === 0 ? (
                <div className="bg-white rounded-2xl border border-dashed border-[#dfceba] p-10 text-center space-y-3 max-w-lg mx-auto">
                  <div className="w-12 h-12 rounded-full bg-[#f6eee2] text-[#7a3e1e] flex items-center justify-center mx-auto">
                    <span className="material-symbols-outlined text-2xl">meeting_room</span>
                  </div>
                  <h3 className="text-base font-serif font-bold text-[#4a240c]">
                    Simulated Demo State: No Inventory in {selectedWing.name}
                  </h3>
                  <p className="text-xs text-[#53433c] leading-relaxed">
                    {selectedWing.simulationNotice ||
                      'Wing B is a simulated empty state for testing demonstration flows. It is not part of the supplied client sample.'}
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleGoBack}
                      className="bg-[#7a3e1e] hover:bg-[#5d2809] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-2xs cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-sm">arrow_back</span>
                      <span>Return to Wing A ({selectedProject.wings[0].flats.length} Sample Flats)</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Flat Cards List (Clean, NO Series Number shown here) */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedWing.flats.map((flat) => (
                    <div
                      key={flat.id}
                      className="bg-white rounded-2xl border border-[#ecd9c6] hover:border-[#7a3e1e] hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
                    >
                      {/* Card Header */}
                      <div className="p-5 pb-3 border-b border-[#f3e7da]">
                        <div className="flex items-center justify-between mb-2">
                          {/* PP Code badge */}
                          <span className="bg-[#4a240c] text-white text-xs font-mono font-bold px-2.5 py-1 rounded-lg shadow-2xs">
                            {flat.ppCode}
                          </span>
                          {/* Vastu status badge */}
                          {renderVastuStatusBadge(flat.vastuStatus)}
                        </div>

                        <h3 className="text-lg font-bold font-serif text-[#4a240c]">
                          {flat.bhk}
                        </h3>
                        <p className="text-xs text-[#86736b] mt-0.5">
                          {flat.projectName} • {flat.locality}, {flat.city}
                        </p>
                      </div>

                      {/* Card Body (SERIES NUMBER IS STRICTLY HIDDEN HERE) */}
                      <div className="p-5 pt-3 space-y-3 flex-1 flex flex-col justify-between">
                        <div className="space-y-1.5 text-xs text-[#53433c]">
                          <div className="flex items-center justify-between">
                            <span className="text-[#86736b]">Wing:</span>
                            <span className="font-semibold text-[#4a240c]">{flat.wing}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[#86736b]">Inventory Type:</span>
                            <span className="font-semibold text-[#7a3e1e]">
                              {flat.isClientSample ? 'Client Sample' : 'Demonstration Record'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-[#86736b] italic pt-1">
                            <span>Series Number:</span>
                            <span className="text-[#7a3e1e] font-sans not-italic font-medium">
                              Confidential until inspection
                            </span>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-[#f3e7da]">
                          <button
                            type="button"
                            onClick={() => setInspectedFlat(flat)}
                            className="w-full bg-[#7a3e1e] hover:bg-[#5d2809] text-white text-xs font-bold py-2.5 px-4 rounded-xl transition shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-base">visibility</span>
                            <span>Inspect Flat Details</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* INDIVIDUAL FLAT INSPECTION VIEW (MODAL)                  */}
          {/* ======================================================== */}
          {inspectedFlat && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
              <div className="bg-white rounded-3xl border border-[#ecd9c6] shadow-2xl max-w-2xl w-full overflow-hidden my-8">
                {/* Modal Top Bar */}
                <div className="px-6 py-4 bg-[#fbf8f3] border-b border-[#ecd9c6] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-xl bg-[#4a240c] text-white text-sm font-mono font-bold shadow-2xs">
                      {inspectedFlat.ppCode}
                    </span>
                    <div>
                      <h3 className="text-base font-serif font-bold text-[#4a240c]">
                        Individual Flat Inspection
                      </h3>
                      <p className="text-[11px] text-[#86736b]">
                        {inspectedFlat.projectName} • {inspectedFlat.locality}, {inspectedFlat.city} • {inspectedFlat.wing}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setInspectedFlat(null)}
                    className="w-8 h-8 rounded-full bg-white hover:bg-[#f3ede3] text-[#5d2809] flex items-center justify-center transition border border-[#ecd9c6] cursor-pointer"
                    title="Close Inspection"
                  >
                    <span className="material-symbols-outlined text-base">close</span>
                  </button>
                </div>

                {/* Modal Main Content */}
                <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
                  {/* A. Flat Identity Banner */}
                  <div className="bg-gradient-to-r from-[#faf6ee] via-white to-[#faf6ee] p-5 rounded-2xl border border-[#eedecb] space-y-2">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#7a3e1e] bg-[#ffdea7] px-2.5 py-0.5 rounded-full">
                        {inspectedFlat.isClientSample ? 'Client Reference Sample' : 'Demonstration Record'}
                      </span>
                      {/* Vastu status badge */}
                      {renderVastuStatusBadge(inspectedFlat.vastuStatus)}
                    </div>
                    <div className="flex items-baseline justify-between flex-wrap gap-2 pt-1">
                      <div>
                        <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#4a240c]">
                          {inspectedFlat.bhk} • {inspectedFlat.projectName}
                        </h4>
                        <p className="text-xs text-[#53433c]">
                          Location: {inspectedFlat.locality}, {inspectedFlat.city} • {inspectedFlat.wing}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="block text-[10px] text-[#86736b] uppercase font-bold">PP Code</span>
                        <span className="font-mono font-bold text-sm text-[#4a240c]">{inspectedFlat.ppCode}</span>
                      </div>
                    </div>
                  </div>

                  {/* B. Vastu Status Presentation (Exact Terminology & Grounded Explanation) */}
                  <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#ecd9c6] shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#7a3e1e] flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-base">balance</span>
                        Vastu Status Assessment
                      </span>
                      <span className="font-bold text-xs text-[#4a240c]">{inspectedFlat.vastuStatus}</span>
                    </div>
                    <p className="text-xs text-[#53433c] leading-relaxed">
                      {getVastuStatusDescription(inspectedFlat.vastuStatus)}
                    </p>
                    <p className="text-[11px] text-[#86736b] italic pt-1 border-t border-[#f3e7da]">
                      Evaluated on natural directional principles: sunlight access, air circulation, and functional room balance.
                    </p>
                  </div>

                  {/* C. Series Number (REVEALED PROMINENTLY ONLY IN THIS INSPECTION VIEW) */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#ffdea7]/25 border-2 border-[#ffdea7] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#7a3e1e] text-lg">tag</span>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#7a3e1e]">
                          Individual Series Number
                        </span>
                      </div>
                      <span className="text-[10px] font-bold bg-[#ffdea7] text-[#5d2809] px-2 py-0.5 rounded-full">
                        Revealed on Inspection
                      </span>
                    </div>
                    <div className="flex items-center gap-3 pt-1">
                      <span className="text-2xl sm:text-3xl font-serif font-bold text-[#4a240c]">
                        Series {inspectedFlat.seriesNumber}
                      </span>
                      <span className="text-xs text-[#53433c] leading-tight">
                        Floorplan Series #{inspectedFlat.seriesNumber} of {inspectedFlat.wing}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#7a3e1e] leading-relaxed">
                      This Series Number corresponds to the specific architectural position within {inspectedFlat.wing}. It was kept confidential during initial discovery stages.
                    </p>
                  </div>

                  {/* D. Property Information & Transparency for Missing Sample Fields */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#86736b] block">
                      Property Specifications (Sample Data Status)
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-[#faf6ee] border border-[#ecd9c6]">
                        <span className="block text-[10px] uppercase font-bold text-[#86736b]">Configuration</span>
                        <span className="font-bold text-[#4a240c] mt-0.5 block">{inspectedFlat.bhk}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#faf6ee] border border-[#ecd9c6]">
                        <span className="block text-[10px] uppercase font-bold text-[#86736b]">Carpet Area</span>
                        <span className="text-[11px] text-[#86736b] italic mt-0.5 block">Not provided in sample</span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#faf6ee] border border-[#ecd9c6]">
                        <span className="block text-[10px] uppercase font-bold text-[#86736b]">Pricing</span>
                        <span className="text-[11px] text-[#86736b] italic mt-0.5 block">Not provided in sample</span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#faf6ee] border border-[#ecd9c6]">
                        <span className="block text-[10px] uppercase font-bold text-[#86736b]">Floor Number</span>
                        <span className="text-[11px] text-[#86736b] italic mt-0.5 block">Not provided in sample</span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#faf6ee] border border-[#ecd9c6]">
                        <span className="block text-[10px] uppercase font-bold text-[#86736b]">Facing Direction</span>
                        <span className="text-[11px] text-[#86736b] italic mt-0.5 block">Not provided in sample</span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#faf6ee] border border-[#ecd9c6]">
                        <span className="block text-[10px] uppercase font-bold text-[#86736b]">Amenities</span>
                        <span className="text-[11px] text-[#86736b] italic mt-0.5 block">Not provided in sample</span>
                      </div>
                    </div>
                  </div>

                  {/* Sample Status Notice */}
                  <div className="bg-[#fcf8f2] border border-[#eedecb] rounded-xl p-3.5 text-xs text-[#7a3e1e] flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-base shrink-0 mt-0.5">verified_user</span>
                    <span className="leading-relaxed">
                      <strong>Client Demonstration Notice:</strong> This inspection view displays verified attributes from the client reference dataset. Verified carpet areas, floor allocations, and pricing will be integrated upon official inventory onboarding.
                    </span>
                  </div>
                </div>

                {/* Modal Footer (Consultation CTA & Close Control) */}
                <div className="px-6 py-4 bg-[#fbf8f3] border-t border-[#ecd9c6] flex flex-col sm:flex-row items-center justify-between gap-3">
                  {/* E. Consultation CTA Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setInspectedFlat(null);
                      setIsConsultOpen(true);
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#7a3e1e] hover:bg-[#5d2809] text-white text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-2xs active:scale-95"
                  >
                    <span className="material-symbols-outlined text-base">support_agent</span>
                    <span>Request Vastu Consultation</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setInspectedFlat(null)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#ecd9c6] bg-white hover:bg-[#faf6ee] text-[#5d2809] text-xs font-bold transition cursor-pointer"
                  >
                    Close Inspection
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Floating Vastu AI widget */}
      <VastuAiWidget propertyTitle={selectedProject?.name || 'Godrej'} />

      {/* Footer */}
      <Footer />

      {/* Reusable Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultOpen}
        onClose={() => setIsConsultOpen(false)}
      />
    </div>
  );
}

export default function GuidedDiscoveryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#fbf9f5] flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-3 border-[#7a3e1e] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs font-serif font-bold text-[#5d2809]">
              Loading Guided Discovery...
            </p>
          </div>
        </div>
      }
    >
      <GuidedDiscoveryContent />
    </Suspense>
  );
}
