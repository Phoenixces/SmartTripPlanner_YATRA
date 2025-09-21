import streamlit as st
import google.generativeai as genai
import requests
from geopy.geocoders import Nominatim

# Configure keys
genai.configure(api_key="")
OPENWEATHER_API_KEY = ""

st.set_page_config(page_title="Smart Travellers – AI Travel Assistant", page_icon="🌍", layout="wide")

st.title("🌍 Smart Travellers – AI Travel Assistant")
st.markdown("Your personal AI companion for smarter, faster, and more delightful travel planning ✨")

def get_weather(city_name):
    try:
        geolocator = Nominatim(user_agent="smart-travellers")
        location = geolocator.geocode(city_name)
        if not location:
            return None, "⚠️ Could not fetch location details."

        lat, lon = location.latitude, location.longitude
        url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={OPENWEATHER_API_KEY}&units=metric"
        response = requests.get(url).json()

        if "main" not in response:
            return None, "⚠️ Weather data not available."

        weather_info = {
            "location": location.address,
            "temp": response["main"]["temp"],
            "humidity": response["main"]["humidity"],
            "condition": response["weather"][0]["description"],
            "wind_speed": response["wind"]["speed"]
        }

        formatted = (
            f"📍 Location: {weather_info['location']}\n"
            f"🌡️ Temperature: {weather_info['temp']}°C\n"
            f"💧 Humidity: {weather_info['humidity']}%\n"
            f"☁️ Condition: {weather_info['condition'].capitalize()}\n"
            f"🌬️ Wind Speed: {weather_info['wind_speed']} m/s"
        )
        return weather_info, formatted

    except Exception as e:
        return None, f"⚠️ Error fetching weather: {str(e)}"

def get_gemini_response(user_input, city=None):
    try:
        model = genai.GenerativeModel("gemini-2.0-flash")
        weather_info, weather_text = (None, "")

        if city:
            weather_info, weather_text = get_weather(city)

        system_prompt = f"""
        You are Smart Travellers – an advanced AI-powered travel planner.
        Always provide detailed, engaging, and practical travel guidance.
        Personalize recommendations based on user needs like budget, trip duration, themes, and interests.
        Respond with a friendly, professional tone and enrich answers with local insights, cultural tips, and real-time adaptability.
        
        Current weather details for {city if city else "destination"}:
        {weather_text}

        If the weather is unsuitable for outdoor plans (rain, storm, heavy snow, extreme heat), 
        clearly mention the reason and suggest exciting indoor or alternate activities.
        """

        response = model.generate_content([
            {"role": "user", "parts": [system_prompt]},
            {"role": "model", "parts": ["Understood. I'll act as a world-class travel planner."]},
            {"role": "user", "parts": [user_input]}
        ])

        return f"{weather_text}\n\n{response.text}" if city else response.text

    except Exception as e:
        return f"⚠️ Oops! Something went wrong: {str(e)}"

if "messages" not in st.session_state:
    st.session_state.messages = []

for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

user_prompt = st.chat_input("✈️ Ask anything about your next trip (e.g., 'Plan 3 days in Goa')")
if user_prompt:
    with st.chat_message("user"):
        st.markdown(user_prompt)
    st.session_state.messages.append({"role": "user", "content": user_prompt})

    # Naively extract city (last word assumption, better: use NLP/regex)
    words = user_prompt.split()
    city = words[-1] if len(words) > 0 else None

    with st.chat_message("assistant"):
        with st.spinner("Checking weather & planning your trip..."):
            reply = get_gemini_response(user_prompt, city=city)
            st.markdown(reply)
    st.session_state.messages.append({"role": "assistant", "content": reply})

with st.sidebar:
    st.image("smart.png", caption="Smart Travellers", width=100)
    st.header("About Us")
    st.write("Smart Travellers is your AI-powered premium travel planner – creating unforgettable journeys tailored to your style, budget, and dreams.")
    st.subheader("Popular Plans")
    plans = ["🏖 Beach Escapes", "⛰ Mountain Adventures", "🎭 Cultural Journeys", 
             "👨‍👩‍👧 Family Vacations", "💎 Luxury Retreats", "💸 Budget Trips"]
    for plan in plans:
        st.write(plan)

st.markdown("---")
st.markdown("✨ Powered by Smart Travellers – Travel Smarter, Live Better 🌍")
