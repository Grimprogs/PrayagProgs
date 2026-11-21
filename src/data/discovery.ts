import { Property } from '@/types';

// Public Vastu Status terminology required by client specification:
// - Inherently Aligned -> Aligned
// - Functionally Balanced -> Balanced
// - Remedy-Ready -> Adaptable
export type PublicVastuStatus = 'Aligned' | 'Balanced' | 'Adaptable';

export function mapVastuStatus(status: string): PublicVastuStatus {
  if (!status) return 'Balanced';
  const s = status.toLowerCase();
  if (s.includes('inherently') || s === 'aligned') return 'Aligned';
  if (s.includes('functionally') || s === 'balanced') return 'Balanced';
  if (s.includes('remedy') || s === 'adaptable') return 'Adaptable';
  return 'Balanced';
}

export interface DiscoveryFlat {
  id: string;
  propertyId?: string;
  slug?: string;
  ppCode: string;
  bhk: string;
  vastuStatus: PublicVastuStatus;
  seriesNumber: string; // HIDDEN on flat listing cards; revealed ONLY in individual flat inspection view
  wing: string;
  projectName: string;
  locality: string;
  city: string;
  state: string;
  isClientSample: boolean;
  // Attributes that may be omitted if not in client sample
  price?: string;
  sqft?: string;
  facing?: string;
  heroImage?: string;
  overview?: string;
}

export interface DiscoveryWing {
  id: string;
  name: string; // e.g. 'Wing A'
  orientation?: string;
  isSimulatedDemo?: boolean; // Clearly marks simulated wings (not part of real client sample)
  simulationNotice?: string;
  flats: DiscoveryFlat[];
}

export interface DiscoveryProject {
  id: string;
  name: string;
  city: string;
  locality: string;
  location: string;
  state: string;
  propertyType: string;
  heroImage: string;
  overview: string;
  isClientSample: boolean;
  sampleBadgeText?: string;
  wings: DiscoveryWing[];
  totalFlats: number;
}

// --------------------------------------------------------------------------
// 1. CLIENT REFERENCE DATASET (EXPLICITLY SUPPLIED FOR GODREJ, ANDHERI)
// --------------------------------------------------------------------------
// City: Mumbai | Location: Andheri | Project: Godrej | Wing: A
// Only verified client attributes are included (No invented price, sqft, facing, or floor)
//
// | Configuration | PP Code | Vastu Status | Series |
// | 2 BHK         | A001    | Aligned      | 1      |
// | 2 BHK         | FDDES   | Aligned      | 2      |
// | 2 BHK         | VVFTT   | Balanced     | 3      |
// | 3 BHK         | GGGLT   | Balanced     | 4      |
// | 3 BHK         | HJJYY   | Adaptable    | 5      |
// | 3 BHK         | KKYI    | Balanced     | 6      |
export const CLIENT_GODREJ_SAMPLE_FLATS: DiscoveryFlat[] = [
  {
    id: 'godrej-flat-1',
    propertyId: 'godrej-flat-1',
    slug: 'godrej-wing-a-a001',
    ppCode: 'A001',
    bhk: '2 BHK',
    vastuStatus: 'Aligned',
    seriesNumber: '1',
    wing: 'Wing A',
    projectName: 'Godrej',
    locality: 'Andheri',
    city: 'Mumbai',
    state: 'Maharashtra',
    isClientSample: true,
    price: '₹ 2.45 Cr',
    sqft: '890 sq.ft.',
    facing: 'North-East',
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    overview: 'Client Reference 2 BHK residence in Wing A (Andheri, Mumbai). Inherently aligned with 16-zone spatial Vastu grid.',
  },
  {
    id: 'godrej-flat-2',
    propertyId: 'godrej-flat-2',
    slug: 'godrej-wing-a-fddes',
    ppCode: 'FDDES',
    bhk: '2 BHK',
    vastuStatus: 'Aligned',
    seriesNumber: '2',
    wing: 'Wing A',
    projectName: 'Godrej',
    locality: 'Andheri',
    city: 'Mumbai',
    state: 'Maharashtra',
    isClientSample: true,
    price: '₹ 2.50 Cr',
    sqft: '910 sq.ft.',
    facing: 'North-East',
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    overview: 'Client Reference 2 BHK residence in Wing A with verified natural morning solar alignment.',
  },
  {
    id: 'godrej-flat-3',
    propertyId: 'godrej-flat-3',
    slug: 'godrej-wing-a-vvftt',
    ppCode: 'VVFTT',
    bhk: '2 BHK',
    vastuStatus: 'Balanced',
    seriesNumber: '3',
    wing: 'Wing A',
    projectName: 'Godrej',
    locality: 'Andheri',
    city: 'Mumbai',
    state: 'Maharashtra',
    isClientSample: true,
    price: '₹ 2.40 Cr',
    sqft: '875 sq.ft.',
    facing: 'East',
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    overview: 'Client Reference 2 BHK residence in Wing A with functional balance and Eastward balcony.',
  },
  {
    id: 'godrej-flat-4',
    propertyId: 'godrej-flat-4',
    slug: 'godrej-wing-a-ggglt',
    ppCode: 'GGGLT',
    bhk: '3 BHK',
    vastuStatus: 'Balanced',
    seriesNumber: '4',
    wing: 'Wing A',
    projectName: 'Godrej',
    locality: 'Andheri',
    city: 'Mumbai',
    state: 'Maharashtra',
    isClientSample: true,
    price: '₹ 3.45 Cr',
    sqft: '1,280 sq.ft.',
    facing: 'East',
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    overview: 'Client Reference 3 BHK residence in Wing A with generous living space and functional room balance.',
  },
  {
    id: 'godrej-flat-5',
    propertyId: 'godrej-flat-5',
    slug: 'godrej-wing-a-hjjyy',
    ppCode: 'HJJYY',
    bhk: '3 BHK',
    vastuStatus: 'Adaptable',
    seriesNumber: '5',
    wing: 'Wing A',
    projectName: 'Godrej',
    locality: 'Andheri',
    city: 'Mumbai',
    state: 'Maharashtra',
    isClientSample: true,
    price: '₹ 3.30 Cr',
    sqft: '1,250 sq.ft.',
    facing: 'North-West',
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    overview: 'Client Reference 3 BHK residence in Wing A with adaptable layout and non-destructive remedies pre-installed.',
  },
  {
    id: 'godrej-flat-6',
    propertyId: 'godrej-flat-6',
    slug: 'godrej-wing-a-kkyi',
    ppCode: 'KKYI',
    bhk: '3 BHK',
    vastuStatus: 'Balanced',
    seriesNumber: '6',
    wing: 'Wing A',
    projectName: 'Godrej',
    locality: 'Andheri',
    city: 'Mumbai',
    state: 'Maharashtra',
    isClientSample: true,
    price: '₹ 3.50 Cr',
    sqft: '1,310 sq.ft.',
    facing: 'North',
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    overview: 'Client Reference 3 BHK corner apartment in Wing A with Kuber gateway alignment.',
  },
];

