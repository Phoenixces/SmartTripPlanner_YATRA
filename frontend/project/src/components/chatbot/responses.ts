interface ResponsePattern {
  pattern: RegExp;
  responses: string[];
}

export const responses: ResponsePattern[] = [
  {
    pattern: /^hello|hi|hey|namaste/i,
    responses: [
      "Namaste! I'm Sathi, your travel companion. How can I assist you today?",
      "Hello! I'm here to help you plan your perfect trip in India. What would you like to know?",
    ],
  },
  {
    pattern: /weather|temperature|climate/i,
    responses: [
      "The weather varies greatly across India. Which destination are you interested in? I can help you understand the best time to visit.",
      "Weather is an important factor in planning your trip. Generally, October to March is the best time to visit most parts of India.",
    ],
  },
  {
    pattern: /cost|budget|price|expensive/i,
    responses: [
      "India offers options for every budget! Typically, budget travelers can manage with ₹2000-3000 per day, while mid-range expenses are around ₹5000-7000 per day.",
      "Travel costs in India are quite reasonable. Accommodations range from ₹500 to ₹15000+ per night, depending on your preferences.",
    ],
  },
  {
    pattern: /food|cuisine|eat|restaurant/i,
    responses: [
      "Indian cuisine is diverse and delicious! Each region has its specialties. Do try local street food but from hygienic places.",
      "From spicy curries to sweet desserts, India's food scene is amazing! Remember to drink only bottled water and eat at clean establishments.",
    ],
  },
  {
    pattern: /transport|travel|commute/i,
    responses: [
      "India has various transport options - flights, trains, buses, and cabs. Trains are great for long distances and experiencing the local culture!",
      "For intercity travel, trains and flights are best. Within cities, try auto-rickshaws, Metro (in major cities), or book reliable cab services.",
    ],
  },
  {
    pattern: /safety|safe|security/i,
    responses: [
      "India is generally safe for tourists. Just use common sense - keep valuables secure, avoid late-night travel in unfamiliar areas, and trust your instincts.",
      "Most tourist places are quite safe. Stay aware of your surroundings, avoid isolated areas at night, and keep emergency numbers handy.",
    ],
  },
  {
    pattern: /places|destination|visit|attraction/i,
    responses: [
      "India has countless amazing destinations! The Golden Triangle (Delhi-Agra-Jaipur) is popular. What interests you - culture, nature, or adventure?",
      "From the Taj Mahal to Kerala's backwaters, India has so much to offer! Tell me your interests, and I'll suggest some places.",
    ],
  },
  {
    pattern: /goa.*beach|beach.*goa/i,
    responses: [
      "Goa's beaches are amazing! North Goa beaches like Baga and Calangute are popular for nightlife and water sports. South Goa beaches like Palolem and Agonda are perfect for peaceful retreats.",
      "Some must-visit beaches in Goa: Anjuna (flea market), Vagator (sunset views), Candolim (water sports), and Colva (pristine waters). Which interests you?",
    ],
  },
  {
    pattern: /goa.*season|best time.*goa|when.*visit.*goa/i,
    responses: [
      "The best time to visit Goa is from November to February when the weather is perfect (24-32°C) and perfect for beach activities. The Sunburn Festival happens in December!",
      "October to March is ideal for Goa. Avoid June to September (monsoon) unless you love the rain and lush green landscapes. December-January has perfect weather but is peak tourist season.",
    ],
  },
  {
    pattern: /goa.*food|food.*goa|what.*eat.*goa/i,
    responses: [
      "Goan cuisine is a must-try! Don't miss Fish Curry Rice, Vindaloo, Xacuti, and Bebinca (dessert). The seafood here is fantastic - try the local fish thali!",
      "Visit Martin's Corner or Britto's for authentic Goan food. Try local specialties like Chorizo (Goan sausages), Cafreal, and Feni (local cashew/coconut spirit). Beach shacks offer great fresh seafood!",
    ],
  },
  {
    pattern: /goa.*activity|things.*do.*goa|water.*sport.*goa/i,
    responses: [
      "Goa offers tons of activities! Try water sports at Baga (jet-skiing, parasailing), visit spice plantations, explore Old Goa churches, or join a sunset cruise. Casino boats are popular too!",
      "Popular activities: Beach hopping, water sports, visiting Fort Aguada, Saturday Night Market at Arpora, beach parties, scuba diving at Grande Island, and exploring Portuguese heritage.",
    ],
  },
  {
    pattern: /goa.*stay|hotel.*goa|resort.*goa|accommodation.*goa/i,
    responses: [
      "Goa has options for every budget! Luxury resorts in South Goa (Grand Hyatt, Taj), boutique hotels in Anjuna/Vagator, or budget-friendly hostels in Arambol/Palolem. Where would you prefer?",
      "North Goa (Baga/Calangute) is great for nightlife lovers. South Goa resorts offer more privacy. Hostels in Anjuna/Vagator are perfect for backpackers. Beach huts in Palolem for a unique experience!",
    ],
  },
  {
    pattern: /goa.*transport|travel.*goa|how.*reach.*goa/i,
    responses: [
      "You can reach Goa by flight (Dabolim Airport), train (Madgaon/Vasco), or bus. Within Goa, rent a scooter (₹300-500/day), taxi, or use local buses. Bike rental needs a valid license!",
      "For local travel, renting a scooter is popular. Taxis and auto-rickshaws are available but negotiate rates. Many hotels offer airport transfers. The local bus network connects major beaches.",
    ],
  },
  {
    pattern: /goa.*cost|budget.*goa|expense.*goa/i,
    responses: [
      "Goa can fit any budget! Budget travelers can manage at ₹1500-2000/day, mid-range ₹4000-6000/day. Hostels from ₹500/night, mid-range hotels ₹2000-5000, luxury resorts ₹10000+.",
      "Off-season (June-September) is cheaper. Peak season (December-January) sees prices double. Save money by staying in hostels, eating at beach shacks, and using scooter rentals.",
    ],
  },
];
