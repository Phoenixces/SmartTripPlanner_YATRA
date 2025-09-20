import requests
import os
import time
from dotenv import load_dotenv
from utils import get_coordinates

load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

PLACES_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json"

DIET_KEYWORDS = {
    "1": "veg",
    "2": "non veg",
    "3": "vegan",
    "4": "jain"
}


def fetch_restaurants(location, keyword="", radius=4000):
    """Fetch restaurants from Google Places API with optional keyword filter"""
    results = []
    params = {
        "location": location,
        "radius": radius,
        "type": "restaurant",
        "keyword": keyword,
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

def normalize_restaurant(place):
    """Normalize restaurant data"""
    return {
        "name": place.get("name"),
        "rating": place.get("rating", 0),
        "reviews": place.get("user_ratings_total", 0),
        "address": place.get("vicinity"),
        "location": place.get("geometry", {}).get("location"),
        "photo_url": get_photo_url(place)
    }

def filter_restaurants(places):
    """Filter restaurants: rating >=4, reviews >=50"""
    return [
        normalize_restaurant(p) for p in places
        if p.get("rating", 0) >= 4 and p.get("user_ratings_total", 0) >= 50
    ]

def show_restaurants(restaurants, top_n=5):
    """Display top restaurants"""
    sorted_restaurants = sorted(restaurants, key=lambda x: (x["rating"], x["reviews"]), reverse=True)
    for i, r in enumerate(sorted_restaurants[:top_n], 1):
        print(f"{i}. {r['name']} ({r['rating']}⭐, {r['reviews']} reviews)")
        print(f"   📍 {r['address']}")
        if r['photo_url']:
            print(f"   🖼 Photo: {r['photo_url']}")

if __name__ == "__main__":
    city = input("Enter city/area: ")

    print("\nChoose dietary preference:")
    print("1 = Veg | 2 = Non-Veg | 3 = Vegan | 4 = Jain | Leave empty for all")
    diet_choice = input("Enter choice: ").strip()

    keyword = DIET_KEYWORDS.get(diet_choice, "")

    city_location = get_coordinates(city)
    raw_restaurants = fetch_restaurants(city_location, keyword)
    restaurants = filter_restaurants(raw_restaurants)

    print(f"\nTop Restaurants in {city}:\n")
    show_restaurants(restaurants, top_n=5)
