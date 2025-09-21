// Mock data for the AI Travel Planner application
// This file contains all the static data used throughout the app

export interface Destination {
  id: string;
  name: string;
  state: string;
  country: string;
  image: string;
  description: string;
}

export interface Activity {
  id: string;
  name: string;
  type: string;
  duration: string;
  cost: number;
  description: string;
  image: string;
  location: string;
  reason:string;
  smartAdjustments:Activity[]
}

export interface ItineraryDay {
  day: number;
  date: string;
  activities: Activity[];
  totalCost: number;
}

export interface TripPlan {
  id: string;
  destination: string;
  duration: number;
  totalBudget: number;
  themes: string[];
  itinerary: ItineraryDay[];
  startingPlace: string;
  startDate: string;
  costBreakdown: {
    accommodation: number;
    transport: number;
    activities: number;
    food: number;
    total: number;
  };
  smartAdjustments: string[];
}

// Mock destinations data
export const destinations: Destination[] = [
  {
    id: 'goa',
    name: 'Goa',
    state: 'Goa',
    country: 'India',
    image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Beautiful beaches and vibrant nightlife'
  },
  {
    id: 'kerala',
    name: 'Kerala',
    state: 'Kerala',
    country: 'India',
    image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Backwaters and scenic hill stations'
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    state: 'Rajasthan',
    country: 'India',
    image: 'https://images.pexels.com/photos/3581364/pexels-photo-3581364.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Royal palaces and desert adventures'
  },
  {
    id: 'himachal',
    name: 'Himachal Pradesh',
    state: 'Himachal Pradesh',
    country: 'India',
    image: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Mountain adventures and spiritual retreats'
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    image: 'https://images.pexels.com/photos/2850347/pexels-photo-2850347.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Bollywood glamour and street food'
  },
  {
    id: 'delhi',
    name: 'Delhi',
    state: 'Delhi',
    country: 'India',
    image: 'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Historical monuments and modern culture'
  }
];

