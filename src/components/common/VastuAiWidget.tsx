'use client';

import React, { useState } from 'react';

export default function VastuAiWidget({ propertyTitle }: { propertyTitle?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    {
      sender: 'ai',
      text: `Namaste! I am the Pragyaa Vastu AI advisor. Ask me anything regarding 16-zone spatial balance, directional remedies, or ${propertyTitle || 'property energy'
        }.`
    }
  ]);
  const [input, setInput] = useState('');

  const quickQuestions = [
    'Why is North-East (Ishanya) so vital?',
    'What if the kitchen is in North instead of South-East?',
    'How do 16 micro-zones differ from 8 directions?',
    'Are structural demolitions needed for remedies?'
  ];

  const handleSend = (textToSend?: string) => {
    const q = textToSend || input.trim();
    if (!q) return;

    setMessages((prev) => [...prev, { sender: 'user', text: q }]);
    setInput('');

    setTimeout(() => {
      let reply = 'According to classical Sthapatya Veda and the Mayamatam text, every cardinal zone corresponds to a Panchabhuta element. PragyaaProp verifies orientation using magnetic true north, providing non-invasive elemental remedies with copper, brass, and sacred geometry without requiring structural breakdown.';

      const lower = q.toLowerCase();
      if (lower.includes('north-east') || lower.includes('ishanya')) {
        reply = 'Ishanya (North-East) is governed by Lord Shiva and the Water element (Jala). It is the conduit of cosmic prana, mental clarity, and spiritual prosperity. Heavy storage, toilets, or kitchens in this zone obstruct life-force. We ensure pristine water features or prayer corners here.';
      } else if (lower.includes('kitchen') || lower.includes('agni') || lower.includes('south-east')) {
        reply = 'The South-East is governed by Agni (Fire deity). Cooking should face East so the chef absorbs morning solar energy. If a kitchen exists elsewhere, our certified remedy uses insulated green stone slabs and copper boundary rods to isolate heat currents non-invasively.';
      } else if (lower.includes('16') || lower.includes('zone') || lower.includes('8')) {
        reply = 'Standard 8-direction charts span 45-degree chunks, often masking critical structural flaws. Pragyaa divides the property into 16 exact 22.5-degree zones (like North-North-East and South-South-West) for surgical energetic calibration.';
      } else if (lower.includes('demolition') || lower.includes('break')) {
        reply = 'No! Our scientific methodology prioritizes 100% zero-demolition solutions using elemental reflectors, pyramid energy grids, and color-frequency harmonization.';
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Action Cluster */}
      <div className="fixed right-5 bottom-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        {/* Ask Vastu AI Floating Avatar Bubble */}
        <div
          onClick={() => setIsOpen(true)}
          className="relative group cursor-pointer"
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
              <div className="text-[9px] text-stone-500">Instant expert advice</div>
            </div>
          </div>
        </div>

        {/* Green WhatsApp Action Button */}
        <a
          href="https://wa.me/919820016800?text=Namaste,%20I%20am%20inquiring%20about%20Vastu-verified%20properties%20on%20PragyaaProp.com"
          target="_blank"
          rel="noopener noreferrer"
          title="Chat with Advisor on WhatsApp"
          className="w-12 h-12 bg-[#25d366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 text-xl cursor-pointer"
        >
          <i className="fa-brands fa-whatsapp text-2xl"></i>
        </a>
      </div>

      {/* Interactive AI Chat Drawer / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-end sm:justify-end sm:p-6 bg-black/30 backdrop-blur-xs">
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
