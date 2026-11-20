/* eslint-disable @typescript-eslint/no-explicit-any, react/no-unescaped-entities, react-hooks/set-state-in-effect, @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VastuAiWidget from '@/components/common/VastuAiWidget';
import SiteVisitModal from '@/components/common/SiteVisitModal';
import ConsultationModal from '@/components/common/ConsultationModal';
import ReportUnlockModal from '@/components/common/ReportUnlockModal';
import VastuReportPdfModal from '@/components/common/VastuReportPdfModal';
import { useToast } from '@/context/ToastContext';
import { useCredits } from '@/context/CreditsContext';
import { useProperties } from '@/context/PropertiesContext';
import { Property } from '@/types';

interface Props {
  slug: string;
  property?: Property;
}

export default function PropertyDetailClient({ slug, property: serverProperty }: Props) {
  const { getPropertyBySlug, properties } = useProperties();
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const decodedSlug = React.useMemo(() => {
    try {
      return decodeURIComponent(slug).toLowerCase().trim();
    } catch {
      return slug.toLowerCase().trim();
    }
  }, [slug]);

  const property =
    (mounted ? (getPropertyBySlug(decodedSlug) || getPropertyBySlug(slug)) : undefined) ||
    serverProperty ||
    getPropertyBySlug(decodedSlug) ||
    getPropertyBySlug(slug);

  const { showToast } = useToast();
  const { credits, deductCredit, isPropertyUnlocked, addCredits } = useCredits();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'vastu' | 'floorplan' | 'amenities' | 'location' | 'reviews'>('vastu');
  const [isSiteVisitOpen, setIsSiteVisitOpen] = useState(false);
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const [isUnlockOpen, setIsUnlockOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [reportPlan, setReportPlan] = useState<'credit' | 'single' | 'pass'>('credit');
  const [showAllZones, setShowAllZones] = useState(false);

  const isUnlocked = property ? isPropertyUnlocked(property.slug) : false;

  // Dynamic 8-direction radar calculation based on property.radarScores
  const radarCoords = React.useMemo(() => {
    const scores = property?.radarScores || { N: 8.5, NE: 8.5, E: 8.5, SE: 7.5, S: 8.0, SW: 7.8, W: 8.2, NW: 8.0 };
    const cx = 100;
    const cy = 100;
    const maxR = 68;
    const directions: Array<{ key: keyof typeof scores; angleDeg: number; label: string; lx: number; ly: number }> = [
      { key: 'N', angleDeg: -90, label: 'N', lx: 96, ly: 14 },
      { key: 'NE', angleDeg: -45, label: 'NE', lx: 156, ly: 44 },
      { key: 'E', angleDeg: 0, label: 'E', lx: 184, ly: 103 },
      { key: 'SE', angleDeg: 45, label: 'SE', lx: 154, ly: 162 },
      { key: 'S', angleDeg: 90, label: 'S', lx: 97, ly: 195 },
      { key: 'SW', angleDeg: 135, label: 'SW', lx: 32, ly: 162 },
      { key: 'W', angleDeg: 180, label: 'W', lx: 14, ly: 103 },
      { key: 'NW', angleDeg: 225, label: 'NW', lx: 34, ly: 44 },
    ];
    const points = directions.map((d) => {
      const val = Math.max(2, Math.min(10, scores[d.key] ?? 7.5));
      const r = (val / 10) * maxR;
      const rad = (d.angleDeg * Math.PI) / 180;
      const x = Math.round((cx + r * Math.cos(rad)) * 10) / 10;
      const y = Math.round((cy + r * Math.sin(rad)) * 10) / 10;
      const isRemedy = val < 7.5;
      return { ...d, val, x, y, isRemedy };
    });
    const pointsStr = points.map((p) => `${p.x},${p.y}`).join(' ');
    return { points, pointsStr };
  }, [property?.radarScores]);

  if (!property) {
    if (!mounted) {
      return (
        <div className="min-h-screen bg-[#fcfaf6] flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 border-3 border-[#7a3e1e] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs font-semibold text-[#5d2809]">Loading Vastu Energy Analysis...</p>
          </div>
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-[#fcfaf6] flex flex-col justify-between">
        <Navbar showPanorama={false} />
        <div className="max-w-xl mx-auto my-20 p-8 bg-white rounded-3xl border border-[#eedecb] text-center shadow-lg space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center mx-auto text-2xl font-serif">
            ॐ
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#5d2809]">Property Not Found in Catalog</h2>
          <p className="text-sm text-stone-600">
            We couldn't locate this property listing. It may have been removed or updated in the catalog.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              href="/properties"
              className="bg-[#7a3e1e] hover:bg-[#5d2809] text-white px-5 py-2.5 rounded-xl font-bold text-sm transition"
            >
              Browse All Properties →
            </Link>
            <Link
              href="/admin"
              className="bg-[#faeee2] hover:bg-[#eedfc9] text-[#7a3e1e] px-4 py-2.5 rounded-xl font-bold text-sm transition"
            >
              Admin Portal
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleQuickUnlockWithCredit = () => {
    if (credits >= 1) {
      const ok = deductCredit(property.slug, property.title);
      if (ok) {
        setIsPdfModalOpen(true);
      }
    } else {
      setIsUnlockOpen(true);
    }
  };

  const images = property.galleryImages && property.galleryImages.length > 0
    ? property.galleryImages
    : [{ src: property.heroImage, caption: 'Main Facade', category: 'Exterior' }];

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    showToast(!isFavorite ? `Saved ${property.title} to Favorites!` : `Removed ${property.title} from Favorites`);
  };

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Properties', href: '/properties' },
    { label: property.state, href: `/properties?state=${encodeURIComponent(property.state)}` },
    { label: property.city, href: `/properties?city=${encodeURIComponent(property.city)}` },
    { label: property.locality },
    { label: `${property.title} – ${property.bhk}`, active: true }
  ];

  return (
    <div className="bg-[#fcfaf6] text-[#221f1d] font-sans antialiased min-h-screen flex flex-col selection:bg-[#ffdbcc] selection:text-[#5d2809]">
      {/* 1. VEDIC HEADER WITH SEARCH BAR & SUBTLE ILLUSTRATIONS */}
      <Navbar
        showPanorama={true}
        showSearchBar={true}
        breadcrumbs={breadcrumbs}
        activeNav="explore"
      />

      {/* ======================================================== */}
      {/* MAIN CONTAINER (SPLIT 8 COLS / 4 COLS)                   */}
      {/* ======================================================== */}
      <main className="max-w-[1420px] xl:max-w-screen-2xl 2xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-3 w-full grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ==================================================== */}
          {/* LEFT + CENTER COLUMN: PROPERTY HERO, MEDIA & TABS    */}
          {/* ==================================================== */}
          <div className="lg:col-span-8 space-y-4">
            {/* TWO-COLUMN PROPERTY OVERVIEW HERO (Image Gallery + Summary Card) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
              {/* Image Gallery (Col 1-7) */}
              <div className="md:col-span-7 flex flex-col justify-between">
                {/* Main Photo Card */}
                <div className="relative rounded-2xl overflow-hidden border border-[#eedecb] shadow-sm bg-stone-900 aspect-[16/11] group">
                  <img
                    alt={property.title}
                    src={images[activeImageIndex].src}
                    className="w-full h-full object-cover transition duration-300"
                  />
                  {/* Badges on top-left */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                    <span className="bg-[#dcfce7] text-[#166534] text-[11px] font-bold px-2.5 py-1 rounded-full border border-[#bbf7d0] inline-flex items-center gap-1 shadow-sm">
                      <i className="fa-solid fa-check text-[10px]"></i> Vastu Certified
                    </span>
                    <span className="bg-white/95 backdrop-blur-sm text-stone-800 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-stone-200 shadow-sm inline-flex items-center gap-1">
                      <i className="fa-solid fa-shield text-[10px] text-stone-500"></i> {property.reraStatus}
                    </span>
                  </div>

                  {/* Top-right Heart Button */}
                  <button
                    type="button"
                    onClick={handleFavoriteToggle}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-stone-700 hover:text-red-500 flex items-center justify-center shadow-sm transition active:scale-90 z-10 cursor-pointer"
                    title="Save to Favorites"
                  >
                    <i className={`${isFavorite ? 'fa-solid text-red-500' : 'fa-regular'} fa-heart text-xs`}></i>
                  </button>

                  {/* Gallery Left / Right Nav Arrows */}
                  <button
                    type="button"
                    onClick={prevImage}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/85 text-stone-700 hover:bg-white flex items-center justify-center shadow transition active:scale-90 z-10 cursor-pointer"
                    title="Previous photo"
                  >
                    <i className="fa-solid fa-chevron-left text-[11px]"></i>
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/85 text-stone-700 hover:bg-white flex items-center justify-center shadow transition active:scale-90 z-10 cursor-pointer"
                    title="Next photo"
                  >
                    <i className="fa-solid fa-chevron-right text-[11px]"></i>
                  </button>

                  {/* Bottom-right Photo counter & Fullscreen */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 z-10">
                    <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                      <span>{activeImageIndex + 1}/{images.length}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => showToast(`Viewing full-resolution picture: ${images[activeImageIndex].caption}`)}
                      className="w-6 h-6 rounded-md bg-black/60 backdrop-blur-md text-white hover:bg-black/80 flex items-center justify-center text-[10px] cursor-pointer"
                      title="Fullscreen"
                    >
                      <i className="fa-solid fa-expand"></i>
                    </button>
                  </div>
                </div>

                {/* Thumbnail row with 6 thumbnails */}
                <div className="grid grid-cols-6 gap-2 mt-2.5">
                  {images.slice(0, 6).map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative rounded-lg overflow-hidden aspect-[4/3] focus:outline-none transition cursor-pointer ${activeImageIndex === idx
                          ? 'border-2 border-[#ea7a2b] shadow-xs'
                          : 'border border-[#eedecb] hover:border-[#ea7a2b]'
                        }`}
                    >
                      <img alt={img.caption} src={img.src} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Property Summary & CTAs (Col 8-12) */}
              <div className="md:col-span-5 flex flex-col justify-between space-y-3">
                <div>
                  <h1 className="text-2xl sm:text-[27px] font-serif font-bold text-stone-900 leading-tight">
                    {property.title}
                  </h1>
                  <p className="text-stone-600 text-xs mt-1 flex items-center gap-1.5 font-medium">
                    <i className="fa-solid fa-location-dot text-[#733718] text-xs"></i>
                    <span>{property.location}, {property.state}</span>
                  </p>

                  {/* Badges */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="bg-[#fbf7f2] text-stone-700 text-[11px] font-semibold px-2.5 py-1 rounded-md border border-[#edd7be] flex items-center gap-1">
                      <i className="fa-regular fa-building text-[#733718] text-xs"></i> {property.propertyType}
                    </span>
                    <span className="bg-[#eaf7ee] text-emerald-800 text-[11px] font-semibold px-2.5 py-1 rounded-md border border-[#c4e8cb] flex items-center gap-1">
                      <i className="fa-solid fa-check text-emerald-600 text-[10px]"></i> {property.possession}
                    </span>
                  </div>

                  {/* Prominent Golden Vastu Rating Card */}
                  <div className="mt-3.5 bg-[#fdf9f1] rounded-2xl border border-[#eedab8] p-3.5 shadow-sm">
                    <div className="grid grid-cols-12 gap-3 items-center">
                      {/* Left side: Lotus + score */}
                      <div className="col-span-6 border-r border-[#eedab8] pr-2">
                        <div className="flex items-center gap-2">
                          <svg className="w-7 h-7 text-[#c8923a]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 64 64">
                            <path d="M32 46 C24 40 18 30 18 20 C24 24 30 32 32 46 Z" fill="#fae3b4" stroke="#c8923a"></path>
                            <path d="M32 46 C40 40 46 30 46 20 C40 24 34 32 32 46 Z" fill="#fae3b4" stroke="#c8923a"></path>
                            <path d="M32 46 C30 34 26 22 32 10 C38 22 34 34 32 46 Z" fill="#e8bb6a" stroke="#c8923a"></path>
                            <path d="M12 36 C16 35 24 37 32 46 C18 48 10 42 12 36 Z" fill="#fae3b4" stroke="#c8923a"></path>
                            <path d="M52 36 C48 35 40 37 32 46 C46 48 54 42 52 36 Z" fill="#fae3b4" stroke="#c8923a"></path>
                          </svg>
                          <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider">Vastu Rating</span>
                        </div>
                        <div className="mt-1 flex items-baseline gap-1">
                          <span className="text-3xl font-serif font-black text-stone-900">{property.vastuScore}</span>
                          <span className="text-sm font-bold text-stone-500">/ 10</span>
                        </div>
                        <div className="mt-1">
                          <span className="inline-block bg-[#f8e5b8] text-[#865910] text-[10px] font-bold px-2 py-0.5 rounded-md">
                            {property.vastuStatus}
                          </span>
                        </div>
                      </div>

                      {/* Right side: Checklist */}
                      <div className="col-span-6 pl-1 space-y-1 text-[10.5px] text-stone-700 font-medium">
                        <div className="flex items-center gap-1.5">
                          <i className="fa-solid fa-check text-emerald-600 text-[10px]"></i>
                          <span>16-Zone Assessment Done</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <i className="fa-solid fa-check text-emerald-600 text-[10px]"></i>
                          <span>Verified by Vastu Expert</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <i className="fa-solid fa-check text-emerald-600 text-[10px]"></i>
                          <span>Report Available (PDF)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Specs Bar */}
                  <div className="mt-3.5 grid grid-cols-4 items-center bg-[#faf6ef] rounded-xl border border-[#eedecb] p-2.5 text-center divide-x divide-[#eedecb]">
                    <div className="px-1">
                      <div className="flex items-center justify-center gap-1 text-[#733718] text-xs">
                        <i className="fa-solid fa-bed"></i>
                        <span className="font-bold text-xs text-stone-900">{property.bhk}</span>
                      </div>
                      <div className="text-[10px] text-stone-500 mt-0.5">{property.sqft}</div>
                    </div>
                    <div className="px-1">
                      <div className="flex items-center justify-center gap-1 text-[#733718] text-xs">
                        <i className="fa-solid fa-bath"></i>
                        <span className="font-bold text-xs text-stone-900">{property.bathrooms}</span>
                      </div>
                      <div className="text-[10px] text-stone-500 mt-0.5">Bathrooms</div>
                    </div>
                    <div className="px-1">
                      <div className="flex items-center justify-center gap-1 text-[#733718] text-xs">
                        <i className="fa-solid fa-car"></i>
                        <span className="font-bold text-xs text-stone-900">{property.parking}</span>
                      </div>
                      <div className="text-[10px] text-stone-500 mt-0.5">Covered Parking</div>
                    </div>
                    <div className="px-1">
                      <div className="font-serif font-black text-sm text-stone-900 leading-tight">{property.price}</div>
                      <div className="text-[9.5px] text-stone-500 mt-0.5">({property.priceDetail}*)</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons Row */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsSiteVisitOpen(true)}
                    className="bg-[#733718] hover:bg-[#5c2b12] text-white py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition active:scale-95 cursor-pointer"
                  >
                    <i className="fa-regular fa-calendar-check"></i>
                    <span>Book Site Visit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsConsultOpen(true)}
                    className="border-2 border-[#733718] text-[#733718] hover:bg-[#733718] hover:text-white py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer"
                  >
                    <i className="fa-solid fa-user-tie"></i>
                    <span>Consult Vastu Expert</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ==================================================== */}
            {/* NAVIGATION TABS ROW                                  */}
            {/* ==================================================== */}
            <div className="pt-2">
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 border-b border-[#e9dcce]">
                {[
                  { id: 'overview', label: 'Overview', icon: 'fa-solid fa-house' },
                  { id: 'vastu', label: 'Vastu Analysis', icon: 'fa-solid fa-spa' },
                  { id: 'floorplan', label: 'Floor Plan', icon: 'fa-solid fa-table-cells-large' },
                  { id: 'amenities', label: 'Amenities', icon: 'fa-solid fa-tree-city' },
                  { id: 'location', label: 'Location', icon: 'fa-solid fa-location-crosshairs' },
                  { id: 'reviews', label: `Reviews (${property.reviews.length || 24})`, icon: 'fa-regular fa-star' }
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveTab(t.id as any)}
                    className={`tab-btn px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${activeTab === t.id
                        ? 'font-bold text-[#733718] bg-[#fbf2e3] border border-[#ecd4b2] shadow-xs'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-[#f3ece0]'
                      }`}
                  >
                    <i className={`${t.icon} text-xs text-[#c8923a]`}></i>
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* ==================================================== */}
            {/* TAB PANEL: VASTU ANALYSIS (3 PANELS EXACT AS IMAGE)  */}
            {/* ==================================================== */}
            {activeTab === 'vastu' && (
              <div className="space-y-4 pt-1">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-stretch">
                  {/* Panel 1: Vastu Assessment Summary (Radar Chart + Score) */}
                  <div className="md:col-span-5 bg-white rounded-2xl border border-[#eedecb] p-4 flex flex-col justify-between shadow-xs">
                    <div>
                      <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider font-sans">
                        Vastu Assessment Summary
                      </h3>
                      {/* Real SVG Spider / Radar Chart for 8 Directions */}
                      <div className="relative w-48 h-48 mx-auto my-1 flex items-center justify-center">
                        <svg className="w-full h-full" viewBox="0 0 200 200">
                          <circle cx="100" cy="100" fill="none" r="70" stroke="#e8ded2" strokeWidth="1"></circle>
                          <circle cx="100" cy="100" fill="none" r="50" stroke="#efe7dc" strokeWidth="1"></circle>
                          <circle cx="100" cy="100" fill="none" r="30" stroke="#f4eee4" strokeWidth="1"></circle>
                          <line stroke="#e2d6c5" strokeWidth="0.75" x1="100" x2="100" y1="20" y2="180"></line>
                          <line stroke="#e2d6c5" strokeWidth="0.75" x1="20" x2="180" y1="100" y2="100"></line>
                          <line stroke="#e2d6c5" strokeWidth="0.75" x1="43" x2="157" y1="43" y2="157"></line>
                          <line stroke="#e2d6c5" strokeWidth="0.75" x1="43" x2="157" y1="157" y2="43"></line>

                          {/* Dynamic Green Polygon of Scores */}
                          <polygon
                            fill="#34d399"
                            fillOpacity="0.28"
                            points={radarCoords.pointsStr}
                            stroke="#10b981"
                            strokeLinejoin="round"
                            strokeWidth="1.8"
                          ></polygon>

                          {radarCoords.points.map((pt) => (
                            <circle
                              key={pt.key}
                              cx={pt.x}
                              cy={pt.y}
                              fill={pt.isRemedy ? '#d97706' : '#059669'}
                              r="2.8"
                            />
                          ))}

                          {radarCoords.points.map((pt) => (
                            <text
                              key={`label-${pt.key}`}
                              fill="#374151"
                              fontFamily="sans-serif"
                              fontSize={pt.label.length > 1 ? '8' : '9'}
                              fontWeight="bold"
                              x={pt.lx}
                              y={pt.ly}
                            >
                              {pt.label}
                            </text>
                          ))}
                        </svg>
                      </div>
                    </div>

                    <div className="mt-1 pt-2 border-t border-[#f4eadb]">
                      <div className="text-[10.5px] font-bold text-stone-500 uppercase tracking-wide">
                        Overall Vastu Score
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-2xl font-serif font-black text-stone-900">{property.vastuScore}</span>
                        <span className="text-xs font-bold text-stone-400">/ 10</span>
                        <span className="bg-[#f8e5b8] text-[#865910] text-[10px] font-bold px-2 py-0.5 rounded-md ml-1">
                          {property.vastuStatus}
                        </span>
                      </div>
                      <p className="text-[10.5px] text-stone-600 leading-normal mt-1.5">
                        A well-aligned home with strong Vastu foundations and a few areas that can be further enhanced.
                      </p>
                    </div>
                  </div>

                  {/* Panel 2: 16-Zone Analysis (Preview) */}
                  <div className="md:col-span-4 bg-white rounded-2xl border border-[#eedecb] p-4 flex flex-col justify-between shadow-xs">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider font-sans">
                          16-Zone Analysis <span className="text-stone-400 font-normal text-[10px]">(Preview)</span>
                        </h3>
                      </div>

                      {/* Zone item list */}
                      <div className="space-y-2 mt-3">
                        {property.zones16.slice(0, 5).map((zone, idx) => (
                          <div
                            key={idx}
                            className={`flex items-center justify-between text-xs p-2 rounded-lg border ${zone.status === 'Remedy Needed'
                                ? 'bg-[#fdfaf3] border-[#fae5b9]'
                                : 'bg-[#fbf9f5] border-[#f1e5d6]'
                              }`}
                          >
                            <div className="flex items-center gap-1.5">
                              {zone.status === 'Remedy Needed' ? (
                                <i className="fa-solid fa-triangle-exclamation text-amber-500 text-[10px]"></i>
                              ) : (
                                <i className="fa-solid fa-check text-emerald-600 text-[10px]"></i>
                              )}
                              <span className="font-medium text-stone-800">{zone.name}</span>
                            </div>
                            <span
                              className={`font-bold ${zone.status === 'Remedy Needed' ? 'text-amber-700' : 'text-emerald-700'
                                }`}
                            >
                              {zone.score.toFixed(1)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* View all 16 Zones link */}
                    <div className="pt-2 text-center">
                      <button
                        type="button"
                        onClick={() => setShowAllZones(!showAllZones)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#733718] hover:text-[#5c2b12] cursor-pointer"
                      >
                        <span>{showAllZones ? 'Collapse Zones' : 'View All 16 Zones'}</span>
                        <i className={`fa-solid ${showAllZones ? 'fa-chevron-up' : 'fa-arrow-right'} text-[10px]`}></i>
                      </button>
                    </div>
                  </div>

                  {/* Panel 3: Vastu PDF Report Card (Locked / Unlocked) */}
                  <div className={`md:col-span-3 rounded-2xl border p-4 flex flex-col justify-between items-center text-center shadow-xs relative overflow-hidden transition-all ${isUnlocked ? 'bg-[#f4faf5] border-[#c2e7cc]' : 'bg-[#faf6ee] border-[#eedecb]'
                    }`}>
                    <div className="w-full">
                      {/* Document Visual */}
                      <div className="relative w-24 h-24 mx-auto mt-1 flex items-center justify-center">
                        <div className="absolute w-16 h-20 bg-white rounded-md border border-stone-300 -rotate-6 shadow-xs opacity-70"></div>
                        <div className="absolute w-16 h-20 bg-white rounded-md border border-stone-300 rotate-6 shadow-xs opacity-80"></div>
                        <div className="relative w-16 h-20 bg-white rounded-md border border-[#ebd8bf] shadow-sm flex flex-col p-1.5">
                          <div className="w-8 h-1.5 bg-stone-300 rounded mb-1"></div>
                          <div className="w-full h-1 bg-stone-200 rounded mb-1"></div>
                          <div className="w-full h-1 bg-stone-200 rounded mb-1"></div>
                          <div className="w-10 h-1 bg-stone-200 rounded"></div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          {isUnlocked ? (
                            <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md animate-bounce">
                              <i className="fa-solid fa-check text-sm"></i>
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-[#733718] text-white flex items-center justify-center shadow-md">
                              <i className="fa-solid fa-lock text-xs"></i>
                            </div>
                          )}
                        </div>
                      </div>

                      {isUnlocked ? (
                        <>
                          <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full mt-2">
                            <span>✓ CERTIFIED UNLOCKED</span>
                          </div>
                          <h4 className="text-xs font-bold text-stone-900 mt-1 font-serif">
                            16-Zone PDF Report
                          </h4>
                          <p className="text-[10px] text-stone-500 leading-tight mt-1 px-1">
                            Complete architectural blueprint overlay, energy scores & remedies available.
                          </p>
                        </>
                      ) : (
                        <>
                          <h4 className="text-xs font-bold text-stone-900 mt-2 font-serif">
                            Full Vastu Report (PDF)
                          </h4>
                          <p className="text-[10px] text-stone-500 leading-tight mt-1 px-1">
                            Unlock with 1 credit or purchase to view the complete 16-zone diagram & remedies.
                          </p>
                        </>
                      )}
                    </div>

                    {isUnlocked ? (
                      <button
                        type="button"
                        onClick={() => setIsPdfModalOpen(true)}
                        className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-2 px-3 rounded-xl font-bold text-xs mt-3 shadow-xs transition active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <i className="fa-solid fa-compass text-xs"></i>
                        <span>View 16-Zone PDF Diagram</span>
                      </button>
                    ) : (
                      <div className="w-full space-y-1.5 mt-3">
                        <button
                          type="button"
                          onClick={handleQuickUnlockWithCredit}
                          className="w-full bg-[#733718] hover:bg-[#5c2b12] text-white py-2 px-3 rounded-xl font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <span>🪙</span>
                          <span>Use 1 Credit ({credits} left)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsUnlockOpen(true)}
                          className="w-full bg-white hover:bg-stone-50 border border-[#eedecb] text-[#733718] py-1.5 px-3 rounded-xl font-bold text-[11px] shadow-2xs transition cursor-pointer"
                        >
                          Unlock PDF – ₹ 499
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Expanded All 16 Zones Drawer */}
                {showAllZones && (
                  <div className="bg-white rounded-2xl border border-[#eedecb] p-5 animate-in fade-in">
                    <h4 className="text-sm font-bold font-serif text-[#733718] mb-3">
                      Complete 16 Micro-Zone Calibration Breakdown
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      {property.zones16.map((z, i) => (
                        <div key={i} className="p-3 rounded-xl bg-[#fdfbf7] border border-[#eedecb] space-y-1">
                          <div className="flex items-center justify-between font-bold">
                            <span className="text-stone-900">{z.name}</span>
                            <span className={z.score >= 9 ? 'text-emerald-700' : z.score >= 8 ? 'text-[#733718]' : 'text-amber-700'}>
                              {z.score} / 10
                            </span>
                          </div>
                          <div className="text-[11px] text-stone-500">
                            Element: <span className="font-semibold text-stone-700">{z.element}</span> • Axis: {z.direction}
                          </div>
                          <p className="text-[11px] text-stone-600 leading-relaxed pt-1">
                            {z.observation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB PANEL: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="bg-white p-5 rounded-2xl border border-[#eedecb] space-y-4">
                <h3 className="text-sm font-bold text-stone-900 font-serif">Overview & Architecture</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{property.overview}</p>
                <div className="pt-2">
                  <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wide mb-2">
                    Spatial Verification Highlights
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {property.spatialHighlights.map((h, i) => (
                      <div key={i} className="p-3 bg-[#fcf8f2] rounded-xl border border-[#eedfc9]">
                        <div className="font-bold text-xs text-[#5d2809] flex items-center justify-between">
                          <span>{h.title}</span>
                          <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                            {h.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-600 mt-1">{h.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB PANEL: FLOOR PLAN */}
            {activeTab === 'floorplan' && (
              <div className="bg-white p-6 rounded-2xl border border-[#eedecb] text-center space-y-3">
                <i className="fa-solid fa-compass-drafting text-4xl text-[#733718] mb-1"></i>
                <h4 className="text-sm font-bold text-stone-900 font-serif">16-Zone Grid Floor Plan Overlay</h4>
                <p className="text-xs text-stone-500 max-w-md mx-auto">
                  High-precision CAD alignment with exact degree markers and Brahmasthan demarcation.
                </p>
                <div className="relative max-w-lg mx-auto bg-[#f8f5ee] rounded-xl border-2 border-dashed border-[#d8c2b9] p-8 aspect-video flex flex-col items-center justify-center">
                  <span className="material-symbols-outlined text-5xl text-[#c8923a]">architecture</span>
                  <span className="text-xs font-bold text-stone-700 mt-2">16-Zone Precision CAD Blueprint</span>
                  <span className="text-[10px] text-stone-500">True Magnetic North Angle: 14.2° NNE</span>
                  <button
                    type="button"
                    onClick={() => setIsUnlockOpen(true)}
                    className="mt-3 bg-[#733718] text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer"
                  >
                    Unlock High-Resolution Blueprint
                  </button>
                </div>
              </div>
            )}

            {/* TAB PANEL: AMENITIES */}
            {activeTab === 'amenities' && (
              <div className="bg-white p-5 rounded-2xl border border-[#eedecb]">
                <h3 className="text-sm font-bold text-stone-900 font-serif mb-3">Vedic & Luxury Amenities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {property.amenities?.map((a, i) => {
                    const isObj = typeof a === 'object' && a !== null;
                    const icon = isObj && 'icon' in a ? (a as any).icon : 'check_circle';
                    const name = isObj && 'name' in a ? (a as any).name : (a as string);
                    const desc = isObj && 'description' in a ? (a as any).description : 'Verified Vedic Lifestyle Feature';
                    return (
                      <div key={i} className="p-3 bg-[#fcfaf6] rounded-xl border border-[#eedecb] space-y-1">
                        <div className="flex items-center gap-2 font-bold text-xs text-[#733718]">
                          <span className="material-symbols-outlined text-lg">{icon}</span>
                          <span>{name}</span>
                        </div>
                        <p className="text-[11px] text-stone-500">{desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB PANEL: LOCATION */}
            {activeTab === 'location' && (
              <div className="bg-white p-5 rounded-2xl border border-[#eedecb] space-y-3">
                <h3 className="text-sm font-bold text-stone-900 font-serif">Location & Connectivity</h3>
                <p className="text-xs text-stone-600">
                  Located in prime {property.locality}, {property.city}. Key transit nodes and arterial routes:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  {property.connectivity && property.connectivity.length > 0 ? (
                    property.connectivity.map((c, i) => (
                      <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-[#fbf9f5] border border-[#f1e5d6]">
                        <span className="font-medium text-stone-800">{c.landmark}</span>
                        <span className="font-bold text-[#733718]">{c.distance}</span>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-stone-500 text-xs py-2">Transit and connectivity details verified with civic registry.</div>
                  )}
                </div>
              </div>
            )}

            {/* TAB PANEL: REVIEWS */}
            {activeTab === 'reviews' && (
              <div className="bg-white p-5 rounded-2xl border border-[#eedecb] space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-stone-900 font-serif">Resident Reviews</h3>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    ⭐ 4.9 / 5 Verified Score
                  </span>
                </div>
                <div className="space-y-3">
                  {property.reviews.map((r) => (
                    <div key={r.id} className="p-3.5 bg-[#fdfbf7] rounded-xl border border-[#eedecb] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#733718]">{r.author}</span>
                        <span className="text-[10px] text-stone-400">{r.date}</span>
                      </div>
                      <span className="text-[10px] text-stone-500 block -mt-1">{r.role}</span>
                      <p className="text-xs text-stone-600 leading-relaxed italic">"{r.comment}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ==================================================== */}
          {/* RIGHT SIDEBAR (Col 4): REPORT PURCHASE & PANDITJI    */}
          {/* ==================================================== */}
          <div className="lg:col-span-4 space-y-4">
            {/* Top Card: Unlock Full Vastu Report or View Unlocked */}
            {isUnlocked ? (
              <div className="bg-[#f0f9f3] rounded-2xl border border-[#bce8cb] p-4 sm:p-5 shadow-xs space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-lg shrink-0 shadow-xs">
                    <i className="fa-solid fa-file-circle-check"></i>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">
                        ✓ UNLOCKED
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-emerald-950 font-serif mt-0.5">
                      Full Vastu Report Active
                    </h3>
                    <p className="text-[11px] text-emerald-700">
                      Permanent certificate & 16-zone spatial diagram
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsPdfModalOpen(true)}
                  className="w-full bg-[#733718] hover:bg-[#5c2b12] text-white py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95 cursor-pointer"
                >
                  <i className="fa-solid fa-compass text-xs"></i>
                  <span>Open 16-Zone PDF Diagram</span>
                </button>

                <div className="text-[10px] text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                  <i className="fa-solid fa-certificate text-emerald-600 mr-1"></i>
                  Official Sthapatya Veda certificate with Dr. Radheshyam Sharma's verification.
                </div>
              </div>
            ) : (
              <div className="bg-[#faf6ee] rounded-2xl border border-[#ecdac2] p-4 sm:p-5 shadow-xs">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#f0dfc8] text-[#733718] flex items-center justify-center text-sm font-bold shrink-0">
                    <i className="fa-solid fa-file-pdf"></i>
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-stone-900 font-serif">Unlock Full Vastu Report</h2>
                    <p className="text-[11px] text-stone-600 mt-0.5 leading-tight">
                      Get the complete 16-Zone audit with detailed analysis, recommendations and remedies.
                    </p>
                  </div>
                </div>

                {/* Radio Selection Group */}
                <div className="space-y-2 mt-3.5">
                  <label
                    onClick={() => setReportPlan('credit')}
                    className={`flex items-center justify-between p-2.5 bg-white rounded-xl border-2 cursor-pointer shadow-xs transition ${reportPlan === 'credit' ? 'border-[#733718]' : 'border-[#eedecb]'
                      }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="sidebar_report"
                        checked={reportPlan === 'credit'}
                        onChange={() => setReportPlan('credit')}
                        className="text-[#733718] focus:ring-[#733718] h-3.5 w-3.5"
                      />
                      <div className="leading-tight">
                        <div className="text-xs font-bold text-stone-900 flex items-center gap-1">
                          <span>Use 1 Credit</span>
                          <span className="text-[9.5px] font-bold text-emerald-700 bg-emerald-50 px-1 rounded">
                            {credits} avail
                          </span>
                        </div>
                        <div className="text-[10px] text-stone-500">Instant unlock via demo credits</div>
                      </div>
                    </div>
                    <div className="text-xs font-bold font-serif text-[#733718]">1 Credit</div>
                  </label>

                  <label
                    onClick={() => setReportPlan('single')}
                    className={`flex items-center justify-between p-2.5 bg-white rounded-xl border-2 cursor-pointer shadow-xs transition ${reportPlan === 'single' ? 'border-[#733718]' : 'border-[#eedecb]'
                      }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="sidebar_report"
                        checked={reportPlan === 'single'}
                        onChange={() => setReportPlan('single')}
                        className="text-[#733718] focus:ring-[#733718] h-3.5 w-3.5"
                      />
                      <div className="leading-tight">
                        <div className="text-xs font-bold text-stone-900">Unlock This Property Report</div>
                        <div className="text-[10px] text-stone-500">Single property (PDF download)</div>
                      </div>
                    </div>
                    <div className="text-xs font-bold font-serif text-[#733718]">₹ 499</div>
                  </label>

                  <label
                    onClick={() => setReportPlan('pass')}
                    className={`flex items-center justify-between p-2.5 bg-white rounded-xl border-2 cursor-pointer shadow-xs transition ${reportPlan === 'pass' ? 'border-[#733718]' : 'border-[#eedecb]'
                      }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="sidebar_report"
                        checked={reportPlan === 'pass'}
                        onChange={() => setReportPlan('pass')}
                        className="text-[#733718] focus:ring-[#733718] h-3.5 w-3.5"
                      />
                      <div className="leading-tight">
                        <div className="text-xs font-bold text-stone-900">Buy Buyer Pass (10 Credits)</div>
                        <div className="text-[10px] text-stone-500">Unlock 10 reports & save 10%</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold font-serif text-stone-900">₹ 4,499</div>
                      <span className="inline-block bg-[#f8e5b8] text-[#865910] text-[8.5px] font-bold px-1.5 py-0.2 rounded">
                        Best Value
                      </span>
                    </div>
                  </label>
                </div>

                {/* Solid Walnut CTA Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (reportPlan === 'credit') {
                      handleQuickUnlockWithCredit();
                    } else {
                      setIsUnlockOpen(true);
                    }
                  }}
                  className="w-full bg-[#733718] hover:bg-[#5c2b12] text-white py-2.5 px-4 rounded-xl font-bold text-xs mt-3 flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95 cursor-pointer"
                >
                  {reportPlan === 'credit' ? (
                    <>
                      <span>🪙</span>
                      <span>Unlock with 1 Credit</span>
                    </>
                  ) : reportPlan === 'single' ? (
                    <>
                      <i className="fa-solid fa-lock text-[11px]"></i>
                      <span>Pay ₹ 499 & Unlock Report</span>
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-credit-card text-[11px]"></i>
                      <span>Buy 10 Credits (₹ 4,499)</span>
                    </>
                  )}
                </button>

                {/* Checklist */}
                <div className="mt-4 pt-3 border-t border-[#ebd8bf]">
                  <h4 className="text-[10.5px] font-bold text-stone-800 uppercase tracking-wider mb-2">
                    What's in the full report?
                  </h4>
                  <ul className="space-y-1.5 text-[11px] text-stone-600">
                    <li className="flex items-center gap-1.5">
                      <i className="fa-solid fa-check text-emerald-600 text-[10px]"></i>
                      <span>Complete 16-Zone Vastu analysis</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <i className="fa-solid fa-check text-emerald-600 text-[10px]"></i>
                      <span>Zone-wise scores & observations</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <i className="fa-solid fa-check text-emerald-600 text-[10px]"></i>
                      <span>Detailed recommendations & remedies</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <i className="fa-solid fa-check text-emerald-600 text-[10px]"></i>
                      <span>Annotated floor plan</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <i className="fa-solid fa-check text-emerald-600 text-[10px]"></i>
                      <span>Expert verification & certificate</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <i className="fa-solid fa-check text-emerald-600 text-[10px]"></i>
                      <span>Downloadable PDF (yours forever)</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Bottom Card: Need Guidance? (Panditji consultation) */}
            <div className="bg-white rounded-2xl border border-[#eedecb] p-3.5 shadow-xs flex items-center gap-3">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-amber-50 shrink-0 border border-amber-200">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <rect fill="#fdf3e2" height="100" width="100"></rect>
                  <circle cx="50" cy="50" fill="#fbe7c6" r="40"></circle>
                  <path d="M15,95 C15,75 30,68 50,68 C70,68 85,75 85,95 Z" fill="#d97706"></path>
                  <path d="M35,68 L50,95 L65,68 Z" fill="#ea580c"></path>
                  <circle cx="36" cy="80" fill="#78350f" r="2.5"></circle>
                  <circle cx="42" cy="84" fill="#78350f" r="2.5"></circle>
                  <circle cx="50" cy="86" fill="#78350f" r="2.5"></circle>
                  <circle cx="58" cy="84" fill="#78350f" r="2.5"></circle>
                  <circle cx="64" cy="80" fill="#78350f" r="2.5"></circle>
                  <ellipse cx="50" cy="46" fill="#e2ba8c" rx="18" ry="21"></ellipse>
                  <path d="M32,48 C32,66 40,76 50,76 C60,76 68,66 68,48 C64,56 56,60 50,60 C44,60 36,56 32,48 Z" fill="#f3f4f6"></path>
                  <path d="M44,55 Q50,58 56,55" fill="none" stroke="#9a3412" strokeWidth="1.5"></path>
                  <ellipse cx="43" cy="42" fill="#451a03" rx="2" ry="1.5"></ellipse>
                  <ellipse cx="57" cy="42" fill="#451a03" rx="2" ry="1.5"></ellipse>
                  <path d="M39,38 Q43,36 47,38" fill="none" stroke="#ffffff" strokeWidth="2"></path>
                  <path d="M53,38 Q57,36 61,38" fill="none" stroke="#ffffff" strokeWidth="2"></path>
                  <rect fill="#ea580c" height="11" width="3" x="48.5" y="30"></rect>
                  <circle cx="50" cy="35" fill="#ef4444" r="1.5"></circle>
                </svg>
              </div>

              <div className="flex-1">
                <h4 className="text-xs font-bold text-stone-900 font-serif">Need Guidance?</h4>
                <p className="text-[10.5px] text-stone-600 leading-tight mt-0.5">
                  Book a consultation with our verified Vastu expert or Pandit.
                </p>
                <button
                  type="button"
                  onClick={() => setIsConsultOpen(true)}
                  className="mt-2 text-[11px] font-bold text-[#733718] hover:text-[#5c2b12] inline-flex items-center gap-1 border border-[#eedecb] rounded-lg px-2.5 py-1 bg-[#fbf7f2] hover:bg-[#f3ece0] transition cursor-pointer"
                >
                  <span>Book Consultation</span>
                  <i className="fa-solid fa-arrow-right text-[9px]"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Vastu AI Widget */}
      <VastuAiWidget propertyTitle={property.title} />

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <SiteVisitModal
        isOpen={isSiteVisitOpen}
        onClose={() => setIsSiteVisitOpen(false)}
        propertyTitle={property.title}
      />

      <ConsultationModal
        isOpen={isConsultOpen}
        onClose={() => setIsConsultOpen(false)}
      />

      <ReportUnlockModal
        isOpen={isUnlockOpen}
        onClose={() => setIsUnlockOpen(false)}
        propertyTitle={property.title}
        propertySlug={property.slug}
        onUnlocked={() => setIsPdfModalOpen(true)}
      />

      {/* 16-Zone Certified Vastu PDF Report Viewer */}
      <VastuReportPdfModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        property={property}
      />
    </div>
  );
}
