'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProperties } from '@/context/PropertiesContext';
import { useToast } from '@/context/ToastContext';
import { Property, RadarScores } from '@/types';
import {
  ALL_STATES,
  ALL_CITIES,
  STATE_CITIES,
  getStateForCity,
  getCitiesForState,
  getLocalitiesForCity,
} from '@/data/locations';

const PRESET_IMAGES = [
  {
    name: 'Mumbai Highrise',
    url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Bangalore Modern Villa',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Gurgaon Sky Penthouse',
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Pune Auspicious Heights',
    url: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Hyderabad Grand Mansion',
    url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Chennai Coastal Villa',
    url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
  },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const { properties, addProperty, updateProperty, deleteProperty, toggleFeatured, resetToDefault } = useProperties();

  // Active top tab in admin
  const [activeTab, setActiveTab] = useState<'catalog' | 'radarStudio' | 'seo' | 'reports'>('catalog');

  // Search & Filters in Admin
  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState('All');
  const [filterType, setFilterType] = useState('All');

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Property>>({
    title: '',
    subtitle: '',
    location: '',
    locality: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    price: '₹ 1.85 Cr',
    priceNumeric: 18500000,
    priceDetail: '₹ 14,200 / sq.ft.',
    bhk: '3 BHK',
    bhkNum: 3,
    sqft: '1,325 sq.ft.',
    propertyType: 'Apartment',
    facing: 'North-East',
    reraId: 'P51800028911',
    reraStatus: 'Verified & Active',
    possession: 'Ready to Move',
    vastuScore: 8.8,
    vastuScoreMax: 10,
    vastuStatus: 'Functionally Balanced',
    vastuGrade: 'Grade A+',
    featured: false,
    heroImage: PRESET_IMAGES[0].url,
    radarScores: {
      N: 9.0,
      NE: 9.2,
      E: 8.8,
      SE: 7.9,
      S: 8.2,
      SW: 8.4,
      W: 8.0,
      NW: 8.1,
    },
    overview: 'Premium Vastu-aligned residential unit designed with harmonious spatial zoning and abundant cosmic prana circulation.',
  });

  // Dedicated property selected in Radar Studio tab
  const [studioPropertyId, setStudioPropertyId] = useState<string>(properties[0]?.id || '');
  const studioProperty = useProperties().properties.find((p) => p.id === studioPropertyId) || properties[0];

  // Studio live radar scores state
  const [studioScores, setStudioScores] = useState<RadarScores>(
    studioProperty?.radarScores || { N: 9, NE: 9, E: 8.5, SE: 7.8, S: 8, SW: 8.2, W: 8, NW: 8.1 }
  );

  // Dedicated property selected in SEO tab
  const [seoPropertyId, setSeoPropertyId] = useState<string>(properties[0]?.id || '');
  const seoProperty = properties.find((p) => p.id === seoPropertyId) || properties[0];

  // SEO Form Fields
  const [seoTitle, setSeoTitle] = useState(
    seoProperty ? `${seoProperty.title} - ${seoProperty.bhk} in ${seoProperty.location} | PragyaaProp` : ''
  );
  const [seoDesc, setSeoDesc] = useState(
    seoProperty
      ? `${seoProperty.title}: 100% Vastu-Certified ${seoProperty.bhk} luxury home in ${seoProperty.location}. Precision 16-zone energy audit score ${seoProperty.vastuScore}/10. RERA ID: ${seoProperty.reraId}.`
      : ''
  );
  const [seoKeywords, setSeoKeywords] = useState('vastu luxury homes, 16 zone vastu audit, rera verified, north entrance');

  // Sync SEO inputs when selected property changes
  const handleSeoPropertyChange = (id: string) => {
    setSeoPropertyId(id);
    const p = properties.find((prop) => prop.id === id);
    if (p) {
      setSeoTitle(`${p.title} - ${p.bhk} in ${p.location} | PragyaaProp`);
      setSeoDesc(
        `${p.title}: 100% Vastu-Certified ${p.bhk} luxury home in ${p.location}. Precision 16-zone energy audit score ${p.vastuScore}/10. RERA ID: ${p.reraId}.`
      );
    }
  };

  // Sync Studio scores when studio property changes
  const handleStudioPropertyChange = (id: string) => {
    setStudioPropertyId(id);
    const p = properties.find((prop) => prop.id === id);
    if (p && p.radarScores) {
      setStudioScores(p.radarScores);
    }
  };

  // Helper to calculate radar SVG points from scores
  const computeRadarPoints = (scores: RadarScores) => {
    const cx = 100;
    const cy = 100;
    const maxR = 68;
    const dirs: Array<{ key: keyof RadarScores; angleDeg: number; label: string; full: string }> = [
      { key: 'N', angleDeg: -90, label: 'N', full: 'North (Kuber - Wealth)' },
      { key: 'NE', angleDeg: -45, label: 'NE', full: 'North-East (Ishanya - Divinity)' },
      { key: 'E', angleDeg: 0, label: 'E', full: 'East (Indra - Clarity & Health)' },
      { key: 'SE', angleDeg: 45, label: 'SE', full: 'South-East (Agni - Cashflow)' },
      { key: 'S', angleDeg: 90, label: 'S', full: 'South (Yama - Stability)' },
      { key: 'SW', angleDeg: 135, label: 'SW', full: 'South-West (Nairutya - Strength)' },
      { key: 'W', angleDeg: 180, label: 'W', full: 'West (Varuna - Gains & Success)' },
      { key: 'NW', angleDeg: 225, label: 'NW', full: 'North-West (Vayu - Relations)' },
    ];

    const points = dirs.map((d) => {
      const val = Math.max(2, Math.min(10, scores[d.key] ?? 7.5));
      const r = (val / 10) * maxR;
      const rad = (d.angleDeg * Math.PI) / 180;
      const x = Math.round((cx + r * Math.cos(rad)) * 10) / 10;
      const y = Math.round((cy + r * Math.sin(rad)) * 10) / 10;
      return { ...d, val, x, y };
    });

    const pointsStr = points.map((p) => `${p.x},${p.y}`).join(' ');
    const avgScore = Math.round((points.reduce((sum, p) => sum + p.val, 0) / 8) * 10) / 10;
    return { points, pointsStr, avgScore };
  };

  const modalRadarData = useMemo(() => {
    return computeRadarPoints(formData.radarScores || { N: 8, NE: 8, E: 8, SE: 8, S: 8, SW: 8, W: 8, NW: 8 });
  }, [formData.radarScores]);

  const studioRadarData = useMemo(() => {
    return computeRadarPoints(studioScores);
  }, [studioScores]);

  // Open modal for editing
  const handleEditClick = (prop: Property) => {
    setEditingPropertyId(prop.id);
    setFormData({ ...prop });
    setIsModalOpen(true);
  };

  // Open modal for new property
  const handleAddNewClick = () => {
    setEditingPropertyId(null);
    const newId = `prop-${Date.now()}`;
    setFormData({
      id: newId,
      slug: `kailash-divine-enclave-${Date.now().toString().slice(-4)}`,
      title: 'Kailash Divine Enclave',
      subtitle: 'Sacred Vedic Architecture 3 BHK',
      location: 'Andheri (W), Mumbai',
      locality: 'Andheri (W)',
      city: 'Mumbai',
      state: 'Maharashtra',
      price: '₹ 2.15 Cr',
      priceNumeric: 21500000,
      priceDetail: '₹ 15,200 / sq.ft.',
      bhk: '3 BHK',
      bhkNum: 3,
      sqft: '1,410 sq.ft.',
      propertyType: 'Apartment',
      facing: 'North-East',
      reraId: `P${Math.floor(10000000000 + Math.random() * 90000000000)}`,
      reraStatus: 'Verified & Active',
      bathrooms: 3,
      parking: 2,
      possession: 'Ready to Move',
      vastuScore: 8.8,
      vastuScoreMax: 10,
      vastuStatus: 'Functionally Balanced',
      vastuGrade: 'Grade A+',
      featured: false,
      heroImage: PRESET_IMAGES[0].url,
      galleryImages: [
        { src: PRESET_IMAGES[0].url, caption: 'Main Facade', category: 'Exterior' },
        { src: PRESET_IMAGES[1].url, caption: 'Living Area & Brahmasthan', category: 'Interior' },
      ],
      overview: 'Harmonious residential sanctuary designed strictly adhering to Vedic architectural tenets and 16-zone spatial calibration.',
      spatialHighlights: [
        { title: 'North Entrance (Kuber Zone)', status: 'Balanced', description: 'Draws abundance and uninterrupted career prosperity.' },
        { title: 'Northeast Ishanya Puja Corner', status: 'Enhanced', description: 'Pure cosmic prana gateway for spiritual serenity.' },
        { title: 'Southeast Agni Kitchen', status: 'Balanced', description: 'Fire element balanced with warm tones and right flame positioning.' },
      ],
      radarScores: {
        N: 9.1,
        NE: 9.4,
        E: 8.7,
        SE: 7.9,
        S: 8.1,
        SW: 8.4,
        W: 8.2,
        NW: 8.3,
      },
      zones16: [
        { name: 'Entrance (N)', element: 'Water', score: 9.1, maxScore: 10, status: 'Balanced', direction: 'North', observation: 'Ideal placement' },
        { name: 'Puja Sanctum (NE)', element: 'Water / Ether', score: 9.4, maxScore: 10, status: 'Enhanced', direction: 'North-East', observation: 'Divine vibration' },
        { name: 'Living & Prana Lounge (E)', element: 'Air', score: 8.7, maxScore: 10, status: 'Balanced', direction: 'East', observation: 'High morning light' },
        { name: 'Kitchen & Hearth (SE)', element: 'Fire', score: 7.9, maxScore: 10, status: 'Balanced', direction: 'South-East', observation: 'Agni compliant' },
      ],
      amenities: [
        { icon: 'spa', name: 'Meditation Amphitheatre', description: 'North-East aligned sacred garden' },
        { icon: 'pool', name: 'Infinity Pool', description: 'North-facing flowing water element' },
        { icon: 'fitness_center', name: 'Wellness Gymnasium', description: 'South-West grounded health pavilion' },
      ],
      connectivity: [
        { landmark: 'Metro Station', distance: '4 mins' },
        { landmark: 'International Airport', distance: '20 mins' },
      ],
      reviews: [
        { id: 'rev-1', author: 'Dr. Anand Joshi', role: 'Vastu Consultant', rating: 5, date: '2 days ago', comment: 'Exceptional alignment in Northeast Ishanya corner.' },
      ],
    });
    setIsModalOpen(true);
  };

  // Handle City Change in Form
  const handleFormCityChange = (newCity: string) => {
    const autoState = getStateForCity(newCity);
    const validLocalities = getLocalitiesForCity(newCity);
    const chosenLocality = validLocalities.length > 0 ? validLocalities[0] : 'Prime Locality';
    setFormData((prev) => ({
      ...prev,
      city: newCity,
      state: autoState || prev.state,
      locality: chosenLocality,
      location: `${chosenLocality}, ${newCity}`,
    }));
  };

  // Handle State Change in Form
  const handleFormStateChange = (newState: string) => {
    const citiesInState = getCitiesForState(newState);
    const newCity = citiesInState[0] || 'Mumbai';
    const validLocalities = getLocalitiesForCity(newCity);
    const chosenLocality = validLocalities.length > 0 ? validLocalities[0] : 'Prime Locality';
    setFormData((prev) => ({
      ...prev,
      state: newState,
      city: newCity,
      locality: chosenLocality,
      location: `${chosenLocality}, ${newCity}`,
    }));
  };

  // Save Modal Changes
  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.city) {
      showToast('Please provide a title and city for the property');
      return;
    }

    const calculatedAvg = modalRadarData.avgScore;
    const finalVastuStatus =
      calculatedAvg >= 8.8
        ? 'Inherently Aligned'
        : calculatedAvg >= 7.8
        ? 'Functionally Balanced'
        : 'Remedy-Ready';

    const rawSlug = formData.slug || formData.title;
    const cleanSlug = rawSlug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') ||
      `prop-${Date.now()}`;

    const effectiveLocality = formData.locality || 'Prime Locality';
    const completedProperty: Property = {
      ...(formData as Property),
      slug: cleanSlug,
      locality: effectiveLocality,
      location: `${effectiveLocality}, ${formData.city}`,
      vastuScore: calculatedAvg,
      vastuStatus: finalVastuStatus,
    };

    if (editingPropertyId) {
      updateProperty(editingPropertyId, completedProperty);
      showToast(`Updated "${completedProperty.title}" successfully!`);
    } else {
      addProperty(completedProperty);
      showToast(`Added "${completedProperty.title}" to catalog!`);
    }

    setIsModalOpen(false);
  };

  // Save Studio Radar Scores
  const handleSaveStudioScores = () => {
    if (!studioProperty) return;
    const updatedScore = studioRadarData.avgScore;
    const updatedStatus =
      updatedScore >= 8.8
        ? 'Inherently Aligned'
        : updatedScore >= 7.8
        ? 'Functionally Balanced'
        : 'Remedy-Ready';

    updateProperty(studioProperty.id, {
      radarScores: studioScores,
      vastuScore: updatedScore,
      vastuStatus: updatedStatus,
    });
    showToast(`Saved 8-direction energy graph for "${studioProperty.title}" (Score: ${updatedScore}/10)!`);
  };

  // Filtered properties for admin table
  const displayedProperties = useMemo(() => {
    return properties.filter((p) => {
      const matchSearch =
        searchTerm === '' ||
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.state.toLowerCase().includes(searchTerm.toLowerCase());
      const matchState = filterState === 'All' || p.state === filterState;
      const matchType = filterType === 'All' || p.propertyType === filterType;
      return matchSearch && matchState && matchType;
    });
  }, [properties, searchTerm, filterState, filterType]);

  const featuredCount = properties.filter((p) => p.featured).length;
  const avgPortfolioScore =
    Math.round((properties.reduce((acc, p) => acc + p.vastuScore, 0) / properties.length) * 10) / 10;

  return (
    <div className="min-h-screen bg-[#fcfaf6] text-[#1b1c1a] font-sans pb-16">
      {/* Top Admin Header Bar */}
      <header className="bg-gradient-to-r from-[#3e1b0c] via-[#5d2809] to-[#7a3e1e] text-white shadow-lg sticky top-0 z-40 border-b border-[#a26039]">
        <div className="max-w-7xl xl:max-w-screen-2xl 2xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-[#fdcd75] text-[#5d2809] flex items-center justify-center font-bold text-lg shadow-sm">
                ॐ
              </div>
              <div>
                <span className="font-serif font-bold text-lg tracking-tight block text-[#ffdea7]">
                  PragyaaProp.com<span className="text-white text-xs align-super ml-0.5">®</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-[#f8d49a] block">
                  Super Admin Management Portal
                </span>
              </div>
            </Link>

            <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#10b981]/20 text-[#34d399] border border-[#10b981]/30">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
              Live Database Connected
            </span>
          </div>

          {/* Top Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleAddNewClick}
              className="bg-[#fdcd75] hover:bg-[#ffdea7] text-[#5d2809] px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">add_circle</span>
              <span>Add Property</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (confirm('Are you sure you want to restore all properties to the original curated defaults?')) {
                  resetToDefault();
                }
              }}
              className="bg-white/10 hover:bg-white/20 text-white/90 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1 transition cursor-pointer"
              title="Reset all properties to default catalog"
            >
              <span className="material-symbols-outlined text-base">restore</span>
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1 transition"
            >
              <span className="material-symbols-outlined text-base">open_in_new</span>
              <span className="hidden sm:inline">View Live Site</span>
            </Link>

            <Link
              href="/"
              className="bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/30 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1 transition"
            >
              <span className="material-symbols-outlined text-base">logout</span>
              <span>Exit</span>
            </Link>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="max-w-7xl xl:max-w-screen-2xl 2xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto scrollbar-none pt-2 border-t border-white/10">
          <button
            type="button"
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'catalog'
                ? 'border-[#fdcd75] text-[#fdcd75]'
                : 'border-transparent text-white/70 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-base">apartment</span>
            <span>Properties & Live CMS ({properties.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('radarStudio')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'radarStudio'
                ? 'border-[#fdcd75] text-[#fdcd75]'
                : 'border-transparent text-white/70 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-base">radar</span>
            <span>Directional Radar Studio</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('seo')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'seo'
                ? 'border-[#fdcd75] text-[#fdcd75]'
                : 'border-transparent text-white/70 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-base">search</span>
            <span>SEO & Google SERP Preview</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'reports'
                ? 'border-[#fdcd75] text-[#fdcd75]'
                : 'border-transparent text-white/70 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-base">picture_as_pdf</span>
            <span>PDF Reports & Badges</span>
          </button>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="max-w-7xl xl:max-w-screen-2xl 2xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* KPI Metric Summary Strip */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          <div className="bg-white rounded-2xl border border-[#e8dac8] p-4 shadow-xs flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#faeee2] text-[#7a3e1e] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">holiday_village</span>
            </div>
            <div>
              <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wide">Total Properties</div>
              <div className="text-2xl font-bold font-serif text-[#4a240c]">{properties.length} Active</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#e8dac8] p-4 shadow-xs flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">star</span>
            </div>
            <div>
              <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wide">Featured on Home</div>
              <div className="text-2xl font-bold font-serif text-amber-800">{featuredCount} Properties</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#e8dac8] p-4 shadow-xs flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">verified</span>
            </div>
            <div>
              <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wide">Vastu Certification</div>
              <div className="text-2xl font-bold font-serif text-emerald-700">100% Certified</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#e8dac8] p-4 shadow-xs flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">speed</span>
            </div>
            <div>
              <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wide">Avg Vastu Score</div>
              <div className="text-2xl font-bold font-serif text-purple-900">{avgPortfolioScore} / 10</div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* TAB 1: PROPERTIES CATALOG MANAGER                        */}
        {/* ======================================================== */}
        {activeTab === 'catalog' && (
          <div className="space-y-4">
            {/* Filter and Search Bar */}
            <div className="bg-white rounded-2xl border border-[#e8dac8] p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex-1 min-w-[240px] relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
                  search
                </span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search properties by title, city, or state..."
                  className="w-full bg-[#fcfaf6] border border-[#e8dac8] rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#7a3e1e] focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <select
                  value={filterState}
                  onChange={(e) => setFilterState(e.target.value)}
                  className="bg-[#fcfaf6] border border-[#e8dac8] rounded-xl px-3 py-2 text-xs font-semibold text-stone-700 focus:outline-none"
                >
                  <option value="All">All States ({ALL_STATES.length})</option>
                  {ALL_STATES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>

                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="bg-[#fcfaf6] border border-[#e8dac8] rounded-xl px-3 py-2 text-xs font-semibold text-stone-700 focus:outline-none"
                >
                  <option value="All">All Typologies</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Independent House">Independent House</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Plot">Plot</option>
                </select>

                <button
                  type="button"
                  onClick={handleAddNewClick}
                  className="bg-[#7a3e1e] hover:bg-[#5d2809] text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs transition cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">add</span>
                  <span>New Property</span>
                </button>
              </div>
            </div>

            {/* Properties Table & Cards */}
            <div className="bg-white rounded-2xl border border-[#e8dac8] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#fbf7f0] border-b border-[#e8dac8] text-[#5d2809] font-bold text-[11px] uppercase tracking-wider">
                      <th className="py-3 px-4">Property</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">BHK & Type</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4 text-center">Vastu Score</th>
                      <th className="py-3 px-4 text-center">Featured</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f2e6d6]">
                    {displayedProperties.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-12 text-stone-500">
                          No properties match your filter criteria.
                        </td>
                      </tr>
                    ) : (
                      displayedProperties.map((prop) => (
                        <tr key={prop.id} className="hover:bg-[#fdfaf5] transition-colors">
                          {/* Property Info + Thumbnail */}
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={prop.heroImage}
                                alt={prop.title}
                                className="w-14 h-12 object-cover rounded-lg border border-[#e8dac8] shrink-0"
                              />
                              <div>
                                <h4 className="font-bold text-[#4a240c] font-serif leading-tight">{prop.title}</h4>
                                <span className="text-[11px] text-stone-500">{prop.facing} Facing • {prop.sqft}</span>
                              </div>
                            </div>
                          </td>

                          {/* Location */}
                          <td className="py-3 px-4">
                            <div className="font-semibold text-stone-800">{prop.city}</div>
                            <div className="text-[11px] text-stone-500">{prop.state}</div>
                          </td>

                          {/* BHK & Type */}
                          <td className="py-3 px-4">
                            <div className="font-semibold text-stone-800">{prop.bhk}</div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#f4ebe0] text-[#7a3e1e]">
                              {prop.propertyType}
                            </span>
                          </td>

                          {/* Price */}
                          <td className="py-3 px-4 font-bold text-[#5d2809] font-serif">{prop.price}</td>

                          {/* Vastu Score */}
                          <td className="py-3 px-4 text-center">
                            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                              <span>{prop.vastuScore}</span>
                              <span className="text-[10px] text-emerald-600">/ 10</span>
                            </div>
                            <div className="text-[10px] text-stone-500 mt-0.5">{prop.vastuStatus}</div>
                          </td>

                          {/* Featured Switch */}
                          <td className="py-3 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => toggleFeatured(prop.id)}
                              className={`p-1.5 rounded-lg transition cursor-pointer ${
                                prop.featured
                                  ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                                  : 'bg-stone-100 text-stone-400 hover:bg-stone-200'
                              }`}
                              title={prop.featured ? 'Featured on Home (Click to unfeature)' : 'Mark as Featured on Home'}
                            >
                              <span className="material-symbols-outlined text-lg">
                                {prop.featured ? 'star' : 'star_border'}
                              </span>
                            </button>
                          </td>

                          {/* Action Buttons */}
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <Link
                                href={`/properties/${prop.slug}`}
                                target="_blank"
                                className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition"
                                title="Preview Live Property Page"
                              >
                                <span className="material-symbols-outlined text-base">visibility</span>
                              </Link>

                              <button
                                type="button"
                                onClick={() => handleEditClick(prop)}
                                className="p-1.5 rounded-lg bg-[#faeee2] hover:bg-[#eedfc9] text-[#7a3e1e] transition cursor-pointer font-semibold"
                                title="Edit Property, Media & Radar Graph"
                              >
                                <span className="material-symbols-outlined text-base">edit</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete "${prop.title}"?`)) {
                                    deleteProperty(prop.id);
                                  }
                                }}
                                className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition cursor-pointer"
                                title="Delete Property"
                              >
                                <span className="material-symbols-outlined text-base">delete</span>
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
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: DIRECTIONAL ENERGY & RADAR GRAPH STUDIO           */}
        {/* ======================================================== */}
        {activeTab === 'radarStudio' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Sliders for 8 Directions */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-[#e8dac8] p-5 sm:p-6 shadow-xs space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f0e3d3] pb-4">
                <div>
                  <h3 className="text-base font-bold text-[#5d2809] font-serif">
                    8-Direction Energy Calibration Studio
                  </h3>
                  <p className="text-xs text-stone-500">
                    Adjust directional energy levels. The live SVG radar graph and overall Vastu score update instantly.
                  </p>
                </div>

                {/* Property selector */}
                <select
                  value={studioPropertyId}
                  onChange={(e) => handleStudioPropertyChange(e.target.value)}
                  className="bg-[#fcfaf6] border border-[#e8dac8] rounded-xl px-3 py-1.5 text-xs font-bold text-[#5d2809] focus:outline-none"
                >
                  {properties.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.city})
                    </option>
                  ))}
                </select>
              </div>

              {/* 8 Direction Sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {studioRadarData.points.map((pt) => (
                  <div key={pt.key} className="bg-[#fcfaf6] border border-[#eedecb] rounded-xl p-3 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                      <span className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-md bg-[#faeee2] text-[#7a3e1e] flex items-center justify-center text-[10px]">
                          {pt.label}
                        </span>
                        <span>{pt.full}</span>
                      </span>
                      <span className="text-emerald-700 font-mono text-sm">{pt.val} / 10</span>
                    </div>

                    <input
                      type="range"
                      min="4.0"
                      max="10.0"
                      step="0.1"
                      value={studioScores[pt.key] ?? 8.0}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        setStudioScores((prev) => ({ ...prev, [pt.key]: val }));
                      }}
                      className="w-full accent-[#7a3e1e] cursor-pointer"
                    />

                    <div className="flex justify-between text-[10px] text-stone-400">
                      <span>Low (Remedy Needed)</span>
                      <span>10.0 (Supreme)</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#f0e3d3]">
                <button
                  type="button"
                  onClick={handleSaveStudioScores}
                  className="bg-[#7a3e1e] hover:bg-[#5d2809] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">save</span>
                  <span>Save Energy Graph to Website</span>
                </button>
              </div>
            </div>

            {/* Right Column: Live SVG Radar Chart Preview */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-[#e8dac8] p-5 sm:p-6 shadow-xs space-y-4 text-center">
              <div>
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                  Live Visual Preview
                </span>
                <h4 className="text-lg font-bold font-serif text-[#4a240c] mt-0.5">
                  {studioProperty?.title || 'Selected Property'}
                </h4>
              </div>

              {/* Dynamic SVG Radar Chart */}
              <div className="relative w-64 h-64 mx-auto my-2 flex items-center justify-center bg-[#fdfbf7] rounded-full border border-[#eedecb] p-3 shadow-inner">
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" fill="none" r="70" stroke="#e8ded2" strokeWidth="1"></circle>
                  <circle cx="100" cy="100" fill="none" r="50" stroke="#efe7dc" strokeWidth="1"></circle>
                  <circle cx="100" cy="100" fill="none" r="30" stroke="#f4eee4" strokeWidth="1"></circle>
                  <line stroke="#e2d6c5" strokeWidth="0.75" x1="100" x2="100" y1="20" y2="180"></line>
                  <line stroke="#e2d6c5" strokeWidth="0.75" x1="20" x2="180" y1="100" y2="100"></line>
                  <line stroke="#e2d6c5" strokeWidth="0.75" x1="43" x2="157" y1="43" y2="157"></line>
                  <line stroke="#e2d6c5" strokeWidth="0.75" x1="43" x2="157" y1="157" y2="43"></line>

                  {/* Dynamic Polygon */}
                  <polygon
                    fill="#34d399"
                    fillOpacity="0.32"
                    points={studioRadarData.pointsStr}
                    stroke="#059669"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></polygon>

                  {/* Points on radar */}
                  {studioRadarData.points.map((pt) => (
                    <circle
                      key={pt.key}
                      cx={pt.x}
                      cy={pt.y}
                      fill={pt.val < 7.5 ? '#d97706' : '#059669'}
                      r="3.2"
                    />
                  ))}

                  {/* Direction Labels */}
                  <text fill="#374151" fontFamily="sans-serif" fontSize="9" fontWeight="bold" x="96" y="14">N</text>
                  <text fill="#374151" fontFamily="sans-serif" fontSize="8" fontWeight="bold" x="156" y="44">NE</text>
                  <text fill="#374151" fontFamily="sans-serif" fontSize="9" fontWeight="bold" x="184" y="103">E</text>
                  <text fill="#374151" fontFamily="sans-serif" fontSize="8" fontWeight="bold" x="154" y="162">SE</text>
                  <text fill="#374151" fontFamily="sans-serif" fontSize="9" fontWeight="bold" x="97" y="195">S</text>
                  <text fill="#374151" fontFamily="sans-serif" fontSize="8" fontWeight="bold" x="32" y="162">SW</text>
                  <text fill="#374151" fontFamily="sans-serif" fontSize="9" fontWeight="bold" x="14" y="103">W</text>
                  <text fill="#374151" fontFamily="sans-serif" fontSize="8" fontWeight="bold" x="34" y="44">NW</text>
                </svg>
              </div>

              {/* Calculated Composite Score */}
              <div className="bg-[#fcf7ee] border border-[#f0dfcc] rounded-xl p-3.5 space-y-1">
                <div className="text-xs font-semibold text-stone-600">Calculated Composite Vastu Score</div>
                <div className="text-3xl font-black font-serif text-[#5d2809]">
                  {studioRadarData.avgScore} <span className="text-sm font-bold text-stone-500">/ 10</span>
                </div>
                <div className="inline-block px-3 py-0.5 rounded-full text-xs font-bold bg-[#ffdea7] text-[#5d2809]">
                  {studioRadarData.avgScore >= 8.8
                    ? 'Inherently Aligned'
                    : studioRadarData.avgScore >= 7.8
                    ? 'Functionally Balanced'
                    : 'Remedy-Ready'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: SEO & SEARCH ENGINE PREVIEW                       */}
        {/* ======================================================== */}
        {activeTab === 'seo' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: SEO Inputs & Character Counters */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-[#e8dac8] p-5 sm:p-6 shadow-xs space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f0e3d3] pb-4">
                <div>
                  <h3 className="text-base font-bold text-[#5d2809] font-serif">
                    SEO & Meta Tags Configuration
                  </h3>
                  <p className="text-xs text-stone-500">
                    Control Google search appearances, OpenGraph social snippets, and JSON-LD schema.
                  </p>
                </div>

                <select
                  value={seoPropertyId}
                  onChange={(e) => handleSeoPropertyChange(e.target.value)}
                  className="bg-[#fcfaf6] border border-[#e8dac8] rounded-xl px-3 py-1.5 text-xs font-bold text-[#5d2809] focus:outline-none"
                >
                  {properties.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Meta Title Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-stone-800">Meta Title</label>
                  <span
                    className={`font-mono text-[11px] font-bold ${
                      seoTitle.length > 60 ? 'text-red-600' : seoTitle.length >= 45 ? 'text-emerald-700' : 'text-amber-600'
                    }`}
                  >
                    {seoTitle.length} / 60 chars {seoTitle.length > 60 ? '(Too Long)' : '(Optimal: 50-60)'}
                  </span>
                </div>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  className="w-full bg-[#fcfaf6] border border-[#e8dac8] rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-[#7a3e1e] focus:outline-none"
                />
              </div>

              {/* Meta Description Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-stone-800">Meta Description</label>
                  <span
                    className={`font-mono text-[11px] font-bold ${
                      seoDesc.length > 160 ? 'text-red-600' : seoDesc.length >= 120 ? 'text-emerald-700' : 'text-amber-600'
                    }`}
                  >
                    {seoDesc.length} / 160 chars {seoDesc.length > 160 ? '(Too Long)' : '(Optimal: 140-160)'}
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={seoDesc}
                  onChange={(e) => setSeoDesc(e.target.value)}
                  className="w-full bg-[#fcfaf6] border border-[#e8dac8] rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-[#7a3e1e] focus:outline-none resize-none"
                />
              </div>

              {/* Focus Keywords */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-800">Focus SEO Keywords (Comma Separated)</label>
                <input
                  type="text"
                  value={seoKeywords}
                  onChange={(e) => setSeoKeywords(e.target.value)}
                  className="w-full bg-[#fcfaf6] border border-[#e8dac8] rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-[#7a3e1e] focus:outline-none"
                />
              </div>

              {/* SEO Checklist Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-emerald-800 text-xs font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-emerald-600">check_circle</span>
                  <span>Canonical Tag Set</span>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-emerald-800 text-xs font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-emerald-600">check_circle</span>
                  <span>JSON-LD Schema Valid</span>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-emerald-800 text-xs font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-emerald-600">check_circle</span>
                  <span>Robots: Index, Follow</span>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => showToast('SEO tags and metadata verified & updated!')}
                  className="bg-[#7a3e1e] hover:bg-[#5d2809] text-white px-5 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-xs active:scale-95 transition cursor-pointer"
                >
                  Verify & Apply SEO Tags
                </button>
              </div>
            </div>

            {/* Right: Live Google Search Result & OpenGraph Previews */}
            <div className="lg:col-span-5 space-y-5">
              {/* Google SERP Snippet Preview */}
              <div className="bg-white rounded-2xl border border-[#e8dac8] p-5 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-500 uppercase tracking-wider">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Google Search Live Snippet</span>
                </div>

                {/* Google Snippet Card */}
                <div className="bg-[#f8f9fa] border border-[#dadce0] rounded-xl p-3.5 space-y-1 font-sans text-left">
                  <div className="flex items-center gap-1.5 text-xs text-[#202124]">
                    <div className="w-4 h-4 rounded-full bg-[#7a3e1e] text-[9px] text-white flex items-center justify-center font-bold">
                      P
                    </div>
                    <span className="font-medium">PragyaaProp.com</span>
                    <span className="text-stone-400">›</span>
                    <span className="text-stone-600 truncate">properties › {seoProperty?.slug}</span>
                  </div>

                  <h4 className="text-base sm:text-lg text-[#1a0dab] hover:underline font-medium cursor-pointer line-clamp-1">
                    {seoTitle || 'Property Title | PragyaaProp'}
                  </h4>

                  <p className="text-xs text-[#4d5156] leading-relaxed line-clamp-2">
                    {seoDesc || 'Comprehensive Vastu audit and property insights for luxury Indian real estate.'}
                  </p>
                </div>
              </div>

              {/* Social Sharing OpenGraph Card */}
              <div className="bg-white rounded-2xl border border-[#e8dac8] p-5 shadow-xs space-y-3">
                <div className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base">share</span>
                  <span>Social Share Preview (WhatsApp / Twitter)</span>
                </div>

                <div className="border border-[#dadce0] rounded-xl overflow-hidden bg-white shadow-xs">
                  <img
                    src={seoProperty?.heroImage}
                    alt="Social Preview"
                    className="w-full h-36 object-cover"
                  />
                  <div className="p-3 bg-[#fdfaf6] space-y-1 text-left">
                    <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
                      pragyaaprop.com
                    </span>
                    <h5 className="text-xs font-bold text-stone-900 font-serif line-clamp-1">{seoTitle}</h5>
                    <p className="text-[11px] text-stone-600 line-clamp-2">{seoDesc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: PDF REPORTS & VERIFICATION BADGES                 */}
        {/* ======================================================== */}
        {activeTab === 'reports' && (
          <div className="bg-white rounded-2xl border border-[#e8dac8] p-5 sm:p-6 shadow-xs space-y-6">
            <div>
              <h3 className="text-base font-bold text-[#5d2809] font-serif">
                Vastu Audit PDF Engine & Certification Authority
              </h3>
              <p className="text-xs text-stone-500">
                Manage downloadable 16-zone architectural reports, RERA badges, and Astrologer endorsements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {properties.slice(0, 8).map((prop) => (
                <div
                  key={prop.id}
                  className="bg-[#fcfaf6] border border-[#eedecb] rounded-xl p-4 flex items-center justify-between gap-3 shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-50 text-red-700 flex items-center justify-center shrink-0 border border-red-200">
                      <span className="material-symbols-outlined text-xl">picture_as_pdf</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#5d2809] font-serif">{prop.title}</h4>
                      <p className="text-[11px] text-stone-500">RERA: {prop.reraId} • 16-Zone Certified</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => showToast(`Generated fresh 16-zone audit PDF for ${prop.title}`)}
                      className="px-2.5 py-1.5 rounded-lg bg-[#faeee2] hover:bg-[#eedfc9] text-[#7a3e1e] text-xs font-bold transition cursor-pointer"
                    >
                      Audit PDF
                    </button>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                      Active
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ======================================================== */}
      {/* ADD / EDIT PROPERTY MODAL                                */}
      {/* ======================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-[#fcfaf6] rounded-3xl border border-[#d8c2b9] shadow-2xl max-w-4xl w-full p-6 sm:p-8 relative my-8 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#e8dac8] pb-4 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#faeee2] text-[#7a3e1e] flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-xl">
                    {editingPropertyId ? 'edit_note' : 'add_business'}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold font-serif text-[#5d2809]">
                    {editingPropertyId ? 'Edit Property & Vastu Config' : 'Add New Vedic Property'}
                  </h3>
                  <p className="text-xs text-stone-500">
                    Changes sync in real-time to the public website, search filters, and detail pages.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#eae8e4] hover:bg-[#e4e2de] flex items-center justify-center text-[#53433c] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProperty} className="space-y-6">
              {/* SECTION 1: Core Details */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#5d2809] uppercase tracking-wider border-b border-[#f0e3d3] pb-1">
                  1. Basic Property Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-700">Property Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Sunrise Residency"
                      className="w-full bg-white border border-[#d8c2b9] rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#7a3e1e] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-700">Subtitle / Tagline</label>
                    <input
                      type="text"
                      value={formData.subtitle || ''}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      placeholder="e.g. Ultra-Luxury Auspicious 3 BHK"
                      className="w-full bg-white border border-[#d8c2b9] rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#7a3e1e] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-700">Property Typology</label>
                    <select
                      value={formData.propertyType || 'Apartment'}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value as any })}
                      className="w-full bg-white border border-[#d8c2b9] rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#7a3e1e] focus:outline-none"
                    >
                      <option value="Apartment">Apartment</option>
                      <option value="Villa">Villa</option>
                      <option value="Independent House">Independent House</option>
                      <option value="Penthouse">Penthouse</option>
                      <option value="Plot">Plot</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-700">BHK Configuration</label>
                    <select
                      value={formData.bhk || '3 BHK'}
                      onChange={(e) => {
                        const val = e.target.value;
                        const num = parseInt(val.charAt(0)) || 3;
                        setFormData({ ...formData, bhk: val, bhkNum: num });
                      }}
                      className="w-full bg-white border border-[#d8c2b9] rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#7a3e1e] focus:outline-none"
                    >
                      <option value="1 BHK">1 BHK</option>
                      <option value="2 BHK">2 BHK</option>
                      <option value="3 BHK">3 BHK</option>
                      <option value="4+ BHK">4+ BHK</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-700">Price Display (e.g. ₹ 2.40 Cr) *</label>
                    <input
                      type="text"
                      required
                      value={formData.price || ''}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full bg-white border border-[#d8c2b9] rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#7a3e1e] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-700">Area / Square Footage</label>
                    <input
                      type="text"
                      value={formData.sqft || ''}
                      onChange={(e) => setFormData({ ...formData, sqft: e.target.value })}
                      placeholder="e.g. 1,325 sq.ft."
                      className="w-full bg-white border border-[#d8c2b9] rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#7a3e1e] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: Location Auto-Linking */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#5d2809] uppercase tracking-wider border-b border-[#f0e3d3] pb-1">
                  2. Location & Geographic Orientation
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-700">State (Auto-linked)</label>
                    <select
                      value={formData.state || 'Maharashtra'}
                      onChange={(e) => handleFormStateChange(e.target.value)}
                      className="w-full bg-white border border-[#d8c2b9] rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#7a3e1e] focus:outline-none"
                    >
                      {ALL_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-700">City (Auto-links State)</label>
                    <select
                      value={formData.city || 'Mumbai'}
                      onChange={(e) => handleFormCityChange(e.target.value)}
                      className="w-full bg-white border border-[#d8c2b9] rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#7a3e1e] focus:outline-none"
                    >
                      {(STATE_CITIES[formData.state || 'Maharashtra'] || ALL_CITIES).map((ct) => (
                        <option key={ct} value={ct}>
                          {ct}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-700">Locality / Sector</label>
                    <input
                      type="text"
                      list="admin-locality-options"
                      value={formData.locality || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          locality: e.target.value,
                          location: `${e.target.value}, ${formData.city}`,
                        })
                      }
                      placeholder={`e.g. ${(getLocalitiesForCity(formData.city || '')[0]) || 'Prime Locality'}`}
                      className="w-full bg-white border border-[#d8c2b9] rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#7a3e1e] focus:outline-none"
                    />
                    <datalist id="admin-locality-options">
                      {getLocalitiesForCity(formData.city || '').map((loc) => (
                        <option key={loc} value={loc} />
                      ))}
                    </datalist>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-700">Main Entrance Facing</label>
                    <select
                      value={formData.facing || 'North'}
                      onChange={(e) => setFormData({ ...formData, facing: e.target.value })}
                      className="w-full bg-white border border-[#d8c2b9] rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#7a3e1e] focus:outline-none"
                    >
                      <option value="North">North (Kuber - Auspicious)</option>
                      <option value="North-East">North-East (Ishanya - Divine)</option>
                      <option value="East">East (Indra - Clarity)</option>
                      <option value="South-East">South-East (Agni)</option>
                      <option value="West">West (Varuna)</option>
                      <option value="North-West">North-West (Vayu)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 3: Hero Photo & Preset Selector */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#5d2809] uppercase tracking-wider border-b border-[#f0e3d3] pb-1">
                  3. Architectural Photography & Media
                </h4>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-700">Hero Image URL</label>
                  <input
                    type="url"
                    value={formData.heroImage || ''}
                    onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                    className="w-full bg-white border border-[#d8c2b9] rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#7a3e1e] focus:outline-none"
                  />

                  {/* 1-Click Luxury Presets */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[11px] font-bold text-stone-500">Quick Luxury Presets:</span>
                    {PRESET_IMAGES.map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => setFormData({ ...formData, heroImage: preset.url })}
                        className="px-2.5 py-1 text-xs rounded-lg bg-[#faeee2] hover:bg-[#eedfc9] text-[#7a3e1e] font-semibold transition cursor-pointer"
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>

                  {formData.heroImage && (
                    <div className="w-full h-36 rounded-xl overflow-hidden border border-[#d8c2b9] mt-2 bg-stone-100">
                      <img src={formData.heroImage} alt="Hero Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              {/* SECTION 4: Directional Energy Radar Sliders & Live Preview */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#5d2809] uppercase tracking-wider border-b border-[#f0e3d3] pb-1">
                  4. 8-Direction Energy Graph (Radar Calibration)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  {/* Sliders */}
                  <div className="grid grid-cols-2 gap-3">
                    {modalRadarData.points.map((pt) => (
                      <div key={pt.key} className="bg-white border border-[#eedecb] rounded-xl p-2.5 space-y-1">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span>{pt.label} Direction</span>
                          <span className="text-emerald-700 font-mono">{pt.val}</span>
                        </div>
                        <input
                          type="range"
                          min="4.0"
                          max="10.0"
                          step="0.1"
                          value={formData.radarScores?.[pt.key] ?? 8.0}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            setFormData({
                              ...formData,
                              radarScores: {
                                ...(formData.radarScores || {
                                  N: 8,
                                  NE: 8,
                                  E: 8,
                                  SE: 8,
                                  S: 8,
                                  SW: 8,
                                  W: 8,
                                  NW: 8,
                                }),
                                [pt.key]: val,
                              },
                            });
                          }}
                          className="w-full accent-[#7a3e1e] cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Real-time SVG Radar Preview */}
                  <div className="bg-white rounded-2xl border border-[#eedecb] p-4 text-center">
                    <div className="text-xs font-bold text-stone-500 uppercase">Live Polygon Preview</div>
                    <div className="relative w-44 h-44 mx-auto my-1 flex items-center justify-center">
                      <svg className="w-full h-full" viewBox="0 0 200 200">
                        <circle cx="100" cy="100" fill="none" r="70" stroke="#e8ded2" strokeWidth="1"></circle>
                        <circle cx="100" cy="100" fill="none" r="50" stroke="#efe7dc" strokeWidth="1"></circle>
                        <circle cx="100" cy="100" fill="none" r="30" stroke="#f4eee4" strokeWidth="1"></circle>
                        <line stroke="#e2d6c5" strokeWidth="0.75" x1="100" x2="100" y1="20" y2="180"></line>
                        <line stroke="#e2d6c5" strokeWidth="0.75" x1="20" x2="180" y1="100" y2="100"></line>
                        <line stroke="#e2d6c5" strokeWidth="0.75" x1="43" x2="157" y1="43" y2="157"></line>
                        <line stroke="#e2d6c5" strokeWidth="0.75" x1="43" x2="157" y1="157" y2="43"></line>

                        <polygon
                          fill="#34d399"
                          fillOpacity="0.32"
                          points={modalRadarData.pointsStr}
                          stroke="#059669"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></polygon>

                        {modalRadarData.points.map((pt) => (
                          <circle
                            key={pt.key}
                            cx={pt.x}
                            cy={pt.y}
                            fill={pt.val < 7.5 ? '#d97706' : '#059669'}
                            r="2.8"
                          />
                        ))}
                      </svg>
                    </div>
                    <div className="text-xs font-bold text-[#5d2809]">
                      Calculated Score: {modalRadarData.avgScore} / 10
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 5: Badges & Toggles */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#5d2809] uppercase tracking-wider border-b border-[#f0e3d3] pb-1">
                  5. Badges, Featured & Compliance
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex items-center gap-2.5 bg-white border border-[#eedecb] rounded-xl p-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured || false}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4 accent-[#7a3e1e]"
                    />
                    <div>
                      <div className="text-xs font-bold text-stone-800">Featured on Homepage</div>
                      <div className="text-[10px] text-stone-500">Highlights this property in top star slots</div>
                    </div>
                  </label>

                  <div className="bg-white border border-[#eedecb] rounded-xl p-3 space-y-1">
                    <label className="text-xs font-bold text-stone-800">RERA Registration ID</label>
                    <input
                      type="text"
                      value={formData.reraId || ''}
                      onChange={(e) => setFormData({ ...formData, reraId: e.target.value })}
                      placeholder="e.g. P51800028911"
                      className="w-full bg-[#fcfaf6] border border-[#d8c2b9] rounded-lg px-2.5 py-1 text-xs focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#e8dac8]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-200 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#7a3e1e] hover:bg-[#5d2809] text-white px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md active:scale-95 transition cursor-pointer"
                >
                  {editingPropertyId ? 'Save & Update Live' : 'Publish Property Now'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
