// Mock places data for the Maps Page
// This file contains location data for attractions, hotels, and restaurants

export interface Place {
  id: string;
  name: string;
  category: 'attraction' | 'hotel' | 'restaurant';
  lat: number;
  lng: number;
  description: string;
  cost?: number;
  image: string;
  rating: number;
  address: string;
  destinationId: string; // Links to destinations from mockData.ts
}

// Mock places data organized by destination
export const mockPlaces: Place[] = [
  // Goa Places
  {
    id: 'goa-1',
    name: 'Baga Beach',
    category: 'attraction',
    lat: 15.5557,
    lng: 73.7516,
    description: 'Famous beach known for water sports and vibrant nightlife',
    cost: 0,
    image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.5,
    address: 'Baga, Goa 403516',
    destinationId: 'goa'
  },
  {
    id: 'goa-2',
    name: 'Fort Aguada',
    category: 'attraction',
    lat: 15.4909,
    lng: 73.7773,
    description: 'Historic Portuguese fort with lighthouse and panoramic views',
    cost: 25,
    image: 'https://images.pexels.com/photos/3581364/pexels-photo-3581364.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.3,
    address: 'Candolim, Goa 403515',
    destinationId: 'goa'
  },
  {
    id: 'goa-3',
    name: 'Taj Exotica Resort',
    category: 'hotel',
    lat: 15.2993,
    lng: 74.1240,
    description: 'Luxury beachfront resort with world-class amenities',
    cost: 15000,
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    address: 'Benaulim, South Goa 403716',
    destinationId: 'goa'
  },
  {
    id: 'goa-4',
    name: 'Fisherman\'s Wharf',
    category: 'restaurant',
    lat: 15.5016,
    lng: 73.7570,
    description: 'Waterfront restaurant serving fresh seafood and Goan cuisine',
    cost: 1200,
    image: 'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.4,
    address: 'Cavelossim, Goa 403731',
    destinationId: 'goa'
  },
  {
    id: 'goa-5',
    name: 'Dudhsagar Falls',
    category: 'attraction',
    lat: 15.3144,
    lng: 74.3144,
    description: 'Spectacular four-tiered waterfall in the Western Ghats',
    cost: 500,
    image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.6,
    address: 'Bhagwan Mahaveer Sanctuary, Goa',
    destinationId: 'goa'
  },

  // Kerala Places
  {
    id: 'kerala-1',
    name: 'Alleppey Backwaters',
    category: 'attraction',
    lat: 9.4981,
    lng: 76.3388,
    description: 'Serene network of canals, rivers, and lakes',
    cost: 2000,
    image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    address: 'Alappuzha, Kerala 688001',
    destinationId: 'kerala'
  },
  {
    id: 'kerala-2',
    name: 'Munnar Tea Gardens',
    category: 'attraction',
    lat: 10.0889,
    lng: 77.0595,
    description: 'Rolling hills covered with lush tea plantations',
    cost: 300,
    image: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.5,
    address: 'Munnar, Kerala 685612',
    destinationId: 'kerala'
  },
  {
    id: 'kerala-3',
    name: 'Kumarakom Lake Resort',
    category: 'hotel',
    lat: 9.6177,
    lng: 76.4274,
    description: 'Heritage luxury resort on Vembanad Lake',
    cost: 18000,
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    address: 'Kumarakom, Kerala 686563',
    destinationId: 'kerala'
  },
  {
    id: 'kerala-4',
    name: 'Dhe Puttu',
    category: 'restaurant',
    lat: 9.9312,
    lng: 76.2673,
    description: 'Authentic Kerala cuisine with traditional puttu varieties',
    cost: 800,
    image: 'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.3,
    address: 'Kochi, Kerala 682001',
    destinationId: 'kerala'
  },

  // Rajasthan Places
  {
    id: 'rajasthan-1',
    name: 'City Palace Udaipur',
    category: 'attraction',
    lat: 24.5760,
    lng: 73.6833,
    description: 'Magnificent palace complex overlooking Lake Pichola',
    cost: 300,
    image: 'https://images.pexels.com/photos/3581364/pexels-photo-3581364.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.6,
    address: 'City Palace Complex, Udaipur 313001',
    destinationId: 'rajasthan'
  },
  {
    id: 'rajasthan-2',
    name: 'Hawa Mahal',
    category: 'attraction',
    lat: 26.9239,
    lng: 75.8267,
    description: 'Iconic pink sandstone palace with intricate lattice work',
    cost: 200,
    image: 'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.4,
    address: 'Hawa Mahal Rd, Badi Choupad, Jaipur 302002',
    destinationId: 'rajasthan'
  },
  {
    id: 'rajasthan-3',
    name: 'Taj Lake Palace',
    category: 'hotel',
    lat: 24.5760,
    lng: 73.6833,
    description: 'Floating marble palace hotel on Lake Pichola',
    cost: 25000,
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    address: 'Pichola, Udaipur 313001',
    destinationId: 'rajasthan'
  },
  {
    id: 'rajasthan-4',
    name: 'Ambrai Restaurant',
    category: 'restaurant',
    lat: 24.5797,
    lng: 73.6803,
    description: 'Rooftop dining with stunning views of City Palace',
    cost: 1500,
    image: 'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.5,
    address: 'Amet Haveli, Hanuman Ghat, Udaipur 313001',
    destinationId: 'rajasthan'
  },

  // Himachal Pradesh Places
  {
    id: 'himachal-1',
    name: 'Rohtang Pass',
    category: 'attraction',
    lat: 32.3720,
    lng: 77.2479,
    description: 'High mountain pass with snow-capped peaks and adventure sports',
    cost: 50,
    image: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.5,
    address: 'Rohtang Pass, Himachal Pradesh 175103',
    destinationId: 'himachal'
  },
  {
    id: 'himachal-2',
    name: 'Solang Valley',
    category: 'attraction',
    lat: 32.3199,
    lng: 77.1564,
    description: 'Adventure sports hub with paragliding and skiing',
    cost: 2000,
    image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.4,
    address: 'Solang Valley, Manali, Himachal Pradesh 175131',
    destinationId: 'himachal'
  },
  {
    id: 'himachal-3',
    name: 'The Oberoi Cecil',
    category: 'hotel',
    lat: 31.1048,
    lng: 77.1734,
    description: 'Historic luxury hotel with colonial charm',
    cost: 12000,
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    address: 'Chaura Maidan, Shimla 171001',
    destinationId: 'himachal'
  },
  {
    id: 'himachal-4',
    name: 'Johnson\'s Cafe',
    category: 'restaurant',
    lat: 32.2396,
    lng: 77.1887,
    description: 'Cozy cafe serving continental and local Himachali cuisine',
    cost: 600,
    image: 'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.2,
    address: 'Circuit House Rd, Manali 175131',
    destinationId: 'himachal'
  },

  // Mumbai Places
  {
    id: 'mumbai-1',
    name: 'Gateway of India',
    category: 'attraction',
    lat: 18.9220,
    lng: 72.8347,
    description: 'Iconic arch monument overlooking the Arabian Sea',
    cost: 0,
    image: 'https://images.pexels.com/photos/2850347/pexels-photo-2850347.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.3,
    address: 'Apollo Bandar, Colaba, Mumbai 400001',
    destinationId: 'mumbai'
  },
  {
    id: 'mumbai-2',
    name: 'Marine Drive',
    category: 'attraction',
    lat: 18.9441,
    lng: 72.8230,
    description: 'Scenic waterfront promenade known as Queen\'s Necklace',
    cost: 0,
    image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.4,
    address: 'Marine Drive, Mumbai 400020',
    destinationId: 'mumbai'
  },
  {
    id: 'mumbai-3',
    name: 'The Taj Mahal Palace',
    category: 'hotel',
    lat: 18.9216,
    lng: 72.8331,
    description: 'Legendary luxury hotel with heritage and modern wings',
    cost: 20000,
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    address: 'Apollo Bandar, Colaba, Mumbai 400001',
    destinationId: 'mumbai'
  },
  {
    id: 'mumbai-4',
    name: 'Trishna',
    category: 'restaurant',
    lat: 18.9067,
    lng: 72.8147,
    description: 'Award-winning restaurant serving contemporary Indian seafood',
    cost: 2000,
    image: 'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.6,
    address: '7 Rope Walk Ln, Kala Ghoda, Fort, Mumbai 400001',
    destinationId: 'mumbai'
  },

  // Delhi Places
  {
    id: 'delhi-1',
    name: 'Red Fort',
    category: 'attraction',
    lat: 28.6562,
    lng: 77.2410,
    description: 'Historic Mughal fortress and UNESCO World Heritage Site',
    cost: 35,
    image: 'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.2,
    address: 'Netaji Subhash Marg, Chandni Chowk, New Delhi 110006',
    destinationId: 'delhi'
  },
  {
    id: 'delhi-2',
    name: 'India Gate',
    category: 'attraction',
    lat: 28.6129,
    lng: 77.2295,
    description: 'War memorial arch dedicated to Indian soldiers',
    cost: 0,
    image: 'https://images.pexels.com/photos/3581364/pexels-photo-3581364.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.3,
    address: 'Rajpath, India Gate, New Delhi 110001',
    destinationId: 'delhi'
  },
  {
    id: 'delhi-3',
    name: 'The Imperial',
    category: 'hotel',
    lat: 28.6139,
    lng: 77.2090,
    description: 'Art Deco luxury hotel in the heart of New Delhi',
    cost: 15000,
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    address: 'Janpath, Connaught Place, New Delhi 110001',
    destinationId: 'delhi'
  },
  {
    id: 'delhi-4',
    name: 'Karim\'s',
    category: 'restaurant',
    lat: 28.6507,
    lng: 77.2334,
    description: 'Historic restaurant famous for Mughlai cuisine since 1913',
    cost: 800,
    image: 'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.1,
    address: 'Gali Kababian, Jama Masjid, New Delhi 110006',
    destinationId: 'delhi'
  }
];

// Helper function to get places by destination
export const getPlacesByDestination = (destinationId: string): Place[] => {
  return mockPlaces.filter(place => place.destinationId === destinationId);
};

// Helper function to get places by category
export const getPlacesByCategory = (category: Place['category']): Place[] => {
  return mockPlaces.filter(place => place.category === category);
};

// Helper function to get destination center coordinates
export const getDestinationCenter = (destinationId: string): [number, number] => {
  const places = getPlacesByDestination(destinationId);
  if (places.length === 0) return [20.5937, 78.9629]; // Default to India center
  
  const avgLat = places.reduce((sum, place) => sum + place.lat, 0) / places.length;
  const avgLng = places.reduce((sum, place) => sum + place.lng, 0) / places.length;
  
  return [avgLat, avgLng];
};

// Smart suggestions - alternative places near a given location
export const getSmartSuggestions = (destinationId: string, excludeIds: string[] = []): Place[] => {
  const places = getPlacesByDestination(destinationId);
  const suggestions = places
    .filter(place => !excludeIds.includes(place.id))
    .filter(place => place.rating >= 4.2)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);
  
  return suggestions;
};