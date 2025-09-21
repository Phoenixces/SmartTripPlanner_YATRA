import requests
import os
import time
from dotenv import load_dotenv
from utils import get_coordinates
from bs4 import BeautifulSoup
from urllib.parse import quote
import re

load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

PLACES_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"

PRICE_LEVELS = {
    1: "Cheap",
    2: "Moderate",
    3: "Expensive",
    4: "Luxury"
}

# ---------- Booking.com Scraper ---------- #
def get_booking_search_url(hotel_name, city):
    query = f"{hotel_name} {city}"
    query = query.replace(" ", "%20")
    print("Booking.com search URL query:", f"https://www.booking.com/searchresults.html?ss={query}")
    return f"https://www.booking.com/searchresults.html?ss={query}"

def parse_price(price_str):
    """Convert price string to numeric value"""
    price_str = price_str.replace(",", "").replace("₹", "").strip()
    match = re.search(r"\d+", price_str)
    return int(match.group()) if match else None

def get_first_hotel_url(hotel_name, city):
    url = get_booking_search_url(hotel_name, city)
    headers = {"User-Agent": "Mozilla/5.0"}
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, "lxml")
    
    with open("debug_booking.html", "w", encoding="utf-8") as f:
        f.write(soup.prettify())
        
    link_tags = soup.select('a[data-testid="title-link"]')
    print(f"Found {len(link_tags)} link tags")
    for link_tag in link_tags:
        print("Link tag:", link_tag)
        url = link_tag.get("href")
        if url.startswith("https://www.booking.com/hotel/in"):
            print(url)

    first_result = soup.select_one(
        "div[data-testid='property-card-container'] a[data-testid='property-card-desktop-single-image']"
    )
    print("First result:", first_result)
    if first_result:
        href = first_result.get("href").split("?")[0]
        print("Hotel URL:", href)
        hotel_name_tag = first_result.select_one("div[data-testid='title']")
        print("Hotel Name:", hotel_name_tag.text.strip() if hotel_name_tag else hotel_name)
        name = hotel_name_tag.text.strip() if hotel_name_tag else hotel_name
        return "https://www.booking.com" + href, name
    return None, None

def scrape_hotel_details(hotel_name, city):
    hotel_url, name = get_first_hotel_url(hotel_name, city)
    if not hotel_url:
        return {"error": "Hotel not found"}

    headers = {"User-Agent": "Mozilla/5.0"}
    response = requests.get(hotel_url, headers=headers)
    soup = BeautifulSoup(response.text, "lxml")
    
    with open("hotel2.html", "w", encoding="utf-8") as f:
        f.write(soup.prettify())
        
    # Get hotel name    
    hotel_name_tag = soup.select_one("h2#hp_hotel_name") or soup.select_one("h2")
    hotel_name_final = hotel_name_tag.text.strip() if hotel_name_tag else name
    print(f"Hotel found: {hotel_name_final}")
    
    rooms = []
    # Booking sometimes uses divs or tables for rooms; try multiple selectors
    room_rows = soup.select("table.hprt-table tr") or soup.select("div[data-testid='room-row']")
    for room in room_rows:
        room_type_tag = room.select_one(".hprt-roomtype-icon-link") or room.select_one("span[data-testid='room-name']")
        price_tag = room.select_one(".bui-price-display__value") or room.select_one("span[data-testid='price-and-discounted-price']")
        if room_type_tag and price_tag:
            numeric_price = parse_price(price_tag.text.strip())
            rooms.append({
                "room_type": room_type_tag.text.strip(),
                "price_text": price_tag.text.strip(),
                "price_value": numeric_price
            })

    return {
        "hotel_name": hotel_name_final,
        "hotel_url": hotel_url,
        "rooms": rooms
    }
    
# ---------- Google Places API ---------- #
def fetch_hotels(location, radius=4000):
    results = []
    params = {
        "location": location,
        "radius": radius,
        "type": "lodging",
        "keyword": "hotel",
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
    photos = place.get("photos")
    if photos:
        ref = photos[0].get("photo_reference")
        return f"https://maps.googleapis.com/maps/api/place/photo?maxwidth={maxwidth}&photoreference={ref}&key={GOOGLE_API_KEY}"
    return None

def normalize_hotel(place):
    return {
        "name": place.get("name"),
        "rating": place.get("rating", 0),
        "reviews": place.get("user_ratings_total", 0),
        "price_level": PRICE_LEVELS.get(place.get("price_level")),
        "raw_price_level": place.get("price_level"),
        "address": place.get("vicinity"),
        "location": place.get("geometry", {}).get("location"),
        "photo_url": get_photo_url(place)
    }

def filter_hotels(places, budget=None):
    hotels = [
        normalize_hotel(p) for p in places
        if p.get("rating", 0) >= 4 and p.get("user_ratings_total", 0) >= 1000
    ]
    if budget:
        hotels = [
            h for h in hotels
            if h["raw_price_level"] == budget or h["raw_price_level"] is None
        ]
    return hotels

# ---------- Display & Filter ---------- #
def show_hotels_with_prices(hotels, city, budget_filter=None, top_n=5):
    sorted_hotels = sorted(hotels, key=lambda x: (x["rating"], x["reviews"]), reverse=True)
    for i, h in enumerate(sorted_hotels[:top_n], 1):
        price = f" | Price Level: {h['price_level']}" if h['price_level'] else ""
        print(f"{i}. {h['name']} ({h['rating']}⭐, {h['reviews']} reviews){price})")
        print(f"   📍 {h['address']}")
        if h['photo_url']:
            print(f"   🖼 Photo: {h['photo_url']}")

        # Booking.com details

        booking_details = scrape_hotel_details(h['name'], city)
        print("   Booking.com URL:", booking_details)
        filtered_rooms = booking_details.get("rooms", [])
        if budget_filter:
            # Filter by Booking.com price ranges (approximate)
            if budget_filter == 1:  # Cheap < 2000
                filtered_rooms = [r for r in filtered_rooms if r['price_value'] and r['price_value'] < 2000]
            elif budget_filter == 2:  # Moderate 2000-4000
                filtered_rooms = [r for r in filtered_rooms if r['price_value'] and 2000 <= r['price_value'] <= 4000]
            elif budget_filter == 3:  # Expensive 4000-8000
                filtered_rooms = [r for r in filtered_rooms if r['price_value'] and 4000 < r['price_value'] <= 8000]
            elif budget_filter == 4:  # Luxury >8000
                filtered_rooms = [r for r in filtered_rooms if r['price_value'] and r['price_value'] > 8000]

        if filtered_rooms:
            print("   Rooms & Prices from Booking.com:")
            for room in filtered_rooms:
                print(f"     - {room['room_type']}: {room['price_text']}")
        break
        print("")

# ---------- Main ---------- #
if __name__ == "__main__":
    city = input("Enter city: ")
    budget_choice = input("Choose budget (1=Cheap, 2=Moderate, 3=Expensive, 4=Luxury, leave empty for all): ").strip()
    budget_choice = int(budget_choice) if budget_choice else None

    city_location = get_coordinates(city)
    raw_hotels = fetch_hotels(city_location)
    hotels = filter_hotels(raw_hotels, budget_choice)

    print(f"\nTop Hotels in {city} with Booking.com prices:\n")
    show_hotels_with_prices(hotels, city, budget_filter=budget_choice, top_n=5)
