'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Property } from '@/types';
import { propertiesData as initialProperties } from '@/data/properties';
import { getStateForCity, getLocalitiesForCity } from '@/data/locations';
import { useToast } from './ToastContext';

interface PropertiesContextType {
  properties: Property[];
  getPropertyBySlug: (slug: string) => Property | undefined;
  addProperty: (property: Property) => void;
  updateProperty: (id: string, updatedFields: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  toggleFeatured: (id: string) => void;
  resetToDefault: () => void;
}

const PropertiesContext = createContext<PropertiesContextType>({
  properties: initialProperties,
  getPropertyBySlug: () => undefined,
  addProperty: () => {},
  updateProperty: () => {},
  deleteProperty: () => {},
  toggleFeatured: () => {},
  resetToDefault: () => {},
});

export const useProperties = () => useContext(PropertiesContext);

const STORAGE_KEY = 'pragyaa_custom_properties_v2';

const sanitizeProperty = (p: Property): Property => {
  const city = p.city || 'Mumbai';
  const autoState = getStateForCity(city) || p.state || 'Maharashtra';
  const validLocalities = getLocalitiesForCity(city);
  let locality = p.locality || '';

  // If locality is Andheri (W) but city is NOT Mumbai, fix it to a genuine locality for that city
  if (locality.toLowerCase().includes('andheri') && city !== 'Mumbai') {
    locality = validLocalities.length > 0 ? validLocalities[0] : 'Prime Locality';
  } else if (!locality) {
    locality = validLocalities.length > 0 ? validLocalities[0] : 'Prime Locality';
  }

  // Ensure slug is clean without spaces or uppercase
  const rawSlug = p.slug || p.title || p.id;
  const cleanSlug = rawSlug
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || p.id;

  return {
    ...p,
    city,
    state: autoState,
    locality,
    location: `${locality}, ${city}`,
    slug: cleanSlug,
  };
};

export function PropertiesProvider({ children }: { children: ReactNode }) {
  const { showToast } = useToast();
  const [properties, setProperties] = useState<Property[]>(initialProperties);

  // Load saved properties from localStorage on mount & listen for sync events
  useEffect(() => {
    const loadFromStorage = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            // Sanitize all entries and merge any new canonical initial properties
            const sanitizedParsed = parsed.map(sanitizeProperty);
            const existingIds = new Set(sanitizedParsed.map((p) => p.id));
            const missingDefaults = initialProperties.filter((ip) => !existingIds.has(ip.id));
            const fullList = [...sanitizedParsed, ...missingDefaults];
            setProperties(fullList);
            return;
          }
        }
      } catch (e) {
        console.warn('Failed to parse properties from localStorage', e);
      }
      setProperties(initialProperties);
    };

    loadFromStorage();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            setProperties(parsed.map(sanitizeProperty));
          }
        } catch {}
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('pragyaa_properties_updated', loadFromStorage);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('pragyaa_properties_updated', loadFromStorage);
    };
  }, []);

  const saveToStorage = (updated: Property[]) => {
    const sanitized = updated.map(sanitizeProperty);
    setProperties(sanitized);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
      window.dispatchEvent(new Event('pragyaa_properties_updated'));
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  };

  const getPropertyBySlug = (slug: string): Property | undefined => {
    if (!slug) return undefined;
    const clean = slug.toLowerCase().trim();
    return properties.find((p) => p.slug === clean || p.slug === slug || p.id === slug);
  };

  const addProperty = (newProp: Property) => {
    const sanitized = sanitizeProperty(newProp);
    const filtered = properties.filter((p) => p.id !== sanitized.id && p.slug !== sanitized.slug);
    const updated = [sanitized, ...filtered];
    saveToStorage(updated);
    showToast(`Property "${sanitized.title}" added to listings!`);
  };

  const updateProperty = (id: string, updatedFields: Partial<Property>) => {
    const updated = properties.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
    saveToStorage(updated);
    showToast('Property details & Vastu graph updated successfully!');
  };

  const deleteProperty = (id: string) => {
    const prop = properties.find((p) => p.id === id);
    const updated = properties.filter((p) => p.id !== id);
    saveToStorage(updated);
    showToast(`Deleted "${prop?.title || 'Property'}" from listings.`);
  };

  const toggleFeatured = (id: string) => {
    const updated = properties.map((p) => {
      if (p.id === id) {
        const next = !p.featured;
        showToast(`"${p.title}" ${next ? 'marked as Featured on Homepage' : 'removed from Featured'}`);
        return { ...p, featured: next };
      }
      return p;
    });
    saveToStorage(updated);
  };

  const resetToDefault = () => {
    saveToStorage(initialProperties);
    showToast('Reset all properties back to official catalog defaults.');
  };

  return (
    <PropertiesContext.Provider
      value={{
        properties,
        getPropertyBySlug,
        addProperty,
        updateProperty,
        deleteProperty,
        toggleFeatured,
        resetToDefault,
      }}
    >
      {children}
    </PropertiesContext.Provider>
  );
}
