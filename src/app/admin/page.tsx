'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useProperties } from '@/context/PropertiesContext';
import { useToast } from '@/context/ToastContext';
import { DiscoveryFlat, PublicVastuStatus } from '@/data/discovery';

type AdminTab = 'overview' | 'cities' | 'locations' | 'projects' | 'wings' | 'flats';

export default function AdminDashboardPage() {
  const { showToast } = useToast();
  const {
    discoveryFlats,
    discoveryProjects,
    addDiscoveryFlat,
    updateDiscoveryFlat,
    deleteDiscoveryFlat,
    resetDiscoveryToDefault,
  } = useProperties();

  // Active Tab
  const [activeTab, setActiveTab] = useState<AdminTab>('flats');

  // Drill-down filters
  const [selectedCityFilter, setSelectedCityFilter] = useState<string>('All');
  const [selectedLocalityFilter, setSelectedLocalityFilter] = useState<string>('All');
  const [selectedProjectFilter, setSelectedProjectFilter] = useState<string>('All');
  const [selectedWingFilter, setSelectedWingFilter] = useState<string>('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Flat Modal State (Add / Edit)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingFlatId, setEditingFlatId] = useState<string | null>(null);

  // Form Fields
  const [formCity, setFormCity] = useState('Mumbai');
  const [formLocality, setFormLocality] = useState('Andheri');
  const [formProject, setFormProject] = useState('Godrej');
  const [formWing, setFormWing] = useState('Wing A');
  const [formBhk, setFormBhk] = useState('2 BHK');
  const [formPpCode, setFormPpCode] = useState('');
  const [formVastuStatus, setFormVastuStatus] = useState<PublicVastuStatus>('Aligned');
  const [formSeriesNumber, setFormSeriesNumber] = useState('1');
  const [formError, setFormError] = useState<string | null>(null);

  // Delete Confirmation Modal State
  const [deletingFlat, setDeletingFlat] = useState<DiscoveryFlat | null>(null);

  // Reset Confirmation Modal State
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // --------------------------------------------------------------------------
  // 1. DATA AGGREGATION & DERIVED STATS (Ground truth from active dataset)
  // --------------------------------------------------------------------------

  // All unique cities in dataset
  const citiesList = useMemo(() => {
    const map = new Map<string, {
      name: string;
      state: string;
      locationsCount: Set<string>;
      projectsCount: number;
      wingsCount: number;
      flatsCount: number;
      hasClientSample: boolean;
    }>();

    discoveryProjects.forEach((proj) => {
      const existing = map.get(proj.city);
      if (existing) {
        existing.locationsCount.add(proj.locality);
        existing.projectsCount += 1;
        existing.wingsCount += proj.wings.length;
        existing.flatsCount += proj.totalFlats;
        if (proj.isClientSample) existing.hasClientSample = true;
      } else {
        map.set(proj.city, {
          name: proj.city,
          state: proj.state,
          locationsCount: new Set([proj.locality]),
          projectsCount: 1,
          wingsCount: proj.wings.length,
          flatsCount: proj.totalFlats,
          hasClientSample: proj.isClientSample,
        });
      }
    });

    return Array.from(map.values()).sort((a, b) => {
      if (a.hasClientSample && !b.hasClientSample) return -1;
      if (!a.hasClientSample && b.hasClientSample) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [discoveryProjects]);

  // All unique locations in dataset
  const locationsList = useMemo(() => {
    const map = new Map<string, {
      name: string;
      city: string;
      state: string;
      projectsCount: number;
      wingsCount: number;
      flatsCount: number;
      hasClientSample: boolean;
    }>();

    discoveryProjects.forEach((proj) => {
      const key = `${proj.city}__${proj.locality}`;
      const existing = map.get(key);
      if (existing) {
        existing.projectsCount += 1;
        existing.wingsCount += proj.wings.length;
        existing.flatsCount += proj.totalFlats;
        if (proj.isClientSample) existing.hasClientSample = true;
      } else {
        map.set(key, {
          name: proj.locality,
          city: proj.city,
          state: proj.state,
          projectsCount: 1,
          wingsCount: proj.wings.length,
          flatsCount: proj.totalFlats,
          hasClientSample: proj.isClientSample,
        });
      }
    });

    return Array.from(map.values()).sort((a, b) => {
      if (a.hasClientSample && !b.hasClientSample) return -1;
      if (!a.hasClientSample && b.hasClientSample) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [discoveryProjects]);

  // All wings across projects
  const wingsList = useMemo(() => {
    const list: Array<{
      id: string;
      wingName: string;
      projectName: string;
      locality: string;
      city: string;
      flatsCount: number;
      isSimulatedDemo: boolean;
      isClientSample: boolean;
    }> = [];

    discoveryProjects.forEach((proj) => {
      proj.wings.forEach((w) => {
        list.push({
          id: w.id,
          wingName: w.name,
          projectName: proj.name,
          locality: proj.locality,
          city: proj.city,
          flatsCount: w.flats.length,
          isSimulatedDemo: w.isSimulatedDemo || false,
          isClientSample: proj.isClientSample,
        });
      });
    });

    return list;
  }, [discoveryProjects]);

  // Counts for summary overview cards
  const totalCitiesCount = citiesList.length;
  const totalLocationsCount = locationsList.length;
  const totalProjectsCount = discoveryProjects.length;
  const totalWingsCount = wingsList.length;
  const totalFlatsCount = discoveryFlats.length;

  // Breakdown: Client Sample vs Simulated Demo
  const clientSampleFlatsCount = discoveryFlats.filter((f) => f.isClientSample).length;
  const simulatedDemoFlatsCount = totalFlatsCount - clientSampleFlatsCount;

  // --------------------------------------------------------------------------
  // 2. FILTERED LISTS
  // --------------------------------------------------------------------------

  // Filtered Flats for the Flats tab
  const filteredFlats = useMemo(() => {
    return discoveryFlats.filter((flat) => {
      // Search query (PP Code, Project, City, Wing)
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        flat.ppCode.toLowerCase().includes(q) ||
        flat.projectName.toLowerCase().includes(q) ||
        flat.city.toLowerCase().includes(q) ||
        flat.locality.toLowerCase().includes(q) ||
        flat.wing.toLowerCase().includes(q) ||
        flat.bhk.toLowerCase().includes(q);

      // Status filter
      const matchesStatus =
        selectedStatusFilter === 'All' || flat.vastuStatus === selectedStatusFilter;

      // Project filter
      const matchesProject =
        selectedProjectFilter === 'All' || flat.projectName === selectedProjectFilter;

      // City filter
      const matchesCity =
        selectedCityFilter === 'All' || flat.city.toLowerCase() === selectedCityFilter.toLowerCase();

      // Wing filter
      const matchesWing =
        selectedWingFilter === 'All' || flat.wing === selectedWingFilter;

      // Type filter (Client Sample vs Simulated)
      const matchesType =
        selectedTypeFilter === 'All' ||
        (selectedTypeFilter === 'Sample' && flat.isClientSample) ||
        (selectedTypeFilter === 'Simulated' && !flat.isClientSample);

      return matchesSearch && matchesStatus && matchesProject && matchesCity && matchesWing && matchesType;
    });
  }, [
    discoveryFlats,
    searchQuery,
    selectedStatusFilter,
    selectedProjectFilter,
    selectedCityFilter,
    selectedWingFilter,
    selectedTypeFilter,
  ]);

  // --------------------------------------------------------------------------
  // 3. FLAT FORM ACTIONS (Add / Edit)
  // --------------------------------------------------------------------------

  const handleOpenAddModal = () => {
    setEditingFlatId(null);
    setFormCity('Mumbai');
    setFormLocality('Andheri');
    setFormProject('Godrej');
    setFormWing('Wing A');
    setFormBhk('2 BHK');
    setFormPpCode('');
    setFormVastuStatus('Aligned');
    setFormSeriesNumber('7');
    setFormError(null);
    setIsFormOpen(true);
  };

  const handleOpenEditModal = (flat: DiscoveryFlat) => {
    setEditingFlatId(flat.id);
    setFormCity(flat.city);
    setFormLocality(flat.locality);
    setFormProject(flat.projectName);
    setFormWing(flat.wing);
    setFormBhk(flat.bhk);
    setFormPpCode(flat.ppCode);
    setFormVastuStatus(flat.vastuStatus);
    setFormSeriesNumber(flat.seriesNumber);
    setFormError(null);
    setIsFormOpen(true);
  };

  // Explicit suggestion helper for demo PP Code (never generated without user click)
  const handleSuggestDemoCode = () => {
    const prefix = formProject.slice(0, 3).toUpperCase() || 'DEMO';
    const randNum = Math.floor(100 + Math.random() * 900);
    setFormPpCode(`${prefix}-${randNum}`);
  };

  const handleSaveFlat = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validation 1: Required fields
    if (!formCity.trim() || !formLocality.trim() || !formProject.trim() || !formWing.trim()) {
      setFormError('City, Locality, Project, and Wing are required.');
      return;
    }
    if (!formPpCode.trim()) {
      setFormError('PP Code is required. Enter a code or click "Suggest Demo Code".');
      return;
    }
    if (!formSeriesNumber.trim()) {
      setFormError('Series Number is required.');
      return;
    }

    const cleanPpCode = formPpCode.trim().toUpperCase();
    const cleanProject = formProject.trim();

    // Validation 2: Duplicate PP Code check within the same project
    const duplicate = discoveryFlats.find(
      (f) =>
        f.projectName.toLowerCase() === cleanProject.toLowerCase() &&
        f.ppCode.toUpperCase() === cleanPpCode &&
        f.id !== editingFlatId
    );

    if (duplicate) {
      setFormError(
        `PP Code "${cleanPpCode}" is already in use for project "${cleanProject}". Each flat within a project must have a unique PP Code.`
      );
      return;
    }

    if (editingFlatId) {
      // Update existing flat
      const existing = discoveryFlats.find((f) => f.id === editingFlatId);
      updateDiscoveryFlat(editingFlatId, {
        city: formCity.trim(),
        locality: formLocality.trim(),
        projectName: cleanProject,
        wing: formWing.trim(),
        bhk: formBhk,
        ppCode: cleanPpCode,
        vastuStatus: formVastuStatus,
        seriesNumber: formSeriesNumber.trim(),
      });
      showToast(
        existing?.isClientSample
          ? `Updated client reference sample flat ${cleanPpCode}!`
          : `Updated flat ${cleanPpCode} successfully!`
      );
    } else {
      // Add new flat
      const newFlat: DiscoveryFlat = {
        id: `flat-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        city: formCity.trim(),
        locality: formLocality.trim(),
        projectName: cleanProject,
        wing: formWing.trim(),
        bhk: formBhk,
        ppCode: cleanPpCode,
        vastuStatus: formVastuStatus,
        seriesNumber: formSeriesNumber.trim(),
        state: 'Maharashtra',
        isClientSample: false, // Newly created admin entries are demo additions
      };
      addDiscoveryFlat(newFlat);
    }

    setIsFormOpen(false);
  };

  // --------------------------------------------------------------------------
  // 4. DELETE ACTIONS
  // --------------------------------------------------------------------------

  const handleConfirmDelete = () => {
    if (!deletingFlat) return;
    deleteDiscoveryFlat(deletingFlat.id);
    setDeletingFlat(null);
  };

  // --------------------------------------------------------------------------
  // 5. RESET ACTIONS
  // --------------------------------------------------------------------------

  const handleConfirmReset = () => {
    resetDiscoveryToDefault();
    setIsResetModalOpen(false);
    showToast('Demonstration inventory restored to initial reference defaults (6 Godrej sample flats).');
  };

  // Editing target client sample check
  const isEditingClientSample = useMemo(() => {
    if (!editingFlatId) return false;
    return discoveryFlats.some((f) => f.id === editingFlatId && f.isClientSample);
  }, [editingFlatId, discoveryFlats]);

  // Helper for rendering Vastu Status Badges
  const renderVastuStatusBadge = (status: PublicVastuStatus) => {
    switch (status) {
      case 'Aligned':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#e6f4ea] text-[#137333] border border-[#ceead6]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#137333]"></span>
            <span>Aligned</span>
          </span>
        );
      case 'Balanced':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#fef7e0] text-[#b06000] border border-[#feefc3]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b06000]"></span>
            <span>Balanced</span>
          </span>
        );
      case 'Adaptable':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#fce8e6] text-[#c5221f] border border-[#fad2cf]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5221f]"></span>
            <span>Adaptable</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfaf6] text-[#1b1c1a] font-sans pb-16">
      {/* ==================================================================== */}
      {/* TOP ADMIN HEADER BAR                                                 */}
      {/* ==================================================================== */}
      <header className="bg-gradient-to-r from-[#3e1b0c] via-[#5d2809] to-[#7a3e1e] text-white shadow-md sticky top-0 z-40 border-b border-[#a26039]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-[#fdcd75] text-[#5d2809] flex items-center justify-center font-bold text-lg shadow-2xs">
                ॐ
              </div>
              <div>
                <span className="font-serif font-bold text-lg tracking-tight block text-[#ffdea7]">
                  PragyaaProp.com<span className="text-white text-xs align-super ml-0.5">®</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-[#f8d49a] block">
                  Property Inventory Administration
                </span>
              </div>
            </Link>

            {/* Clear Demonstration Environment Badge */}
            <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#fdcd75]/20 text-[#ffdea7] border border-[#fdcd75]/30">
              <span className="w-2 h-2 rounded-full bg-[#fdcd75] animate-pulse"></span>
              Demo Mode • LocalStorage Sync
            </span>
          </div>

          {/* Top Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Add Flat CTA */}
            <button
              type="button"
              onClick={handleOpenAddModal}
              className="bg-[#fdcd75] hover:bg-[#ffdea7] text-[#5d2809] px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-2xs active:scale-95 transition cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">add_circle</span>
              <span>Add Flat</span>
            </button>

            {/* Reset to Demo Data CTA */}
            <button
              type="button"
              onClick={() => setIsResetModalOpen(true)}
              className="bg-white/10 hover:bg-white/20 text-white/90 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1 transition cursor-pointer"
              title="Reset inventory to original client sample and defaults"
            >
              <span className="material-symbols-outlined text-base">restore</span>
              <span className="hidden sm:inline">Reset Demo Data</span>
            </button>

            {/* View Public Discovery Link */}
            <Link
              href="/properties"
              className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1 transition"
              title="Open the public guided discovery journey"
            >
              <span className="material-symbols-outlined text-base">explore</span>
              <span className="hidden sm:inline">Public Discovery</span>
            </Link>

            {/* Exit to Homepage */}
            <Link
              href="/"
              className="bg-white/10 hover:bg-white/20 text-white/80 hover:text-white px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1 transition"
            >
              <span className="material-symbols-outlined text-base">logout</span>
              <span className="hidden sm:inline">Exit</span>
            </Link>
          </div>
        </div>

        {/* ================================================================== */}
        {/* HIERARCHY NAVIGATION TABS                                         */}
        {/* ================================================================== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto scrollbar-none pt-2 border-t border-white/10">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-[#fdcd75] text-[#fdcd75]'
                : 'border-transparent text-white/70 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-base">dashboard</span>
            <span>Dashboard Overview</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('cities')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'cities'
                ? 'border-[#fdcd75] text-[#fdcd75]'
                : 'border-transparent text-white/70 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-base">location_city</span>
            <span>1. Cities ({totalCitiesCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('locations')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'locations'
                ? 'border-[#fdcd75] text-[#fdcd75]'
                : 'border-transparent text-white/70 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-base">pin_drop</span>
            <span>2. Locations ({totalLocationsCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'projects'
                ? 'border-[#fdcd75] text-[#fdcd75]'
                : 'border-transparent text-white/70 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-base">domain</span>
            <span>3. Projects ({totalProjectsCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('wings')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'wings'
                ? 'border-[#fdcd75] text-[#fdcd75]'
                : 'border-transparent text-white/70 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-base">meeting_room</span>
            <span>4. Wings ({totalWingsCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('flats')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'flats'
                ? 'border-[#fdcd75] text-[#fdcd75]'
                : 'border-transparent text-white/70 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-base">apartment</span>
            <span>5. Flats ({totalFlatsCount})</span>
          </button>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN ADMIN WORKSPACE                                                 */}
      {/* ==================================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-6">
        {/* SUMMARY CARDS (Ground truth counts from active inventory) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#4a240c]">
                Hierarchy Inventory Dashboard
              </h1>
              <p className="text-xs text-[#53433c]">
                Live management of City → Location → Project → Wing → Flat hierarchy
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-[#ffdea7] text-[#5d2809] font-bold">
                {clientSampleFlatsCount} Client Sample Flats
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#f0eae1] text-[#7a3e1e] font-semibold border border-[#ecd9c6]">
                {simulatedDemoFlatsCount} Simulated Demo Flats
              </span>
            </div>
          </div>

          {/* 5 Summary Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {/* Card 1: Cities */}
            <button
              type="button"
              onClick={() => setActiveTab('cities')}
              className={`p-4 rounded-2xl border text-left transition hover:shadow-md cursor-pointer ${
                activeTab === 'cities'
                  ? 'bg-white border-[#7a3e1e] ring-2 ring-[#7a3e1e]/20'
                  : 'bg-white border-[#ecd9c6] hover:border-[#7a3e1e]'
              }`}
            >
              <div className="flex items-center justify-between text-[#7a3e1e] mb-2">
                <span className="material-symbols-outlined text-xl">location_city</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#86736b]">Stage 1</span>
              </div>
              <div className="text-2xl font-serif font-bold text-[#4a240c]">{totalCitiesCount}</div>
              <div className="text-xs font-bold text-[#53433c] mt-0.5">Total Cities</div>
              <div className="text-[11px] text-[#86736b] mt-1">Mumbai (Sample Hub)</div>
            </button>

            {/* Card 2: Locations */}
            <button
              type="button"
              onClick={() => setActiveTab('locations')}
              className={`p-4 rounded-2xl border text-left transition hover:shadow-md cursor-pointer ${
                activeTab === 'locations'
                  ? 'bg-white border-[#7a3e1e] ring-2 ring-[#7a3e1e]/20'
                  : 'bg-white border-[#ecd9c6] hover:border-[#7a3e1e]'
              }`}
            >
              <div className="flex items-center justify-between text-[#7a3e1e] mb-2">
                <span className="material-symbols-outlined text-xl">pin_drop</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#86736b]">Stage 2</span>
              </div>
              <div className="text-2xl font-serif font-bold text-[#4a240c]">{totalLocationsCount}</div>
              <div className="text-xs font-bold text-[#53433c] mt-0.5">Total Locations</div>
              <div className="text-[11px] text-[#86736b] mt-1">Andheri (Sample Locality)</div>
            </button>

            {/* Card 3: Projects */}
            <button
              type="button"
              onClick={() => setActiveTab('projects')}
              className={`p-4 rounded-2xl border text-left transition hover:shadow-md cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-white border-[#7a3e1e] ring-2 ring-[#7a3e1e]/20'
                  : 'bg-white border-[#ecd9c6] hover:border-[#7a3e1e]'
              }`}
            >
              <div className="flex items-center justify-between text-[#7a3e1e] mb-2">
                <span className="material-symbols-outlined text-xl">domain</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#86736b]">Stage 3</span>
              </div>
              <div className="text-2xl font-serif font-bold text-[#4a240c]">{totalProjectsCount}</div>
              <div className="text-xs font-bold text-[#53433c] mt-0.5">Total Projects</div>
              <div className="text-[11px] text-[#86736b] mt-1">Godrej (Client Reference)</div>
            </button>

            {/* Card 4: Wings */}
            <button
              type="button"
              onClick={() => setActiveTab('wings')}
              className={`p-4 rounded-2xl border text-left transition hover:shadow-md cursor-pointer ${
                activeTab === 'wings'
                  ? 'bg-white border-[#7a3e1e] ring-2 ring-[#7a3e1e]/20'
                  : 'bg-white border-[#ecd9c6] hover:border-[#7a3e1e]'
              }`}
            >
              <div className="flex items-center justify-between text-[#7a3e1e] mb-2">
                <span className="material-symbols-outlined text-xl">meeting_room</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#86736b]">Stage 4</span>
              </div>
              <div className="text-2xl font-serif font-bold text-[#4a240c]">{totalWingsCount}</div>
              <div className="text-xs font-bold text-[#53433c] mt-0.5">Total Wings</div>
              <div className="text-[11px] text-[#86736b] mt-1">Wing A & Wing B</div>
            </button>

            {/* Card 5: Flats */}
            <button
              type="button"
              onClick={() => setActiveTab('flats')}
              className={`p-4 rounded-2xl border text-left transition hover:shadow-md cursor-pointer col-span-2 sm:col-span-1 ${
                activeTab === 'flats'
                  ? 'bg-white border-[#7a3e1e] ring-2 ring-[#7a3e1e]/20'
                  : 'bg-white border-[#ecd9c6] hover:border-[#7a3e1e]'
              }`}
            >
              <div className="flex items-center justify-between text-[#7a3e1e] mb-2">
                <span className="material-symbols-outlined text-xl">apartment</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#86736b]">Stage 5</span>
              </div>
              <div className="text-2xl font-serif font-bold text-[#4a240c]">{totalFlatsCount}</div>
              <div className="text-xs font-bold text-[#53433c] mt-0.5">Total Flats</div>
              <div className="text-[11px] text-[#86736b] mt-1">{clientSampleFlatsCount} Client + {simulatedDemoFlatsCount} Demo</div>
            </button>
          </div>
        </section>

        {/* ================================================================== */}
        {/* TAB 1: DASHBOARD OVERVIEW DETAILS                                  */}
        {/* ================================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-[#ecd9c6] p-6 space-y-4">
              <h2 className="text-lg font-serif font-bold text-[#4a240c] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#7a3e1e]">info</span>
                Demonstration Architecture & Scope
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#53433c] leading-relaxed">
                <div className="p-4 rounded-2xl bg-[#faf6ee] border border-[#ecd9c6] space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#137333]"></span>
                    <h3 className="font-bold text-[#4a240c] text-sm">Client Reference Sample Dataset</h3>
                  </div>
                  <p>
                    <strong>Location:</strong> Mumbai → Andheri → Godrej → Wing A
                  </p>
                  <p>
                    Contains 6 client-supplied sample flats (<code>A001</code>, <code>FDDES</code>, <code>VVFTT</code>, <code>GGGLT</code>, <code>HJJYY</code>, <code>KKYI</code>).
                  </p>
                  <p>
                    Each record has a verified Series Number (1–6) revealed only upon individual inspection. Zero invented pricing, carpet area, or numerical Vastu scores.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#faf6ee] border border-[#ecd9c6] space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#7a3e1e]"></span>
                    <h3 className="font-bold text-[#4a240c] text-sm">Simulated Demonstration Inventory</h3>
                  </div>
                  <p>
                    <strong>Scope:</strong> Multi-city hierarchy for UI/UX testing
                  </p>
                  <p>
                    Includes 18 retained demonstration projects mapped into Wing A (active demo flat) and Wing B (simulated empty state) across Mumbai, Pune, Bangalore, etc.
                  </p>
                  <p>
                    Demonstrates how administrators can manage new inventory, edit Vastu statuses, and observe immediate sync in public discovery.
                  </p>
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleOpenAddModal}
                  className="bg-[#7a3e1e] hover:bg-[#5d2809] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <span className="material-symbols-outlined text-base">add_circle</span>
                  <span>Add New Flat Record</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('flats')}
                  className="bg-white hover:bg-[#faf6ee] border border-[#ecd9c6] text-[#5d2809] text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">table_view</span>
                  <span>Manage All Flats ({totalFlatsCount})</span>
                </button>
                <Link
                  href="/properties"
                  className="bg-white hover:bg-[#faf6ee] border border-[#ecd9c6] text-[#5d2809] text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base">open_in_new</span>
                  <span>Open Public Discovery Journey</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 2: CITIES MANAGEMENT                                          */}
        {/* ================================================================== */}
        {activeTab === 'cities' && (
          <div className="bg-white rounded-3xl border border-[#ecd9c6] p-6 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h2 className="text-lg font-serif font-bold text-[#4a240c]">
                  Stage 1 — City Hierarchy
                </h2>
                <p className="text-xs text-[#53433c]">
                  Cities available in active demonstration inventory ({citiesList.length})
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#eedecb] text-[#86736b] font-bold uppercase tracking-wider text-[11px] bg-[#faf6ee]">
                    <th className="py-3 px-4">City</th>
                    <th className="py-3 px-4">State</th>
                    <th className="py-3 px-4">Locations</th>
                    <th className="py-3 px-4">Projects</th>
                    <th className="py-3 px-4">Wings</th>
                    <th className="py-3 px-4">Total Flats</th>
                    <th className="py-3 px-4">Sample Status</th>
                    <th className="py-3 px-4 text-right">Drill Down</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f3e7da]">
                  {citiesList.map((city) => (
                    <tr key={city.name} className="hover:bg-[#faf6ee] transition">
                      <td className="py-3 px-4 font-bold text-[#4a240c] text-sm">{city.name}</td>
                      <td className="py-3 px-4 text-[#53433c]">{city.state}</td>
                      <td className="py-3 px-4 font-semibold text-[#7a3e1e]">{city.locationsCount.size}</td>
                      <td className="py-3 px-4 font-semibold text-[#7a3e1e]">{city.projectsCount}</td>
                      <td className="py-3 px-4 text-[#53433c]">{city.wingsCount}</td>
                      <td className="py-3 px-4 font-bold text-[#4a240c]">{city.flatsCount}</td>
                      <td className="py-3 px-4">
                        {city.hasClientSample ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#ffdea7] text-[#5d2809]">
                            Client Sample Hub
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#f0eae1] text-[#7a3e1e]">
                            Simulated Demo
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCityFilter(city.name);
                            setActiveTab('locations');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#faf6ee] hover:bg-[#7a3e1e] text-[#5d2809] hover:text-white font-bold transition text-xs border border-[#ecd9c6] cursor-pointer inline-flex items-center gap-1"
                        >
                          <span>Explore Locations</span>
                          <span className="material-symbols-outlined text-xs">arrow_forward</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 3: LOCATIONS MANAGEMENT                                       */}
        {/* ================================================================== */}
        {activeTab === 'locations' && (
          <div className="bg-white rounded-3xl border border-[#ecd9c6] p-6 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h2 className="text-lg font-serif font-bold text-[#4a240c]">
                  Stage 2 — Location Hierarchy
                </h2>
                <p className="text-xs text-[#53433c]">
                  Localities grouped by City ({locationsList.length})
                </p>
              </div>

              {/* City Filter */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#86736b] font-bold">Filter City:</span>
                <select
                  value={selectedCityFilter}
                  onChange={(e) => setSelectedCityFilter(e.target.value)}
                  className="bg-[#faf6ee] border border-[#ecd9c6] text-[#4a240c] font-semibold rounded-xl px-3 py-1.5 cursor-pointer"
                >
                  <option value="All">All Cities</option>
                  {citiesList.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#eedecb] text-[#86736b] font-bold uppercase tracking-wider text-[11px] bg-[#faf6ee]">
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">City</th>
                    <th className="py-3 px-4">Projects</th>
                    <th className="py-3 px-4">Total Flats</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Drill Down</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f3e7da]">
                  {locationsList
                    .filter(
                      (loc) =>
                        selectedCityFilter === 'All' ||
                        loc.city.toLowerCase() === selectedCityFilter.toLowerCase()
                    )
                    .map((loc) => (
                      <tr key={`${loc.city}-${loc.name}`} className="hover:bg-[#faf6ee] transition">
                        <td className="py-3 px-4 font-bold text-[#4a240c] text-sm">{loc.name}</td>
                        <td className="py-3 px-4 text-[#53433c]">{loc.city}</td>
                        <td className="py-3 px-4 font-semibold text-[#7a3e1e]">{loc.projectsCount}</td>
                        <td className="py-3 px-4 font-bold text-[#4a240c]">{loc.flatsCount}</td>
                        <td className="py-3 px-4">
                          {loc.hasClientSample ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#ffdea7] text-[#5d2809]">
                              Client Sample Locality
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#f0eae1] text-[#7a3e1e]">
                              Simulated Demo
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedCityFilter(loc.city);
                              setSelectedLocalityFilter(loc.name);
                              setActiveTab('projects');
                            }}
                            className="px-3 py-1.5 rounded-lg bg-[#faf6ee] hover:bg-[#7a3e1e] text-[#5d2809] hover:text-white font-bold transition text-xs border border-[#ecd9c6] cursor-pointer inline-flex items-center gap-1"
                          >
                            <span>Explore Projects</span>
                            <span className="material-symbols-outlined text-xs">arrow_forward</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 4: PROJECTS MANAGEMENT                                        */}
        {/* ================================================================== */}
        {activeTab === 'projects' && (
          <div className="bg-white rounded-3xl border border-[#ecd9c6] p-6 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h2 className="text-lg font-serif font-bold text-[#4a240c]">
                  Stage 3 — Projects Hierarchy
                </h2>
                <p className="text-xs text-[#53433c]">
                  Residential developments and complexes ({discoveryProjects.length})
                </p>
              </div>

              {/* Location Filter */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#86736b] font-bold">Filter City:</span>
                <select
                  value={selectedCityFilter}
                  onChange={(e) => setSelectedCityFilter(e.target.value)}
                  className="bg-[#faf6ee] border border-[#ecd9c6] text-[#4a240c] font-semibold rounded-xl px-3 py-1.5 cursor-pointer"
                >
                  <option value="All">All Cities</option>
                  {citiesList.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#eedecb] text-[#86736b] font-bold uppercase tracking-wider text-[11px] bg-[#faf6ee]">
                    <th className="py-3 px-4">Project</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">City</th>
                    <th className="py-3 px-4">Wings</th>
                    <th className="py-3 px-4">Total Flats</th>
                    <th className="py-3 px-4">Dataset Status</th>
                    <th className="py-3 px-4 text-right">Drill Down</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f3e7da]">
                  {discoveryProjects
                    .filter(
                      (p) =>
                        (selectedCityFilter === 'All' ||
                          p.city.toLowerCase() === selectedCityFilter.toLowerCase()) &&
                        (selectedLocalityFilter === 'All' ||
                          p.locality.toLowerCase() === selectedLocalityFilter.toLowerCase())
                    )
                    .map((proj) => (
                      <tr key={proj.id} className="hover:bg-[#faf6ee] transition">
                        <td className="py-3 px-4 font-bold text-[#4a240c] text-sm">
                          {proj.name}
                        </td>
                        <td className="py-3 px-4 text-[#53433c]">{proj.locality}</td>
                        <td className="py-3 px-4 text-[#53433c]">{proj.city}</td>
                        <td className="py-3 px-4 font-semibold text-[#7a3e1e]">{proj.wings.length}</td>
                        <td className="py-3 px-4 font-bold text-[#4a240c]">{proj.totalFlats}</td>
                        <td className="py-3 px-4">
                          {proj.isClientSample ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#ffdea7] text-[#5d2809]">
                              Client Reference Project
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#f0eae1] text-[#7a3e1e]">
                              Simulated Demo
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedProjectFilter(proj.name);
                              setActiveTab('wings');
                            }}
                            className="px-3 py-1.5 rounded-lg bg-[#faf6ee] hover:bg-[#7a3e1e] text-[#5d2809] hover:text-white font-bold transition text-xs border border-[#ecd9c6] cursor-pointer inline-flex items-center gap-1"
                          >
                            <span>Explore Wings</span>
                            <span className="material-symbols-outlined text-xs">arrow_forward</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 5: WINGS MANAGEMENT                                           */}
        {/* ================================================================== */}
        {activeTab === 'wings' && (
          <div className="bg-white rounded-3xl border border-[#ecd9c6] p-6 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h2 className="text-lg font-serif font-bold text-[#4a240c]">
                  Stage 4 — Wings Hierarchy
                </h2>
                <p className="text-xs text-[#53433c]">
                  Wings cataloged across projects ({wingsList.length})
                </p>
              </div>

              {/* Project Filter */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#86736b] font-bold">Filter Project:</span>
                <select
                  value={selectedProjectFilter}
                  onChange={(e) => setSelectedProjectFilter(e.target.value)}
                  className="bg-[#faf6ee] border border-[#ecd9c6] text-[#4a240c] font-semibold rounded-xl px-3 py-1.5 cursor-pointer"
                >
                  <option value="All">All Projects</option>
                  {discoveryProjects.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} ({p.locality})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#eedecb] text-[#86736b] font-bold uppercase tracking-wider text-[11px] bg-[#faf6ee]">
                    <th className="py-3 px-4">Wing</th>
                    <th className="py-3 px-4">Project</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">City</th>
                    <th className="py-3 px-4">Flats</th>
                    <th className="py-3 px-4">Wing Status</th>
                    <th className="py-3 px-4 text-right">Drill Down</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f3e7da]">
                  {wingsList
                    .filter(
                      (w) =>
                        selectedProjectFilter === 'All' ||
                        w.projectName.toLowerCase() === selectedProjectFilter.toLowerCase()
                    )
                    .map((wing) => (
                      <tr key={wing.id} className="hover:bg-[#faf6ee] transition">
                        <td className="py-3 px-4 font-bold text-[#4a240c] text-sm">{wing.wingName}</td>
                        <td className="py-3 px-4 font-semibold text-[#5d2809]">{wing.projectName}</td>
                        <td className="py-3 px-4 text-[#53433c]">{wing.locality}</td>
                        <td className="py-3 px-4 text-[#53433c]">{wing.city}</td>
                        <td className="py-3 px-4 font-bold text-[#4a240c]">{wing.flatsCount}</td>
                        <td className="py-3 px-4">
                          {wing.isSimulatedDemo ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#f0eae1] text-[#86736b] border border-dashed border-[#dfceba]">
                              Simulated Empty State (0 Flats)
                            </span>
                          ) : wing.isClientSample ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#ffdea7] text-[#5d2809]">
                              Active Sample Wing
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#e6f4ea] text-[#137333]">
                              Active Demo Wing
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedProjectFilter(wing.projectName);
                              setSelectedWingFilter(wing.wingName);
                              setActiveTab('flats');
                            }}
                            className="px-3 py-1.5 rounded-lg bg-[#faf6ee] hover:bg-[#7a3e1e] text-[#5d2809] hover:text-white font-bold transition text-xs border border-[#ecd9c6] cursor-pointer inline-flex items-center gap-1"
                          >
                            <span>View Flats</span>
                            <span className="material-symbols-outlined text-xs">arrow_forward</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 6: FLATS INVENTORY MANAGEMENT (Core Admin Workflow)            */}
        {/* ================================================================== */}
        {activeTab === 'flats' && (
          <div className="bg-white rounded-3xl border border-[#ecd9c6] p-6 space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="text-lg font-serif font-bold text-[#4a240c]">
                  Stage 5 — Flats Inventory Management
                </h2>
                <p className="text-xs text-[#53433c]">
                  Manage individual PP Codes, Configurations, Vastu Assessments, and Series Numbers
                </p>
              </div>

              {/* Add Flat CTA */}
              <button
                type="button"
                onClick={handleOpenAddModal}
                className="bg-[#7a3e1e] hover:bg-[#5d2809] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-2xs flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-base">add_circle</span>
                <span>Add Demonstration Flat</span>
              </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-[#faf6ee] p-4 rounded-2xl border border-[#ecd9c6] space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
                {/* Search Input */}
                <div className="lg:col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#86736b] mb-1">
                    Search Flats
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-base text-[#86736b]">
                      search
                    </span>
                    <input
                      type="text"
                      placeholder="Search PP Code, Project, City, Wing..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white border border-[#dfceba] rounded-xl pl-9 pr-3 py-2 text-xs text-[#4a240c] placeholder:text-[#86736b] focus:outline-hidden focus:border-[#7a3e1e]"
                    />
                  </div>
                </div>

                {/* Vastu Status Filter */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#86736b] mb-1">
                    Vastu Status
                  </label>
                  <select
                    value={selectedStatusFilter}
                    onChange={(e) => setSelectedStatusFilter(e.target.value)}
                    className="w-full bg-white border border-[#dfceba] rounded-xl px-3 py-2 text-xs text-[#4a240c] font-semibold cursor-pointer"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Aligned">Aligned</option>
                    <option value="Balanced">Balanced</option>
                    <option value="Adaptable">Adaptable</option>
                  </select>
                </div>

                {/* Project Filter */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#86736b] mb-1">
                    Project
                  </label>
                  <select
                    value={selectedProjectFilter}
                    onChange={(e) => setSelectedProjectFilter(e.target.value)}
                    className="w-full bg-white border border-[#dfceba] rounded-xl px-3 py-2 text-xs text-[#4a240c] font-semibold cursor-pointer"
                  >
                    <option value="All">All Projects</option>
                    {discoveryProjects.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Inventory Type Filter */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#86736b] mb-1">
                    Dataset Type
                  </label>
                  <select
                    value={selectedTypeFilter}
                    onChange={(e) => setSelectedTypeFilter(e.target.value)}
                    className="w-full bg-white border border-[#dfceba] rounded-xl px-3 py-2 text-xs text-[#4a240c] font-semibold cursor-pointer"
                  >
                    <option value="All">All Records</option>
                    <option value="Sample">Client Reference Sample (Godrej)</option>
                    <option value="Simulated">Simulated Demo Records</option>
                  </select>
                </div>
              </div>

              {/* Active Filter Indicators */}
              <div className="flex items-center justify-between text-xs text-[#53433c] pt-1">
                <span>
                  Showing <strong>{filteredFlats.length}</strong> of <strong>{discoveryFlats.length}</strong> flats
                </span>
                {(searchQuery ||
                  selectedStatusFilter !== 'All' ||
                  selectedProjectFilter !== 'All' ||
                  selectedCityFilter !== 'All' ||
                  selectedWingFilter !== 'All' ||
                  selectedTypeFilter !== 'All') && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedStatusFilter('All');
                      setSelectedProjectFilter('All');
                      setSelectedCityFilter('All');
                      setSelectedWingFilter('All');
                      setSelectedTypeFilter('All');
                    }}
                    className="text-[#7a3e1e] hover:underline font-bold text-[11px] cursor-pointer"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>

            {/* Flats Data Table */}
            <div className="overflow-x-auto border border-[#eedecb] rounded-2xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#eedecb] text-[#86736b] font-bold uppercase tracking-wider text-[11px] bg-[#faf6ee]">
                    <th className="py-3 px-4">PP Code</th>
                    <th className="py-3 px-4">Config</th>
                    <th className="py-3 px-4">Vastu Status</th>
                    <th className="py-3 px-4">Series</th>
                    <th className="py-3 px-4">Project & Wing</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Inventory Type</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f3e7da]">
                  {filteredFlats.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-[#86736b]">
                        No flats match the selected search or filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredFlats.map((flat) => (
                      <tr key={flat.id} className="hover:bg-[#faf6ee] transition">
                        {/* PP Code */}
                        <td className="py-3 px-4">
                          <span className="font-mono font-bold text-xs bg-[#4a240c] text-white px-2 py-0.5 rounded shadow-2xs">
                            {flat.ppCode}
                          </span>
                        </td>

                        {/* Configuration */}
                        <td className="py-3 px-4 font-bold text-[#4a240c]">{flat.bhk}</td>

                        {/* Vastu Status Badge */}
                        <td className="py-3 px-4">{renderVastuStatusBadge(flat.vastuStatus)}</td>

                        {/* Series Number */}
                        <td className="py-3 px-4">
                          <span className="font-bold text-[#7a3e1e] bg-[#ffdea7]/40 px-2 py-0.5 rounded border border-[#ffdea7]">
                            Series {flat.seriesNumber}
                          </span>
                        </td>

                        {/* Project & Wing */}
                        <td className="py-3 px-4">
                          <span className="font-semibold text-[#4a240c] block">{flat.projectName}</span>
                          <span className="text-[11px] text-[#86736b]">{flat.wing}</span>
                        </td>

                        {/* Location */}
                        <td className="py-3 px-4 text-[#53433c]">
                          {flat.locality}, {flat.city}
                        </td>

                        {/* Inventory Type */}
                        <td className="py-3 px-4">
                          {flat.isClientSample ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#ffdea7] text-[#5d2809]">
                              Client Reference Sample
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#f0eae1] text-[#7a3e1e]">
                              Simulated Demo
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenEditModal(flat)}
                              className="px-2.5 py-1 rounded-lg bg-[#faf6ee] hover:bg-[#7a3e1e] text-[#5d2809] hover:text-white font-bold transition text-xs border border-[#ecd9c6] cursor-pointer inline-flex items-center gap-1"
                              title="Edit Flat Details"
                            >
                              <span className="material-symbols-outlined text-xs">edit</span>
                              <span>Edit</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setDeletingFlat(flat)}
                              className="px-2 py-1 rounded-lg bg-red-50 hover:bg-red-600 text-red-700 hover:text-white font-bold transition text-xs border border-red-200 cursor-pointer inline-flex items-center"
                              title="Delete Flat"
                            >
                              <span className="material-symbols-outlined text-xs">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* ==================================================================== */}
      {/* ADD / EDIT FLAT MODAL                                                */}
      {/* ==================================================================== */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-[#ecd9c6] shadow-2xl max-w-xl w-full overflow-hidden my-8">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#fbf8f3] border-b border-[#ecd9c6] flex items-center justify-between">
              <div>
                <h3 className="text-base font-serif font-bold text-[#4a240c]">
                  {editingFlatId ? 'Edit Flat Record' : 'Add Demonstration Flat'}
                </h3>
                <p className="text-[11px] text-[#86736b]">
                  {editingFlatId
                    ? 'Update flat details and Vastu status'
                    : 'Create a new demonstration flat in the property hierarchy'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="w-8 h-8 rounded-full bg-white hover:bg-[#f3ede3] text-[#5d2809] flex items-center justify-center transition border border-[#ecd9c6] cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveFlat} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              {/* Client Sample Protection Notice */}
              {isEditingClientSample && (
                <div className="p-3.5 rounded-xl bg-[#ffdea7]/30 border border-[#ffdea7] text-[#5d2809] flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-base shrink-0 mt-0.5">verified</span>
                  <div className="leading-relaxed">
                    <strong>Client Reference Sample Record:</strong> You are modifying an authentic client demonstration record. Changes will update the live public discovery journey. You can restore initial reference defaults anytime using <em>&quot;Reset Demo Data&quot;</em>.
                  </div>
                </div>
              )}

              {/* Error Alert */}
              {formError && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-base shrink-0 mt-0.5">error</span>
                  <div className="font-semibold leading-relaxed">{formError}</div>
                </div>
              )}

              {/* Hierarchy Group: City, Locality, Project, Wing */}
              <div className="space-y-3 p-4 rounded-2xl bg-[#faf6ee] border border-[#ecd9c6]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#86736b] block">
                  Property Hierarchy Placement
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* City */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#4a240c] mb-1">City *</label>
                    <input
                      type="text"
                      value={formCity}
                      onChange={(e) => setFormCity(e.target.value)}
                      placeholder="e.g. Mumbai"
                      className="w-full bg-white border border-[#dfceba] rounded-xl px-3 py-2 text-xs text-[#4a240c] focus:outline-hidden focus:border-[#7a3e1e]"
                      required
                    />
                  </div>

                  {/* Locality */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#4a240c] mb-1">Locality *</label>
                    <input
                      type="text"
                      value={formLocality}
                      onChange={(e) => setFormLocality(e.target.value)}
                      placeholder="e.g. Andheri"
                      className="w-full bg-white border border-[#dfceba] rounded-xl px-3 py-2 text-xs text-[#4a240c] focus:outline-hidden focus:border-[#7a3e1e]"
                      required
                    />
                  </div>

                  {/* Project */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#4a240c] mb-1">Project Name *</label>
                    <input
                      type="text"
                      value={formProject}
                      onChange={(e) => setFormProject(e.target.value)}
                      placeholder="e.g. Godrej"
                      className="w-full bg-white border border-[#dfceba] rounded-xl px-3 py-2 text-xs text-[#4a240c] focus:outline-hidden focus:border-[#7a3e1e]"
                      required
                    />
                  </div>

                  {/* Wing */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#4a240c] mb-1">Wing *</label>
                    <input
                      type="text"
                      value={formWing}
                      onChange={(e) => setFormWing(e.target.value)}
                      placeholder="e.g. Wing A"
                      className="w-full bg-white border border-[#dfceba] rounded-xl px-3 py-2 text-xs text-[#4a240c] focus:outline-hidden focus:border-[#7a3e1e]"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Flat Attributes: PP Code, Config, Series Number, Vastu Status */}
              <div className="space-y-3 p-4 rounded-2xl bg-white border border-[#ecd9c6]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#86736b] block">
                  Flat Identification & Assessment
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* PP Code (Manual entry with optional suggest button) */}
                  <div className="sm:col-span-2">
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-bold text-[#4a240c]">
                        PP Code * <span className="font-normal text-[#86736b]">(Must be unique within project)</span>
                      </label>
                      <button
                        type="button"
                        onClick={handleSuggestDemoCode}
                        className="text-[10px] text-[#7a3e1e] hover:underline font-bold cursor-pointer"
                      >
                        Suggest Demo Code
                      </button>
                    </div>
                    <input
                      type="text"
                      value={formPpCode}
                      onChange={(e) => setFormPpCode(e.target.value)}
                      placeholder="e.g. A001 or GDR-07"
                      className="w-full bg-white border border-[#dfceba] rounded-xl px-3 py-2 text-xs font-mono font-bold text-[#4a240c] focus:outline-hidden focus:border-[#7a3e1e]"
                      required
                    />
                  </div>

                  {/* Configuration */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#4a240c] mb-1">Configuration *</label>
                    <select
                      value={formBhk}
                      onChange={(e) => setFormBhk(e.target.value)}
                      className="w-full bg-white border border-[#dfceba] rounded-xl px-3 py-2 text-xs text-[#4a240c] font-semibold cursor-pointer"
                    >
                      <option value="1 BHK">1 BHK</option>
                      <option value="2 BHK">2 BHK</option>
                      <option value="3 BHK">3 BHK</option>
                      <option value="4 BHK">4 BHK</option>
                      <option value="Penthouse">Penthouse</option>
                    </select>
                  </div>

                  {/* Series Number */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#4a240c] mb-1">
                      Series Number * <span className="font-normal text-[#86736b]">(Inspection view only)</span>
                    </label>
                    <input
                      type="text"
                      value={formSeriesNumber}
                      onChange={(e) => setFormSeriesNumber(e.target.value)}
                      placeholder="e.g. 1 or 7"
                      className="w-full bg-white border border-[#dfceba] rounded-xl px-3 py-2 text-xs text-[#4a240c] focus:outline-hidden focus:border-[#7a3e1e]"
                      required
                    />
                  </div>
                </div>

                {/* Vastu Status Segmented Selector */}
                <div>
                  <label className="block text-[11px] font-bold text-[#4a240c] mb-1.5">
                    Vastu Status Assessment *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormVastuStatus('Aligned')}
                      className={`p-2.5 rounded-xl border text-center transition cursor-pointer ${
                        formVastuStatus === 'Aligned'
                          ? 'bg-[#e6f4ea] border-[#137333] text-[#137333] font-bold ring-2 ring-[#137333]/20'
                          : 'bg-white border-[#dfceba] text-[#53433c] hover:border-[#137333]'
                      }`}
                    >
                      <span className="block font-bold">Aligned</span>
                      <span className="block text-[10px] text-[#86736b] mt-0.5">High natural zoning</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormVastuStatus('Balanced')}
                      className={`p-2.5 rounded-xl border text-center transition cursor-pointer ${
                        formVastuStatus === 'Balanced'
                          ? 'bg-[#fef7e0] border-[#b06000] text-[#b06000] font-bold ring-2 ring-[#b06000]/20'
                          : 'bg-white border-[#dfceba] text-[#53433c] hover:border-[#b06000]'
                      }`}
                    >
                      <span className="block font-bold">Balanced</span>
                      <span className="block text-[10px] text-[#86736b] mt-0.5">Optimal harmony</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormVastuStatus('Adaptable')}
                      className={`p-2.5 rounded-xl border text-center transition cursor-pointer ${
                        formVastuStatus === 'Adaptable'
                          ? 'bg-[#fce8e6] border-[#c5221f] text-[#c5221f] font-bold ring-2 ring-[#c5221f]/20'
                          : 'bg-white border-[#dfceba] text-[#53433c] hover:border-[#c5221f]'
                      }`}
                    >
                      <span className="block font-bold">Adaptable</span>
                      <span className="block text-[10px] text-[#86736b] mt-0.5">Remedy-ready</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#ecd9c6] bg-white hover:bg-[#faf6ee] text-[#5d2809] font-bold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#7a3e1e] hover:bg-[#5d2809] text-white font-bold transition shadow-2xs cursor-pointer active:scale-95"
                >
                  {editingFlatId ? 'Update Flat Record' : 'Save Demonstration Flat'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* DELETE CONFIRMATION MODAL                                            */}
      {/* ==================================================================== */}
      {deletingFlat && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-[#ecd9c6] shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-2xl">delete_forever</span>
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-base font-serif font-bold text-[#4a240c]">
                Confirm Flat Removal
              </h3>
              <p className="text-xs text-[#53433c]">
                Are you sure you want to remove flat <strong>{deletingFlat.ppCode}</strong> ({deletingFlat.bhk}) from {deletingFlat.projectName}?
              </p>
            </div>

            {deletingFlat.isClientSample && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                <strong>Client Sample Warning:</strong> This is an authentic client reference sample record. You can restore it anytime using <em>&quot;Reset Demo Data&quot;</em>.
              </div>
            )}

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setDeletingFlat(null)}
                className="px-4 py-2 rounded-xl border border-[#ecd9c6] bg-white hover:bg-[#faf6ee] text-[#5d2809] text-xs font-bold transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition shadow-2xs cursor-pointer"
              >
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* RESET TO DEMO DATA CONFIRMATION MODAL                                */}
      {/* ==================================================================== */}
      {isResetModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-[#ecd9c6] shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#f6eee2] text-[#7a3e1e] flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-2xl">restore</span>
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-base font-serif font-bold text-[#4a240c]">
                Restore Demo Defaults?
              </h3>
              <p className="text-xs text-[#53433c] leading-relaxed">
                This will restore all demonstration inventory back to initial reference defaults, ensuring the 6 Godrej client reference sample records (<code>A001</code>, <code>FDDES</code>, <code>VVFTT</code>, <code>GGGLT</code>, <code>HJJYY</code>, <code>KKYI</code>) are intact and clearing any demo modifications.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsResetModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-[#ecd9c6] bg-white hover:bg-[#faf6ee] text-[#5d2809] text-xs font-bold transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="px-4 py-2 rounded-xl bg-[#7a3e1e] hover:bg-[#5d2809] text-white text-xs font-bold transition shadow-2xs cursor-pointer"
              >
                Restore Defaults
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
