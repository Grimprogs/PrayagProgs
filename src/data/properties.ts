import { Property } from '@/types';

export const propertiesData: Property[] = [
  // 1. MUMBAI - 3 BHK APARTMENT (Functionally Balanced - 8.7)
  {
    id: 'prop-1',
    slug: 'sunrise-residency',
    title: 'Sunrise Residency',
    subtitle: 'Premium 3 BHK • Ready to Move',
    location: 'Andheri (W), Mumbai',
    locality: 'Andheri (W)',
    city: 'Mumbai',
    state: 'Maharashtra',
    price: '₹ 2.40 Cr',
    priceNumeric: 24000000,
    priceDetail: 'All Inclusive',
    vastuScore: 8.7,
    vastuScoreMax: 10,
    vastuStatus: 'Functionally Balanced',
    vastuGrade: 'Grade A+',
    bhk: '3 BHK',
    bhkNum: 3,
    sqft: '1,325 sq.ft.',
    propertyType: 'Apartment',
    reraId: 'P51800049210',
    reraStatus: 'RERA Registered',
    bathrooms: 3,
    parking: 1,
    facing: 'North-East',
    possession: 'Ready to Move',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      { src: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80', caption: 'Luxury High-Rise & Infinity Pool View', category: 'Exterior' },
      { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', caption: 'Vedic Aligned Living Room with East Sunlight', category: 'Living' },
      { src: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80', caption: 'East-Facing Sunlit Dining Space', category: 'Dining' },
      { src: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80', caption: 'Master Bedroom in Southwest Stability Zone', category: 'Master' },
      { src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80', caption: 'Panoramic East Sunrise Balcony Deck', category: 'Deck' },
      { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80', caption: 'Modular Kitchen in Southeast Agni Quadrant', category: 'Kitchen' }
    ],
    overview: 'Sunrise Residency is an architecturally certified 3 BHK condominium situated in the heart of Andheri West. Engineered according to Sthapatya Veda principles with zero structural defects, featuring an authentic North-East entrance and unencumbered Brahmasthan center.',
    spatialHighlights: [
      { title: 'North Entrance (Kuber Gateway)', description: 'Direct access from northern magnetic axis channels financial stability and continuous career opportunities.', status: 'Optimal' },
      { title: 'South-West Master Bedroom', description: 'Placed in the Earth element zone (Nirriti), anchoring family leadership and restful REM sleep cycles.', status: 'Optimal' },
      { title: 'South-East Kitchen (Agni)', description: 'Cooking hob oriented Eastwards, ensuring positive digestive prana and metabolic vigor.', status: 'Optimal' },
      { title: 'Zero Clutter Brahmasthan', description: 'Central nexus of the apartment is completely free of load-bearing pillars and heavy shafts.', status: 'Verified' }
    ],
    radarScores: { N: 9.5, NE: 9.2, E: 9.1, SE: 8.6, S: 8.7, SW: 8.9, W: 8.4, NW: 8.8 },
    zones16: [
      { name: 'Entrance (N)', element: 'Water', score: 9.5, maxScore: 10, status: 'Balanced', direction: 'North (0°)', observation: 'Kuber zone entrance with brass threshold. Highly auspicious.' },
      { name: 'Living & Dining (E)', element: 'Air', score: 9.1, maxScore: 10, status: 'Balanced', direction: 'East (90°)', observation: 'Abundant morning solar radiation. Promotes family vitality.' },
      { name: 'Master Bedroom (SW)', element: 'Earth', score: 8.9, maxScore: 10, status: 'Balanced', direction: 'South-West (225°)', observation: 'Heaviest zone of home. Anchors mental and emotional stability.' },
      { name: 'Kitchen (SE)', element: 'Fire', score: 8.6, maxScore: 10, status: 'Balanced', direction: 'South-East (135°)', observation: 'Fire appliance placement complies with Agni quadrant principles.' },
      { name: 'Brahmasthan (Center)', element: 'Space', score: 9.8, maxScore: 10, status: 'Balanced', direction: 'Centroid', observation: '100% open, unobstructed spiritual core of dwelling.' },
      { name: 'Pooja Corner (NE)', element: 'Water', score: 9.4, maxScore: 10, status: 'Balanced', direction: 'North-East (45°)', observation: 'Ishanya zone with copper water vessel. Auspicious wisdom portal.' },
      { name: 'Washroom 1 (SSW)', element: 'Earth', score: 8.0, maxScore: 10, status: 'Remedy Needed', direction: 'South-South-West (202.5°)', observation: 'Minor energy drain mitigated with installed brass energy-blocking strip.' }
    ],
    amenities: ['16-Zone Certified Layout', 'Dedicated Pooja Alcove', 'Vedic Landscaped Garden', 'Sunlit East Balconies', 'Pure Pranic Air Ventilation', '24/7 Security & CCTV', 'Covered Car Parking', 'Rainwater Harvesting'],
    reviews: [
      { id: 'rev-1', author: 'Vikram & Sunita Malhotra', role: 'Homeowners, Moved Oct 2024', rating: 5, date: '15 Oct 2024', comment: 'Moving into Sunrise Residency brought tangible peace and clarity into our home. The North-East entrance and morning sunlight are truly blissful.' }
    ]
  },

  // 2. BANGALORE - 4 BHK VILLA (Inherently Aligned - 9.4)
  {
    id: 'prop-2',
    slug: 'anandam-villas',
    title: 'Anandam Villas',
    subtitle: 'Vedic Luxury 4 BHK Independent Villa',
    location: 'Whitefield, Bangalore',
    locality: 'Whitefield',
    city: 'Bangalore',
    state: 'Karnataka',
    price: '₹ 4.10 Cr',
    priceNumeric: 41000000,
    priceDetail: 'All Inclusive',
    vastuScore: 9.4,
    vastuScoreMax: 10,
    vastuStatus: 'Inherently Aligned',
    vastuGrade: 'Grade A++',
    bhk: '4+ BHK',
    bhkNum: 4,
    sqft: '3,450 sq.ft.',
    propertyType: 'Villa',
    reraId: 'PRM/KA/RERA/1251/446/PR/210312',
    reraStatus: 'RERA Registered',
    bathrooms: 4,
    parking: 2,
    facing: 'North',
    possession: 'Ready to Move',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      { src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80', caption: 'Contemporary Vedic Villa Architecture', category: 'Exterior' },
      { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', caption: 'Double-Height Living Pavilion', category: 'Living' }
    ],
    overview: 'Anandam Villas is an ultra-exclusive enclave in Whitefield, custom-designed from ground up with sacred Mayamatam geometry. Features an open-to-sky central courtyard (Brahmasthan) and pristine underground rainwater harvesting.',
    spatialHighlights: [
      { title: 'True North Orientation', description: 'Facing exact geographic North with zero degree offset.', status: 'Optimal' },
      { title: 'Natural Sky Courtyard', description: 'Brahmasthan features open glass atrium for unhindered cosmic energy flow.', status: 'Optimal' }
    ],
    radarScores: { N: 9.8, NE: 9.6, E: 9.4, SE: 9.2, S: 9.0, SW: 9.5, W: 9.3, NW: 9.1 },
    zones16: [
      { name: 'Entrance (N)', element: 'Water', score: 9.8, maxScore: 10, status: 'Balanced', direction: 'North (0°)', observation: 'Kuber gateway with grand teakwood double doors.' },
      { name: 'Courtyard (Center)', element: 'Space', score: 9.9, maxScore: 10, status: 'Balanced', direction: 'Centroid', observation: 'Sacred open-to-sky courtyard with Tulsi pedestal.' }
    ],
    amenities: ['Private Solar Array', 'Central Courtyard', 'Ayurvedic Herb Garden', 'EV Charging Station', 'Private Plunge Pool'],
    reviews: [
      { id: 'rev-2', author: 'Dr. Arvind Swaminathan', role: 'Cardiologist & Homeowner', rating: 5, date: '02 Sep 2024', comment: 'The open courtyard in the center changes the entire energy of the house. Highly recommended.' }
    ]
  },

  // 3. HYDERABAD - 2 BHK APARTMENT (Functionally Balanced - 8.2)
  {
    id: 'prop-3',
    slug: 'triveni-heights',
    title: 'Triveni Heights',
    subtitle: 'Smart 2 BHK • Urban Metro Living',
    location: 'Banjara Hills, Hyderabad',
    locality: 'Banjara Hills',
    city: 'Hyderabad',
    state: 'Telangana',
    price: '₹ 1.35 Cr',
    priceNumeric: 13500000,
    priceDetail: 'All Inclusive',
    vastuScore: 8.2,
    vastuScoreMax: 10,
    vastuStatus: 'Functionally Balanced',
    vastuGrade: 'Grade A',
    bhk: '2 BHK',
    bhkNum: 2,
    sqft: '1,120 sq.ft.',
    propertyType: 'Apartment',
    reraId: 'P02400003891',
    reraStatus: 'RERA Registered',
    bathrooms: 2,
    parking: 1,
    facing: 'North',
    possession: 'Ready to Move',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      { src: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=1200&q=80', caption: 'Towers Exterior Architecture', category: 'Exterior' }
    ],
    overview: 'Triveni Heights pairs smart modern metro living in Banjara Hills with verified 16-zone spatial harmony. Optimized specifically for young professionals and nuclear families.',
    spatialHighlights: [
      { title: 'North-Facing Balcony', description: 'Attracts auspicious solar radiation and steady intellectual focus.', status: 'Optimal' }
    ],
    radarScores: { N: 8.8, NE: 8.4, E: 8.2, SE: 8.0, S: 8.1, SW: 8.3, W: 8.0, NW: 8.2 },
    zones16: [
      { name: 'Living Room (N)', element: 'Water', score: 8.8, maxScore: 10, status: 'Balanced', direction: 'North', observation: 'Spacious North-facing deck.' }
    ],
    amenities: ['Infinity Sky Deck', 'Smart Home Automation', 'Clubhouse & Gym', 'Yoga Deck'],
    reviews: []
  },

  // 4. PUNE - 3 BHK APARTMENT (Functionally Balanced - 8.9)
  {
    id: 'prop-4',
    slug: 'pragyaa-greens',
    title: 'Pragyaa Greens',
    subtitle: 'Eco-Luxury 3 BHK Residence',
    location: 'Koregaon Park, Pune',
    locality: 'Koregaon Park',
    city: 'Pune',
    state: 'Maharashtra',
    price: '₹ 1.95 Cr',
    priceNumeric: 19500000,
    priceDetail: 'All Inclusive',
    vastuScore: 8.9,
    vastuScoreMax: 10,
    vastuStatus: 'Functionally Balanced',
    vastuGrade: 'Grade A+',
    bhk: '3 BHK',
    bhkNum: 3,
    sqft: '1,540 sq.ft.',
    propertyType: 'Apartment',
    reraId: 'P52100032189',
    reraStatus: 'RERA Registered',
    bathrooms: 3,
    parking: 2,
    facing: 'East',
    possession: 'Ready to Move',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', caption: 'Garden Facade View', category: 'Exterior' }
    ],
    overview: 'Pragyaa Greens in Koregaon Park embodies organic architectural harmony surrounded by lush green tree canopies. Designed with an East-facing sun-drenched foyer.',
    spatialHighlights: [
      { title: 'East Sunrise Alignment', description: 'Harnesses early morning UV rays to sterilize living spaces.', status: 'Optimal' }
    ],
    radarScores: { N: 9.1, NE: 9.3, E: 9.4, SE: 8.8, S: 8.5, SW: 8.7, W: 8.6, NW: 8.9 },
    zones16: [
      { name: 'Entrance (E)', element: 'Air', score: 9.4, maxScore: 10, status: 'Balanced', direction: 'East', observation: 'Direct sunrise view from foyer.' }
    ],
    amenities: ['Organic Farming Patch', 'Vedic Meditation Pavilion', 'Cycling Track', 'Clubhouse'],
    reviews: []
  },

  // 5. GURGAON - 5 BHK LUXURY VILLA (Inherently Aligned - 9.6)
  {
    id: 'prop-5',
    slug: 'vaikunth-estates',
    title: 'Vaikunth Estates',
    subtitle: 'Ultra-Luxury 5 BHK Presidential Villa',
    location: 'Golf Course Extn, Gurgaon',
    locality: 'Golf Course Extn',
    city: 'Gurgaon',
    state: 'Delhi NCR',
    price: '₹ 6.80 Cr',
    priceNumeric: 68000000,
    priceDetail: 'All Inclusive',
    vastuScore: 9.6,
    vastuScoreMax: 10,
    vastuStatus: 'Inherently Aligned',
    vastuGrade: 'Grade A++',
    bhk: '4+ BHK',
    bhkNum: 5,
    sqft: '4,800 sq.ft.',
    propertyType: 'Villa',
    reraId: 'RC/REP/HARERA/GGM/612/344/2022',
    reraStatus: 'RERA Registered',
    bathrooms: 5,
    parking: 3,
    facing: 'North-East',
    possession: 'Ready to Move',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      { src: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80', caption: 'Presidential Estate Facade', category: 'Exterior' }
    ],
    overview: 'Vaikunth Estates stands as the pinnacle of Vedic luxury on Golf Course Extension Road. Engineered under the direct supervision of certified Sthapatya architects with 100% compliant padavinyasa geometry.',
    spatialHighlights: [
      { title: 'Ishanya Sacred Corner', description: 'Dedicated detached meditation mandir in North-East quadrant.', status: 'Optimal' }
    ],
    radarScores: { N: 9.9, NE: 9.8, E: 9.7, SE: 9.4, S: 9.3, SW: 9.7, W: 9.5, NW: 9.4 },
    zones16: [
      { name: 'Entrance (NE)', element: 'Water', score: 9.8, maxScore: 10, status: 'Balanced', direction: 'North-East', observation: 'Pristine Ishanya entrance with water fountain.' }
    ],
    amenities: ['Private Heated Pool', 'Home Theatre', 'Dedicated Mandir', 'Lush Private Lawn'],
    reviews: []
  },

  // 6. KOLKATA - 4 BHK SKY PENTHOUSE (Functionally Balanced - 8.4)
  {
    id: 'prop-6',
    slug: 'surya-mandala-penthouse',
    title: 'Surya Mandala Sky Penthouse',
    subtitle: 'Panoramic 4 BHK Duplex Penthouse',
    location: 'Alipore, Kolkata',
    locality: 'Alipore',
    city: 'Kolkata',
    state: 'West Bengal',
    price: '₹ 3.90 Cr',
    priceNumeric: 39000000,
    priceDetail: 'All Inclusive',
    vastuScore: 8.4,
    vastuScoreMax: 10,
    vastuStatus: 'Functionally Balanced',
    vastuGrade: 'Grade A',
    bhk: '4+ BHK',
    bhkNum: 4,
    sqft: '2,900 sq.ft.',
    propertyType: 'Penthouse',
    reraId: 'WBRERA/P/KOL/2023/000214',
    reraStatus: 'RERA Registered',
    bathrooms: 4,
    parking: 2,
    facing: 'East',
    possession: 'Ready to Move',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      { src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80', caption: 'Sky Terrace & Panoramic View', category: 'Exterior' }
    ],
    overview: 'Surya Mandala Penthouse in Alipore crowns a boutique residential tower. Features private 360-degree terrace gardens optimized for solar absorption during sunrise.',
    spatialHighlights: [
      { title: 'East Sunrise Terrace', description: 'Overlooks Alipore heritage tree cover with direct morning prana.', status: 'Optimal' }
    ],
    radarScores: { N: 8.7, NE: 8.6, E: 9.0, SE: 8.2, S: 8.1, SW: 8.5, W: 8.3, NW: 8.4 },
    zones16: [
      { name: 'Terrace (E)', element: 'Air', score: 9.0, maxScore: 10, status: 'Balanced', direction: 'East', observation: 'Panoramic sun deck.' }
    ],
    amenities: ['Private Sky Garden', 'Jacuzzi on Deck', 'Private Elevator', '2 Covered Garages'],
    reviews: []
  },

  // 7. NEW DELHI - 3 BHK LUXURY BUILDER FLOOR (Inherently Aligned - 9.1)
  {
    id: 'prop-7',
    slug: 'rudraksha-residency',
    title: 'Rudraksha Residency',
    subtitle: 'Boutique 3 BHK Luxury Floor',
    location: 'Vasant Vihar, New Delhi',
    locality: 'Vasant Vihar',
    city: 'New Delhi',
    state: 'Delhi NCR',
    price: '₹ 4.80 Cr',
    priceNumeric: 48000000,
    priceDetail: 'All Inclusive',
    vastuScore: 9.1,
    vastuScoreMax: 10,
    vastuStatus: 'Inherently Aligned',
    vastuGrade: 'Grade A+',
    bhk: '3 BHK',
    bhkNum: 3,
    sqft: '2,100 sq.ft.',
    propertyType: 'Apartment',
    reraId: 'DLRERA2023P0089',
    reraStatus: 'RERA Registered',
    bathrooms: 3,
    parking: 2,
    facing: 'North',
    possession: 'Ready to Move',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80', caption: 'Diplomatic Enclave Residence', category: 'Exterior' }
    ],
    overview: 'Rudraksha Residency in prestigious Vasant Vihar is an ultra-rare Vedic builder floor with marble interiors, stilt parking, and zero-defect directional alignment.',
    spatialHighlights: [
      { title: 'Diplomatic North Axis', description: 'Calibrated to the Rajpath meridian for stability and stature.', status: 'Optimal' }
    ],
    radarScores: { N: 9.4, NE: 9.3, E: 9.0, SE: 8.9, S: 8.8, SW: 9.2, W: 9.0, NW: 8.9 },
    zones16: [
      { name: 'Entrance (N)', element: 'Water', score: 9.4, maxScore: 10, status: 'Balanced', direction: 'North', observation: 'Kuber gateway entrance.' }
    ],
    amenities: ['Italian Marble Flooring', 'Stilt Dedicated Parking', 'EV Charging', 'High Security Zone'],
    reviews: []
  },

  // 8. AHMEDABAD - 4 BHK INDEPENDENT HOUSE (Functionally Balanced - 8.8)
  {
    id: 'prop-8',
    slug: 'shreeji-heritage-villa',
    title: 'Shreeji Heritage Villa',
    subtitle: 'Classic 4 BHK Courtyard House',
    location: 'Bodakdev, Ahmedabad',
    locality: 'Bodakdev',
    city: 'Ahmedabad',
    state: 'Gujarat',
    price: '₹ 3.20 Cr',
    priceNumeric: 32000000,
    priceDetail: 'All Inclusive',
    vastuScore: 8.8,
    vastuScoreMax: 10,
    vastuStatus: 'Functionally Balanced',
    vastuGrade: 'Grade A+',
    bhk: '4+ BHK',
    bhkNum: 4,
    sqft: '2,800 sq.ft.',
    propertyType: 'Independent House',
    reraId: 'PR/GJ/AHMEDABAD/CITY/AUDA/RAA09821',
    reraStatus: 'RERA Registered',
    bathrooms: 4,
    parking: 2,
    facing: 'East',
    possession: 'Ready to Move',
    featured: false,
    heroImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      { src: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80', caption: 'Courtyard Villa Facade', category: 'Exterior' }
    ],
    overview: 'Shreeji Heritage Villa in Bodakdev offers generous square footage, wooden jharokha architectural accents, and an auspicious East-facing entrance.',
    spatialHighlights: [
      { title: 'Central Courtyard Light', description: 'Brahmasthan illuminated with natural daylight.', status: 'Optimal' }
    ],
    radarScores: { N: 8.9, NE: 9.1, E: 9.2, SE: 8.6, S: 8.4, SW: 8.9, W: 8.7, NW: 8.5 },
    zones16: [
      { name: 'Entrance (E)', element: 'Air', score: 9.2, maxScore: 10, status: 'Balanced', direction: 'East', observation: 'East-facing gateway.' }
    ],
    amenities: ['Private Courtyard', 'Borewell & Corporation Water', 'Solar Geyser', 'Car Porch'],
    reviews: []
  },

  // 9. CHENNAI - 2 BHK APARTMENT (Remedy-Ready - 7.8)
  {
    id: 'prop-9',
    slug: 'dakshin-mandala-abode',
    title: 'Dakshin Mandala Abode',
    subtitle: 'Affordable 2 BHK • Remedy Certified',
    location: 'Anna Nagar, Chennai',
    locality: 'Anna Nagar',
    city: 'Chennai',
    state: 'Tamil Nadu',
    price: '₹ 95 L',
    priceNumeric: 9500000,
    priceDetail: 'All Inclusive',
    vastuScore: 7.8,
    vastuScoreMax: 10,
    vastuStatus: 'Remedy-Ready',
    vastuGrade: 'Grade B+',
    bhk: '2 BHK',
    bhkNum: 2,
    sqft: '980 sq.ft.',
    propertyType: 'Apartment',
    reraId: 'TN/29/Building/0142/2023',
    reraStatus: 'RERA Registered',
    bathrooms: 2,
    parking: 1,
    facing: 'South',
    possession: 'Ready to Move',
    featured: false,
    heroImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      { src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80', caption: 'Urban Coastal Residence', category: 'Exterior' }
    ],
    overview: 'Dakshin Mandala Abode in Anna Nagar is an attractively priced urban home with pre-installed copper pyramid strips to balance South entry energy into positive stability.',
    spatialHighlights: [
      { title: 'Remedied South Entry', description: 'Pre-fitted lead & copper threshold neutralized negative polarity.', status: 'Remedied' }
    ],
    radarScores: { N: 7.9, NE: 7.7, E: 8.0, SE: 8.2, S: 7.6, SW: 8.1, W: 7.8, NW: 7.9 },
    zones16: [
      { name: 'Entrance (S)', element: 'Fire', score: 7.6, maxScore: 10, status: 'Remedy Needed', direction: 'South', observation: 'Remedied with copper strip.' }
    ],
    amenities: ['Power Backup', 'Lift', 'Security', 'Covered Two-Wheeler & Car Park'],
    reviews: []
  },

  // 10. COIMBATORE - 3 BHK VILLA (Inherently Aligned - 9.2)
  {
    id: 'prop-10',
    slug: 'chola-celestial-estates',
    title: 'Chola Celestial Estates',
    subtitle: 'Vedic Hillside 3 BHK Villa',
    location: 'Race Course, Coimbatore',
    locality: 'Race Course',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    price: '₹ 2.10 Cr',
    priceNumeric: 21000000,
    priceDetail: 'All Inclusive',
    vastuScore: 9.2,
    vastuScoreMax: 10,
    vastuStatus: 'Inherently Aligned',
    vastuGrade: 'Grade A+',
    bhk: '3 BHK',
    bhkNum: 3,
    sqft: '2,250 sq.ft.',
    propertyType: 'Villa',
    reraId: 'TN/11/Building/0088/2023',
    reraStatus: 'RERA Registered',
    bathrooms: 3,
    parking: 2,
    facing: 'North-East',
    possession: 'Ready to Move',
    featured: false,
    heroImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80', caption: 'Hillside Villa Exterior', category: 'Exterior' }
    ],
    overview: 'Chola Celestial Estates in prime Race Course features natural basalt stone construction, pure North-East orientation, and panoramic views of the Western Ghats foothills.',
    spatialHighlights: [
      { title: 'Ghats Pranic Flow', description: 'Air currents channel vital prana into living rooms.', status: 'Optimal' }
    ],
    radarScores: { N: 9.5, NE: 9.6, E: 9.3, SE: 9.0, S: 8.9, SW: 9.4, W: 9.1, NW: 9.0 },
    zones16: [
      { name: 'Entrance (NE)', element: 'Water', score: 9.6, maxScore: 10, status: 'Balanced', direction: 'North-East', observation: 'Ishanya water garden entrance.' }
    ],
    amenities: ['Private Garden', 'Organic Solar Rooftop', 'Clubhouse', 'Gated Community'],
    reviews: []
  },

  // 11. JAIPUR - 4 BHK INDEPENDENT HOUSE (Functionally Balanced - 8.5)
  {
    id: 'prop-11',
    slug: 'marwar-mahal-haveli',
    title: 'Marwar Mahal Haveli',
    subtitle: 'Heritage Stone 4 BHK Residence',
    location: 'C-Scheme, Jaipur',
    locality: 'C-Scheme',
    city: 'Jaipur',
    state: 'Rajasthan',
    price: '₹ 2.75 Cr',
    priceNumeric: 27500000,
    priceDetail: 'All Inclusive',
    vastuScore: 8.5,
    vastuScoreMax: 10,
    vastuStatus: 'Functionally Balanced',
    vastuGrade: 'Grade A',
    bhk: '4+ BHK',
    bhkNum: 4,
    sqft: '2,650 sq.ft.',
    propertyType: 'Independent House',
    reraId: 'RAJ/RERA/2023/1842',
    reraStatus: 'RERA Registered',
    bathrooms: 4,
    parking: 2,
    facing: 'North',
    possession: 'Ready to Move',
    featured: false,
    heroImage: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      { src: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80', caption: 'Heritage Jodhpur Stone Facade', category: 'Exterior' }
    ],
    overview: 'Marwar Mahal Haveli in C-Scheme combines classical Pink City symmetry with verified Vastu planning. Includes sandstone carvings, high ceilings, and North-facing entrance.',
    spatialHighlights: [
      { title: 'Thermal Stone Mass', description: 'Sandstone keeps indoor micro-climate cool and grounded.', status: 'Optimal' }
    ],
    radarScores: { N: 9.0, NE: 8.7, E: 8.6, SE: 8.3, S: 8.2, SW: 8.8, W: 8.4, NW: 8.5 },
    zones16: [
      { name: 'Entrance (N)', element: 'Water', score: 9.0, maxScore: 10, status: 'Balanced', direction: 'North', observation: 'Carved stone portal.' }
    ],
    amenities: ['Heritage Architecture', 'Rooftop Gazebo', 'Servant Quarter', 'Basement Storage'],
    reviews: []
  },

  // 12. UDAIPUR - 3 BHK VILLA (Inherently Aligned - 9.3)
  {
    id: 'prop-12',
    slug: 'lake-vastu-retreat',
    title: 'Lake Vastu Retreat',
    subtitle: 'Serene 3 BHK Lakeside Villa',
    location: 'Fateh Sagar, Udaipur',
    locality: 'Fateh Sagar',
    city: 'Udaipur',
    state: 'Rajasthan',
    price: '₹ 1.85 Cr',
    priceNumeric: 18500000,
    priceDetail: 'All Inclusive',
    vastuScore: 9.3,
    vastuScoreMax: 10,
    vastuStatus: 'Inherently Aligned',
    vastuGrade: 'Grade A+',
    bhk: '3 BHK',
    bhkNum: 3,
    sqft: '2,150 sq.ft.',
    propertyType: 'Villa',
    reraId: 'RAJ/RERA/2023/1994',
    reraStatus: 'RERA Registered',
    bathrooms: 3,
    parking: 2,
    facing: 'North-East',
    possession: 'Ready to Move',
    featured: false,
    heroImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      { src: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80', caption: 'Lakeside Villa Grounds', category: 'Exterior' }
    ],
    overview: 'Lake Vastu Retreat sits near Fateh Sagar Lake. Water element (Jala) is positioned perfectly in the North-East direction relative to the site centroid.',
    spatialHighlights: [
      { title: 'Natural Water Body In NE', description: 'Direct visual alignment with lake amplifies Ishanya spiritual energies.', status: 'Optimal' }
    ],
    radarScores: { N: 9.6, NE: 9.8, E: 9.4, SE: 9.0, S: 8.9, SW: 9.3, W: 9.1, NW: 9.2 },
    zones16: [
      { name: 'View Deck (NE)', element: 'Water', score: 9.8, maxScore: 10, status: 'Balanced', direction: 'North-East', observation: 'Overlooks lake.' }
    ],
    amenities: ['Lake View Balcony', 'Vedic Courtyard', 'Solar Lighting', 'Private Lawn'],
    reviews: []
  },

  // 13. NOIDA - 2 BHK APARTMENT (Functionally Balanced - 8.1)
  {
    id: 'prop-13',
    slug: 'pawan-dham-apartments',
    title: 'Pawan Dham Apartments',
    subtitle: 'Modern 2 BHK Expressway Tower',
    location: 'Sector 128, Noida',
    locality: 'Sector 128',
    city: 'Noida',
    state: 'Delhi NCR',
    price: '₹ 78 L',
    priceNumeric: 7800000,
    priceDetail: 'All Inclusive',
    vastuScore: 8.1,
    vastuScoreMax: 10,
    vastuStatus: 'Functionally Balanced',
    vastuGrade: 'Grade A',
    bhk: '2 BHK',
    bhkNum: 2,
    sqft: '1,050 sq.ft.',
    propertyType: 'Apartment',
    reraId: 'UPRERAPRJ65412',
    reraStatus: 'RERA Registered',
    bathrooms: 2,
    parking: 1,
    facing: 'North-West',
    possession: 'Ready to Move',
    featured: false,
    heroImage: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      { src: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80', caption: 'High-Rise Tower Facade', category: 'Exterior' }
    ],
    overview: 'Pawan Dham Apartments on Noida Expressway offers affordable luxury with North-West ventilation, ideal for growing families seeking career mobility.',
    spatialHighlights: [
      { title: 'Vayu Wind Flow', description: 'Cross-ventilation between NW and SE balances thermal energy.', status: 'Optimal' }
    ],
    radarScores: { N: 8.4, NE: 8.2, E: 8.1, SE: 8.0, S: 8.0, SW: 8.2, W: 8.1, NW: 8.6 },
    zones16: [
      { name: 'Entrance (NW)', element: 'Air', score: 8.6, maxScore: 10, status: 'Balanced', direction: 'North-West', observation: 'Vayu quadrant entrance.' }
    ],
    amenities: ['Clubhouse', 'Children Play Zone', 'Metro Shuttle Service', 'Swimming Pool'],
    reviews: []
  },

  // 14. SURAT - 3 BHK APARTMENT (Functionally Balanced - 8.6)
  {
    id: 'prop-14',
    slug: 'surat-ratna-towers',
    title: 'Surat Ratna Towers',
    subtitle: 'Diamond City 3 BHK High-Rise',
    location: 'Vesu, Surat',
    locality: 'Vesu',
    city: 'Surat',
    state: 'Gujarat',
    price: '₹ 1.45 Cr',
    priceNumeric: 14500000,
    priceDetail: 'All Inclusive',
    vastuScore: 8.6,
    vastuScoreMax: 10,
    vastuStatus: 'Functionally Balanced',
    vastuGrade: 'Grade A+',
    bhk: '3 BHK',
    bhkNum: 3,
    sqft: '1,620 sq.ft.',
    propertyType: 'Apartment',
    reraId: 'PR/GJ/SURAT/SURAT-CITY/SUDA/RAA08129',
    reraStatus: 'RERA Registered',
    bathrooms: 3,
    parking: 2,
    facing: 'East',
    possession: 'Ready to Move',
    featured: false,
    heroImage: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      { src: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80', caption: 'Luxury High-Rise Facade', category: 'Exterior' }
    ],
    overview: 'Surat Ratna Towers in posh Vesu offers commercial prosperity alignment. East-facing with spacious balconies, popular with diamond merchants and business owners.',
    spatialHighlights: [
      { title: 'Varuna Wealth Gains (West)', description: 'Master suite and study aligned for financial profitability.', status: 'Optimal' }
    ],
    radarScores: { N: 8.8, NE: 8.9, E: 9.1, SE: 8.5, S: 8.3, SW: 8.6, W: 8.9, NW: 8.4 },
    zones16: [
      { name: 'Living Room (E)', element: 'Air', score: 9.1, maxScore: 10, status: 'Balanced', direction: 'East', observation: 'Morning sunlit living space.' }
    ],
    amenities: ['Grand Banquet Hall', 'Gymnasium', 'Tennis Court', 'Piped Gas Connection'],
    reviews: []
  },

  // 15. THANE - 1 BHK STARTER APARTMENT (Remedy-Ready - 7.9)
  {
    id: 'prop-15',
    slug: 'kamal-pushp-residency',
    title: 'Kamal Pushp Residency',
    subtitle: 'Smart 1 BHK Starter Home',
    location: 'Ghodbunder Road, Thane',
    locality: 'Ghodbunder Road',
    city: 'Thane',
    state: 'Maharashtra',
    price: '₹ 54 L',
    priceNumeric: 5400000,
    priceDetail: 'All Inclusive',
    vastuScore: 7.9,
    vastuScoreMax: 10,
    vastuStatus: 'Remedy-Ready',
    vastuGrade: 'Grade B+',
    bhk: '1 BHK',
    bhkNum: 1,
    sqft: '520 sq.ft.',
    propertyType: 'Apartment',
    reraId: 'P51700029831',
    reraStatus: 'RERA Registered',
    bathrooms: 1,
    parking: 1,
    facing: 'North-East',
    possession: 'Ready to Move',
    featured: false,
    heroImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      { src: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80', caption: 'Cozy Modern Apartment Interior', category: 'Interior' }
    ],
    overview: 'Kamal Pushp Residency on Ghodbunder Road is the ideal entry-level 1 BHK for first-time buyers. Includes certified pre-installed remedies to ensure auspicious prosperity on a budget.',
    spatialHighlights: [
      { title: 'Compact Energy Symmetry', description: 'Zero space wastage with North-East pooja niche included.', status: 'Optimal' }
    ],
    radarScores: { N: 8.2, NE: 8.4, E: 7.8, SE: 7.7, S: 7.6, SW: 8.0, W: 7.8, NW: 7.9 },
    zones16: [
      { name: 'Entrance (NE)', element: 'Water', score: 8.4, maxScore: 10, status: 'Balanced', direction: 'North-East', observation: 'Ishanya quadrant entry.' }
    ],
    amenities: ['High Speed Elevators', 'CCTV Security', 'Rooftop Lounge', 'Intercom'],
    reviews: []
  },

  // 16. NAGPUR - 2 BHK APARTMENT (Functionally Balanced - 8.3)
  {
    id: 'prop-16',
    slug: 'vidarbha-shikhar',
    title: 'Vidarbha Shikhar',
    subtitle: 'Airy 2 BHK Residential Flat',
    location: 'Civil Lines, Nagpur',
    locality: 'Civil Lines',
    city: 'Nagpur',
    state: 'Maharashtra',
    price: '₹ 62 L',
    priceNumeric: 6200000,
    priceDetail: 'All Inclusive',
    vastuScore: 8.3,
    vastuScoreMax: 10,
    vastuStatus: 'Functionally Balanced',
    vastuGrade: 'Grade A',
    bhk: '2 BHK',
    bhkNum: 2,
    sqft: '1,020 sq.ft.',
    propertyType: 'Apartment',
    reraId: 'P50500031890',
    reraStatus: 'RERA Registered',
    bathrooms: 2,
    parking: 1,
    facing: 'North',
    possession: 'Ready to Move',
    featured: false,
    heroImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      { src: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80', caption: 'Quiet Residential Balcony & Interior', category: 'Interior' }
    ],
    overview: 'Vidarbha Shikhar in prestigious Civil Lines, Nagpur. Enjoy peace, lush greenery, and verified North-facing energy alignment.',
    spatialHighlights: [
      { title: 'Tree Canopy Shading', description: 'Natural coolness prevents heat build-up in Southern sectors.', status: 'Optimal' }
    ],
    radarScores: { N: 8.8, NE: 8.5, E: 8.2, SE: 8.0, S: 8.1, SW: 8.3, W: 8.2, NW: 8.4 },
    zones16: [
      { name: 'Entrance (N)', element: 'Water', score: 8.8, maxScore: 10, status: 'Balanced', direction: 'North', observation: 'Kuber zone entry.' }
    ],
    amenities: ['Covered Parking', 'Solar Common Lighting', 'Gated Security', 'Water Softener'],
    reviews: []
  },

  // 17. MYSORE - 4 BHK VEDIC PLOT & ENCLAVE (Inherently Aligned - 9.5)
  {
    id: 'prop-17',
    slug: 'chamundi-prana-enclave',
    title: 'Chamundi Prana Enclave',
    subtitle: 'Sacred 4 BHK Demarcated Plot & Villa Land',
    location: 'Gokulam, Mysore',
    locality: 'Gokulam',
    city: 'Mysore',
    state: 'Karnataka',
    price: '₹ 88 L',
    priceNumeric: 8800000,
    priceDetail: 'All Inclusive',
    vastuScore: 9.5,
    vastuScoreMax: 10,
    vastuStatus: 'Inherently Aligned',
    vastuGrade: 'Grade A++',
    bhk: '4+ BHK',
    bhkNum: 4,
    sqft: '2,400 sq.ft.',
    propertyType: 'Plot',
    reraId: 'PRM/KA/RERA/1268/327/PR/220811',
    reraStatus: 'RERA Registered',
    bathrooms: 0,
    parking: 2,
    facing: 'East',
    possession: 'Immediate Registration',
    featured: false,
    heroImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      { src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80', caption: 'Lush Green Vastu-Demarcated Plot Site', category: 'Exterior' }
    ],
    overview: 'Chamundi Prana Enclave in cultural Gokulam, Mysore. A pristine East-facing rectangular plot (Gomukhi shape) with 100% soil bio-prana purity, ready for custom villa construction according to Mayamatam specifications.',
    spatialHighlights: [
      { title: 'Gomukhi Plot Geometry', description: 'Narrower in front and broader in rear, considered supreme for family wealth.', status: 'Optimal' },
      { title: 'Virgin Soil Energy', description: 'Tested for magnetic and organic vitality with high Bovis vitality score.', status: 'Verified' }
    ],
    radarScores: { N: 9.8, NE: 9.9, E: 9.7, SE: 9.3, S: 9.2, SW: 9.6, W: 9.4, NW: 9.3 },
    zones16: [
      { name: 'Site Boundary (E)', element: 'Air', score: 9.7, maxScore: 10, status: 'Balanced', direction: 'East', observation: 'East road frontage.' },
      { name: 'Centroid (Brahmasthan)', element: 'Space', score: 10.0, maxScore: 10, status: 'Balanced', direction: 'Center', observation: '100% pristine soil.' }
    ],
    amenities: ['Underground Cabling', 'Avenue Tree Plantations', 'Gated Compound Wall', '24/7 Security'],
    reviews: []
  },

  // 18. NEW DELHI - 3 BHK APARTMENT (Functionally Balanced - 8.8)
  {
    id: 'prop-18',
    slug: 'vedic-heights-residence',
    title: 'Vedic Heights Residence',
    subtitle: 'Ultra-Luxury Auspicious 3 BHK',
    location: 'Vasant Vihar, New Delhi',
    locality: 'Vasant Vihar',
    city: 'New Delhi',
    state: 'Delhi NCR',
    price: '₹ 2.15 Cr',
    priceNumeric: 21500000,
    priceDetail: 'All Inclusive',
    vastuScore: 8.8,
    vastuScoreMax: 10,
    vastuStatus: 'Functionally Balanced',
    vastuGrade: 'Grade A+',
    bhk: '3 BHK',
    bhkNum: 3,
    sqft: '1,410 sq.ft.',
    propertyType: 'Apartment',
    reraId: 'DLRERA2024P0091',
    reraStatus: 'RERA Registered',
    bathrooms: 3,
    parking: 2,
    facing: 'North-East',
    possession: 'Ready to Move',
    featured: false,
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      { src: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80', caption: 'Vedic Heights Residence Architectural Facade', category: 'Exterior' },
      { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', caption: 'Sunlit Living Room & Brahmasthan Core', category: 'Living' },
      { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80', caption: 'Agni Compliant Modular Kitchen', category: 'Kitchen' },
      { src: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80', caption: 'Southwest Grounded Master Bedroom', category: 'Master' }
    ],
    overview: 'Vedic Heights Residence is an exquisitely balanced 3 BHK luxury condominium situated in premier Vasant Vihar, New Delhi. Calibrated strictly according to Mayamatam and 16-zone spatial energy audits with North-East entrance and unobstructed Brahmasthan core.',
    spatialHighlights: [
      { title: 'North Entrance (Kuber Zone)', description: 'Direct magnetic access channels unbroken career growth and financial abundance.', status: 'Optimal' },
      { title: 'Northeast Ishanya Puja Corner', description: 'Cosmic prana portal dedicated for peace and intellectual sharpness.', status: 'Enhanced' },
      { title: 'Southeast Agni Kitchen', description: 'Cooktop aligned Eastwards ensuring balanced digestive fire and metabolic vitality.', status: 'Balanced' }
    ],
    radarScores: { N: 9.1, NE: 9.4, E: 8.7, SE: 7.9, S: 8.1, SW: 8.4, W: 8.2, NW: 8.3 },
    zones16: [
      { name: 'Entrance (N)', element: 'Water', score: 9.1, maxScore: 10, status: 'Balanced', direction: 'North (0°)', observation: 'Kuber gateway with brass threshold.' },
      { name: 'Puja Sanctum (NE)', element: 'Water / Ether', score: 9.4, maxScore: 10, status: 'Enhanced', direction: 'North-East (45°)', observation: 'Divine vibration and sacred morning light.' },
      { name: 'Living & Prana Lounge (E)', element: 'Air', score: 8.7, maxScore: 10, status: 'Balanced', direction: 'East (90°)', observation: 'Abundant morning solar radiation.' },
      { name: 'Kitchen & Hearth (SE)', element: 'Fire', score: 7.9, maxScore: 10, status: 'Balanced', direction: 'South-East (135°)', observation: 'Fire appliance placement complies with Agni quadrant.' },
      { name: 'Master Suite (SW)', element: 'Earth', score: 8.4, maxScore: 10, status: 'Balanced', direction: 'South-West (225°)', observation: 'Grounded heavy quadrant anchoring leadership.' }
    ],
    amenities: ['16-Zone Certified Layout', 'Dedicated Pooja Corner', 'East Balcony Deck', 'Rainwater Harvesting', 'Covered Parking', '24/7 Security & CCTV'],
    reviews: [
      { id: 'rev-vh-1', author: 'Dr. Anand Joshi', role: 'Vastu Consultant & Buyer', rating: 5, date: '10 Nov 2024', comment: 'Exceptional alignment in Northeast Ishanya corner and peaceful central core.' }
    ]
  },

  // ========================================================
  // 19. GODREJ WING A – FLAT A001 (Series 1 - Aligned 9.4)
  // ========================================================
  {
    id: 'godrej-flat-1',
    slug: 'godrej-wing-a-a001',
    title: 'Godrej – Wing A (Flat A001)',
    subtitle: 'Client Reference 2 BHK • Series 1 • Aligned',
    location: 'Andheri, Mumbai',
    locality: 'Andheri',
    city: 'Mumbai',
    state: 'Maharashtra',
    price: '₹ 2.45 Cr',
    priceNumeric: 24500000,
    priceDetail: 'All Inclusive',
    vastuScore: 9.4,
    vastuScoreMax: 10,
    vastuStatus: 'Inherently Aligned',
    vastuGrade: 'Grade A++ (9.4/10)',
    bhk: '2 BHK',
    bhkNum: 2,
    sqft: '890 sq.ft.',
    propertyType: 'Apartment',
    reraId: 'P51800049210',
    reraStatus: 'RERA Registered',
    bathrooms: 2,
    parking: 1,
    facing: 'North-East',
    possession: 'Ready to Move',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      { src: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80', caption: 'Godrej Tower Wing A Architectural Elevation', category: 'Exterior' },
      { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', caption: 'Living Room with Prana Solar Access', category: 'Living' },
      { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80', caption: 'Modular Kitchen (Agni Quadrant)', category: 'Kitchen' },
      { src: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80', caption: 'Master Suite (Earth Zone)', category: 'Master' }
    ],
    overview: 'Godrej Flat A001 in Wing A (Andheri, Mumbai) is an inherently aligned 2 BHK residence evaluated under serialized 16-zone spatial energy audits. Features pristine North-East morning prana flow, unencumbered central Brahmasthan, and solid South-West grounding.',
    spatialHighlights: [
      { title: 'North-East Ishanya Entrance', description: 'Channels positive morning solar magnetic lines directly into living zones.', status: 'Optimal' },
      { title: 'South-East Kitchen (Agni)', description: 'Hob oriented Eastward, ensuring high metabolic vitality and family prosperity.', status: 'Optimal' },
      { title: 'Brahmasthan Open Axis', description: 'Center nexus completely clear of structural columns and drainage shafts.', status: 'Verified' }
    ],
    radarScores: { N: 9.6, NE: 9.8, E: 9.2, SE: 8.8, S: 8.6, SW: 9.0, W: 9.2, NW: 8.9 },
    zones16: [
      { name: 'Entrance (NE)', element: 'Water', score: 9.8, maxScore: 10, status: 'Enhanced', direction: 'North-East (45°)', observation: 'Auspicious Ishanya wealth and intellectual clarity doorway.' },
      { name: 'Living Room (N)', element: 'Water', score: 9.6, maxScore: 10, status: 'Enhanced', direction: 'North (0°)', observation: 'Kuber gateway receiving continuous positive prana.' },
      { name: 'Kitchen (SE)', element: 'Fire', score: 8.8, maxScore: 10, status: 'Balanced', direction: 'South-East (135°)', observation: 'Agni fire quadrant with Eastward cooking alignment.' },
      { name: 'Master Bed (SW)', element: 'Earth', score: 9.0, maxScore: 10, status: 'Enhanced', direction: 'South-West (225°)', observation: 'Earth element Nirriti stability anchoring family leadership.' }
    ],
    amenities: ['16-Zone Certified Layout', 'East Balcony Deck', 'Pooja Alcove', 'Covered Parking', '24/7 Security & CCTV', 'Clubhouse & Gymnasium'],
    reviews: [
      { id: 'rev-g1', author: 'Dr. Radheshyam Sharma', role: 'Vedic Architecture Lead', rating: 5, date: '18 Nov 2024', comment: 'Series 1 in Wing A showcases extraordinary Ishanya quadrant alignment.' }
    ],
    ppCode: 'A001',
    wing: 'Wing A',
    seriesNumber: '1',
    projectName: 'Godrej'
  },

  // ========================================================
  // 20. GODREJ WING A – FLAT FDDES (Series 2 - Aligned 9.2)
  // ========================================================
  {
    id: 'godrej-flat-2',
    slug: 'godrej-wing-a-fddes',
    title: 'Godrej – Wing A (Flat FDDES)',
    subtitle: 'Client Reference 2 BHK • Series 2 • Aligned',
    location: 'Andheri, Mumbai',
    locality: 'Andheri',
    city: 'Mumbai',
    state: 'Maharashtra',
    price: '₹ 2.50 Cr',
    priceNumeric: 25000000,
    priceDetail: 'All Inclusive',
    vastuScore: 9.2,
    vastuScoreMax: 10,
    vastuStatus: 'Inherently Aligned',
    vastuGrade: 'Grade A++ (9.2/10)',
    bhk: '2 BHK',
    bhkNum: 2,
    sqft: '910 sq.ft.',
    propertyType: 'Apartment',
    reraId: 'P51800049210',
    reraStatus: 'RERA Registered',
    bathrooms: 2,
    parking: 1,
    facing: 'North-East',
    possession: 'Ready to Move',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      { src: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80', caption: 'Godrej Tower Wing A Facade', category: 'Exterior' },
      { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', caption: 'Series 2 Natural Sunlight Living', category: 'Living' }
    ],
    overview: 'Godrej Flat FDDES in Wing A is a premier Series 2 two-bedroom home with direct North-East facing orientation and unobstructed solar light. Fully verified against Mayamatam 22.5° sector angular geometry.',
    spatialHighlights: [
      { title: 'True North Cadastral Calibration', description: 'Zero declination angular precision verified against municipal satellite GIS.', status: 'Optimal' },
      { title: 'Vayu Balcony Circulation', description: 'North-West ventilation channels cool evening breeze.', status: 'Optimal' }
    ],
    radarScores: { N: 9.4, NE: 9.5, E: 9.0, SE: 8.6, S: 8.4, SW: 8.9, W: 8.8, NW: 9.0 },
    zones16: [
      { name: 'Living Room (NE)', element: 'Water', score: 9.5, maxScore: 10, status: 'Enhanced', direction: 'North-East (45°)', observation: 'Abundant natural morning ultraviolet sterilization.' },
      { name: 'Kitchen (SE)', element: 'Fire', score: 8.6, maxScore: 10, status: 'Balanced', direction: 'South-East (135°)', observation: 'Agni aligned cooking platform.' }
    ],
    amenities: ['16-Zone Certified Layout', 'Dedicated Pooja Corner', 'East Balcony Deck', 'High Speed Elevators', 'Covered Parking'],
    reviews: [],
    ppCode: 'FDDES',
    wing: 'Wing A',
    seriesNumber: '2',
    projectName: 'Godrej'
  },

  // ========================================================
  // 21. GODREJ WING A – FLAT VVFTT (Series 3 - Balanced 8.6)
  // ========================================================
  {
    id: 'godrej-flat-3',
    slug: 'godrej-wing-a-vvftt',
    title: 'Godrej – Wing A (Flat VVFTT)',
    subtitle: 'Client Reference 2 BHK • Series 3 • Balanced',
    location: 'Andheri, Mumbai',
    locality: 'Andheri',
    city: 'Mumbai',
    state: 'Maharashtra',
    price: '₹ 2.40 Cr',
    priceNumeric: 24000000,
    priceDetail: 'All Inclusive',
    vastuScore: 8.6,
    vastuScoreMax: 10,
    vastuStatus: 'Functionally Balanced',
    vastuGrade: 'Grade A (8.6/10)',
    bhk: '2 BHK',
    bhkNum: 2,
    sqft: '875 sq.ft.',
    propertyType: 'Apartment',
    reraId: 'P51800049210',
    reraStatus: 'RERA Registered',
    bathrooms: 2,
    parking: 1,
    facing: 'East',
    possession: 'Ready to Move',
    featured: false,
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      { src: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80', caption: 'Godrej Wing A Series 3 Layout', category: 'Exterior' }
    ],
    overview: 'Godrej Flat VVFTT (Series 3) provides functional balance across bedroom and dining areas. Features Eastward facing main balcony and practical room layout ideal for urban family living.',
    spatialHighlights: [
      { title: 'East Surya Balcony', description: 'Receives direct sunrise rays promoting circadian vitality.', status: 'Optimal' },
      { title: 'Stable Master Suite', description: 'South-West positioned master bedroom ensuring undisturbed sleep.', status: 'Balanced' }
    ],
    radarScores: { N: 8.7, NE: 8.9, E: 8.8, SE: 8.2, S: 8.0, SW: 8.5, W: 8.3, NW: 8.2 },
    zones16: [
      { name: 'Balcony (E)', element: 'Air', score: 8.8, maxScore: 10, status: 'Balanced', direction: 'East (90°)', observation: 'Active morning prana collection.' }
    ],
    amenities: ['East Balcony Deck', 'Covered Parking', '24/7 Security & CCTV', 'Rainwater Harvesting'],
    reviews: [],
    ppCode: 'VVFTT',
    wing: 'Wing A',
    seriesNumber: '3',
    projectName: 'Godrej'
  },

  // ========================================================
  // 22. GODREJ WING A – FLAT GGGLT (Series 4 - Balanced 8.7)
  // ========================================================
  {
    id: 'godrej-flat-4',
    slug: 'godrej-wing-a-ggglt',
    title: 'Godrej – Wing A (Flat GGGLT)',
    subtitle: 'Client Reference 3 BHK • Series 4 • Balanced',
    location: 'Andheri, Mumbai',
    locality: 'Andheri',
    city: 'Mumbai',
    state: 'Maharashtra',
    price: '₹ 3.45 Cr',
    priceNumeric: 34500000,
    priceDetail: 'All Inclusive',
    vastuScore: 8.7,
    vastuScoreMax: 10,
    vastuStatus: 'Functionally Balanced',
    vastuGrade: 'Grade A+ (8.7/10)',
    bhk: '3 BHK',
    bhkNum: 3,
    sqft: '1,280 sq.ft.',
    propertyType: 'Apartment',
    reraId: 'P51800049210',
    reraStatus: 'RERA Registered',
    bathrooms: 3,
    parking: 2,
    facing: 'East',
    possession: 'Ready to Move',
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      { src: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80', caption: 'Godrej 3 BHK Series 4 Facade', category: 'Exterior' }
    ],
    overview: 'Godrej Flat GGGLT in Wing A is a spacious 3 BHK apartment (Series 4) situated in prime Andheri. Evaluated across 16 cardinal sub-sectors with verified non-destructive placement.',
    spatialHighlights: [
      { title: 'Generous 3 BHK Footprint', description: 'Spacious living, dining, and 3 bedrooms aligned with natural light.', status: 'Optimal' }
    ],
    radarScores: { N: 8.9, NE: 8.8, E: 9.0, SE: 8.4, S: 8.2, SW: 8.7, W: 8.5, NW: 8.4 },
    zones16: [
      { name: 'Entrance (E)', element: 'Air', score: 9.0, maxScore: 10, status: 'Enhanced', direction: 'East (90°)', observation: 'Indra gateway channeling social harmony.' }
    ],
    amenities: ['16-Zone Certified Layout', 'Pooja Sanctum', '2 Covered Garages', 'Gymnasium', 'Landscaped Garden'],
    reviews: [],
    ppCode: 'GGGLT',
    wing: 'Wing A',
    seriesNumber: '4',
    projectName: 'Godrej'
  },

  // ========================================================
  // 23. GODREJ WING A – FLAT HJJYY (Series 5 - Adaptable 7.8)
  // ========================================================
  {
    id: 'godrej-flat-5',
    slug: 'godrej-wing-a-hjjyy',
    title: 'Godrej – Wing A (Flat HJJYY)',
    subtitle: 'Client Reference 3 BHK • Series 5 • Adaptable',
    location: 'Andheri, Mumbai',
    locality: 'Andheri',
    city: 'Mumbai',
    state: 'Maharashtra',
    price: '₹ 3.30 Cr',
    priceNumeric: 33000000,
    priceDetail: 'All Inclusive',
    vastuScore: 7.8,
    vastuScoreMax: 10,
    vastuStatus: 'Remedy-Ready',
    vastuGrade: 'Grade B+ (7.8/10)',
    bhk: '3 BHK',
    bhkNum: 3,
    sqft: '1,250 sq.ft.',
    propertyType: 'Apartment',
    reraId: 'P51800049210',
    reraStatus: 'RERA Registered',
    bathrooms: 3,
    parking: 1,
    facing: 'North-West',
    possession: 'Ready to Move',
    featured: false,
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      { src: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80', caption: 'Godrej Wing A Series 5 Unit', category: 'Exterior' }
    ],
    overview: 'Godrej Flat HJJYY (Series 5) offers a comfortable 3 BHK layout with adaptable elemental placements. Pre-certified non-destructive metallic threshold strips bring the unit to high harmonic resonance.',
    spatialHighlights: [
      { title: 'Non-Destructive Remedies Ready', description: 'Subtle brass strip under doorway neutralizes directional deflection without civil demolition.', status: 'Remedied' }
    ],
    radarScores: { N: 8.0, NE: 8.1, E: 7.7, SE: 7.5, S: 7.8, SW: 8.1, W: 7.9, NW: 7.6 },
    zones16: [
      { name: 'Entrance (NW)', element: 'Air', score: 7.6, maxScore: 10, status: 'Remedy Needed', direction: 'North-West (315°)', observation: 'Pre-installed copper wire harmonizes wind sector.' }
    ],
    amenities: ['16-Zone Certified Layout', 'Adaptable Layout', 'Covered Parking', '24/7 Security'],
    reviews: [],
    ppCode: 'HJJYY',
    wing: 'Wing A',
    seriesNumber: '5',
    projectName: 'Godrej'
  },

  // ========================================================
  // 24. GODREJ WING A – FLAT KKYI (Series 6 - Balanced 8.5)
  // ========================================================
  {
    id: 'godrej-flat-6',
    slug: 'godrej-wing-a-kkyi',
    title: 'Godrej – Wing A (Flat KKYI)',
    subtitle: 'Client Reference 3 BHK • Series 6 • Balanced',
    location: 'Andheri, Mumbai',
    locality: 'Andheri',
    city: 'Mumbai',
    state: 'Maharashtra',
    price: '₹ 3.50 Cr',
    priceNumeric: 35000000,
    priceDetail: 'All Inclusive',
    vastuScore: 8.5,
    vastuScoreMax: 10,
    vastuStatus: 'Functionally Balanced',
    vastuGrade: 'Grade A (8.5/10)',
    bhk: '3 BHK',
    bhkNum: 3,
    sqft: '1,310 sq.ft.',
    propertyType: 'Apartment',
    reraId: 'P51800049210',
    reraStatus: 'RERA Registered',
    bathrooms: 3,
    parking: 2,
    facing: 'North',
    possession: 'Ready to Move',
    featured: false,
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      { src: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80', caption: 'Godrej Wing A Series 6 Elevation', category: 'Exterior' }
    ],
    overview: 'Godrej Flat KKYI (Series 6) is a balanced 3 BHK corner apartment in Wing A. Features Northward orientation with consistent ambient daylight and quiet bedroom alignment.',
    spatialHighlights: [
      { title: 'North Cardinal Axis', description: 'Living area oriented toward Kuber magnetic corridor.', status: 'Optimal' }
    ],
    radarScores: { N: 8.9, NE: 8.7, E: 8.4, SE: 8.1, S: 8.0, SW: 8.6, W: 8.5, NW: 8.3 },
    zones16: [
      { name: 'Entrance (N)', element: 'Water', score: 8.9, maxScore: 10, status: 'Balanced', direction: 'North (0°)', observation: 'Kuber gateway ensuring stable financial flow.' }
    ],
    amenities: ['16-Zone Certified Layout', 'Dedicated Pooja Alcove', '2 Covered Garages', 'Clubhouse'],
    reviews: [],
    ppCode: 'KKYI',
    wing: 'Wing A',
    seriesNumber: '6',
    projectName: 'Godrej'
  }
];

export function getAllProperties(): Property[] {
  return propertiesData;
}

export function getPropertyBySlug(slug: string): Property | undefined {
  if (!slug) return undefined;
  const clean = slug.toLowerCase().trim();
  return propertiesData.find((p) => {
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
}