// Mock activities data for different themes
export const activitiesByTheme: Record<string, Activity[]> = {
  heritage: [
    {
      id: 'heritage-1',
      name: 'Red Fort Visit',
      type: 'heritage',
      duration: '3 hours',
      cost: 500,
      description: 'Explore the magnificent Mughal architecture',
      image: 'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'Old Delhi',
      reason:'',
      smartAdjustments: []
    },
    {
      id: 'heritage-2',
      name: 'Palace Museum Tour',
      type: 'heritage',
      duration: '4 hours',
      cost: 800,
      description: 'Discover royal artifacts and history',
      image: 'https://images.pexels.com/photos/3581364/pexels-photo-3581364.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'City Palace',
      reason:'',
      smartAdjustments: []
    }
  ],
  nightlife: [
    {
      id: 'nightlife-1',
      name: 'Rooftop Bar Experience',
      type: 'nightlife',
      duration: '4 hours',
      cost: 2000,
      description: 'Enjoy craft cocktails with city views',
      image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'Downtown',
      reason:'',
      smartAdjustments: []
    },
    {
      id: 'nightlife-2',
      name: 'Beach Club Party',
      type: 'nightlife',
      duration: '5 hours',
      cost: 1500,
      description: 'Dance to international DJs by the beach',
      image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'Beachfront',
      reason:'',
      smartAdjustments: []
    }
  ],
  adventure: [
    {
      id: 'adventure-1',
      name: 'Paragliding Experience',
      type: 'adventure',
      duration: '6 hours',
      cost: 3000,
      description: 'Soar high above scenic valleys',
      image: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'Mountain Valley',
      reason: "Rain",
          smartAdjustments: [
            {
              id: "act5a",
              name: "Backwater Kayaking",
              type: "water_sport",
              duration: "3 hours",
              cost: 3500,
              description: "Paddle through calm backwaters with lush views.",
              image:
                "https://images.pexels.com/photos/1430672/pexels-photo-1430672.jpeg?auto=compress&cs=tinysrgb&w=400", // replace with one from above if preferred
              location: "Chapora River, Goa",
              reason:'',
              smartAdjustments: []
            },
            {
              id: "act5b",
              name: "Indoor Surf Simulator",
              type: "water_sport",
              duration: "2 hours",
              cost: 3500,
              description: "Ride endless waves, rain or shine.",
              image:
                "https://images.pexels.com/photos/416676/pexels-photo-416676.jpeg?auto=compress&cs=tinysrgb&w=400",
              location: "Candolim, Goa",
              reason:'',
              smartAdjustments: []
            },
          ],

    },
    {
      id: 'adventure-2',
      name: 'White Water Rafting',
      type: 'adventure',
      duration: '5 hours',
      cost: 2500,
      description: 'Navigate thrilling rapids',
      image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'River Rapids',
      reason:'',
      smartAdjustments: []
    }
  ],
  wellness: [
    {
      id: 'wellness-1',
      name: 'Ayurvedic Spa Treatment',
      type: 'wellness',
      duration: '3 hours',
      cost: 1800,
      description: 'Rejuvenate with traditional therapies',
      image: 'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'Wellness Center',
      reason:'',
      smartAdjustments: []
    },
    {
      id: 'wellness-2',
      name: 'Yoga Retreat Session',
      type: 'wellness',
      duration: '4 hours',
      cost: 1200,
      description: 'Find inner peace with guided meditation',
      image: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'Hilltop Retreat',
      reason:'',
      smartAdjustments: []
    }
  ],
  shopping: [
    {
      id: 'shopping-1',
      name: 'Local Bazaar Tour',
      type: 'shopping',
      duration: '4 hours',
      cost: 500,
      description: 'Explore authentic local markets',
      image: 'https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'Old Market',
      reason:'',
      smartAdjustments: []
    },
    {
      id: 'shopping-2',
      name: 'Artisan Workshop Visit',
      type: 'shopping',
      duration: '3 hours',
      cost: 800,
      description: 'Buy handcrafted souvenirs directly from makers',
      image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'Craft Village',
      reason:'',
      smartAdjustments: []
    }
  ],
  food: [
    {
      id: 'food-1',
      name: 'Street Food Walking Tour',
      type: 'food',
      duration: '3 hours',
      cost: 800,
      description: 'Taste authentic local delicacies',
      image: 'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'Food Street',
      reason:'',
      smartAdjustments: []
    },
    {
      id: 'food-2',
      name: 'Cooking Class Experience',
      type: 'food',
      duration: '4 hours',
      cost: 1500,
      description: 'Learn to cook regional specialties',
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'Culinary School',
      reason:'',
      smartAdjustments: []
    }
  ]
};
export const mockTripPlan = {
  id: "mock_trip",
  destination: "Goa",
  duration: 5,
  totalBudget: 50000,
  startingPlace: "Bangalore",
  startDate: "2024-03-15",
  themes: ["nightlife", "food", "adventure"],
  itinerary: [
    {
      day: 1,
      date: "2024-03-15",
      activities: [
        {
          id: "act1",
          name: "Arrival & Beach Relaxation",
          type: "leisure",
          duration: "4 hours",
          cost: 1000,
          description: "Check-in and unwind at Baga Beach",
          image:
            "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=400",
          location: "Baga Beach",
        },
        {
          id: "act2",
          name: "Sunset Dinner Cruise",
          type: "food",
          duration: "3 hours",
          cost: 1500,
          description: "Romantic dinner with ocean views",
          image:
            "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=400",
          location: "Mandovi River",
        },
      ],
      totalCost: 2500,
    },
    {
      day: 2,
      date: "2024-03-16",
      activities: [
        {
          id: "act3",
          name: "Water Sports Adventure",
          type: "adventure",
          duration: "5 hours",
          cost: 3500,
          description: "Jet ski, parasailing, and banana boat",
          image:
            "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=400",
          location: "Calangute Beach",
          reason: "Rain",
          smartAdjustments: [
            {
              id: "act5a",
              name: "Backwater Kayaking",
              type: "water_sport",
              duration: "3 hours",
              cost: 3500,
              description: "Paddle through calm backwaters with lush views.",
              image:
                "https://images.pexels.com/photos/1430672/pexels-photo-1430672.jpeg?auto=compress&cs=tinysrgb&w=400", // replace with one from above if preferred
              location: "Chapora River, Goa",
            },
            {
              id: "act5b",
              name: "Indoor Surf Simulator",
              type: "water_sport",
              duration: "2 hours",
              cost: 3500,
              description: "Ride endless waves, rain or shine.",
              image:
                "https://images.pexels.com/photos/416676/pexels-photo-416676.jpeg?auto=compress&cs=tinysrgb&w=400",
              location: "Candolim, Goa",
            },
          ],
        },
        {
          id: "act4",
          name: "Beach Shack Hopping",
          type: "food",
          duration: "4 hours",
          cost: 1800,
          description: "Local seafood and drinks",
          image:
            "https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=400",
          location: "Anjuna Beach",
        },
      ],
      totalCost: 5300,
    },
  ],
  costBreakdown: {
    accommodation: 15000,
    transport: 8000,
    activities: 12000,
    food: 10000,
    total: 45000,
  },
  smartAdjustments: [
    "🌧️ Rain expected on Day 2 - Indoor cultural activities recommended",
    "💡 Save more by choosing weekdays over weekends.",
  ],
};

