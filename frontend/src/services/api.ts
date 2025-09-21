/**
 * API Service Layer for Smart Travellers
 * 
 * This file contains all API call structures and service functions.
 * Currently using mock data, but structured for easy integration with real APIs.
 * 
 * To integrate with real backend:
 * 1. Replace BASE_URL with your actual API endpoint
 * 2. Add authentication headers where needed
 * 3. Replace mock responses with actual API calls
 * 4. Handle error responses appropriately
 */

import axios from 'axios';
import { TripInput, TripPlan, User, ApiResponse, ApiItineraryResponse } from '../types';

// Base API configuration
const BASE_URL = process.env.REACT_APP_API_URL || 'https://api.smarttravellers.com';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

/**
 * Authentication API calls
 */
export const authAPI = {
  // Login user
  login: async (email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> => {
    try {
      // Real API call would be:
      // const response = await api.post('/auth/login', { email, password });
      // return response.data;
      
      // Mock response for demo
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: {
              user: {
                id: 'user_123',
                name: 'John Doe',
                email: email,
                bio: 'Travel enthusiast exploring the world one destination at a time.',
                avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
                joinDate: '2024-01-15',
                bookedTrips: 12,
                upcomingTrips: 2,
                favoriteDestinations: ['Goa', 'Kerala', 'Rajasthan']
              },
              token: 'mock_jwt_token_123'
            }
          });
        }, 1000);
      });
    } catch (error) {
      throw new Error('Login failed');
    }
  },

  // Register user
  register: async (userData: { name: string; email: string; password: string }): Promise<ApiResponse<{ user: User; token: string }>> => {
    try {
      // Real API call would be:
      // const response = await api.post('/auth/register', userData);
      // return response.data;
      
      // Mock response for demo
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: {
              user: {
                id: 'user_' + Date.now(),
                name: userData.name,
                email: userData.email,
                bio: 'New traveler ready to explore the world!',
                avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
                joinDate: new Date().toISOString().split('T')[0],
                bookedTrips: 0,
                upcomingTrips: 0,
                favoriteDestinations: []
              },
              token: 'mock_jwt_token_456'
            }
          });
        }, 1500);
      });
    } catch (error) {
      throw new Error('Registration failed');
    }
  }
};

/**
 * Trip Planning API calls
 */
export const tripAPI = {
  // Generate AI itinerary
  generateItinerary: async (tripInput: TripInput): Promise<ApiResponse<TripPlan>> => {
    try {
      // Real API call would be:
      // const response = await api.post('/trips/generate', tripInput);
      // Expected response structure:
      // {
      //   success: true,
      //   data: {
      //     id: string,
      //     destination: string,
      //     duration: number,
      //     totalBudget: number,
      //     themes: string[],
      //     itinerary: ItineraryDay[],
      //     costBreakdown: { accommodation, transport, activities, food, total },
      //     smartAdjustments: string[]
      //   }
      // }
      
      // Mock response for demo
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: {
              id: `trip_${Date.now()}`,
              destination: tripInput.destination,
              duration: tripInput.duration,
              totalBudget: tripInput.budget,
              themes: tripInput.themes,
              itinerary: [], // Would be populated by AI
              costBreakdown: {
                accommodation: Math.floor(tripInput.budget * 0.4),
                transport: Math.floor(tripInput.budget * 0.2),
                activities: Math.floor(tripInput.budget * 0.25),
                food: Math.floor(tripInput.budget * 0.15),
                total: tripInput.budget
              },
              smartAdjustments: [
                '🌧️ Rain expected on Day 2 - Indoor activities recommended',
                '🎉 Local festival on Day 3 - Special cultural events added',
                '💡 Peak hours avoided for popular attractions'
              ]
            }
          });
        }, 2000);
      });
    } catch (error) {
      throw new Error('Failed to generate itinerary');
    }
  },

  // Get user's saved trips
  getUserTrips: async (userId: string): Promise<ApiResponse<TripPlan[]>> => {
    try {
      // Real API call would be:
      // const response = await api.get(`/trips/user/${userId}`);
      // return response.data;
      
      // Mock response for demo
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: [] // Would contain user's saved trips
          });
        }, 1000);
      });
    } catch (error) {
      throw new Error('Failed to fetch user trips');
    }
  }
};

/**
 * Places and Maps API calls
 */
export const placesAPI = {
  // Get places by destination
  getPlacesByDestination: async (destinationId: string): Promise<ApiResponse<any[]>> => {
    try {
      // Real API call would be:
      // const response = await api.get(`/places/destination/${destinationId}`);
      // Expected response structure:
      // {
      //   success: true,
      //   data: [
      //     {
      //       id: string,
      //       name: string,
      //       category: 'attraction' | 'hotel' | 'restaurant',
      //       lat: number,
      //       lng: number,
      //       description: string,
      //       cost?: number,
      //       image: string,
      //       rating: number,
      //       address: string
      //     }
      //   ]
      // }
      
      // Mock response for demo
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: [] // Would contain places data
          });
        }, 1000);
      });
    } catch (error) {
      throw new Error('Failed to fetch places');
    }
  },

  // Get smart suggestions
  getSmartSuggestions: async (destinationId: string, preferences: string[]): Promise<ApiResponse<any[]>> => {
    try {
      // Real API call would be:
      // const response = await api.post('/places/suggestions', { destinationId, preferences });
      // return response.data;
      
      // Mock response for demo
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: [] // Would contain AI-generated suggestions
          });
        }, 1500);
      });
    } catch (error) {
      throw new Error('Failed to get smart suggestions');
    }
  }
};

/**
 * Booking API calls
 */
export const bookingAPI = {
  // Create booking
  createBooking: async (bookingData: any): Promise<ApiResponse<{ bookingId: string; confirmationCode: string }>> => {
    try {
      // Real API call would be:
      // const response = await api.post('/bookings', bookingData);
      // return response.data;
      
      // Mock response for demo
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: {
              bookingId: `AI-${Date.now().toString().slice(-8)}`,
              confirmationCode: `CONF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
            }
          });
        }, 2000);
      });
    } catch (error) {
      throw new Error('Booking failed');
    }
  }
};

export default api;