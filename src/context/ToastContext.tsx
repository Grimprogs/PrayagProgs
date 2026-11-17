'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: '',
    visible: false,
  });

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3200);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.visible && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#5d2809] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 border border-[#eedecb] animate-in fade-in slide-in-from-top-4">
          <span className="material-symbols-outlined text-base text-[#ffdea7]">verified</span>
          <span>{toast.message}</span>
        </div>
      )}
    </ToastContext.Provider>
  );
}
