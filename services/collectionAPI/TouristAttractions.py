import requests
import os
import time
from dotenv import load_dotenv
from utils import get_coordinates

load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

PLACES_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json"


def fetch_attractions(location, radius=4000):
    """Fetch tourist attractions from Google Places API"""
    results = []
    params = {
        "location": location,
        "radius": radius,
        "type": "tourist_attraction",
        "keyword": "museum|park|temple|monument|garden|beach",
        "key": GOOGLE_API_KEY
    }

    while True:
        response = requests.get(PLACES_URL, params=params)
        data = response.json()
        results.extend(data.get("results", []))

        next_page = data.get("next_page_token")
        if not next_page:
            break
        time.sleep(2)
        params = {"pagetoken": next_page, "key": GOOGLE_API_KEY}

    return results

def get_photo_url(place, maxwidth=400):
    """Return photo URL for a place if available"""
    photos = place.get("photos")
    if photos:
        ref = photos[0].get("photo_reference")
        return f"https://maps.googleapis.com/maps/api/place/photo?maxwidth={maxwidth}&photoreference={ref}&key={GOOGLE_API_KEY}"
    return None

def normalize_attraction(place):
    """Normalize attraction data"""
    return {
        "name": place.get("name"),
        "rating": place.get("rating", 0),
        "reviews": place.get("user_ratings_total", 0),
        "address": place.get("vicinity"),
        "location": place.get("geometry", {}).get("location"),
        "photo_url": get_photo_url(place)
    }

def filter_out_non_attractions(places):
    blacklist = ["tours", "travel", "agency", "transport"]
    filtered = []
    for p in places:
        name = p.get("name", "").lower()
        if not any(word in name for word in blacklist):
            filtered.append(p)
    return filtered


def filter_attractions(places):
    """Filter attractions: rating >=4, reviews >=500"""
    return [
        normalize_attraction(p) for p in places
        if p.get("rating", 0) >= 4 and p.get("user_ratings_total", 0) >= 500
    ]

def show_attractions(attractions, top_n=5):
    """Display top attractions"""
    sorted_attractions = sorted(attractions, key=lambda x: (x["rating"], x["reviews"]), reverse=True)
    for i, a in enumerate(sorted_attractions[:top_n], 1):
        print(f"{i}. {a['name']} ({a['rating']}⭐, {a['reviews']} reviews)")
        print(f"   📍 {a['address']}")
        if a['photo_url']:
            print(f"   🖼 Photo: {a['photo_url']}")

if __name__ == "__main__":
    city = input("Enter city/area: ")
    city_location = get_coordinates(city)
    raw_attractions = fetch_attractions(city_location)
    cleaned_attractions = filter_out_non_attractions(raw_attractions)
    attractions = filter_attractions(cleaned_attractions)

    print(f"\nTop Tourist Attractions in {city}:\n")
    show_attractions(attractions, top_n=5)
