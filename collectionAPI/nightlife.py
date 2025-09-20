import requests
import time
from utils import get_coordinates
import os
from dotenv import load_dotenv

load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

PLACES_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
PHOTO_URL = "https://maps.googleapis.com/maps/api/place/photo"

# Nightlife types
NIGHTLIFE_TYPES = ["night_club", "bar"]

def fetch_nightlife(location, radius=5000):
    """Fetch nightclubs and bars from Google Places API"""
    results = []
    for place_type in NIGHTLIFE_TYPES:
        params = {
            "location": location,
            "radius": radius,
            "type": place_type,
            "key": GOOGLE_API_KEY
        }
        while True:
            response = requests.get(PLACES_URL, params=params).json()
            results.extend(response.get("results", []))
            next_page = response.get("next_page_token")
            if not next_page:
                break
            time.sleep(2)
            params["pagetoken"] = next_page
    return results

def get_photo_url(photo_reference, maxwidth=400):
    """Generate Google Maps photo URL"""
    return f"{PHOTO_URL}?maxwidth={maxwidth}&photoreference={photo_reference}&key={GOOGLE_API_KEY}"

def normalize_place(place):
    """Normalize place info to a common structure"""
    photo = get_photo_url(place["photos"][0]["photo_reference"]) if place.get("photos") else None
    return {
        "name": place.get("name"),
        "rating": place.get("rating", 0),
        "reviews": place.get("user_ratings_total", 0),
        "address": place.get("vicinity"),
        "photo": photo,
        "source": "Google Maps"
    }

def filter_nightlife(places, min_rating=4, min_reviews=50):
    """Filter places based on rating and number of reviews"""
    return [
        normalize_place(p) for p in places
        if p.get("rating", 0) >= min_rating and p.get("user_ratings_total", 0) >= min_reviews
    ]

def show_nightlife(places, top_n=10):
    """Display top nightlife places"""
    places_sorted = sorted(places, key=lambda x: (x["rating"], x["reviews"]), reverse=True)
    print(f"\nTop {top_n} Nightlife spots:")
    for i, place in enumerate(places_sorted[:top_n], 1):
        print(f"{i}. {place['name']} ({place['rating']}⭐, {place['reviews']} reviews)")
        print(f"   📍 {place['address']}")
        if place["photo"]:
            print(f"   🖼 Photo: {place['photo']}")

if __name__ == "__main__":
    city = input("Enter city for nightlife search: ")
    location = get_coordinates(city)
    print("\nFetching nightlife recommendations...")
    nightlife_places = fetch_nightlife(location)
    filtered = filter_nightlife(nightlife_places)
    show_nightlife(filtered, top_n=10)
