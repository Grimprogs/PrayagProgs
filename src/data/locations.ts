// Bidirectional City & State Data for PragyaaProp

export interface CityInfo {
  name: string;
  state: string;
  localityExamples: string[];
}

export const STATE_CITIES: Record<string, string[]> = {
  Maharashtra: ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Navi Mumbai'],
  Karnataka: ['Bangalore', 'Mysore', 'Hubli', 'Mangalore'],
  'Delhi NCR': ['New Delhi', 'Gurgaon', 'Noida', 'Faridabad', 'Ghaziabad'],
  Gujarat: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai'],
  Telangana: ['Hyderabad', 'Warangal', 'Secunderabad'],
  'West Bengal': ['Kolkata', 'Howrah', 'Siliguri'],
  Rajasthan: ['Jaipur', 'Udaipur', 'Jodhpur'],
};

export const ALL_STATES: string[] = Object.keys(STATE_CITIES);

export const CITY_TO_STATE: Record<string, string> = {
  // Maharashtra
  Mumbai: 'Maharashtra',
  Pune: 'Maharashtra',
  Nagpur: 'Maharashtra',
  Thane: 'Maharashtra',
  Nashik: 'Maharashtra',
  'Navi Mumbai': 'Maharashtra',

  // Karnataka
  Bangalore: 'Karnataka',
  Mysore: 'Karnataka',
  Hubli: 'Karnataka',
  Mangalore: 'Karnataka',

  // Delhi NCR
  'New Delhi': 'Delhi NCR',
  Gurgaon: 'Delhi NCR',
  Noida: 'Delhi NCR',
  Faridabad: 'Delhi NCR',
  Ghaziabad: 'Delhi NCR',

  // Gujarat
  Ahmedabad: 'Gujarat',
  Surat: 'Gujarat',
  Vadodara: 'Gujarat',
  Rajkot: 'Gujarat',
  Gandhinagar: 'Gujarat',

  // Tamil Nadu
  Chennai: 'Tamil Nadu',
  Coimbatore: 'Tamil Nadu',
  Madurai: 'Tamil Nadu',

  // Telangana
  Hyderabad: 'Telangana',
  Warangal: 'Telangana',
  Secunderabad: 'Telangana',

  // West Bengal
  Kolkata: 'West Bengal',
  Howrah: 'West Bengal',
  Siliguri: 'West Bengal',

  // Rajasthan
  Jaipur: 'Rajasthan',
  Udaipur: 'Rajasthan',
  Jodhpur: 'Rajasthan',
};

export const ALL_CITIES: string[] = Object.keys(CITY_TO_STATE);

export const CITY_LOCALITIES: Record<string, string[]> = {
  Mumbai: ['Andheri (W)', 'Bandra (W)', 'Juhu', 'Worli', 'Powai', 'Malad (W)'],
  Pune: ['Koregaon Park', 'Kalyani Nagar', 'Baner', 'Viman Nagar', 'Aundh'],
  Bangalore: ['Whitefield', 'Indiranagar', 'Koramangala', 'HSR Layout', 'Jayanagar'],
  Mysore: ['Gokulam', 'Jayalakshmipuram', 'Vidyaranyapuram', 'Saraswathipuram'],
  'New Delhi': ['Vasant Vihar', 'Greater Kailash', 'Chanakyapuri', 'Hauz Khas', 'Defence Colony'],
  Gurgaon: ['Golf Course Extn', 'DLF Phase 5', 'Sohna Road', 'Cyber City'],
  Noida: ['Sector 128', 'Sector 150', 'Sector 44', 'Sector 62'],
  Ahmedabad: ['Bodakdev', 'Satellite', 'SG Highway', 'Thaltej', 'Prahlad Nagar'],
  Surat: ['Vesu', 'Piplod', 'Adajan', 'Pal'],
  Chennai: ['Anna Nagar', 'Adyar', 'Besant Nagar', 'Boat Club', 'Nungambakkam'],
  Coimbatore: ['Race Course', 'RS Puram', 'Gandhipuram', 'Peelamedu'],
  Hyderabad: ['Banjara Hills', 'Jubilee Hills', 'Gachibowli', 'Hitec City', 'Madhapur'],
  Kolkata: ['Alipore', 'Ballygunge', 'Salt Lake', 'New Town', 'Park Street'],
  Jaipur: ['C-Scheme', 'Civil Lines', 'Malviya Nagar', 'Vaishali Nagar'],
  Udaipur: ['Fateh Sagar', 'Shobhagpura', 'Panchwati', 'Saheli Nagar'],
  Thane: ['Ghodbunder Road', 'Panchpakhadi', 'Majiwada', 'Vasant Vihar'],
  Nagpur: ['Civil Lines', 'Dharampeth', 'Ramdaspeth', 'Pratap Nagar'],
};

export function getLocalitiesForCity(cityName: string): string[] {
  if (!cityName || cityName === 'All') return [];
  return CITY_LOCALITIES[cityName] || ['Prime Locality', 'Civil Lines', 'Central Extension'];
}

export function getStateForCity(cityName: string): string {
  if (!cityName || cityName === 'All') return '';
  return CITY_TO_STATE[cityName] || '';
}

export function getCitiesForState(stateName: string): string[] {
  if (!stateName || stateName === 'All') return ALL_CITIES;
  return STATE_CITIES[stateName] || [];
}
