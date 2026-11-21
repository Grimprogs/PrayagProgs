'use client';

import React, { useState } from 'react';

export default function VastuAiWidget({ propertyTitle }: { propertyTitle?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    {
      sender: 'ai',
      text: `Namaste! I am the Pragyaa Vastu AI advisor. Ask me anything regarding directional orientation, natural light balance, or ${
        propertyTitle || 'property layouts'
      }.`
    }
  ]);
  const [input, setInput] = useState('');

  const quickQuestions = [
    'Why is North-East (Ishanya) so vital?',
    'What if the kitchen is in North instead of South-East?',
    'What is the difference between Aligned and Balanced?',
    'Are structural demolitions needed for remedies?'
  ];

  const handleSend = (textToSend?: string) => {
    const q = textToSend || input.trim();
    if (!q) return;

    setMessages((prev) => [...prev, { sender: 'user', text: q }]);
    setInput('');

    setTimeout(() => {
      let reply =
        'PragyaaProp evaluates residential spaces based on natural directional principles such as morning solar exposure, airflow circulation, and spatial zoning balance across Aligned, Balanced, and Adaptable categories.';

      const lower = q.toLowerCase();
      if (lower.includes('north-east') || lower.includes('ishanya')) {
        reply =
          'Ishanya (North-East) is traditionally associated with the Water element (Jala), morning sunlight, and mental clarity. Keeping this zone uncluttered with good window ventilation supports a bright, peaceful living space.';
      } else if (lower.includes('kitchen') || lower.includes('agni') || lower.includes('south-east')) {
        reply =
          'The South-East is traditionally associated with Agni (Fire element). Ideally, food preparation faces East to utilize morning daylight. If located elsewhere, non-invasive design tweaks and smart ventilation can easily balance the zone.';
      } else if (lower.includes('aligned') || lower.includes('balanced') || lower.includes('status')) {
        reply =
          'PragyaaProp uses three qualitative categories: Aligned (harmonious natural directional placement), Balanced (functional, comfortable everyday living with solid harmony), and Adaptable (flexible layouts suitable for subtle interior optimizations).';
      } else if (lower.includes('demolition') || lower.includes('break')) {
        reply =
          'No! PragyaaProp prioritizes zero-demolition spatial insights. Subtle non-structural adjustments, color balance, lighting choices, and thoughtful room utilization can comfortably optimize the living experience.';
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Action Cluster (Positioned safely above mobile bottom bar) */}
      <div className="fixed right-4 bottom-18 sm:right-6 sm:bottom-6 z-30 flex flex-col items-end gap-3 pointer-events-auto">
        {/* Ask Vastu AI Floating Avatar Bubble */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="relative group cursor-pointer text-left focus:outline-hidden"
          aria-label="Ask Vastu AI Advisor"
        >
          <div className="bg-white rounded-2xl shadow-xl border border-[#eedecb] p-2 flex items-center gap-2 hover:shadow-2xl transition-all duration-200">
            {/* Bot Head SVG / Avatar */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#fbf2e3] to-[#fffaf2] border border-[#f0dfc8] flex items-center justify-center text-[#733718] relative">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 48 48">
                <rect fill="#442a1a" height="22" rx="8" width="28" x="10" y="14"></rect>
                <rect fill="#1e1815" height="14" rx="4" width="20" x="14" y="18"></rect>
                <circle cx="20" cy="25" fill="#f59e0b" r="2.5"></circle>
                <circle cx="28" cy="25" fill="#f59e0b" r="2.5"></circle>
                <path d="M24 10 L27 14 H21 Z" fill="#d97706"></path>
                <circle cx="24" cy="8" fill="#d97706" r="2"></circle>
              </svg>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="pr-2 leading-tight">
              <div className="text-[11px] font-extrabold text-stone-900 flex items-center gap-1">
                <span>Ask Vastu AI</span>
                <span className="material-symbols-outlined text-[13px] text-[#c8923a]">auto_awesome</span>
              </div>
              <div className="text-[9px] text-stone-500">Spatial layout advisor</div>
            </div>
          </div>
        </button>
      </div>

      {/* Interactive AI Chat Drawer / Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 flex items-end sm:items-center justify-end sm:justify-end sm:p-6 bg-black/30 backdrop-blur-xs"
          style={{ zIndex: 99999 }}
        >
          <div className="w-full sm:w-[420px] bg-white rounded-t-3xl sm:rounded-3xl border border-[#eedecb] shadow-2xl flex flex-col h-[520px] overflow-hidden animate-in slide-in-from-bottom-5">
            {/* Header */}
            <div className="bg-[#5d2809] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#7a3e1e] flex items-center justify-center border border-[#ffdbcc]/30">
                  <span className="material-symbols-outlined text-lg text-[#ffdea7]">psychology</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold font-serif leading-tight">Pragyaa Vastu AI Advisor</h3>
                  <p className="text-[10px] text-[#ffdea7] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Online • Trained on Sthapatya Veda
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#fdfbf7] text-xs">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl ${m.sender === 'user'
                        ? 'bg-[#5d2809] text-white rounded-tr-none'
                        : 'bg-white text-stone-800 border border-[#eedecb] rounded-tl-none shadow-xs'
                      }`}
                  >
                    <p className="leading-relaxed">{m.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Prompts */}
            <div className="px-3 py-2 bg-[#f8f3eb] border-t border-[#eedecb] flex gap-1.5 overflow-x-auto scrollbar-none">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(q)}
                  className="px-2.5 py-1 rounded-full bg-white border border-[#eedecb] text-[10px] text-stone-700 whitespace-nowrap hover:bg-[#ffdea7]/30 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-[#eedecb] flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about entrances, Brahmasthan, remedies..."
                className="flex-1 bg-[#fdfbf7] border border-[#eedecb] rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-[#5d2809] focus:outline-none placeholder:text-stone-400"
              />
              <button
                type="button"
                onClick={() => handleSend()}
                className="bg-[#5d2809] hover:bg-[#7a3e1e] text-white p-2 rounded-xl transition-colors flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">send</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
