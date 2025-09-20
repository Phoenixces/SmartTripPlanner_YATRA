import React, { useEffect, useRef } from 'react';
import { MapContainer as LeafletMapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { motion } from 'framer-motion';
import { Icon, LatLngBounds } from 'leaflet';
import { Place } from '../../data/mockPlaces';
import MarkerPopup from './MarkerPopup';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Configure default marker icons
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Modern, attractive custom marker icons for different categories
// Using SVG for crisp, scalable icons that look great on all devices
const createCustomIcon = (category: Place['category'], isHighlighted = false) => {
  const colors = {
    attraction: isHighlighted ? '#EF4444' : '#3B82F6',
    hotel: isHighlighted ? '#EF4444' : '#10B981',
    restaurant: isHighlighted ? '#EF4444' : '#F97316',
  };

  // Category-specific icons for better visual distinction
  const icons = {
    attraction: '📸', // Camera emoji for attractions
    hotel: '🏨', // Hotel emoji for accommodations
    restaurant: '🍽️', // Restaurant emoji for dining
  };

  const color = colors[category];
  const categoryIcon = icons[category];
  
  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg width="32" height="45" viewBox="0 0 32 45" xmlns="http://www.w3.org/2000/svg">
        <!-- Drop shadow for depth -->
        <ellipse cx="16" cy="42" rx="8" ry="3" fill="rgba(0,0,0,0.2)"/>
        
        <!-- Main marker shape with gradient -->
        <defs>
          <linearGradient id="grad${category}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${color};stop-opacity:0.8" />
          </linearGradient>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.3)"/>
          </filter>
        </defs>
        
        <!-- Marker body -->
        <path d="M16 0C7.2 0 0 7.2 0 16C0 24.8 16 45 16 45S32 24.8 32 16C32 7.2 24.8 0 16 0Z" 
              fill="url(#grad${category})" filter="url(#shadow)"/>
        
        <!-- White circle background for icon -->
        <circle cx="16" cy="16" r="10" fill="white" opacity="0.95"/>
        
        <!-- Category icon -->
        <text x="16" y="20" text-anchor="middle" font-size="12" fill="${color}">${categoryIcon}</text>
        
        <!-- Highlight ring for smart suggestions -->
        ${isHighlighted ? `<circle cx="16" cy="16" r="12" fill="none" stroke="#EF4444" stroke-width="2" opacity="0.8"/>` : ''}
      </svg>
    `)}`,
    iconSize: [32, 45],
    iconAnchor: [16, 45],
    popupAnchor: [0, -45],
    className: isHighlighted ? 'highlighted-marker' : '',
  });
};

// Component to handle map bounds and zoom
interface MapControllerProps {
  places: Place[];
  shouldFitBounds: boolean;
  onBoundsFitted: () => void;
}

const MapController: React.FC<MapControllerProps> = ({ places, shouldFitBounds, onBoundsFitted }) => {
  const map = useMap();

  useEffect(() => {
    if (shouldFitBounds && places.length > 0) {
      const bounds = new LatLngBounds(places.map(place => [place.lat, place.lng]));
      map.fitBounds(bounds, { padding: [20, 20] });
      onBoundsFitted();
    }
  }, [shouldFitBounds, places, map, onBoundsFitted]);

  return null;
};

// Main MapContainer component props
interface MapContainerProps {
  places: Place[];
  center: [number, number];
  zoom: number;
  visibleCategories: Set<Place['category']>;
  highlightedPlaces: string[];
  shouldFitBounds: boolean;
  onBoundsFitted: () => void;
  className?: string;
}

/**
 * MapContainer Component
 * 
 * Main map component that renders the Leaflet map with markers for places.
 * Handles different marker styles based on category and highlight status.
 * 
 * Features:
 * - Custom markers for different place categories (attraction, hotel, restaurant)
 * - Highlighted markers for smart suggestions
 * - Interactive popups with place details
 * - Automatic bounds fitting for itinerary locations
 * - Responsive design with full-width layout
 * 
 * @param places - Array of places to display on the map
 * @param center - Map center coordinates [lat, lng]
 * @param zoom - Initial zoom level
 * @param visibleCategories - Set of categories to show markers for
 * @param highlightedPlaces - Array of place IDs to highlight
 * @param shouldFitBounds - Whether to fit map bounds to all places
 * @param onBoundsFitted - Callback when bounds have been fitted
 * @param className - Additional CSS classes
 */
const MapContainer: React.FC<MapContainerProps> = ({
  places,
  center,
  zoom,
  visibleCategories,
  highlightedPlaces,
  shouldFitBounds,
  onBoundsFitted,
  className = ''
}) => {
  // Filter places based on visible categories
  const visiblePlaces = places.filter(place => visibleCategories.has(place.category));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative ${className}`}
    >
      <LeafletMapContainer
        center={center}
        zoom={zoom}
        className="w-full h-full rounded-lg shadow-lg"
        zoomControl={true}
        scrollWheelZoom={true}
      >
        {/* OpenStreetMap tile layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Map controller for bounds management */}
        <MapController
          places={visiblePlaces}
          shouldFitBounds={shouldFitBounds}
          onBoundsFitted={onBoundsFitted}
        />

        {/* Render markers for visible places */}
        {visiblePlaces.map((place) => {
          const isHighlighted = highlightedPlaces.includes(place.id);
          
          return (
            <Marker
              key={place.id}
              position={[place.lat, place.lng]}
              icon={createCustomIcon(place.category, isHighlighted)}
            >
              <Popup
                closeButton={false}
                className="custom-popup"
                maxWidth={300}
                minWidth={250}
              >
                <MarkerPopup place={place} isHighlighted={isHighlighted} />
              </Popup>
            </Marker>
          );
        })}
      </LeafletMapContainer>

      {/* Custom popup styles */}
      <style jsx global>{`
        .custom-popup .leaflet-popup-content-wrapper {
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          padding: 0;
          overflow: hidden;
        }
        
        .custom-popup .leaflet-popup-content {
          margin: 0;
          padding: 0;
        }
        
        .custom-popup .leaflet-popup-tip {
          background: white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .leaflet-container {
          font-family: inherit;
        }
      `}</style>
    </motion.div>
  );
};

export default MapContainer;