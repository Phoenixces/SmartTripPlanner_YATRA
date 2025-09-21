import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Plane, User, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Page, Language } from '../types';

// Main navigation component with responsive design
const Navigation: React.FC = () => {
  const { 
    currentPage, 
    setCurrentPage, 
    language, 
    setLanguage, 
    t, 
    mobileMenuOpen, 
    setMobileMenuOpen,
    user,
    setUser,
    isAuthenticated
  } = useApp();

  // Hide navigation on login and signup pages for clean authentication experience
  const hideNavigation = currentPage === 'login' || currentPage === 'signup';
  
  if (hideNavigation) {
    return null;
  }

  // Navigation items configuration
  const navItems: { key: Page; labelKey: string; showOnMobile?: boolean; authRequired?: boolean }[] = [
    { key: 'landing', labelKey: 'home' },
    { key: 'about', labelKey: 'aboutUs' },
    { key: 'input', labelKey: 'plan' },
    { key: 'itinerary', labelKey: 'itinerary' },
    { key: 'booking', labelKey: 'booking' },
    { key: 'maps', labelKey: 'maps', showOnMobile: true },
    { key: 'profile', labelKey: 'profile', showOnMobile: true, authRequired: true }
  ];

  // Language options for the language switcher
  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta', label: 'தமிழ்', flag: '🇮🇳' }
  ];

  // Handle navigation item click
  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    setCurrentPage('landing');
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop and Mobile Header */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo and App Title */}
            <motion.div 
              className="flex items-center space-x-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => handleNavClick('landing')}
            >
              <div className="bg-gradient-to-r from-blue-500 to-emerald-500 p-2 rounded-full">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                {t('appTitle')}
              </span>
            </motion.div>

            {/* Desktop Navigation Items */}
            <div className="hidden md:flex space-x-8">
              {navItems.filter(item => !item.authRequired || isAuthenticated).map((item) => (
                <motion.button
                  key={item.key}
                  onClick={() => handleNavClick(item.key)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === item.key
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {t(item.labelKey)}
                </motion.button>
              ))}
            </div>

            {/* Language Switcher and Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              
              {/* User Menu - Desktop */}
              {isAuthenticated ? (
                <div className="hidden md:flex items-center space-x-4">
                  <div className="relative group">
                    <button className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors">
                      <img
                        src={user?.avatar}
                        alt={user?.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm font-medium">{user?.name}</span>
                    </button>
                    
                    {/* User Dropdown */}
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <button
                        onClick={() => handleNavClick('profile')}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2"
                      >
                        <User className="h-4 w-4" />
                        <span>{t('profile')}</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2 text-red-600"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>{t('logout')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <button
                    onClick={() => handleNavClick('login')}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    {t('login')}
                  </button>
                  <button
                    onClick={() => handleNavClick('signup')}
                    className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    {t('signup')}
                  </button>
                </div>
              )}
              
              {/* Language Dropdown */}
              <div className="relative group">
                <button className="flex items-center space-x-1 px-3 py-2 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors">
                  <Globe className="h-4 w-4" />
                  <span className="text-sm">{languages.find(l => l.code === language)?.flag}</span>
                </button>
                
                {/* Language Options Dropdown */}
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 rounded-md hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-out Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Side Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 md:hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-semibold text-gray-900">Menu</h3>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-md hover:bg-gray-100"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                {/* Mobile Navigation Items */}
                <div className="space-y-4">
                  {navItems.filter(item => !item.authRequired || isAuthenticated).map((item) => (
                    <motion.button
                      key={item.key}
                      onClick={() => handleNavClick(item.key)}
                      className={`w-full text-left px-4 py-3 rounded-md transition-colors ${
                        currentPage === item.key
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                      whileHover={{ x: 4 }}
                    >
                      {t(item.labelKey)}
                    </motion.button>
                  ))}
                  
                  {/* Mobile Auth Buttons */}
                  {!isAuthenticated ? (
                    <div className="pt-4 border-t border-gray-200 space-y-2">
                      <motion.button
                        onClick={() => handleNavClick('login')}
                        className="w-full text-left px-4 py-3 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                        whileHover={{ x: 4 }}
                      >
                        {t('login')}
                      </motion.button>
                      <motion.button
                        onClick={() => handleNavClick('signup')}
                        className="w-full text-left px-4 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                        whileHover={{ x: 4 }}
                      >
                        {t('signup')}
                      </motion.button>
                    </div>
                  ) : (
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-3 px-4 py-3">
                        <img
                          src={user?.avatar}
                          alt={user?.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{user?.name}</p>
                          <p className="text-sm text-gray-500">{user?.email}</p>
                        </div>
                      </div>
                      <motion.button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 rounded-md text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                        whileHover={{ x: 4 }}
                      >
                        <LogOut className="h-4 w-4" />
                        <span>{t('logout')}</span>
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;