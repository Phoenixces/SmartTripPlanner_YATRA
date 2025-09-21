import requests
import os
from dotenv import load_dotenv

load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json"

def get_coordinates(place_name):
    """
    Convert a place name (city, area, landmark) to lat,lng coordinates.
    
    Returns:
        str: "lat,lng"
    """
    params = {"address": place_name, "key": GOOGLE_API_KEY}
    response = requests.get(GEOCODE_URL, params=params).json()
    
    if response["status"] == "OK" and response.get("results"):
        location = response["results"][0]["geometry"]["location"]
        return f"{location['lat']},{location['lng']}"
    else:
        raise ValueError(f"Could not fetch coordinates for '{place_name}'")