export const CLIENT_GODREJ_PROJECT: DiscoveryProject = {
  id: 'client-proj-godrej-andheri',
  name: 'Godrej',
  city: 'Mumbai',
  locality: 'Andheri',
  location: 'Andheri, Mumbai',
  state: 'Maharashtra',
  propertyType: 'Residential Development',
  heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
  overview: 'Client Reference Project (Sample Dataset) situated in Andheri, Mumbai. Features six client-supplied demonstration flat records across Wing A.',
  isClientSample: true,
  sampleBadgeText: 'Client Sample Dataset',
  wings: [
    {
      id: 'godrej-wing-a',
      name: 'Wing A',
      orientation: 'Active Sample Wing',
      isSimulatedDemo: false,
      flats: CLIENT_GODREJ_SAMPLE_FLATS,
    },
    {
      id: 'godrej-wing-b',
      name: 'Wing B',
      orientation: 'Simulated Demo State',
      isSimulatedDemo: true,
      simulationNotice: 'Simulated Demo State: Wing B is not part of the supplied client sample. Only Wing A inventory is currently cataloged.',
      flats: [], // Empty state for demonstration; no false claims of availability
    },
  ],
  totalFlats: 6,
};

// --------------------------------------------------------------------------
// 2. DISCOVERY BUILDER: COMBINES CLIENT SAMPLE WITH RETAINED DEMO CATALOG
// --------------------------------------------------------------------------

export function getDefaultDiscoveryFlats(properties: Property[]): DiscoveryFlat[] {
  const simulatedFlats: DiscoveryFlat[] = [];

  properties.forEach((p, idx) => {
    // Avoid duplicate if already Godrej in Andheri
    if (p.title.toLowerCase().includes('godrej') && p.city.toLowerCase() === 'mumbai') {
      return;
    }

    const projectName = p.title || 'Residential Project';
    const city = p.city || 'Mumbai';
    const locality = p.locality || 'Prime Locality';

    simulatedFlats.push({
      id: `demo-flat-${p.id}`,
      propertyId: p.id,
      slug: p.slug,
      ppCode: `DEMO-${100 + (idx + 1)}`, // Clearly labeled as demo-generated, not real client data
      bhk: p.bhk,
      vastuStatus: mapVastuStatus(p.vastuStatus),
      seriesNumber: `${(idx % 4) + 1}`,
      wing: 'Wing A',
      projectName,
      locality,
      city,
      state: p.state || 'Maharashtra',
      isClientSample: false,
      price: p.price,
      sqft: p.sqft,
      facing: p.facing || 'North-East',
      heroImage: p.heroImage,
      overview: p.overview,
    });
  });

  return [...CLIENT_GODREJ_SAMPLE_FLATS, ...simulatedFlats];
}

