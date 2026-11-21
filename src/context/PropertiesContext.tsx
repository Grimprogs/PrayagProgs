'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { Property } from '@/types';
import { propertiesData as initialProperties } from '@/data/properties';
import { getStateForCity, getLocalitiesForCity } from '@/data/locations';
import {
  DiscoveryFlat,
  DiscoveryProject,
  getDefaultDiscoveryFlats,
  buildDiscoveryHierarchy,
} from '@/data/discovery';
import { useToast } from './ToastContext';

interface PropertiesContextType {
  properties: Property[];
  discoveryFlats: DiscoveryFlat[];
  discoveryProjects: DiscoveryProject[];
  getPropertyBySlug: (slug: string) => Property | undefined;
  addProperty: (property: Property) => void;
  updateProperty: (id: string, updatedFields: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  toggleFeatured: (id: string) => void;
  resetToDefault: () => void;
  // Discovery inventory actions
  addDiscoveryFlat: (flat: DiscoveryFlat) => void;
  updateDiscoveryFlat: (id: string, updatedFields: Partial<DiscoveryFlat>) => void;
  deleteDiscoveryFlat: (id: string) => void;
  resetDiscoveryToDefault: () => void;
}

const PropertiesContext = createContext<PropertiesContextType>({
  properties: initialProperties,
  discoveryFlats: [],
  discoveryProjects: [],
  getPropertyBySlug: () => undefined,
  addProperty: () => {},
  updateProperty: () => {},
  deleteProperty: () => {},
  toggleFeatured: () => {},
  resetToDefault: () => {},
  addDiscoveryFlat: () => {},
  updateDiscoveryFlat: () => {},
  deleteDiscoveryFlat: () => {},
  resetDiscoveryToDefault: () => {},
});

export const useProperties = () => useContext(PropertiesContext);

const STORAGE_KEY = 'pragyaa_custom_properties_v2';
const DISCOVERY_STORAGE_KEY = 'pragyaa_discovery_flats_v1';

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
  const [discoveryFlats, setDiscoveryFlats] = useState<DiscoveryFlat[]>(() =>
    getDefaultDiscoveryFlats(initialProperties)
  );

  // Live computed discovery hierarchy directly from discoveryFlats
  const discoveryProjects = useMemo(() => {
    return buildDiscoveryHierarchy(discoveryFlats);
  }, [discoveryFlats]);

