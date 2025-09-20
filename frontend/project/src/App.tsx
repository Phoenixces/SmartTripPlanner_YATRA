import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppProvider, useApp } from './context/AppContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import AboutPage from './components/pages/AboutPage';
import LandingPage from './components/pages/LandingPage';
import TripInputPage from './components/pages/TripInputPage';
import ItineraryPage from './components/pages/ItineraryPage';
import BookingPage from './components/pages/BookingPage';
import ConfirmationPage from './components/pages/ConfirmationPage';
import { MapsPage } from './components/pages/MapsPage';
import LoginPage from './components/pages/LoginPage';
import SignUpPage from './components/pages/SignUpPage';
import ProfilePage from './components/pages/ProfilePage';

// Main App component that handles page routing and animations
const AppContent: React.FC = () => {
  const { currentPage } = useApp();

  // Page component mapping for dynamic rendering
  const pageComponents = {
    landing: LandingPage,
    about: AboutPage,
    input: TripInputPage,
    itinerary: ItineraryPage,
    shareable: ItineraryPage, // Reusing itinerary page for shareable view
    booking: BookingPage,
    confirmation: ConfirmationPage,
    maps: MapsPage,
    login: LoginPage,
    signup: SignUpPage,
    profile: ProfilePage
  };

  const CurrentPageComponent = pageComponents[currentPage];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Navigation */}
      <Navigation />
      
      {/* Page Content with Animations */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ 
              duration: 0.3,
              ease: 'easeInOut'
            }}
          >
            <CurrentPageComponent />
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* Site-wide Footer */}
      <Footer />
    </div>
  );
};

// Root App component with context provider
const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;