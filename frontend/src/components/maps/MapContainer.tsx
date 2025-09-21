import React, { useEffect } from "react";
import {
  MapContainer as LeafletMap,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import MarkerPopup from "./MarkerPopup";
import type { Place } from "../../types";

interface Props {
  center: [number, number];
  zoom: number;
  places: Place[];
  visibleCategories: Set<Place["category"]>;
  highlightedPlaces: string[];
  shouldFitBounds: boolean;
  onBoundsFitted: () => void;
  onPlaceHighlight: (id: string | null) => void;
}

// Fix default marker icons (otherwise they don’t show)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const FitBounds: React.FC<{ places: Place[]; shouldFit: boolean; onDone: () => void }> = ({
  places,
  shouldFit,
  onDone,
}) => {
  const map = useMap();

  useEffect(() => {
    if (shouldFit && places.length > 0) {
      const bounds = L.latLngBounds(places.map((p) => [p.lat, p.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
      onDone();
    }
  }, [shouldFit, places, map, onDone]);

  return null;
};

const MapContainer: React.FC<Props> = ({
  center,
  zoom,
  places,
  visibleCategories,
  highlightedPlaces,
  shouldFitBounds,
  onBoundsFitted,
  onPlaceHighlight,
}) => {
  return (
    <LeafletMap
      center={center}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom
      attributionControl={false}
    >
      {/* Required TileLayer */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FitBounds
        places={places}
        shouldFit={shouldFitBounds}
        onDone={onBoundsFitted}
      />

      {places
        .filter(
          (p) =>
            visibleCategories.has("all") || visibleCategories.has(p.category)
        )
        .map((place) => (
          <Marker
            key={place.id}
            position={[place.lat, place.lng]}
            eventHandlers={{
              click: () => onPlaceHighlight(place.id),
            }}
          >
            <Popup>
              <MarkerPopup
                place={place}
                isHighlighted={highlightedPlaces.includes(place.id)}
              />
            </Popup>
          </Marker>
        ))}
    </LeafletMap>
  );
};

export default MapContainer;