  // Load saved properties and discovery inventory from localStorage on mount & listen for sync events
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
          }
        }
      } catch (e) {
        console.warn('Failed to parse properties from localStorage', e);
      }

      try {
        const savedFlats = localStorage.getItem(DISCOVERY_STORAGE_KEY);
        if (savedFlats) {
          const parsedFlats = JSON.parse(savedFlats);
          if (Array.isArray(parsedFlats) && parsedFlats.length > 0) {
            setDiscoveryFlats(parsedFlats);
            return;
          }
        }
      } catch (e) {
        console.warn('Failed to parse discovery flats from localStorage', e);
      }

      setDiscoveryFlats(getDefaultDiscoveryFlats(initialProperties));
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
      if (e.key === DISCOVERY_STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            setDiscoveryFlats(parsed);
          }
        } catch {}
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('pragyaa_properties_updated', loadFromStorage);
    window.addEventListener('pragyaa_discovery_updated', loadFromStorage);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('pragyaa_properties_updated', loadFromStorage);
      window.removeEventListener('pragyaa_discovery_updated', loadFromStorage);
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

  const saveDiscoveryFlats = (updated: DiscoveryFlat[]) => {
    setDiscoveryFlats(updated);
    try {
      localStorage.setItem(DISCOVERY_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('pragyaa_discovery_updated'));
      window.dispatchEvent(new Event('pragyaa_properties_updated'));
    } catch (e) {
      console.warn('Failed to save discovery flats to localStorage', e);
    }
  };

  const getPropertyBySlug = (slug: string): Property | undefined => {
    if (!slug) return undefined;
    const clean = slug.toLowerCase().trim();

    // 1. Check loaded properties (includes canonical propertiesData + localStorage properties)
    const direct = properties.find((p) => {
      const pSlug = (p.slug || '').toLowerCase();
      const pId = (p.id || '').toLowerCase();
      const pCode = (p.ppCode || '').toLowerCase();
      return (
        pSlug === clean ||
        pId === clean ||
        pCode === clean ||
        (pCode && clean.includes(pCode)) ||
        (pSlug && clean.endsWith(pSlug))
      );
    });
    if (direct) return direct;

    // 2. Check discoveryFlats: if a flat is matched, resolve its property or synthesize one
    const flatMatch = discoveryFlats.find(
      (f) =>
        f.slug?.toLowerCase() === clean ||
        f.id.toLowerCase() === clean ||
        f.ppCode.toLowerCase() === clean ||
        clean.includes(f.ppCode.toLowerCase())
    );
    if (flatMatch) {
      if (flatMatch.propertyId) {
        const found = properties.find((p) => p.id === flatMatch.propertyId);
        if (found) return found;
      }

      const synthStatus =
        flatMatch.vastuStatus === 'Aligned'
          ? 'Inherently Aligned'
          : flatMatch.vastuStatus === 'Balanced'
          ? 'Functionally Balanced'
          : 'Remedy-Ready';
      const synthScore =
        flatMatch.vastuStatus === 'Aligned' ? 9.4 : flatMatch.vastuStatus === 'Balanced' ? 8.6 : 7.8;
      const synthGrade =
        flatMatch.vastuStatus === 'Aligned'
          ? 'Grade A++ (9.4/10)'
          : flatMatch.vastuStatus === 'Balanced'
          ? 'Grade A (8.6/10)'
          : 'Grade B+ (7.8/10)';

      return {
        id: flatMatch.id,
        slug: flatMatch.slug || `flat-${flatMatch.ppCode.toLowerCase()}`,
        title: `${flatMatch.projectName} – ${flatMatch.wing} (Flat ${flatMatch.ppCode})`,
        subtitle: `${flatMatch.bhk} • Series ${flatMatch.seriesNumber || '1'} • ${flatMatch.vastuStatus}`,
        location: `${flatMatch.locality}, ${flatMatch.city}`,
        locality: flatMatch.locality,
        city: flatMatch.city,
        state: flatMatch.state || 'Maharashtra',
        price: flatMatch.price || '₹ 2.45 Cr',
        priceNumeric: 24500000,
        priceDetail: 'All Inclusive',
        vastuScore: synthScore,
        vastuScoreMax: 10,
        vastuStatus: synthStatus,
        vastuGrade: synthGrade,
        bhk: flatMatch.bhk,
        bhkNum: parseInt(flatMatch.bhk) || 2,
        sqft: flatMatch.sqft || '900 sq.ft.',
        propertyType: 'Apartment',
        reraId: 'P51800049210',
        reraStatus: 'RERA Registered',
        bathrooms: 2,
        parking: 1,
        facing: flatMatch.facing || 'North-East',
        possession: 'Ready to Move',
        featured: true,
        heroImage:
          flatMatch.heroImage ||
          'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        galleryImages: [
          {
            src:
              flatMatch.heroImage ||
              'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
            caption: 'Architectural Elevation',
            category: 'Exterior',
          },
          {
            src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
            caption: 'Sunlit Living Room',
            category: 'Living',
          },
        ],
        overview:
          flatMatch.overview ||
          `${flatMatch.projectName} Flat ${flatMatch.ppCode} in ${flatMatch.wing} is an evaluated residence in ${flatMatch.locality}, ${flatMatch.city}.`,
        spatialHighlights: [
          {
            title: 'Cardinal Alignment',
            description: 'Oriented according to ancient Mayamatam 16-zone spatial principles.',
            status: 'Optimal',
          },
        ],
        radarScores: { N: 9.2, NE: 9.4, E: 8.8, SE: 8.4, S: 8.2, SW: 8.7, W: 8.5, NW: 8.6 },
        zones16: [
          {
            name: 'Entrance',
            element: 'Water',
            score: 9.4,
            maxScore: 10,
            status: 'Enhanced',
            direction: 'North-East (45°)',
            observation: 'Auspicious entry portal with high morning solar intake.',
          },
        ],
        amenities: ['16-Zone Certified Layout', 'East Balcony', 'Covered Parking', '24/7 Security'],
        reviews: [],
        ppCode: flatMatch.ppCode,
        wing: flatMatch.wing,
        seriesNumber: flatMatch.seriesNumber,
        projectName: flatMatch.projectName,
      };
    }

    return undefined;
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
    showToast('Property details updated successfully!');
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

  const addDiscoveryFlat = (newFlat: DiscoveryFlat) => {
    const updated = [newFlat, ...discoveryFlats];
    saveDiscoveryFlats(updated);
    showToast(`Added flat "${newFlat.ppCode}" to ${newFlat.projectName} (${newFlat.wing})!`);
  };

  const updateDiscoveryFlat = (id: string, updatedFields: Partial<DiscoveryFlat>) => {
    const updated = discoveryFlats.map((f) => (f.id === id ? { ...f, ...updatedFields } : f));
    saveDiscoveryFlats(updated);
    showToast(`Updated flat "${updatedFields.ppCode || id}" successfully!`);
  };

  const deleteDiscoveryFlat = (id: string) => {
    const target = discoveryFlats.find((f) => f.id === id);
    const updated = discoveryFlats.filter((f) => f.id !== id);
    saveDiscoveryFlats(updated);
    showToast(`Deleted flat "${target?.ppCode || 'Record'}" from inventory.`);
  };

  const resetDiscoveryToDefault = () => {
    try {
      localStorage.removeItem(DISCOVERY_STORAGE_KEY);
    } catch {}
    const defaults = getDefaultDiscoveryFlats(initialProperties);
    setDiscoveryFlats(defaults);
    window.dispatchEvent(new Event('pragyaa_discovery_updated'));
    window.dispatchEvent(new Event('pragyaa_properties_updated'));
  };

  const resetToDefault = () => {
    saveToStorage(initialProperties);
    resetDiscoveryToDefault();
    showToast('Reset all properties and inventory back to official defaults.');
  };

  return (
    <PropertiesContext.Provider
      value={{
        properties,
        discoveryFlats,
        discoveryProjects,
        getPropertyBySlug,
        addProperty,
        updateProperty,
        deleteProperty,
        toggleFeatured,
        resetToDefault,
        addDiscoveryFlat,
        updateDiscoveryFlat,
        deleteDiscoveryFlat,
        resetDiscoveryToDefault,
      }}
    >
      {children}
    </PropertiesContext.Provider>
  );
}