// Translations for multilingual support
export const translations = {
  en: {
    appTitle: 'Smart Travellers',
    tagline: 'Plan your perfect trip with AI-powered personalized itineraries',
    planMyTrip: 'Plan My Trip',
    exploreMockTrips: 'Explore Mock Trips',
    home: 'Home',
    plan: 'Plan',
    itinerary: 'Itinerary',
    booking: 'Booking',
    budget: 'Budget (₹)',
    tripDuration: 'Trip Duration (Days)',
    destination: 'Destination',
    travelThemes: 'Travel Themes',
    generateItinerary: 'Generate AI Itinerary',
    dayByDay: 'Day by Day Itinerary',
    costBreakdown: 'Cost Breakdown',
    accommodation: 'Accommodation',
    transport: 'Transport',
    activities: 'Activities',
    food: 'Food',
    total: 'Total',
    bookInOneClick: 'Book in One Click',
    shareTrip: 'Share Trip',
    smartAdjustments: 'Smart Adjustments',
    payNow: 'Pay Now',
    bookingConfirmed: 'Booking Confirmed! 🎉',
    travelerDetails: 'Traveler Details',
    fullName: 'Full Name',
    email: 'Email',
    phone: 'Phone Number',
    login: 'Login',
    signup: 'Sign Up',
    profile: 'Profile',
    logout: 'Logout',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    name: 'Name',
    bio: 'Bio',
    joinDate: 'Member Since',
    bookedTrips: 'Booked Trips',
    upcomingTrips: 'Upcoming Trips',
    favoriteDestinations: 'Favorite Destinations',
    editProfile: 'Edit Profile',
    saveChanges: 'Save Changes',
    cancel: 'Cancel'
  },
  hi: {
    appTitle: 'स्मार्ट ट्रैवलर्स',
    tagline: 'AI-संचालित व्यक्तिगत यात्रा योजनाओं के साथ अपनी परफेक्ट ट्रिप प्लान करें',
    planMyTrip: 'मेरी यात्रा प्लान करें',
    exploreMockTrips: 'मॉक ट्रिप्स देखें',
    home: 'होम',
    plan: 'प्लान',
    itinerary: 'यात्रा कार्यक्रम',
    booking: 'बुकिंग',
    budget: 'बजट (₹)',
    tripDuration: 'यात्रा अवधि (दिन)',
    destination: 'गंतव्य',
    travelThemes: 'यात्रा थीम',
    generateItinerary: 'AI यात्रा कार्यक्रम बनाएं',
    dayByDay: 'दिन-प्रतिदिन यात्रा कार्यक्रम',
    costBreakdown: 'लागत विवरण',
    accommodation: 'आवास',
    transport: 'परिवहन',
    activities: 'गतिविधियां',
    food: 'भोजन',
    total: 'कुल',
    bookInOneClick: 'एक क्लिक में बुक करें',
    shareTrip: 'यात्रा साझा करें',
    smartAdjustments: 'स्मार्ट समायोजन',
    payNow: 'अभी भुगतान करें',
    bookingConfirmed: 'बुकिंग पुष्टि! 🎉',
    travelerDetails: 'यात्री विवरण',
    fullName: 'पूरा नाम',
    email: 'ईमेल',
    phone: 'फोन नंबर',
    login: 'लॉगिन',
    signup: 'साइन अप',
    profile: 'प्रोफाइल',
    logout: 'लॉगआउट',
    password: 'पासवर्ड',
    confirmPassword: 'पासवर्ड की पुष्टि करें',
    name: 'नाम',
    bio: 'बायो',
    joinDate: 'सदस्य बने',
    bookedTrips: 'बुक की गई यात्राएं',
    upcomingTrips: 'आगामी यात्राएं',
    favoriteDestinations: 'पसंदीदा गंतव्य',
    editProfile: 'प्रोफाइल संपादित करें',
    saveChanges: 'परिवर्तन सहेजें',
    cancel: 'रद्द करें'
  },
  ta: {
    appTitle: 'ஸ்மார்ட் ட்ராவலர்ஸ்',
    tagline: 'AI-இயங்கும் தனிப்பட்ட பயண திட்டங்களுடன் உங்கள் சிறந்த பயணத்தைத் திட்டமிடுங்கள்',
    planMyTrip: 'என் பயணத்தைத் திட்டமிடு',
    exploreMockTrips: 'மாதிரி பயணங்களைப் பார்க்கவும்',
    home: 'முகப்பு',
    plan: 'திட்டம்',
    itinerary: 'பயண அட்டவணை',
    booking: 'முன்பதிவு',
    budget: 'பட்ஜெட் (₹)',
    tripDuration: 'பயண காலம் (நாட்கள்)',
    destination: 'இலக்கு',
    travelThemes: 'பயண தீம்கள்',
    generateItinerary: 'AI பயண அட்டவணையை உருவாக்கு',
    dayByDay: 'நாள் வாரியாக பயண அட்டவணை',
    costBreakdown: 'செலவு விவரம்',
    accommodation: 'தங்குமிடம்',
    transport: 'போக்குவரத்து',
    activities: 'செயல்பாடுகள்',
    food: 'உணவு',
    total: 'மொத்தம்',
    bookInOneClick: 'ஒரே கிளிக்கில் முன்பதிவு செய்யுங்கள்',
    shareTrip: 'பயணத்தைப் பகிரவும்',
    smartAdjustments: 'ஸ்மார்ட் சரிசெய்தல்கள்',
    payNow: 'இப்போது பணம் செலுத்துங்கள்',
    bookingConfirmed: 'முன்பதிவு உறுதி! 🎉',
    travelerDetails: 'பயணி விவரங்கள்',
    fullName: 'முழு பெயர்',
    email: 'மின்னஞ்சல்',
    phone: 'தொலைபேசி எண்',
    login: 'உள்நுழைவு',
    signup: 'பதிவு செய்யுங்கள்',
    profile: 'சுயவிவரம்',
    logout: 'வெளியேறு',
    password: 'கடவுச்சொல்',
    confirmPassword: 'கடவுச்சொல்லை உறுதிப்படுத்தவும்',
    name: 'பெயர்',
    bio: 'சுயவிவரம்',
    joinDate: 'உறுப்பினரான தேதி',
    bookedTrips: 'முன்பதிவு செய்யப்பட்ட பயணங்கள்',
    upcomingTrips: 'வரவிருக்கும் பயணங்கள்',
    favoriteDestinations: 'விருப்பமான இடங்கள்',
    editProfile: 'சுயவிவரத்தைத் திருத்து',
    saveChanges: 'மாற்றங்களைச் சேமி',
    cancel: 'ரத்து செய்'
  }
};

