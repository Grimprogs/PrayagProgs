'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface VastuAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'audit' | 'how-it-works' | 'scoring' | 'sample-report';
}

const ZONES_DATA = [
  {
    code: 'N',
    name: 'North (Kuber Gateway)',
    degrees: '348.75° – 11.25°',
    element: 'Water (Jal)',
    color: '#0284c7',
    significance: 'Treasury, Opportunities & Financial Cashflow',
    idealRooms: 'Main Entrance, Living Room, Home Office, Safe Vault',
    afflictions: 'Kitchen (Agni clashes with Jal), Heavy Toilets, Cluttered Storage',
    remedy: 'Brass energy blocking wire, Blue bulb, Kuber yantra',
    scoreStandard: '9.0 – 10.0 Optimal'
  },
  {
    code: 'NE',
    name: 'North-East (Ishanya Gateway)',
    degrees: '33.75° – 56.25°',
    element: 'Water / Ether (Akash)',
    color: '#0ea5e9',
    significance: 'Spiritual Wisdom, Mental Clarity & Cosmic Life Energy',
    idealRooms: 'Pooja Mandir, Meditation Alcove, Open Balcony, Study',
    afflictions: 'Master Bedroom, Overhead Septic Tank, Heavy Pillars',
    remedy: 'Crystal pyramid, copper water vessel, zero heavy furniture',
    scoreStandard: '9.2 – 10.0 Optimal'
  },
  {
    code: 'E',
    name: 'East (Surya Mandir)',
    degrees: '78.75° – 101.25°',
    element: 'Air (Vayu)',
    color: '#10b981',
    significance: 'Social Connectivity, Vitality & Radiant Health',
    idealRooms: 'Verandah, Living Lounge, Sunlit Windows, Children Study',
    afflictions: 'Closed solid blank wall, dark storage room',
    remedy: 'Green prana plants, East-facing brass sun mandala',
    scoreStandard: '8.8 – 9.5 Optimal'
  },
  {
    code: 'SE',
    name: 'South-East (Agni Quadrant)',
    degrees: '123.75° – 146.25°',
    element: 'Fire (Agni)',
    color: '#f59e0b',
    significance: 'Metabolic Vigor, Liquidity, Passion & Digestion',
    idealRooms: 'Modular Kitchen, Cooktop Hob, Electrical Transformer, Microwave',
    afflictions: 'Underground water sumps, Master Bedroom, Pooja Mandir',
    remedy: 'Copper energy strip under cooktop, warm lighting',
    scoreStandard: '8.5 – 9.8 Optimal'
  },
  {
    code: 'S',
    name: 'South (Yama & Fame)',
    degrees: '168.75° – 191.25°',
    element: 'Fire / Earth',
    color: '#ea580c',
    significance: 'Public Reputation, Brand Honor & Steady Growth',
    idealRooms: 'Executive Cabin, High Compound Wall, Heavy Wardrobes',
    afflictions: 'Main Entrance without threshold, large water ponds',
    remedy: 'Heavy wooden console, terracotta statues',
    scoreStandard: '8.4 – 9.2 Optimal'
  },
  {
    code: 'SW',
    name: 'South-West (Nirriti Stability)',
    degrees: '213.75° – 236.25°',
    element: 'Earth (Prithvi)',
    color: '#7c2d12',
    significance: 'Head of Family Leadership, Relationship Stability & Wealth Retention',
    idealRooms: 'Master Suite, Heavy Vault, Eldest Bedroom, Solid Load-Bearing Zone',
    afflictions: 'Balcony cut-out, Swimming pool, Underground water sump, Toilet',
    remedy: 'Brass grounding strips, lead pyramids, heavy granite flooring',
    scoreStandard: '8.8 – 10.0 Critical'
  },
  {
    code: 'W',
    name: 'West (Varuna Sector)',
    degrees: '258.75° – 281.25°',
    element: 'Space (Akash)',
    color: '#6366f1',
    significance: 'Profits, Manifestation & Academic Achievement',
    idealRooms: 'Dining Area, Children Bedroom, Study Table, Overhead Tanks',
    afflictions: 'Open depressions, slope towards west',
    remedy: 'Space harmonization bells, circular white artwork',
    scoreStandard: '8.5 – 9.4 Optimal'
  },
  {
    code: 'NW',
    name: 'North-West (Vayu Sector)',
    degrees: '303.75° – 326.25°',
    element: 'Air (Vayu)',
    color: '#06b6d4',
    significance: 'Support Networks, Helpful Friends & Mobility',
    idealRooms: 'Guest Room, Finished Goods Storage, Garage, Washroom',
    afflictions: 'Heavy master bedroom, fire appliances',
    remedy: 'Wind chimes, light white curtains, silver wire boundary',
    scoreStandard: '8.5 – 9.2 Optimal'
  },
  {
    code: 'Center',
    name: 'Brahmasthan (Cosmic Centroid)',
    degrees: 'Central 1/9th Sector',
    element: 'Cosmic Space (Akash Tattva)',
    color: '#7b5807',
    significance: 'Universal Pranic Core, Family Equilibrium & Vital Life Breath',
    idealRooms: 'Open Living Courtyard, Light Flooring, Zero Weight Pillar',
    afflictions: 'Structural columns, staircases, kitchen hobs, washrooms',
    remedy: 'Mandala brass plate, crystal lotus center, zero heavy loads',
    scoreStandard: '9.5 – 10.0 Non-Negotiable'
  }
];

