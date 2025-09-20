// TypeScript type definitions for the Travel Planner application

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
  startingPlace: string;
  startDate: string;
  duration: number;
  totalBudget: number;
  themes: string[];
  itinerary: ItineraryDay[];
  costBreakdown: {
    accommodation: number;
    transport: number;
    activities: number;
    food: number;
    total: number;
  };
  smartAdjustments: string[];
}

export interface TripInput {
  budget: number;
  duration: number;
  destination: string;
  themes: string[];
  startingPlace: string;
  startDate: string;
}

export interface BookingDetails {
  fullName: string;
  email: string;
  phone: string;
  tripPlan: TripPlan;
}

export type Language = 'en' | 'hi' | 'ta';

export type Page = 'landing' | 'input' | 'itinerary' | 'shareable' | 'booking' | 'confirmation' | 'maps' | 'login' | 'signup' | 'profile' | 'about';

export interface User {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  joinDate: string;
  bookedTrips: number;
  upcomingTrips: number;
  favoriteDestinations: string[];
}

// API Response interfaces for future integration
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiItineraryResponse {
  id: string;
  destination: string;
  duration: number;
  totalBudget: number;
  themes: string[];
  itinerary: ItineraryDay[];
  costBreakdown: {
    accommodation: number;
    transport: number;
    activities: number;
    food: number;
    total: number;
  };
  smartAdjustments: string[];
}