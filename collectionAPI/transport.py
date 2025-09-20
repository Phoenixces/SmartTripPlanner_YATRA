import requests
import os
import time
from dotenv import load_dotenv
from html import unescape
from utils import get_coordinates

load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

DIRECTIONS_URL = "https://maps.googleapis.com/maps/api/directions/json"
GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json"


def get_directions(origin, destination, mode="transit", transit_type=None):
    """Fetch directions from Google Directions API"""
    params = {
        "origin": origin,
        "destination": destination,
        "mode": mode,
        "key": GOOGLE_API_KEY
    }

    if mode == "transit" and transit_type:
        # Map user choice to Google transit_mode
        transit_map = {"1": "bus", "2": "subway", "3": "train"}
        params["transit_mode"] = transit_map.get(transit_type, "bus")
        params["departure_time"] = int(time.time())  # now

    response = requests.get(DIRECTIONS_URL, params=params).json()
    if response["status"] != "OK":
        print(f"Could not fetch directions ({mode}):", response["status"])
        return None

    route = response["routes"][0]["legs"][0]
    steps_info = []

    for step in route["steps"]:
        if step["travel_mode"] == "TRANSIT":
            transit = step["transit_details"]
            line_info = transit.get("line", {})
            line_name = line_info.get("name") or line_info.get("short_name") or "Unknown Line"
            vehicle = line_info.get("vehicle", {}).get("type", "Transit")
            departure_stop = transit["departure_stop"]["name"]
            arrival_stop = transit["arrival_stop"]["name"]
            departure_time = transit["departure_time"]["text"]
            arrival_time = transit["arrival_time"]["text"]
            steps_info.append(
                f"Take {vehicle} {line_name} from {departure_stop} at {departure_time} "
                f"and get off at {arrival_stop} at {arrival_time}"
            )
        else:
            # Walking / Driving
            instructions = unescape(step["html_instructions"])
            steps_info.append(f"Walk/Drive: {instructions} ({step['distance']['text']}, {step['duration']['text']})")

    return {
        "mode": mode,
        "distance": route["distance"]["text"],
        "duration": route["duration"]["text"],
        "steps": steps_info
    }

if __name__ == "__main__":
    origin_place = input("Enter origin location: ")
    destination_place = input("Enter destination location: ")

    print("\nChoose transport mode:")
    print("1 = Walking | 2 = Driving | 3 = Transit")
    mode_choice = input("Enter mode (1/2/3): ")

    mode_map = {"1": "walking", "2": "driving", "3": "transit"}
    mode = mode_map.get(mode_choice, "transit")

    transit_type = None
    if mode == "transit":
        print("\nChoose transit type (for transit mode only):")
        print("1 = Bus | 2 = Subway/Metro | 3 = Train")
        transit_type = input("Enter transit type (1/2/3): ")

    origin_coords = get_coordinates(origin_place)
    destination_coords = get_coordinates(destination_place)

    directions = get_directions(origin_coords, destination_coords, mode, transit_type)
    if directions:
        print(f"\n--- {mode.capitalize()} ---")
        print(f"Distance: {directions['distance']}, Duration: {directions['duration']}")
        print("\nStep-by-step directions:")
        for step in directions["steps"]:
            print("-", step)