const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Cadastral GIS & CAD True North Alignment',
    badge: 'Precision: 0.0° Tolerance',
    desc: 'We obtain the municipal approved CAD layout and calibrate true geographic magnetic north using dual satellite cadastral telemetry, correcting compass declination angles.',
    icon: 'explore'
  },
  {
    step: '02',
    title: '16-Sector Mathematical Superimposition',
    badge: 'Sthapatya Veda Algorithms',
    desc: 'The ancient 16-zone mandala is overlaid onto the blueprint, dividing each room into 22.5° directional arcs and mapping elemental quadrants (Water, Air, Fire, Earth, Space).',
    icon: 'grid_view'
  },
  {
    step: '03',
    title: 'Dual-Audit: Astro-Architect + RERA Check',
    badge: 'Zero Conflict Protocol',
    desc: 'Each home undergoes review by both a traditional Jyotish Vastu Acharya and a licensed council architect, alongside 100% legal RERA title and encumbrance verification.',
    icon: 'verified_user'
  },
  {
    step: '04',
    title: 'Tamper-Proof Ledger Report (PDF)',
    badge: '№ PP-VR-2026 Serialized',
    desc: 'The final certified report is compiled with elemental radar charts, room-by-room scoring, non-destructive cure diagrams, and a tamper-proof certificate number series.',
    icon: 'picture_as_pdf'
  }
];

