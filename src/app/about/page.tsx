'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VastuAiWidget from '@/components/common/VastuAiWidget';
import ConsultationModal from '@/components/common/ConsultationModal';

export default function AboutUsPage() {
  const [isConsultOpen, setIsConsultOpen] = useState(false);

  return (
    <div className="bg-[#fcfaf6] text-[#1b1c1a] font-sans antialiased selection:bg-[#ffdea7] selection:text-[#5d2809] min-h-screen flex flex-col">
      {/* Top Navigation */}
      <Navbar activeNav="about" showPanorama={false} showSearchBar={false} />

      <main className="grow">
        {/* ================================================================== */}
        {/* SECTION 1: HERO & ABOUT PRAGYAAPROP                                */}
        {/* ================================================================== */}
        <section className="relative bg-gradient-to-b from-[#f7f1e6] via-[#faf5ec] to-[#fcfaf6] border-b border-[#ecd9c6] pt-8 sm:pt-12 pb-14 sm:pb-20 overflow-hidden">
          {/* Subtle Geometric Background Motifs */}
          <div className="absolute inset-0 pointer-events-none opacity-20 flex justify-between items-center">
            <div className="w-80 h-80 rounded-full bg-[#ffdea7]/40 blur-3xl -ml-20"></div>
            <div className="w-96 h-96 rounded-full bg-[#ecd9c6]/40 blur-3xl -mr-20"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-xs text-[#86736b] mb-6 font-medium">
              <Link href="/" className="hover:text-[#4a240c] transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">home</span>
                <span>Home</span>
              </Link>
              <span className="text-[#dfceba]">/</span>
              <span className="text-[#4a240c] font-bold">About &amp; Vastu Education</span>
            </nav>

            <div className="max-w-3xl space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffdea7]/50 border border-[#ecd9c6] text-[#5d2809] text-[11px] font-bold tracking-wider uppercase font-sans">
                <span className="material-symbols-outlined text-sm">balance</span>
                <span>About PragyaaProp</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-serif text-[#4a240c] tracking-tight leading-tight font-bold">
                Exploring Homes Through a Clear, Vastu-Informed Perspective.
              </h1>

              {/* Exact Client Recommended Positioning Statement */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/90 border border-[#ecd9c6] shadow-2xs">
                <p className="text-sm sm:text-base text-[#4a240c] font-serif font-semibold italic leading-relaxed">
                  &ldquo;PragyaaProp helps people explore residential properties with a Vastu-informed perspective, bringing project-level discovery and flat-level information into one simple experience.&rdquo;
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#53433c] leading-relaxed">
                When searching for a residential home, most property platforms treat every unit in a building as identical. At PragyaaProp, we recognize that sunlight, airflow, and spatial orientation change from one wing to another and from one individual flat series to the next.
              </p>

              <p className="text-xs sm:text-sm text-[#53433c] leading-relaxed">
                Our platform structures the discovery process down to the individual flat level, providing clear and qualitative Vastu assessments without confusing numerical ratings or unsupported claims.
              </p>

              {/* Quick Jump Buttons */}
              <div className="pt-2 flex flex-wrap gap-3 items-center">
                <Link
                  href="/properties"
                  className="bg-[#7a3e1e] hover:bg-[#5d2809] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-2xs inline-flex items-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">explore</span>
                  <span>Explore Properties</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setIsConsultOpen(true)}
                  className="bg-white hover:bg-[#faf6ee] text-[#5d2809] border border-[#ecd9c6] px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-2xs inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">support_agent</span>
                  <span>Consultation Enquiry</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 2: WHY PRAGYAAPROP? (4 Core Accessible Benefits)           */}
        {/* ================================================================== */}
        <section className="py-14 sm:py-20 bg-white border-b border-[#ecd9c6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7a3e1e] bg-[#ffdea7]/40 px-3 py-1 rounded-full">
                Core Advantages
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#4a240c]">
                Why Explore With PragyaaProp?
              </h2>
              <p className="text-xs sm:text-sm text-[#53433c] leading-relaxed">
                We designed PragyaaProp to make property exploration structured, informative, and accessible to every homebuyer.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Benefit 1: Structured Discovery */}
              <div className="p-6 rounded-2xl bg-[#faf6ee] border border-[#ecd9c6] hover:border-[#7a3e1e] transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-11 h-11 rounded-xl bg-white text-[#7a3e1e] flex items-center justify-center border border-[#ecd9c6] shadow-2xs">
                    <span className="material-symbols-outlined text-xl">route</span>
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#4a240c]">
                    1. Structured Property Discovery
                  </h3>
                  <p className="text-xs text-[#53433c] leading-relaxed">
                    Navigate residential inventory through an intuitive 5-stage path: <em>City &rarr; Location &rarr; Project &rarr; Wing &rarr; Flat</em>. You always know exactly where you are in the journey.
                  </p>
                </div>
                <div className="pt-2 border-t border-[#eedecb] text-[11px] font-semibold text-[#7a3e1e]">
                  Step-by-step clarity
                </div>
              </div>

              {/* Benefit 2: Flat-Level Vastu Information */}
              <div className="p-6 rounded-2xl bg-[#faf6ee] border border-[#ecd9c6] hover:border-[#7a3e1e] transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-11 h-11 rounded-xl bg-white text-[#7a3e1e] flex items-center justify-center border border-[#ecd9c6] shadow-2xs">
                    <span className="material-symbols-outlined text-xl">meeting_room</span>
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#4a240c]">
                    2. Flat-Level Vastu Information
                  </h3>
                  <p className="text-xs text-[#53433c] leading-relaxed">
                    Rather than applying broad project-wide assumptions, each flat is cataloged by its specific floorplan series, acknowledging that orientation and natural light vary by unit placement.
                  </p>
                </div>
                <div className="pt-2 border-t border-[#eedecb] text-[11px] font-semibold text-[#7a3e1e]">
                  Unit-specific insights
                </div>
              </div>

              {/* Benefit 3: Simple & Understandable Status */}
              <div className="p-6 rounded-2xl bg-[#faf6ee] border border-[#ecd9c6] hover:border-[#7a3e1e] transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-11 h-11 rounded-xl bg-white text-[#7a3e1e] flex items-center justify-center border border-[#ecd9c6] shadow-2xs">
                    <span className="material-symbols-outlined text-xl">verified</span>
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#4a240c]">
                    3. Simple &amp; Understandable Status
                  </h3>
                  <p className="text-xs text-[#53433c] leading-relaxed">
                    We replace opaque numerical scores and anxiety-inducing jargon with three straightforward platform categories: <em>Aligned</em>, <em>Balanced</em>, and <em>Adaptable</em>.
                  </p>
                </div>
                <div className="pt-2 border-t border-[#eedecb] text-[11px] font-semibold text-[#7a3e1e]">
                  Zero confusing formulas
                </div>
              </div>

              {/* Benefit 4: Consultation Enquiry Option */}
              <div className="p-6 rounded-2xl bg-[#faf6ee] border border-[#ecd9c6] hover:border-[#7a3e1e] transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-11 h-11 rounded-xl bg-white text-[#7a3e1e] flex items-center justify-center border border-[#ecd9c6] shadow-2xs">
                    <span className="material-symbols-outlined text-xl">support_agent</span>
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#4a240c]">
                    4. Consultation Enquiry Option
                  </h3>
                  <p className="text-xs text-[#53433c] leading-relaxed">
                    Have specific questions about adapting a floorplan or understanding a layout? Homebuyers can submit an enquiry to consult with experienced advisors.
                  </p>
                </div>
                <div className="pt-2 border-t border-[#eedecb] text-[11px] font-semibold text-[#7a3e1e]">
                  Personalized guidance
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 3: WHAT IS VASTU SHASTRA? (Balanced Educational Overview) */}
        {/* ================================================================== */}
        <section className="py-14 sm:py-20 bg-[#faf6ee] border-b border-[#ecd9c6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7a3e1e] bg-[#ffdea7]/40 px-3 py-1 rounded-full">
                Vedic Architecture Primer
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#4a240c]">
                What is Vastu Shastra?
              </h2>
              <p className="text-xs sm:text-sm text-[#53433c] leading-relaxed">
                Vastu Shastra is a traditional Indian system of architecture and spatial design rooted in classical texts such as the <em>Sthapatya Veda</em>, <em>Mayamata</em>, and <em>Manasara</em>. Translated literally as the &ldquo;science of dwelling,&rdquo; it outlines traditional principles for organizing living spaces in harmony with natural directional forces.
              </p>
            </div>

            {/* Three Educational Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Concept 1: Architecture & Spatial Arrangement */}
              <div className="p-6 rounded-2xl bg-white border border-[#ecd9c6] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#faf6ee] text-[#7a3e1e] flex items-center justify-center border border-[#ecd9c6]">
                  <span className="material-symbols-outlined text-xl">architecture</span>
                </div>
                <h3 className="font-serif font-bold text-base text-[#4a240c]">
                  Architecture &amp; Spatial Zoning
                </h3>
                <p className="text-xs text-[#53433c] leading-relaxed">
                  Historically, Vastu provided town planners and builders with practical guidelines for structure proportions, room functions, window placements, and boundary orientations to maximize comfort and utility.
                </p>
              </div>

              {/* Concept 2: Directions & Natural Elements */}
              <div className="p-6 rounded-2xl bg-white border border-[#ecd9c6] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#faf6ee] text-[#7a3e1e] flex items-center justify-center border border-[#ecd9c6]">
                  <span className="material-symbols-outlined text-xl">explore</span>
                </div>
                <h3 className="font-serif font-bold text-base text-[#4a240c]">
                  Directions &amp; the Five Elements
                </h3>
                <p className="text-xs text-[#53433c] leading-relaxed">
                  Vastu associates cardinal and corner directions with the five natural elements (<em>Panchabhuta</em>: Earth, Water, Fire, Air, and Space). Practical alignments utilize morning sun from the East, cooling breezes, and shaded zones.
                </p>
              </div>

              {/* Concept 3: Why Homebuyers Value It */}
              <div className="p-6 rounded-2xl bg-white border border-[#ecd9c6] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#faf6ee] text-[#7a3e1e] flex items-center justify-center border border-[#ecd9c6]">
                  <span className="material-symbols-outlined text-xl">favorite</span>
                </div>
                <h3 className="font-serif font-bold text-base text-[#4a240c]">
                  Why Homebuyers Consider Vastu
                </h3>
                <p className="text-xs text-[#53433c] leading-relaxed">
                  Many families appreciate Vastu considerations when buying a home because well-oriented layouts tend to provide superior natural daylight, cross-ventilation, functional room privacy, and lasting peace of mind.
                </p>
              </div>
            </div>

            {/* Clear Perspective & Scientific Transparency Disclaimer */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#eedecb] flex items-start gap-3.5 text-xs text-[#53433c]">
              <span className="material-symbols-outlined text-lg text-[#7a3e1e] shrink-0 mt-0.5">info</span>
              <div className="leading-relaxed">
                <strong className="text-[#4a240c]">Traditional Perspective &amp; Clarity:</strong> Vastu Shastra represents a traditional cultural and architectural framework for spatial arrangement. While many of its core guidelines align with practical design principles like solar orientation and natural airflow, it is rooted in traditional philosophy rather than modern empirical science. PragyaaProp presents these assessments as an informational aid for cultural and personal preferences, without making claims of guaranteed outcomes.
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 4: UNDERSTANDING THE THREE VASTU STATUSES                  */}
        {/* ================================================================== */}
        <section className="py-14 sm:py-20 bg-white border-b border-[#ecd9c6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="max-w-2xl space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7a3e1e] bg-[#ffdea7]/40 px-3 py-1 rounded-full">
                Assessment Categories
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#4a240c]">
                Understanding the Three Vastu Statuses
              </h2>
              <p className="text-xs sm:text-sm text-[#53433c] leading-relaxed">
                Rather than reducing homes to arbitrary scores or percentages, PragyaaProp uses three qualitative assessment categories based on platform evaluation principles:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category 1: Aligned */}
              <div className="p-6 rounded-2xl bg-[#faf6ee] border border-[#ceead6] shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#e6f4ea] text-[#137333] border border-[#ceead6]">
                    <span className="w-2 h-2 rounded-full bg-[#137333]"></span>
                    <span>Aligned</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold text-[#86736b]">Platform Label</span>
                </div>

                <h3 className="text-lg font-serif font-bold text-[#4a240c]">
                  Harmonious Natural Orientation
                </h3>

                <p className="text-xs text-[#53433c] leading-relaxed">
                  This flat layout aligns harmoniously with primary directional orientations, supporting natural morning sunlight and continuous air circulation across key living zones. Core functional areas match traditional orientation ideals.
                </p>

                <div className="pt-3 border-t border-[#eedecb] space-y-1.5 text-[11px] text-[#53433c]">
                  <div className="flex items-center gap-1.5 text-[#137333] font-semibold">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    <span>Favorable natural light &amp; ventilation</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#137333] font-semibold">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    <span>Balanced core spatial arrangement</span>
                  </div>
                </div>
              </div>

              {/* Category 2: Balanced */}
              <div className="p-6 rounded-2xl bg-[#faf6ee] border border-[#feefc3] shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#fef7e0] text-[#b06000] border border-[#feefc3]">
                    <span className="w-2 h-2 rounded-full bg-[#b06000]"></span>
                    <span>Balanced</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold text-[#86736b]">Platform Label</span>
                </div>

                <h3 className="text-lg font-serif font-bold text-[#4a240c]">
                  Functional Everyday Harmony
                </h3>

                <p className="text-xs text-[#53433c] leading-relaxed">
                  This home provides solid practical harmony for everyday living. Major spatial allocations are functional and comfortable, while secondary elements can be enhanced through thoughtful interior planning and lighting choices.
                </p>

                <div className="pt-3 border-t border-[#eedecb] space-y-1.5 text-[11px] text-[#53433c]">
                  <div className="flex items-center gap-1.5 text-[#b06000] font-semibold">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    <span>Practical, comfortable living layout</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#b06000] font-semibold">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    <span>Easily enhanced via standard decor</span>
                  </div>
                </div>
              </div>

              {/* Category 3: Adaptable */}
              <div className="p-6 rounded-2xl bg-[#faf6ee] border border-[#fad2cf] shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#fce8e6] text-[#c5221f] border border-[#fad2cf]">
                    <span className="w-2 h-2 rounded-full bg-[#c5221f]"></span>
                    <span>Adaptable</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold text-[#86736b]">Platform Label</span>
                </div>

                <h3 className="text-lg font-serif font-bold text-[#4a240c]">
                  Flexible Spatial Planning
                </h3>

                <p className="text-xs text-[#53433c] leading-relaxed">
                  Certain rooms or openings differ from traditional recommendations, but the layout remains adaptable. Subtle non-structural adjustments, color balance, and personalized space utilization can help optimize the living experience.
                </p>

                <div className="pt-3 border-t border-[#eedecb] space-y-1.5 text-[11px] text-[#53433c]">
                  <div className="flex items-center gap-1.5 text-[#c5221f] font-semibold">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    <span>Flexible room utilization potential</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#c5221f] font-semibold">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    <span>Accommodates non-structural remedies</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 5: HOW PRAGYAAPROP WORKS (Visitor Journey Walkthrough)     */}
        {/* ================================================================== */}
        <section className="py-14 sm:py-20 bg-[#faf6ee] border-b border-[#ecd9c6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7a3e1e] bg-[#ffdea7]/40 px-3 py-1 rounded-full">
                Discovery Journey
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#4a240c]">
                How PragyaaProp Works
              </h2>
              <p className="text-xs sm:text-sm text-[#53433c] leading-relaxed">
                Our property discovery experience guides visitors through a clean, logical hierarchy from city to individual flat:
              </p>
            </div>

            {/* Visual Step-by-Step Flow */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Step 1: City */}
              <div className="p-5 rounded-2xl bg-white border border-[#ecd9c6] shadow-2xs space-y-3 text-center sm:text-left relative">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#86736b]">Stage 01</span>
                <div className="w-10 h-10 rounded-xl bg-[#faf6ee] text-[#7a3e1e] flex items-center justify-center border border-[#ecd9c6] mx-auto sm:mx-0">
                  <span className="material-symbols-outlined text-xl">location_city</span>
                </div>
                <h3 className="font-serif font-bold text-sm text-[#4a240c]">Select City</h3>
                <p className="text-[11px] text-[#53433c] leading-relaxed">
                  Start with supported demonstration cities, including Mumbai (our client reference sample hub).
                </p>
              </div>

              {/* Step 2: Location */}
              <div className="p-5 rounded-2xl bg-white border border-[#ecd9c6] shadow-2xs space-y-3 text-center sm:text-left relative">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#86736b]">Stage 02</span>
                <div className="w-10 h-10 rounded-xl bg-[#faf6ee] text-[#7a3e1e] flex items-center justify-center border border-[#ecd9c6] mx-auto sm:mx-0">
                  <span className="material-symbols-outlined text-xl">pin_drop</span>
                </div>
                <h3 className="font-serif font-bold text-sm text-[#4a240c]">Select Location</h3>
                <p className="text-[11px] text-[#53433c] leading-relaxed">
                  Choose the preferred neighborhood, such as Andheri in Mumbai.
                </p>
              </div>

              {/* Step 3: Project */}
              <div className="p-5 rounded-2xl bg-white border border-[#ecd9c6] shadow-2xs space-y-3 text-center sm:text-left relative">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#86736b]">Stage 03</span>
                <div className="w-10 h-10 rounded-xl bg-[#faf6ee] text-[#7a3e1e] flex items-center justify-center border border-[#ecd9c6] mx-auto sm:mx-0">
                  <span className="material-symbols-outlined text-xl">domain</span>
                </div>
                <h3 className="font-serif font-bold text-sm text-[#4a240c]">Select Project</h3>
                <p className="text-[11px] text-[#53433c] leading-relaxed">
                  Explore verified developments, such as the Godrej reference sample project.
                </p>
              </div>

              {/* Step 4: Wing */}
              <div className="p-5 rounded-2xl bg-white border border-[#ecd9c6] shadow-2xs space-y-3 text-center sm:text-left relative">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#86736b]">Stage 04</span>
                <div className="w-10 h-10 rounded-xl bg-[#faf6ee] text-[#7a3e1e] flex items-center justify-center border border-[#ecd9c6] mx-auto sm:mx-0">
                  <span className="material-symbols-outlined text-xl">meeting_room</span>
                </div>
                <h3 className="font-serif font-bold text-sm text-[#4a240c]">Select Wing</h3>
                <p className="text-[11px] text-[#53433c] leading-relaxed">
                  Choose building wings (e.g. Wing A active sample, Wing B simulated empty state).
                </p>
              </div>

              {/* Step 5: Flat */}
              <div className="p-5 rounded-2xl bg-white border border-[#ecd9c6] shadow-2xs space-y-3 text-center sm:text-left relative">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#86736b]">Stage 05</span>
                <div className="w-10 h-10 rounded-xl bg-[#faf6ee] text-[#7a3e1e] flex items-center justify-center border border-[#ecd9c6] mx-auto sm:mx-0">
                  <span className="material-symbols-outlined text-xl">apartment</span>
                </div>
                <h3 className="font-serif font-bold text-sm text-[#4a240c]">Select Flat</h3>
                <p className="text-[11px] text-[#53433c] leading-relaxed">
                  Inspect PP Codes, configurations, and Vastu assessments, revealing Series Numbers on inspection.
                </p>
              </div>
            </div>

            {/* Call to Action Button */}
            <div className="text-center pt-2">
              <Link
                href="/properties"
                className="bg-[#7a3e1e] hover:bg-[#5d2809] text-white px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold transition shadow-2xs inline-flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">explore</span>
                <span>Experience Guided Discovery Now</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 6: CONSULTATION ENQUIRY                                    */}
        {/* ================================================================== */}
        <section className="py-14 sm:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#faf6ee] via-white to-[#faf6ee] border border-[#ecd9c6] shadow-sm text-center space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-[#ffdea7]/40 text-[#7a3e1e] flex items-center justify-center mx-auto border border-[#ecd9c6]">
                <span className="material-symbols-outlined text-2xl">support_agent</span>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7a3e1e] bg-[#ffdea7]/40 px-3 py-1 rounded-full">
                  Personalized Guidance
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#4a240c]">
                  Have Questions About a Property Layout?
                </h2>
                <p className="text-xs sm:text-sm text-[#53433c] max-w-xl mx-auto leading-relaxed">
                  Whether you are evaluating a specific flat series or exploring adaptation ideas for an upcoming home purchase, you can submit an enquiry for a Vastu consultation.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsConsultOpen(true)}
                  className="bg-[#7a3e1e] hover:bg-[#5d2809] text-white px-7 py-3 rounded-xl text-xs sm:text-sm font-bold transition shadow-2xs inline-flex items-center gap-2 active:scale-95 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">support_agent</span>
                  <span>Request a Vastu Consultation</span>
                </button>
              </div>

              <p className="text-[11px] text-[#86736b] italic max-w-md mx-auto pt-2">
                Demonstration Notice: Submitting a consultation enquiry allows you to explore the consultation booking flow. In this demo, enquiries are simulated for evaluation purposes.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Vastu AI widget */}
      <VastuAiWidget propertyTitle="Vastu Education" />

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