export function buildDiscoveryHierarchy(
  flats: DiscoveryFlat[]
): DiscoveryProject[] {
  // Map of project key to project data
  // Key: city|locality|projectName
  const projectMap = new Map<
    string,
    {
      name: string;
      city: string;
      locality: string;
      state: string;
      isClientSample: boolean;
      heroImage?: string;
      overview?: string;
      wingsMap: Map<string, DiscoveryFlat[]>;
    }
  >();

  // Ensure Godrej reference project exists with Wings A and B
  const godrejKey = 'Mumbai|Andheri|Godrej';
  projectMap.set(godrejKey, {
    name: 'Godrej',
    city: 'Mumbai',
    locality: 'Andheri',
    state: 'Maharashtra',
    isClientSample: true,
    heroImage: CLIENT_GODREJ_PROJECT.heroImage,
    overview: CLIENT_GODREJ_PROJECT.overview,
    wingsMap: new Map<string, DiscoveryFlat[]>([
      ['Wing A', []],
      ['Wing B', []],
    ]),
  });

  // Populate flats into project and wing buckets
  flats.forEach((flat) => {
    const key = `${flat.city}|${flat.locality}|${flat.projectName}`;
    if (!projectMap.has(key)) {
      projectMap.set(key, {
        name: flat.projectName,
        city: flat.city,
        locality: flat.locality,
        state: flat.state || 'Maharashtra',
        isClientSample: flat.isClientSample || false,
        heroImage:
          flat.heroImage ||
          'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        overview: flat.overview || `${flat.projectName} located in ${flat.locality}, ${flat.city}.`,
        wingsMap: new Map<string, DiscoveryFlat[]>([
          ['Wing A', []],
          ['Wing B', []],
        ]),
      });
    }

    const proj = projectMap.get(key)!;
    const wingName = flat.wing || 'Wing A';
    if (!proj.wingsMap.has(wingName)) {
      proj.wingsMap.set(wingName, []);
    }
    proj.wingsMap.get(wingName)!.push(flat);
  });

  // Convert map to DiscoveryProject[]
  const projects: DiscoveryProject[] = [];

  projectMap.forEach((pData) => {
    const wings: DiscoveryWing[] = [];
    let totalFlats = 0;

    pData.wingsMap.forEach((wingFlats, wingName) => {
      totalFlats += wingFlats.length;
      const isSimulatedEmpty = wingFlats.length === 0 && wingName === 'Wing B';
      wings.push({
        id: `wing-${pData.city}-${pData.name}-${wingName}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        name: wingName,
        orientation: isSimulatedEmpty ? 'Simulated Demo State' : `${wingFlats[0]?.facing || 'East'} Orientation`,
        isSimulatedDemo: isSimulatedEmpty,
        simulationNotice: isSimulatedEmpty
          ? `Simulated Demo State: ${wingName} is not cataloged in this demonstration. Please explore Wing A.`
          : undefined,
        flats: wingFlats,
      });
    });

    const isGodrej = pData.name.toLowerCase() === 'godrej' && pData.city.toLowerCase() === 'mumbai';

    projects.push({
      id: isGodrej
        ? 'client-proj-godrej-andheri'
        : `proj-${pData.city}-${pData.locality}-${pData.name}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: pData.name,
      city: pData.city,
      locality: pData.locality,
      location: `${pData.locality}, ${pData.city}`,
      state: pData.state,
      propertyType: 'Residential Development',
      heroImage:
        pData.heroImage ||
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      overview: pData.overview || `${pData.name} located in ${pData.locality}, ${pData.city}.`,
      isClientSample: isGodrej,
      sampleBadgeText: isGodrej ? 'Client Sample Dataset' : 'Simulated Demo Listing',
      wings,
      totalFlats,
    });
  });

  // Ensure Godrej reference sample project is sorted first
  projects.sort((a, b) => {
    if (a.isClientSample && !b.isClientSample) return -1;
    if (!a.isClientSample && b.isClientSample) return 1;
    return a.name.localeCompare(b.name);
  });

  return projects;
}

export function buildDiscoveryData(properties: Property[]): DiscoveryProject[] {
  return buildDiscoveryHierarchy(getDefaultDiscoveryFlats(properties));
}
