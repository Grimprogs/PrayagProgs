export interface ZoneAnalysisItem {
  name: string;
  element: string;
  score: number;
  maxScore: number;
  status: 'Balanced' | 'Enhanced' | 'Remedy Needed' | 'Critical';
  direction: string;
  observation: string;
}

export interface RadarScores {
  N: number;
  NE: number;
  E: number;
  SE: number;
  S: number;
  SW: number;
  W: number;
  NW: number;
}

export interface PropertyReview {
  id: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  location: string;
  locality: string;
  city: string;
  state: string;
  price: string;
  priceNumeric: number;
  priceDetail: string;
  vastuScore: number;
  vastuScoreMax: number;
  vastuStatus: 'Functionally Balanced' | 'Inherently Aligned' | 'Remedy-Ready';
  vastuGrade: string;
  bhk: string;
  bhkNum: number;
  sqft: string;
  propertyType: 'Apartment' | 'Villa' | 'Independent House' | 'Plot' | 'Penthouse';
  reraId: string;
  reraStatus: string;
  bathrooms: number;
  parking: number;
  facing: string;
  possession: string;
  featured: boolean;
  heroImage: string;
  galleryImages: {
    src: string;
    caption: string;
    category: string;
  }[];
  overview: string;
  spatialHighlights: {
    title: string;
    status: string;
    description: string;
  }[];
  radarScores: RadarScores;
  zones16: ZoneAnalysisItem[];
  amenities: Array<{
    icon: string;
    name: string;
    description: string;
  } | string>;
  connectivity?: {
    landmark: string;
    distance: string;
  }[];
  reviews: PropertyReview[];
}
