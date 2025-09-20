import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, IndianRupee, Hotel, UtensilsCrossed, Camera } from 'lucide-react';
import { Place } from '../../data/mockPlaces';

// Props interface for MarkerPopup component
interface MarkerPopupProps {
  place: Place;
  isHighlighted?: boolean;
}

/**
 * MarkerPopup Component
 * 
 * Renders an attractive card-style popup for map markers.
 * Displays place information including image, name, category, rating, and cost.
 * 
 * Features:
 * - Category-specific icons and colors
 * - Star ratings display
 * - Cost information with Indian Rupee symbol
 * - Highlighted styling for smart suggestions
 * - Responsive image loading with fallback
 * - Smooth animations with Framer Motion
 * 
 * @param place - Place object containing all place details
 * @param isHighlighted - Whether this place is highlighted (smart suggestion)
 */
const MarkerPopup: React.FC<MarkerPopupProps> = ({ place, isHighlighted = false }) => {
  // Category configuration with icons and colors
  const categoryConfig = {
    attraction: {
      icon: Camera,
      label: 'Attraction',
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      gradient: 'from-blue-500 to-blue-600'
    },
    hotel: {
      icon: Hotel,
      label: 'Hotel',
      color: 'text-green-600 bg-green-50 border-green-200',
      gradient: 'from-green-500 to-green-600'
    },
    restaurant: {
      icon: UtensilsCrossed,
      label: 'Restaurant',
      color: 'text-orange-600 bg-orange-50 border-orange-200',
      gradient: 'from-orange-500 to-orange-600'
    }
  };

  const config = categoryConfig[place.category];
  const IconComponent = config.icon;

  // Format cost display
  const formatCost = (cost?: number) => {
    if (!cost || cost === 0) return 'Free';
    if (cost < 1000) return `₹${cost}`;
    return `₹${(cost / 1000).toFixed(1)}k`;
  };

  // Generate star rating display
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`h-3 w-3 ${
              index < fullStars
                ? 'text-yellow-400 fill-current'
                : index === fullStars && hasHalfStar
                ? 'text-yellow-400 fill-current opacity-50'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-xs text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`w-full max-w-sm bg-white rounded-xl shadow-lg overflow-hidden ${
        isHighlighted ? 'ring-2 ring-red-400 ring-opacity-75' : ''
      }`}
    >
      {/* Place Image */}
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={place.image}
          alt={place.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            // Fallback image if the original fails to load
            (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=400';
          }}
        />
        
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        
        {/* Highlighted badge */}
        {isHighlighted && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg"
          >
            ✨ Smart Pick
          </motion.div>
        )}
        
        {/* Category badge */}
        <div className={`absolute top-3 left-3 ${config.color} px-3 py-1 rounded-full border-2 backdrop-blur-sm`}>
          <div className="flex items-center space-x-1">
            <IconComponent className="h-4 w-4" />
            <span className="text-xs font-semibold">{config.label}</span>
          </div>
        </div>
      </div>

      {/* Place Details */}
      <div className="p-5">
        {/* Place name and rating */}
        <div className="mb-3">
          <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1">
            {place.name}
          </h3>
          {renderStars(place.rating)}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {place.description}
        </p>

        {/* Location and cost */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-2 text-gray-500 flex-1 min-w-0">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm truncate">{place.address}</span>
          </div>
          
          <div className="flex items-center space-x-1 ml-3">
            {place.cost && place.cost > 0 ? (
              <div className={`flex items-center space-x-1 bg-gradient-to-r ${config.gradient} text-white px-3 py-1 rounded-full`}>
                <IndianRupee className="h-4 w-4" />
                <span className="text-sm font-semibold">{formatCost(place.cost)}</span>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full">
                <span className="text-sm font-semibold">Free</span>
              </div>
            )}
          </div>
        </div>

        {/* Additional info for hotels */}
        {place.category === 'hotel' && (
          <div className="mt-3 pt-2 border-t border-gray-100">
            <span className="text-xs text-gray-500 italic">Per night starting from</span>
          </div>
        )}

        {/* Additional info for restaurants */}
        {place.category === 'restaurant' && (
          <div className="mt-3 pt-2 border-t border-gray-100">
            <span className="text-xs text-gray-500 italic">Average cost for two</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MarkerPopup;