// Add maps translation to existing languages
translations.en.maps = 'Maps';
translations.hi.maps = 'मैप्स';
if (!translations.ta.maps) {
  translations.ta.maps = 'வரைபடங்கள்';
}

// Add explore places translations
translations.en.explorePlaces = 'Explore Places';
translations.hi.explorePlaces = 'स्थान देखें';
translations.ta.explorePlaces = 'இடங்களை ஆராயுங்கள்';

// Add about us translations
translations.en.aboutUs = 'About Us';
translations.hi.aboutUs = 'हमारे बारे में';
translations.ta.aboutUs = 'எங்களைப் பற்றி';

// Add smart suggestions translations
translations.en.smartSuggestions = 'Smart Suggestions';
translations.hi.smartSuggestions = 'स्मार्ट सुझाव';
translations.ta.smartSuggestions = 'ஸ்மார்ட் பரிந்துரைகள்';

// Add locate itinerary translations
translations.en.locateItinerary = 'Locate My Itinerary';
translations.hi.locateItinerary = 'मेरा यात्रा कार्यक्रम खोजें';
translations.ta.locateItinerary = 'என் பயண அட்டவணையைக் கண்டறியவும்';

// Ensure all translation objects have the new keys
Object.keys(translations).forEach(lang => {
  const langTranslations = translations[lang as keyof typeof translations] as Record<string, string>;
  if (!langTranslations.maps) langTranslations.maps = 'Maps';
  if (!langTranslations.aboutUs) langTranslations.aboutUs = 'About Us';
  if (!langTranslations.explorePlaces) langTranslations.explorePlaces = 'Explore Places';
  if (!langTranslations.smartSuggestions) langTranslations.smartSuggestions = 'Smart Suggestions';
  if (!langTranslations.locateItinerary) langTranslations.locateItinerary = 'Locate My Itinerary';
});

