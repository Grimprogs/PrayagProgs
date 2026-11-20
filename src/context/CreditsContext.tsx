'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from './ToastContext';

interface CreditsContextType {
  credits: number;
  addCredits: (amount: number, reason?: string) => void;
  deductCredit: (propertySlug: string, propertyTitle: string) => boolean;
  unlockedProperties: Record<string, boolean>;
  isPropertyUnlocked: (propertySlug: string) => boolean;
}

const CreditsContext = createContext<CreditsContextType>({
  credits: 10,
  addCredits: () => {},
  deductCredit: () => false,
  unlockedProperties: {},
  isPropertyUnlocked: () => false,
});

export const useCredits = () => useContext(CreditsContext);

export function CreditsProvider({ children }: { children: ReactNode }) {
  const { showToast } = useToast();
  const [credits, setCredits] = useState<number>(10);
  const [unlockedProperties, setUnlockedProperties] = useState<Record<string, boolean>>({
    // Pre-unlock sample for demo convenience
    'sunrise-residency': false,
  });

  // Load from localStorage on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedCredits = localStorage.getItem('pragyaa_credits');
        if (savedCredits !== null) {
          setCredits(parseInt(savedCredits, 10));
        }
        const savedUnlocked = localStorage.getItem('pragyaa_unlocked_props');
        if (savedUnlocked) {
          setUnlockedProperties(JSON.parse(savedUnlocked));
        }
      } catch {
        // ignore
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const addCredits = (amount: number, reason = 'Credits Added') => {
    setCredits((prev) => {
      const next = prev + amount;
      try {
        localStorage.setItem('pragyaa_credits', next.toString());
      } catch {}
      return next;
    });
    showToast(`+${amount} Vastu Report Credits Added! (${reason})`);
  };

  const deductCredit = (propertySlug: string, propertyTitle: string): boolean => {
    if (credits < 1) {
      showToast('Insufficient credits! You need 1 credit to unlock this report.');
      return false;
    }

    setCredits((prev) => {
      const next = prev - 1;
      try {
        localStorage.setItem('pragyaa_credits', next.toString());
      } catch {}
      return next;
    });

    setUnlockedProperties((prev) => {
      const next = { ...prev, [propertySlug]: true };
      try {
        localStorage.setItem('pragyaa_unlocked_props', JSON.stringify(next));
      } catch {}
      return next;
    });

    showToast(`1 Credit used! 16-Zone PDF Report for "${propertyTitle}" unlocked.`);
    return true;
  };

  const isPropertyUnlocked = (propertySlug: string): boolean => {
    return !!unlockedProperties[propertySlug];
  };

  return (
    <CreditsContext.Provider
      value={{
        credits,
        addCredits,
        deductCredit,
        unlockedProperties,
        isPropertyUnlocked,
      }}
    >
      {children}
    </CreditsContext.Provider>
  );
}
