import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MapContainer from '../maps/MapContainer';
import FilterBar from '../maps/FilterBar';
import { useApp } from '../../context/AppContext';
import { mockPlaces } from '../../data/mockPlaces';
import type { Place } from '../../types';

export const MapsPage: React.FC = () => {
  const { t, tripInput } = useApp();
  const [selectedCategories, setSelectedCategories] = useState<Set<Place['category']>>(new Set(['all']));
  const [highlightedPlace, setHighlightedPlace] = useState<string | null>(null);
  const [isFilterBarCollapsed, setIsFilterBarCollapsed] = useState(false);
  const [shouldFitBounds, setShouldFitBounds] = useState(true);

  // Map configuration based on selected destination
  const mapConfig = {
    center:
      tripInput?.destination === 'mumbai'
        ? [19.076, 72.8777] as [number, number]
        : tripInput?.destination === 'delhi'
        ? [28.6139, 77.209] as [number, number]
        : tripInput?.destination === 'goa'
        ? [15.2993, 74.124] as [number, number]
        : [20.5937, 78.9629] as [number, number], // Default India center
    zoom: 12,
  };

  // Reset map bounds when destination or categories change
  useEffect(() => {
    setShouldFitBounds(true);
  }, [tripInput?.destination, selectedCategories]);

  // Filter places based on selected categories and destination
  const filteredPlaces = mockPlaces.filter((place) => {
    const matchesDestination = !tripInput?.destination || place.destinationId === tripInput.destination;
    const matchesCategory = selectedCategories.has('all') || selectedCategories.has(place.category);
    return matchesDestination && matchesCategory;
  });

  // Calculate place counts for each category
  const placeCounts = {
    all: filteredPlaces.length,
    hotel: filteredPlaces.filter((p) => p.category === 'hotel').length,
    restaurant: filteredPlaces.filter((p) => p.category === 'restaurant').length,
    attraction: filteredPlaces.filter((p) => p.category === 'attraction').length,
  };

  // Handle category toggle
  const handleCategoryToggle = (category: Place['category']) => {
    const newCategories = new Set(selectedCategories);
    if (category === 'all') {
      newCategories.clear();
      newCategories.add('all');
    } else {
      newCategories.delete('all');
      if (newCategories.has(category)) {
        newCategories.delete(category);
      } else {
        newCategories.add(category);
      }
      if (newCategories.size === 0) {
        newCategories.add('all');
      }
    }
    setSelectedCategories(newCategories);
  };

  // Handle place highlighting
  const handlePlaceHighlight = (placeId: string | null) => {
    setHighlightedPlace(placeId);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {t('explorePlaces')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('mapDescription')}
          </p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <FilterBar
            visibleCategories={selectedCategories}
            onCategoryToggle={handleCategoryToggle}
            isCollapsed={isFilterBarCollapsed}
            onToggleCollapse={() => setIsFilterBarCollapsed(!isFilterBarCollapsed)}
            placeCounts={placeCounts}
          />
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden h-[600px]"
        >
          <MapContainer
            center={mapConfig.center}
            zoom={mapConfig.zoom}
            places={filteredPlaces}
            visibleCategories={selectedCategories}
            highlightedPlaces={highlightedPlace ? [highlightedPlace] : []}
            shouldFitBounds={shouldFitBounds}
            onBoundsFitted={() => setShouldFitBounds(false)}
            onPlaceHighlight={handlePlaceHighlight}
          />
        </motion.div>

        {/* Map Statistics */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {placeCounts.hotel}
            </div>
            <div className="text-gray-600">Hotels</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {placeCounts.restaurant}
            </div>
            <div className="text-gray-600">Restaurants</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {placeCounts.attraction}
            </div>
            <div className="text-gray-600">Attractions</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
