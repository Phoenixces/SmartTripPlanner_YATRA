import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Hotel, UtensilsCrossed, Filter, X } from 'lucide-react';
import { Place } from '../../data/mockPlaces';

// Props interface for FilterBar component
interface FilterBarProps {
  visibleCategories: Set<Place['category']>;
  onCategoryToggle: (category: Place['category']) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  placeCounts: Record<Place['category'], number>;
}

/**
 * FilterBar Component
 * 
 * Renders a filter bar for toggling visibility of different place categories on the map.
 * Features collapsible design for mobile responsiveness.
 * 
 * Features:
 * - Category toggle buttons with icons and counts
 * - Collapsible design for mobile screens
 * - Smooth animations with Framer Motion
 * - Visual feedback for active/inactive states
 * - Category-specific colors and icons
 * 
 * @param visibleCategories - Set of currently visible categories
 * @param onCategoryToggle - Callback when a category is toggled
 * @param isCollapsed - Whether the filter bar is collapsed (mobile)
 * @param onToggleCollapse - Callback to toggle collapse state
 * @param placeCounts - Count of places in each category
 */
const FilterBar: React.FC<FilterBarProps> = ({
  visibleCategories,
  onCategoryToggle,
  isCollapsed,
  onToggleCollapse,
  placeCounts
}) => {
  // Category configuration with icons, labels, and colors
  const categories: Array<{
    id: Place['category'];
    label: string;
    icon: React.ComponentType<any>;
    color: string;
    activeColor: string;
  }> = [
    {
      id: 'attraction',
      label: 'Attractions',
      icon: Camera,
      color: 'text-blue-600 border-blue-200 bg-blue-50',
      activeColor: 'text-white bg-blue-600 border-blue-600'
    },
    {
      id: 'hotel',
      label: 'Hotels',
      icon: Hotel,
      color: 'text-green-600 border-green-200 bg-green-50',
      activeColor: 'text-white bg-green-600 border-green-600'
    },
    {
      id: 'restaurant',
      label: 'Restaurants',
      icon: UtensilsCrossed,
      color: 'text-orange-600 border-orange-200 bg-orange-50',
      activeColor: 'text-white bg-orange-600 border-orange-600'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
    >
      {/* Filter Header - Always visible */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Filter Places</h3>
        </div>
        
        {/* Collapse toggle button - visible on mobile */}
        <button
          onClick={onToggleCollapse}
          className="md:hidden p-1 rounded-md hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? (
            <Filter className="h-5 w-5 text-gray-600" />
          ) : (
            <X className="h-5 w-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Filter Content - Collapsible on mobile */}
      <AnimatePresence>
        {(!isCollapsed || window.innerWidth >= 768) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {categories.map((category) => {
                  const isActive = visibleCategories.has(category.id);
                  const count = placeCounts[category.id] || 0;
                  const IconComponent = category.icon;

                  return (
                    <motion.button
                      key={category.id}
                      onClick={() => onCategoryToggle(category.id)}
                      className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-200 ${
                        isActive ? category.activeColor : category.color
                      } hover:shadow-md`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-2">
                        <IconComponent className="h-4 w-4" />
                        <span className="font-medium text-sm">{category.label}</span>
                      </div>
                      
                      {/* Place count badge */}
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          isActive
                            ? 'bg-white bg-opacity-20 text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {count}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Active filters summary */}
              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>
                    Showing {Array.from(visibleCategories).reduce((sum, cat) => sum + (placeCounts[cat] || 0), 0)} places
                  </span>
                  
                  {/* Clear all filters button */}
                  {visibleCategories.size < categories.length && (
                    <button
                      onClick={() => {
                        categories.forEach(cat => {
                          if (!visibleCategories.has(cat.id)) {
                            onCategoryToggle(cat.id);
                          }
                        });
                      }}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Show All
                    </button>
                  )}
                  
                  {visibleCategories.size === categories.length && (
                    <button
                      onClick={() => {
                        categories.forEach(cat => onCategoryToggle(cat.id));
                      }}
                      className="text-gray-600 hover:text-gray-700 font-medium"
                    >
                      Clear All
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FilterBar;