// Fix the translation structure
export const updatedTranslations = {
  en: {
    ...translations.en,
    maps: 'Maps',
    aboutUs: 'About Us',
    explorePlaces: 'Explore Places',
    smartSuggestions: 'Smart Suggestions',
    locateItinerary: 'Locate My Itinerary',
    mapDescription: 'Discover amazing places, hotels, restaurants, and attractions on our interactive map.'
  },
  hi: {
    ...translations.hi,
    maps: 'मैप्स',
    aboutUs: 'हमारे बारे में',
    explorePlaces: 'स्थान देखें',
    smartSuggestions: 'स्मार्ट सुझाव',
    locateItinerary: 'मेरा यात्रा कार्यक्रम खोजें',
    mapDescription: 'हमारे इंटरैक्टिव मैप पर अद्भुत स्थान, होटल, रेस्तरां और आकर्षण खोजें।'
  },
  ta: {
    ...translations.ta,
    maps: 'வரைபடங்கள்',
    aboutUs: 'எங்களைப் பற்றி',
    explorePlaces: 'இடங்களை ஆராயுங்கள்',
    smartSuggestions: 'ஸ்மார்ட் பரிந்துரைகள்',
    locateItinerary: 'என் பயண அட்டவணையைக் கண்டறியவும்',
    mapDescription: 'எங்கள் ஊடாடும் வரைபடத்தில் அற்புதமான இடங்கள், ஹோட்டல்கள், உணவகங்கள் மற்றும் ஈர்ப்புகளைக் கண்டறியுங்கள்.'
  }
};