import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, IndianRupee, Heart, Mountain, Utensils, ShoppingBag, Sunset, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { destinations, activitiesByTheme } from '../../data/mockData';
import { TripInput, TripPlan } from '../../types';

// Trip input form component for collecting user preferences
const TripInputPage: React.FC = () => {
  const { t, setTripPlan, setCurrentPage, setTripInput } = useApp();
  
  // Form state management
  const [formData, setFormData] = useState<TripInput>({
    budget: 10000,
    duration: 2,
    destination: '',
    themes: [],
    startingPlace: '',
    startDate: new Date().toISOString().split('T')[0]
  });
  
  const [isGenerating, setIsGenerating] = useState(false);

  // Travel theme options with icons
  const themes = [
    { id: 'heritage', label: 'Heritage', icon: Mountain, color: 'text-amber-600 bg-amber-50' },
    { id: 'nightlife', label: 'Nightlife', icon: Sunset, color: 'text-purple-600 bg-purple-50' },
    { id: 'adventure', label: 'Adventure', icon: Mountain, color: 'text-green-600 bg-green-50' },
    { id: 'wellness', label: 'Wellness', icon: Heart, color: 'text-pink-600 bg-pink-50' },
    { id: 'shopping', label: 'Shopping', icon: ShoppingBag, color: 'text-blue-600 bg-blue-50' },
    { id: 'food', label: 'Food', icon: Utensils, color: 'text-orange-600 bg-orange-50' }
  ];

  // Handle theme selection toggle
  const toggleTheme = (themeId: string) => {
    setFormData(prev => ({
      ...prev,
      themes: prev.themes.includes(themeId)
        ? prev.themes.filter(t => t !== themeId)
        : [...prev.themes, themeId]
    }));
  };

  // Generate mock AI itinerary based on user input
  const generateMockItinerary = (input: TripInput): TripPlan => {
    const selectedDestination = destinations.find(d => d.id === input.destination)?.name || 'Unknown';
    
    // Generate activities based on selected themes
    const allActivities = input.themes.flatMap(theme => 
      activitiesByTheme[theme] || []
    );

    // Create itinerary days
    const itinerary = Array.from({ length: input.duration }, (_, index) => {
      const dayActivities = allActivities
        .slice(index * 2, (index + 1) * 2)
        .concat(allActivities.slice(0, Math.max(0, 2 - (allActivities.length - index * 2))));
      
      return {
        day: index + 1,
        date: new Date(Date.now() + index * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN'),
        activities: dayActivities,
        totalCost: dayActivities.reduce((sum, activity) => sum + activity.cost, 0)
      };
    });

    // Calculate cost breakdown
    const totalActivitiesCost = itinerary.reduce((sum, day) => sum + day.totalCost, 0);
    const accommodation = Math.floor(input.budget * 0.4);
    const transport = Math.floor(input.budget * 0.2);
    const food = Math.floor(input.budget * 0.25);
    const activities = Math.min(totalActivitiesCost, input.budget - accommodation - transport - food);

    return {
      id: `trip_${Date.now()}`,
      destination: selectedDestination,
      startingPlace: input.startingPlace,
      startDate: input.startDate,
      duration: input.duration,
      totalBudget: input.budget,
      themes: input.themes,
      itinerary,
      costBreakdown: {
        accommodation,
        transport,
        activities,
        food,
        total: accommodation + transport + activities + food
      },
      smartAdjustments: [
        '🌧️ Rain expected on Day 2 - Indoor activities recommended',
        '🎉 Local festival on Day 3 - Special cultural events added',
        '💡 Peak hours avoided for popular attractions'
      ]
    };
  };

  // Handle form submission and itinerary generation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.destination || formData.themes.length === 0 || !formData.startingPlace || !formData.startDate) {
      alert('Please fill in all required fields: starting place, start date, destination and at least one travel theme');
      return;
    }

    setIsGenerating(true);
    setTripInput(formData);

    // Simulate AI processing delay
    setTimeout(() => {
      const generatedPlan = generateMockItinerary(formData);
      setTripPlan(generatedPlan);
      setIsGenerating(false);
      setCurrentPage('itinerary');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Plan Your Perfect Trip
          </h1>
          <p className="text-xl text-gray-600">
            Tell us your preferences and let our AI create a personalized itinerary
          </p>
        </motion.div>

        {/* Trip Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="flex justify-between space-x-4">
              {/* Starting Place Input */}
              <div className="flex-1 space-y-4">
              <label className="flex items-center space-x-2 text-lg font-semibold text-gray-700">
                <MapPin className="h-5 w-5 text-purple-600" />
                <span>Starting From</span>
              </label>
              <input
                type="text"
                value={formData.startingPlace}
                onChange={(e) => setFormData(prev => ({ ...prev, startingPlace: e.target.value }))}
                placeholder="Enter your starting location"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              </div>

              {/* Trip Start Date */}
              <div className="flex-1 space-y-4">
              <label className="flex items-center space-x-2 text-lg font-semibold text-gray-700">
                <Calendar className="h-5 w-5 text-orange-600" />
                <span>Trip Start Date</span>
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              </div>
            </div>

            {/* Budget Input */}
            <div className="space-y-4">
              <label className="flex items-center space-x-2 text-lg font-semibold text-gray-700">
                <IndianRupee className="h-5 w-5 text-green-600" />
                <span>{t('budget')}</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData(prev => ({ ...prev, budget: Number(e.target.value) }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="10000"
                  max="500000"
                  step="5000"
                />
                <div className="mt-2 flex justify-between text-sm text-gray-500">
                  <span>₹10,000</span>
                  <span>₹5,00,000</span>
                </div>
              </div>
            </div>

            {/* Duration Input */}
            <div className="space-y-4">
              <label className="flex items-center space-x-2 text-lg font-semibold text-gray-700">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span>{t('tripDuration')}</span>
              </label>
              <select
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: Number(e.target.value) }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {[2, 3, 4, 5, 6, 7, 8, 9, 10].map(days => (
                  <option key={days} value={days}>{days} Days</option>
                ))}
              </select>
            </div>

            

            {/* Destination Selection */}
            <div className="space-y-4">
              <label className="flex items-center space-x-2 text-lg font-semibold text-gray-700">
                <MapPin className="h-5 w-5 text-red-600" />
                <span>{t('destination')}</span>
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                {destinations.map(dest => (
                  <motion.div
                    key={dest.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative overflow-hidden rounded-lg cursor-pointer border-2 transition-all duration-300 ${
                      formData.destination === dest.id
                        ? 'border-blue-500 ring-2 ring-blue-200'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, destination: dest.id }))}
                  >
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-2 left-2 text-white">
                      <h3 className="font-semibold">{dest.name}</h3>
                      <p className="text-sm opacity-90">{dest.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Travel Themes */}
            <div className="space-y-4">
              <label className="flex items-center space-x-2 text-lg font-semibold text-gray-700">
                <Heart className="h-5 w-5 text-pink-600" />
                <span>{t('travelThemes')}</span>
              </label>
              <div className="grid md:grid-cols-3 gap-4">
                {themes.map(theme => (
                  <motion.div
                    key={theme.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                      formData.themes.includes(theme.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => toggleTheme(theme.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${theme.color}`}>
                        <theme.icon className="h-5 w-5" />
                      </div>
                      <span className="font-medium text-gray-700">{theme.label}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isGenerating ? (
                <div className="flex items-center justify-center space-x-2">
                  <Sparkles className="h-5 w-5 animate-spin" />
                  <span>Generating AI Itinerary...</span>
                </div>
              ) : (
                t('generateItinerary')
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default TripInputPage;