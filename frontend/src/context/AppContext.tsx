import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TripPlan, TripInput, BookingDetails, Language, Page, User } from '../types';
import { updatedTranslations as translations } from '../data/mockData';

// Context interface for the application state
interface AppContextType {
  // Navigation state
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  
  // Language state
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string; // Translation function
  
  // Trip planning state
  tripInput: TripInput | null;
  setTripInput: (input: TripInput) => void;
  
  // Generated trip plan state
  tripPlan: TripPlan | null;
  setTripPlan: (plan: TripPlan) => void;
  
  // Booking state
  bookingDetails: BookingDetails | null;
  setBookingDetails: (details: BookingDetails) => void;
  
  // Mobile drawer state
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  
  // Authentication state
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
}

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Custom hook to use the context
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Provider component for the app context
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // State management for the entire application
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [language, setLanguage] = useState<Language>('en');
  const [tripInput, setTripInput] = useState<TripInput | null>(null);
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Authentication state - mock user for demo
  const [user, setUser] = useState<User | null>({
    id: 'user_123',
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Travel enthusiast exploring the world one destination at a time.',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinDate: '2024-01-15',
    bookedTrips: 12,
    upcomingTrips: 2,
    favoriteDestinations: ['Goa', 'Kerala', 'Rajasthan']
  });
  
  const isAuthenticated = user !== null;

  // Translation function that retrieves text based on current language
  const t = (key: string): string => {
    const translationObj = translations[language] as Record<string, string>;
    return translationObj[key] || key;
  };

  // Context value that will be provided to all child components
  const value: AppContextType = {
    currentPage,
    setCurrentPage,
    language,
    setLanguage,
    t,
    tripInput,
    setTripInput,
    tripPlan,
    setTripPlan,
    bookingDetails,
    setBookingDetails,
    mobileMenuOpen,
    setMobileMenuOpen,
    user,
    setUser,
    isAuthenticated
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};