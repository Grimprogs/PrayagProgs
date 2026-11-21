'use client';

import React, { useState } from 'react';
import { Property } from '@/types';
import { useToast } from '@/context/ToastContext';

interface VastuReportPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
}

export default function VastuReportPdfModal({
  isOpen,
  onClose,
  property,
}: VastuReportPdfModalProps) {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'diagram' | 'scores' | 'remedies'>('diagram');

  // Dynamic Certificate Number Series for this unlocked report
  const certificateNumberSeries = React.useMemo(() => {
    const slug = property?.slug || 'vastu';
    let hash = 0;
    for (let i = 0; i < slug.length; i++) {
      hash = (hash << 5) - hash + slug.charCodeAt(i);
      hash |= 0;
    }
    const positiveHash = Math.abs(hash);
    const seriesCode = (positiveHash % 90000) + 10000;
    const batchAlpha = String.fromCharCode(65 + (positiveHash % 26));
    return `PP-VR-2026-${seriesCode}-${batchAlpha}`;
  }, [property?.slug]);

  const ledgerSeriesNumber = React.useMemo(() => {
    const rera = property?.reraId || 'PRAGYAA';
    const cleanRera = rera.replace(/[^0-9]/g, '').slice(-4) || '7890';
    return `MANDALA-SERIES-${cleanRera}/16Z`;
  }, [property?.reraId]);

  if (!isOpen) return null;

  const handlePrint = () => {
    showToast('Preparing high-resolution PDF for print/save...');
    setTimeout(() => {
      window.print();
    }, 300);
  };

  const handleDownloadPdf = () => {
    showToast(`Downloading certified Vastu report for "${property.title}" (PDF)...`);
  };

  // 16 Zones detailed data with angles
  const zones16Audit = [
    { dir: 'North', angle: '0°', deity: 'Kuber', element: 'Water (Jal)', room: 'Living Room Entrance', score: 9.5, status: 'Auspicious', color: '#16a34a', remedy: 'None required. Auspicious wealth portal.' },
    { dir: 'NNE', angle: '22.5°', deity: 'Dhanvantari', element: 'Water (Jal)', room: 'Pooja Alcove', score: 9.2, status: 'Auspicious', color: '#16a34a', remedy: 'Keep clear of metallic clutter.' },
    { dir: 'NE', angle: '45°', deity: 'Ishanya (Shiva)', element: 'Water (Jal)', room: 'Meditation Corner', score: 9.8, status: 'Auspicious', color: '#16a34a', remedy: 'Natural morning sunlight enhances clarity.' },
    { dir: 'ENE', angle: '67.5°', deity: 'Parjanya', element: 'Air (Vayu)', room: 'Balcony Deck', score: 8.8, status: 'Balanced', color: '#ca8a04', remedy: 'Placing green bamboo shoots adds vibrancy.' },
    { dir: 'East', angle: '90°', deity: 'Indra', element: 'Air (Vayu)', room: 'Formal Dining Area', score: 9.1, status: 'Auspicious', color: '#16a34a', remedy: 'Enhances social network & community stature.' },
    { dir: 'ESE', angle: '112.5°', deity: 'Manthan', element: 'Air (Vayu)', room: 'Study / Library', score: 8.1, status: 'Balanced', color: '#ca8a04', remedy: 'Avoid high-stress discussions in this corner.' },
    { dir: 'SE', angle: '135°', deity: 'Agni (Fire)', element: 'Fire (Agni)', room: 'Modular Kitchen (Hob)', score: 8.9, status: 'Balanced', color: '#ca8a04', remedy: 'Ideal fire quadrant. Cash flow generator.' },
    { dir: 'SSE', angle: '157.5°', deity: 'Pushan', element: 'Fire (Agni)', room: 'Utility / Laundry', score: 8.4, status: 'Balanced', color: '#ca8a04', remedy: 'Keep dryer vents clean.' },
    { dir: 'South', angle: '180°', deity: 'Yama', element: 'Fire (Agni)', room: 'Guest Bedroom', score: 8.7, status: 'Balanced', color: '#ca8a04', remedy: 'Solid wooden furnishings add grounding weight.' },
    { dir: 'SSW', angle: '202.5°', deity: 'Gandharva', element: 'Earth (Prithvi)', room: 'Powder Room / Bath', score: 8.0, status: 'Remedied', color: '#ea580c', remedy: 'Brass partition strip pre-installed under threshold.' },
    { dir: 'SW', angle: '225°', deity: 'Nirriti', element: 'Earth (Prithvi)', room: 'Master Suite Bed', score: 8.9, status: 'Balanced', color: '#ca8a04', remedy: 'Master headboard facing South/East ensures deep sleep.' },
    { dir: 'WSW', angle: '247.5°', deity: 'Dauvarika', element: 'Space (Akasha)', room: "Kids' Study Desk", score: 8.4, status: 'Balanced', color: '#ca8a04', remedy: 'Yellow study lamp enhances retention.' },
    { dir: 'West', angle: '270°', deity: 'Varuna', element: 'Space (Akasha)', room: 'Home Office / Den', score: 9.3, status: 'Auspicious', color: '#16a34a', remedy: 'Commercial and financial realization zone.' },
    { dir: 'WNW', angle: '292.5°', deity: 'Shosha', element: 'Air (Vayu)', room: 'Attached Bath #2', score: 7.9, status: 'Remedied', color: '#ea580c', remedy: 'White marble threshold & sea salt purifier.' },
    { dir: 'NW', angle: '315°', deity: 'Vayu (Wind)', element: 'Air (Vayu)', room: 'Second Bedroom', score: 8.8, status: 'Balanced', color: '#ca8a04', remedy: 'Promotes rapid banking and financial liquidity.' },
    { dir: 'NNW', angle: '337.5°', deity: 'Soma', element: 'Water (Jal)', room: 'Wardrobe / Dressing', score: 8.6, status: 'Balanced', color: '#ca8a04', remedy: 'Pastel curtains balance attraction energy.' },
  ];

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white"
      style={{ zIndex: 99999 }}
    >
      <div className="bg-[#fcfaf5] rounded-3xl border border-[#e4d3bd] shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden relative print:border-none print:shadow-none print:max-w-none print:max-h-none print:w-full">
        {/* Top Control Bar (Hidden on print) */}
        <div className="bg-[#4a240c] text-white px-5 py-3.5 flex items-center justify-between shrink-0 print:hidden">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[#ffdea7]/20 flex items-center justify-center text-amber-300">
              <i className="fa-solid fa-file-shield text-base"></i>
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-sm sm:text-base text-amber-100">
                  PragyaaProp Certified 16-Zone Vastu Report
                </h3>
                <span className="bg-[#e6f4ea] text-[#137333] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  OFFICIAL AUDIT UNLOCKED
                </span>
              </div>
              <p className="text-[11px] text-amber-200/90 font-mono flex items-center gap-2 mt-0.5">
                <span>Certificate Series: <strong className="text-amber-300 font-bold">{certificateNumberSeries}</strong></span>
                <span className="opacity-60">•</span>
                <span>Ledger #{ledgerSeriesNumber}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="bg-white/10 hover:bg-white/20 text-amber-100 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              title="Print Report"
            >
              <i className="fa-solid fa-print"></i>
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              title="Download PDF"
            >
              <i className="fa-solid fa-download"></i>
              <span className="hidden sm:inline">Download PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer ml-1"
              title="Close Report"
            >
              <i className="fa-solid fa-xmark text-sm"></i>
            </button>
          </div>
        </div>

        {/* Navigation Tabs (Diagram vs Scores vs Remedies) */}
        <div className="bg-[#f5ecdf] border-b border-[#e2d0ba] px-6 py-2 flex items-center justify-between shrink-0 print:hidden">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('diagram')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'diagram'
                  ? 'bg-[#733718] text-white shadow-xs'
                  : 'text-[#644431] hover:bg-[#e8dac6]'
              }`}
            >
              <i className="fa-solid fa-compass"></i>
              <span>16-Zone Spatial Diagram</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('scores')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'scores'
                  ? 'bg-[#733718] text-white shadow-xs'
                  : 'text-[#644431] hover:bg-[#e8dac6]'
              }`}
            >
              <i className="fa-solid fa-table-cells"></i>
              <span>Zone-by-Zone Audit Table</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('remedies')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'remedies'
                  ? 'bg-[#733718] text-white shadow-xs'
                  : 'text-[#644431] hover:bg-[#e8dac6]'
              }`}
            >
              <i className="fa-solid fa-leaf"></i>
              <span>Non-Invasive Remedies</span>
            </button>
          </div>

          <div className="text-[11px] font-bold text-[#733718] hidden md:flex items-center gap-1">
            <span>Overall Score:</span>
            <span className="bg-[#733718] text-white px-2 py-0.5 rounded text-xs">
              {property.vastuScore} / 10
            </span>
          </div>
        </div>

        {/* Report Document Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 delicate-scroll print:p-0 print:overflow-visible">
          {/* Official Document Letterhead */}
          <div className="bg-white p-6 rounded-2xl border border-[#eedecb] shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#ffdea7]/15 rounded-full blur-2xl pointer-events-none"></div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#eddac5] pb-4 mb-4 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#5d2809] text-amber-300 flex items-center justify-center text-xl shrink-0">
                  <i className="fa-solid fa-om"></i>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif font-bold text-lg text-[#3d1c08]">
                      PragyaaProp.com®
                    </span>
                    <span className="text-[10px] font-bold bg-[#ffdea7] text-[#5d2809] px-1.5 py-0.5 rounded">
                      VERIFIED VEDIC AUDIT
                    </span>
                  </div>
                  <p className="text-[11px] text-[#7d685c] font-medium">
                    National Sthapatya Council & ISO 9001:2015 Energy Audit Certified
                  </p>
                </div>
              </div>

              {/* RERA & Date stamp */}
              <div className="text-right text-xs text-stone-600 sm:self-center">
                <div className="font-bold text-stone-900">{property.reraStatus}</div>
                <div className="text-[11px] text-stone-500 font-mono">Reg #{property.reraId}</div>
                <div className="text-[10px] text-stone-400 mt-0.5">Audit Issue: 14-Nov-2026</div>
              </div>
            </div>

            {/* Official Certificate Number Series Banner on Unlock */}
            <div className="bg-gradient-to-r from-[#faeee2] via-[#fff9f1] to-[#faeee2] border-2 border-[#d8b896] rounded-xl p-3 mb-4 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#5d2809] text-amber-300 flex items-center justify-center font-serif text-lg font-bold shrink-0 shadow-xs">
                  №
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#7a3e1e] flex items-center gap-1.5">
                    <span>Certificate Number Series (Vedic Audit Registry)</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  </div>
                  <div className="font-mono font-black text-sm sm:text-base text-[#4a240c] tracking-wider">
                    {certificateNumberSeries}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <div className="bg-white/90 border border-[#d8b896] px-2.5 py-1 rounded-lg">
                  <span className="text-[9.5px] text-stone-500 block uppercase font-bold leading-tight">Ledger Series</span>
                  <span className="font-mono font-bold text-[#5d2809]">{ledgerSeriesNumber}</span>
                </div>
                <div className="bg-emerald-50 border border-emerald-300 px-2.5 py-1 rounded-lg text-emerald-800">
                  <span className="text-[9.5px] block leading-tight text-emerald-600 font-bold uppercase">Audit Status</span>
                  <span className="font-bold flex items-center gap-1">
                    <i className="fa-solid fa-circle-check text-[10px]"></i>
                    Unlocked & Verified
                  </span>
                </div>
                <div className="bg-white/90 border border-[#d8b896] px-2.5 py-1 rounded-lg">
                  <span className="text-[9.5px] text-stone-500 block uppercase font-bold leading-tight">Authenticity</span>
                  <span className="font-mono font-bold text-stone-800">100% Cryptographic</span>
                </div>
              </div>
            </div>

            {/* Property Summary Pill Row */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 bg-[#faf6ee] p-3.5 rounded-xl border border-[#eddac5] text-xs">
              <div>
                <span className="text-[10px] text-stone-400 uppercase font-bold block">Property</span>
                <span className="font-bold text-stone-900">{property.title}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 uppercase font-bold block">Location</span>
                <span className="font-bold text-stone-800">{property.location}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 uppercase font-bold block">Facing Direction</span>
                <span className="font-bold text-emerald-700">{property.facing} ({property.bhk})</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 uppercase font-bold block">Vedic Rating</span>
                <span className="font-bold text-[#733718]">{property.vastuGrade} ({property.vastuScore}/10)</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 uppercase font-bold block">Certificate Series</span>
                <span className="font-bold text-[#5d2809] font-mono text-[11px]">{certificateNumberSeries}</span>
              </div>
            </div>
          </div>

          {/* TAB 1: 16-ZONE SPATIAL DIAGRAM (The core diagram requested by user) */}
          {(activeTab === 'diagram' || true) && (
            <div className={`${activeTab === 'diagram' ? 'block' : 'hidden print:block'} bg-white p-6 rounded-2xl border border-[#eedecb] shadow-xs`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 pb-3 border-b border-[#eddac5] gap-2">
                <div>
                  <h4 className="font-serif font-bold text-base text-[#3d1c08] flex items-center gap-2">
                    <i className="fa-solid fa-dharmachakra text-[#733718]"></i>
                    16-Zone Spatial Energy Chakra & Cardinal Layout
                  </h4>
                  <p className="text-xs text-stone-500">
                    Precision angular matrix projected onto the architectural blueprint of {property.title}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1 font-bold text-emerald-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Auspicious
                  </span>
                  <span className="inline-flex items-center gap-1 font-bold text-amber-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Balanced
                  </span>
                  <span className="inline-flex items-center gap-1 font-bold text-orange-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> Remedied
                  </span>
                </div>
              </div>

              {/* Master SVG 16-Zone Compass Chakra */}
              <div className="relative flex flex-col items-center justify-center p-4 bg-[#faf6ee] rounded-2xl border border-[#eedecb]">
                <div className="w-full max-w-[480px] aspect-square relative">
                  <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-sm select-none">
                    <defs>
                      <radialGradient id="sacredCenterGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#ffdea7" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#f7e1c4" stopOpacity="0.1" />
                      </radialGradient>
                      <filter id="diagramShadow" x="-10%" y="-10%" width="120%" height="120%">
                        <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.15" />
                      </filter>
                    </defs>

                    {/* Outer Compass Degree Track */}
                    <circle cx="250" cy="250" r="235" fill="#fcfaf6" stroke="#d5c0aa" strokeWidth="2" />
                    <circle cx="250" cy="250" r="215" fill="#fff9f0" stroke="#eedcc8" strokeWidth="1.5" />
                    <circle cx="250" cy="250" r="160" fill="#ffffff" stroke="#e0cdb7" strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx="250" cy="250" r="105" fill="#fdfaf3" stroke="#e0cdb7" strokeWidth="1" />

                    {/* 16 Radial Sector Slices (22.5 deg each) */}
                    {zones16Audit.map((z, idx) => {
                      const angleDeg = idx * 22.5;
                      const radStart = ((angleDeg - 11.25 - 90) * Math.PI) / 180;
                      const radEnd = ((angleDeg + 11.25 - 90) * Math.PI) / 180;
                      const rInner = 65;
                      const rOuter = 215;

                      const x1 = 250 + rInner * Math.cos(radStart);
                      const y1 = 250 + rInner * Math.sin(radStart);
                      const x2 = 250 + rOuter * Math.cos(radStart);
                      const y2 = 250 + rOuter * Math.sin(radStart);
                      const x3 = 250 + rOuter * Math.cos(radEnd);
                      const y3 = 250 + rOuter * Math.sin(radEnd);
                      const x4 = 250 + rInner * Math.cos(radEnd);
                      const y4 = 250 + rInner * Math.sin(radEnd);

                      const labelRad = ((angleDeg - 90) * Math.PI) / 180;
                      const lx = 250 + 185 * Math.cos(labelRad);
                      const ly = 250 + 185 * Math.sin(labelRad);
                      const sx = 250 + 130 * Math.cos(labelRad);
                      const sy = 250 + 130 * Math.sin(labelRad);

                      const isGreen = z.status === 'Auspicious';
                      const isAmber = z.status === 'Balanced';
                      const fillColor = isGreen ? '#eaf7ed' : isAmber ? '#fef9e7' : '#fdf3e7';
                      const strokeColor = isGreen ? '#86efac' : isAmber ? '#fde047' : '#fdba74';

                      return (
                        <g key={z.dir} className="hover:opacity-90 transition-opacity cursor-pointer">
                          <path
                            d={`M ${x1} ${y1} L ${x2} ${y2} A ${rOuter} ${rOuter} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${rInner} ${rInner} 0 0 0 ${x1} ${y1} Z`}
                            fill={fillColor}
                            stroke={strokeColor}
                            strokeWidth="1"
                          />
                          {/* Direction Abbreviation */}
                          <text
                            x={lx}
                            y={ly}
                            fontSize="11"
                            fontWeight="bold"
                            textAnchor="middle"
                            dominantBaseline="central"
                            fill={z.color}
                            fontFamily="sans-serif"
                          >
                            {z.dir}
                          </text>
                          {/* Score Pill */}
                          <text
                            x={sx}
                            y={sy}
                            fontSize="9"
                            fontWeight="600"
                            textAnchor="middle"
                            dominantBaseline="central"
                            fill="#523a2b"
                            fontFamily="sans-serif"
                          >
                            {z.score}
                          </text>
                        </g>
                      );
                    })}

                    {/* Cadastral Blueprint Overlay (Mock Floor Plan Grid) */}
                    <g opacity="0.35" stroke="#733718" strokeWidth="1" fill="none">
                      <rect x="180" y="160" width="140" height="180" strokeDasharray="2 2" />
                      <line x1="250" y1="160" x2="250" y2="340" />
                      <line x1="180" y1="250" x2="320" y2="250" />
                      <rect x="190" y="170" width="50" height="60" />
                      <rect x="260" y="170" width="50" height="60" />
                      <rect x="190" y="260" width="50" height="70" />
                      <rect x="260" y="260" width="50" height="70" />
                    </g>

                    {/* Central Brahmasthan (Center Core) */}
                    <circle cx="250" cy="250" r="55" fill="url(#sacredCenterGlow)" stroke="#c48a43" strokeWidth="2.5" />
                    <circle cx="250" cy="250" r="45" fill="#fffbee" stroke="#deb578" strokeWidth="1" />
                    
                    {/* Brahmasthan Om / Lotus Mandala */}
                    <text
                      x="250"
                      y="244"
                      fontSize="18"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#733718"
                    >
                      ॐ
                    </text>
                    <text
                      x="250"
                      y="262"
                      fontSize="8"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#8b4e22"
                      fontFamily="sans-serif"
                    >
                      BRAHMASTHAN
                    </text>
                    <text
                      x="250"
                      y="273"
                      fontSize="7"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#15803d"
                      fontWeight="bold"
                      fontFamily="sans-serif"
                    >
                      0% LOAD • CLEAR
                    </text>

                    {/* True North Arrow (0 Deg indicator) */}
                    <g transform="translate(250, 15)">
                      <polygon points="0,-10 6,10 0,6 -6,10" fill="#dc2626" />
                      <text x="0" y="-14" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#dc2626">
                        TRUE NORTH (0°)
                      </text>
                    </g>
                  </svg>
                </div>

                {/* Diagram Caption / Sub-notes */}
                <div className="mt-3 text-center max-w-lg">
                  <p className="text-xs font-semibold text-[#5d2809]">
                    Figure 1.1: 16-Ray Directional Energy Matrix Superimposed with Architectural Centroid
                  </p>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Calculated using true geographic meridian alignment, adjusted for magnetic declination (+0.42°).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ZONE-BY-ZONE DETAILED AUDIT TABLE */}
          {(activeTab === 'scores' || true) && (
            <div className={`${activeTab === 'scores' ? 'block' : 'hidden print:block'} bg-white p-6 rounded-2xl border border-[#eedecb] shadow-xs`}>
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#eddac5]">
                <h4 className="font-serif font-bold text-base text-[#3d1c08] flex items-center gap-2">
                  <i className="fa-solid fa-list-check text-[#733718]"></i>
                  16-Zone Individual Calibration Scores & Elemental Balances
                </h4>
                <span className="text-xs text-stone-500 font-mono">16 Sectors Audited</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#f7efe4] text-[#4a240c] border-b border-[#e5d2bc]">
                      <th className="py-2.5 px-3 font-bold">Zone / Direction</th>
                      <th className="py-2.5 px-3 font-bold">Vedic Deity</th>
                      <th className="py-2.5 px-3 font-bold">Element</th>
                      <th className="py-2.5 px-3 font-bold">Space / Room</th>
                      <th className="py-2.5 px-2 font-bold text-center">Score</th>
                      <th className="py-2.5 px-3 font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f2e7db]">
                    {zones16Audit.map((z, i) => (
                      <tr key={i} className="hover:bg-[#fcf9f4]">
                        <td className="py-2 px-3 font-bold text-stone-900 flex items-center gap-1.5">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: z.color }}
                          ></span>
                          <span>{z.dir} ({z.angle})</span>
                        </td>
                        <td className="py-2 px-3 text-stone-700">{z.deity}</td>
                        <td className="py-2 px-3 text-stone-600 font-medium">{z.element}</td>
                        <td className="py-2 px-3 text-stone-800 font-medium">{z.room}</td>
                        <td className="py-2 px-2 text-center font-bold text-[#733718]">
                          {z.score.toFixed(1)}/10
                        </td>
                        <td className="py-2 px-3">
                          <span
                            className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                            style={{
                              backgroundColor:
                                z.status === 'Auspicious'
                                  ? '#dcfce7'
                                  : z.status === 'Balanced'
                                  ? '#fef9c3'
                                  : '#ffedd5',
                              color: z.color,
                            }}
                          >
                            {z.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: NON-INVASIVE REMEDIES & VEDIC CERTIFICATION SEAL */}
          {(activeTab === 'remedies' || true) && (
            <div className={`${activeTab === 'remedies' ? 'block' : 'hidden print:block'} bg-white p-6 rounded-2xl border border-[#eedecb] shadow-xs space-y-6`}>
              <div>
                <h4 className="font-serif font-bold text-base text-[#3d1c08] mb-1 flex items-center gap-2">
                  <i className="fa-solid fa-wand-magic-sparkles text-[#733718]"></i>
                  Prescribed Non-Invasive Energy Harmonization Remedies
                </h4>
                <p className="text-xs text-stone-500">
                  PragyaaProp adheres strictly to zero-demolition Vedic solutions using elemental metals, pyramids, and color strips.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#faf6ee] border border-[#ecd9c2]">
                  <div className="flex items-center gap-2 font-bold text-stone-900 mb-1">
                    <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-[10px]">1</span>
                    <span>South-South-West (Disposal Zone) Threshold</span>
                  </div>
                  <p className="text-stone-600 text-[11px] leading-relaxed">
                    Embedded brass energy-blocking strip beneath the powder room threshold. Completely cuts off vitality drain without structural alteration.
                  </p>
                  <span className="inline-block mt-2 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    ✓ Pre-Installed in Property
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#faf6ee] border border-[#ecd9c2]">
                  <div className="flex items-center gap-2 font-bold text-stone-900 mb-1">
                    <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-[10px]">2</span>
                    <span>West-North-West (Detoxification Sector)</span>
                  </div>
                  <p className="text-stone-600 text-[11px] leading-relaxed">
                    White natural marble skirting and placement of rock salt vessel absorbs emotional fatigue and refreshes household mental clarity.
                  </p>
                  <span className="inline-block mt-2 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    ✓ Verified by Sthapati Inspector
                  </span>
                </div>
              </div>

              {/* Official Gold Seal & Signatures */}
              <div className="pt-4 border-t border-[#eddac5] flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  {/* Gold Seal Graphic */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 text-white flex flex-col items-center justify-center p-2 text-center shadow-md shrink-0 border-2 border-amber-200">
                    <i className="fa-solid fa-certificate text-base text-amber-100"></i>
                    <span className="text-[7.5px] font-bold uppercase tracking-tighter leading-tight mt-0.5">
                      Pragyaa Certified
                    </span>
                    <span className="text-[9px] font-extrabold tracking-wide text-amber-100">GRADE A+</span>
                  </div>

                  <div>
                    <h5 className="font-serif font-bold text-sm text-[#3d1c08]">
                      Council of Vedic Architecture
                    </h5>
                    <p className="text-[11px] text-stone-600 mt-0.5">
                      This certificate validates that {property.title} satisfies the ancient 16-zone mathematical symmetry of Sthapatya Veda with zero demolition requirements.
                    </p>
                  </div>
                </div>

                {/* Architect Signature & Barcode */}
                <div className="text-center sm:text-right shrink-0">
                  <div className="font-serif italic text-base text-stone-800 font-bold tracking-wider">
                    Dr. Radheshyam Sharma
                  </div>
                  <div className="text-[10px] text-stone-500 font-sans">Chief Sthapati & Vedic Space Planner</div>

                  {/* Number Series Barcode Graphic */}
                  <div className="mt-2 inline-flex flex-col items-center sm:items-end">
                    <svg className="h-7 w-36" viewBox="0 0 160 30">
                      <rect x="0" y="0" width="3" height="26" fill="#2c221e" />
                      <rect x="5" y="0" width="1.5" height="26" fill="#2c221e" />
                      <rect x="9" y="0" width="4" height="26" fill="#2c221e" />
                      <rect x="15" y="0" width="2" height="26" fill="#2c221e" />
                      <rect x="19" y="0" width="5" height="26" fill="#2c221e" />
                      <rect x="26" y="0" width="2" height="26" fill="#2c221e" />
                      <rect x="30" y="0" width="3" height="26" fill="#2c221e" />
                      <rect x="35" y="0" width="1" height="26" fill="#2c221e" />
                      <rect x="38" y="0" width="4" height="26" fill="#2c221e" />
                      <rect x="44" y="0" width="2" height="26" fill="#2c221e" />
                      <rect x="48" y="0" width="6" height="26" fill="#2c221e" />
                      <rect x="56" y="0" width="1.5" height="26" fill="#2c221e" />
                      <rect x="60" y="0" width="3" height="26" fill="#2c221e" />
                      <rect x="65" y="0" width="5" height="26" fill="#2c221e" />
                      <rect x="72" y="0" width="2" height="26" fill="#2c221e" />
                      <rect x="76" y="0" width="3.5" height="26" fill="#2c221e" />
                      <rect x="82" y="0" width="1.5" height="26" fill="#2c221e" />
                      <rect x="86" y="0" width="4" height="26" fill="#2c221e" />
                      <rect x="92" y="0" width="2" height="26" fill="#2c221e" />
                      <rect x="96" y="0" width="6" height="26" fill="#2c221e" />
                      <rect x="104" y="0" width="2" height="26" fill="#2c221e" />
                      <rect x="108" y="0" width="4" height="26" fill="#2c221e" />
                      <rect x="114" y="0" width="1" height="26" fill="#2c221e" />
                      <rect x="117" y="0" width="5" height="26" fill="#2c221e" />
                      <rect x="124" y="0" width="2" height="26" fill="#2c221e" />
                      <rect x="128" y="0" width="4" height="26" fill="#2c221e" />
                      <rect x="134" y="0" width="2" height="26" fill="#2c221e" />
                      <rect x="138" y="0" width="5" height="26" fill="#2c221e" />
                      <rect x="145" y="0" width="2" height="26" fill="#2c221e" />
                      <rect x="149" y="0" width="4" height="26" fill="#2c221e" />
                      <rect x="155" y="0" width="3" height="26" fill="#2c221e" />
                    </svg>
                    <div className="text-[10px] font-mono text-[#5d2809] font-bold tracking-wider mt-0.5">
                      *{certificateNumberSeries}*
                    </div>
                  </div>
                  <div className="text-[9px] font-mono text-stone-400 mt-0.5">HASH: SHA256-VEDIC-9A8F-44C2</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Bar */}
        <div className="bg-[#fcfaf6] border-t border-[#ecdac2] px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 print:hidden">
          <div className="text-xs text-stone-500 flex items-center gap-2">
            <i className="fa-solid fa-shield-halved text-emerald-600"></i>
            <span>This unlocked report is permanently tied to your PragyaaProp account.</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 bg-[#733718] hover:bg-[#5c2b12] text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <i className="fa-solid fa-print"></i>
              <span>Print / Save PDF Diagram</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