export default function VastuAuditModal({
  isOpen,
  onClose,
  initialTab = 'audit'
}: VastuAuditModalProps) {
  const [activeTab, setActiveTab] = useState<'audit' | 'how-it-works' | 'scoring' | 'sample-report'>(initialTab);
  const [selectedZone, setSelectedZone] = useState<typeof ZONES_DATA[0]>(ZONES_DATA[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-4xl bg-[#fbf9f5] border border-[#ecd9c6] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Vedic Arch Pattern */}
        <div className="relative bg-gradient-to-r from-[#faede0] via-[#f7e6d2] to-[#faede0] border-b border-[#ecd9c6] p-4 sm:p-6 flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fdcd75]/50 border border-[#eebf69] text-[#785503] text-[10px] font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-xs">verified</span>
              <span>16-ZONE SCIENTIFIC METHODOLOGY</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif text-[#4a240c] font-bold">
              The Science of Vastu Audits & How It Works
            </h2>
            <p className="text-xs sm:text-sm text-[#7d685c]">
              Explore our architectural energy analysis without superstition or destructive demolition.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#5d2809] flex items-center justify-center shadow-xs transition cursor-pointer"
            title="Close modal"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#f5ede1] border-b border-[#ecd9c6] px-4 sm:px-6 flex items-center gap-2 overflow-x-auto scrollbar-none py-2">
          <button
            type="button"
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'audit'
                ? 'bg-[#743b19] text-white shadow-xs'
                : 'text-[#5d2809] hover:bg-[#ffdea7]/40'
            }`}
          >
            <span className="material-symbols-outlined text-sm">explore</span>
            <span>16-Zone Energy Explorer</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('how-it-works')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'how-it-works'
                ? 'bg-[#743b19] text-white shadow-xs'
                : 'text-[#5d2809] hover:bg-[#ffdea7]/40'
            }`}
          >
            <span className="material-symbols-outlined text-sm">auto_stories</span>
            <span>4-Step Workflow</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('scoring')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'scoring'
                ? 'bg-[#743b19] text-white shadow-xs'
                : 'text-[#5d2809] hover:bg-[#ffdea7]/40'
            }`}
          >
            <span className="material-symbols-outlined text-sm">analytics</span>
            <span>Scoring & Harmony Tiers</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('sample-report')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'sample-report'
                ? 'bg-[#743b19] text-white shadow-xs'
                : 'text-[#5d2809] hover:bg-[#ffdea7]/40'
            }`}
          >
            <span className="material-symbols-outlined text-sm">description</span>
            <span>Certified Ledger Report</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* TAB 1: 16-ZONE AUDIT EXPLORER */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              <div className="bg-[#fff9f2] p-4 rounded-xl border border-[#eedfc9] text-xs text-[#5d2809] leading-relaxed flex items-start gap-3">
                <span className="material-symbols-outlined text-[#7a3e1e] text-2xl shrink-0 mt-0.5">
                  compass_calibration
                </span>
                <div>
                  <span className="font-bold block text-sm mb-0.5 text-[#4a240c]">
                    Interactive 16-Sector Cardinal Energy Compass
                  </span>
                  Click on any directional sector below to examine its elemental quadrant, governing deity, auspicious placement, and non-destructive cures.
                </div>
              </div>

              {/* Direction Chips */}
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-1.5">
                {ZONES_DATA.map((z) => (
                  <button
                    key={z.code}
                    type="button"
                    onClick={() => setSelectedZone(z)}
                    className={`py-2 px-1.5 rounded-lg border text-center transition cursor-pointer flex flex-col items-center ${
                      selectedZone.code === z.code
                        ? 'bg-[#743b19] text-white border-[#743b19] shadow-xs'
                        : 'bg-white text-stone-700 hover:bg-[#faede0] border-[#ecd9c6]'
                    }`}
                  >
                    <span className="text-xs font-bold">{z.code}</span>
                    <span className="text-[9px] opacity-80 truncate w-full">{z.code === 'Center' ? 'Brahmasthan' : z.code}</span>
                  </button>
                ))}
              </div>

              {/* Selected Zone Deep Dive Card */}
              <div className="bg-white rounded-2xl border border-[#ecd9c6] p-5 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#f3e7da] pb-3 gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-[#faede0] text-[#743b19] font-bold text-sm flex items-center justify-center font-serif">
                        {selectedZone.code}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold font-serif text-[#4a240c]">
                        {selectedZone.name}
                      </h3>
                    </div>
                    <span className="text-xs text-stone-500 mt-0.5 block">
                      Arc: {selectedZone.degrees} • Element: <strong>{selectedZone.element}</strong>
                    </span>
                  </div>

                  <span className="inline-block px-3 py-1 bg-[#e8f5e9] text-[#2e7d32] font-bold text-xs rounded-full border border-[#c8e6c9] self-start sm:self-auto">
                    {selectedZone.scoreStandard}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-[#fdfcf9] border border-[#f0e4d7]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#7a3e1e] block mb-1">
                        Cosmic Significance
                      </span>
                      <p className="text-stone-800 font-medium leading-relaxed">
                        {selectedZone.significance}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#f0f9ff] border border-[#bae6fd]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#0284c7] block mb-1">
                        Auspicious Placements
                      </span>
                      <p className="text-stone-800 font-medium leading-relaxed">
                        {selectedZone.idealRooms}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-[#fff7ed] border border-[#fed7aa]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#c2410c] block mb-1">
                        Common Afflictions (Doshas)
                      </span>
                      <p className="text-stone-800 font-medium leading-relaxed">
                        {selectedZone.afflictions}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#f0fdf4] border border-[#bbf7d0]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#15803d] block mb-1">
                        Non-Invasive Remedy (No Demolition)
                      </span>
                      <p className="text-stone-800 font-medium leading-relaxed">
                        {selectedZone.remedy}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 4-STEP WORKFLOW */}
          {activeTab === 'how-it-works' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {WORKFLOW_STEPS.map((step) => (
                  <div
                    key={step.step}
                    className="bg-white rounded-2xl border border-[#ecd9c6] p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-[#faede0] text-[#743b19] flex items-center justify-center font-bold text-sm">
                          {step.step}
                        </div>
                        <span className="text-[10px] font-bold text-[#785503] bg-[#fdcd75]/30 px-2.5 py-0.5 rounded-full border border-[#eedfc9]">
                          {step.badge}
                        </span>
                      </div>
                      <h4 className="text-base font-bold font-serif text-[#4a240c] mb-1.5">
                        {step.title}
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-[#fff9f2] border border-[#eedfc9] flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#4a240c] block">Have questions about your floor plan?</span>
                  <span className="text-stone-600">Connect directly with our Astro-Architectural Council for a 1-on-1 consultation.</span>
                </div>
                <Link
                  href="/#consult"
                  onClick={onClose}
                  className="px-4 py-2 bg-[#743b19] hover:bg-[#5e2e12] text-white font-bold rounded-lg shrink-0 cursor-pointer transition shadow-xs"
                >
                  Book Consult
                </Link>
              </div>
            </div>
          )}

          {/* TAB 3: SCORING & HARMONY TIERS */}
          {activeTab === 'scoring' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Inherently Aligned */}
                <div className="bg-white rounded-2xl border-2 border-emerald-500/40 p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      Score: 9.0 – 10.0
                    </span>
                    <span className="text-lg">🌿</span>
                  </div>
                  <h4 className="text-base font-bold font-serif text-emerald-950">
                    Inherently Aligned
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Homes naturally conforming to the Mayamatam grid. Brahmasthan is 100% open, master bedroom strictly southwest, and main entrance on the northern Kuber or eastern Indra axis.
                  </p>
                  <div className="text-[11px] font-bold text-emerald-700 bg-emerald-50/60 p-2 rounded-lg">
                    ✓ Zero Structural Defects • Premium Vedic Energy
                  </div>
                </div>

                {/* Functionally Balanced */}
                <div className="bg-white rounded-2xl border-2 border-amber-500/40 p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                      Score: 6.5 – 8.9
                    </span>
                    <span className="text-lg">⚖️</span>
                  </div>
                  <h4 className="text-base font-bold font-serif text-amber-950">
                    Functionally Balanced
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Well-designed homes with minor non-structural compromises (e.g. secondary washroom in an adjoining sub-zone). All points are fully mitigated with non-invasive cures.
                  </p>
                  <div className="text-[11px] font-bold text-amber-700 bg-amber-50/60 p-2 rounded-lg">
                    ✓ Mitigated with brass/copper strips • 100% Habitable
                  </div>
                </div>

                {/* Remedy-Ready */}
                <div className="bg-white rounded-2xl border-2 border-orange-500/40 p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-orange-800 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
                      Score: 5.0 – 6.4
                    </span>
                    <span className="text-lg">🛠️</span>
                  </div>
                  <h4 className="text-base font-bold font-serif text-orange-950">
                    Remedy-Ready
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Properties with noticeable elemental friction, but structural bones allow full energetic harmonization using sacred metal helixes, pyramids, and color spectrum balances.
                  </p>
                  <div className="text-[11px] font-bold text-orange-700 bg-orange-50/60 p-2 rounded-lg">
                    ✓ Requires planned remedies • Complete blueprint guide provided
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#ecd9c6] space-y-2 text-xs text-stone-700">
                <span className="font-bold text-sm text-[#4a240c] block">
                  Our Non-Destructive Ethical Guarantee
                </span>
                <p className="leading-relaxed">
                  We never advise breaking load-bearing walls, structural columns, or demolition. In authentic Sthapatya Veda, cosmic energy flows like electromagnetic frequencies and can be redirected using calibrated metals (Gold, Silver, Copper, Brass, Lead) and sacred geometric resonance.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: CERTIFIED LEDGER REPORT */}
          {activeTab === 'sample-report' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-[#ecd9c6] p-6 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#ecd9c6] pb-4 gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-[#7a3e1e] uppercase tracking-wider block">
                      Authenticity Series Document
                    </span>
                    <h3 className="text-base sm:text-lg font-bold font-serif text-[#4a240c]">
                      Sample Certified 18-Page PDF Report
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono font-bold text-[#743b19] block bg-[#faede0] px-3 py-1 rounded-lg">
                      № PP-VR-2026-89421-V
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-[#fdfcf9] rounded-xl border border-[#f0e4d7]">
                    <span className="text-stone-500 block text-[10px] uppercase font-bold">16-Zone Radar Chart</span>
                    <span className="font-bold text-[#4a240c] mt-0.5 block">Full 360° Polar Vector Map</span>
                  </div>
                  <div className="p-3 bg-[#fdfcf9] rounded-xl border border-[#f0e4d7]">
                    <span className="text-stone-500 block text-[10px] uppercase font-bold">Remedy Specification</span>
                    <span className="font-bold text-[#4a240c] mt-0.5 block">CAD Blueprint Overlays</span>
                  </div>
                  <div className="p-3 bg-[#fdfcf9] rounded-xl border border-[#f0e4d7]">
                    <span className="text-stone-500 block text-[10px] uppercase font-bold">Legal Attestation</span>
                    <span className="font-bold text-[#4a240c] mt-0.5 block">RERA Registered Match</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/properties/sunrise-residency"
                    onClick={onClose}
                    className="flex-1 py-3 bg-[#743b19] hover:bg-[#5e2e12] text-white font-bold rounded-xl text-center text-xs transition cursor-pointer shadow-xs"
                  >
                    View Sunrise Residency Live Audit & PDF
                  </Link>
                  <Link
                    href="/properties"
                    onClick={onClose}
                    className="py-3 px-6 bg-white hover:bg-stone-50 text-[#5d2809] border border-[#ecd9c6] font-bold rounded-xl text-center text-xs transition cursor-pointer"
                  >
                    Browse All Certified Homes
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#faede0] border-t border-[#ecd9c6] p-3 sm:p-4 flex items-center justify-between text-xs text-[#5d2809]">
          <span className="flex items-center gap-1 font-medium">
            <span className="material-symbols-outlined text-sm text-[#7a3e1e]">security</span>
            PragyaaProp Sthapatya Veda Architectural Assurance
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-[#743b19] hover:bg-[#5e2e12] text-white rounded-lg font-bold transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
