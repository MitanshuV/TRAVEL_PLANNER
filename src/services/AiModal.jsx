import { GoogleGenerativeAI } from "@google/generative-ai";

// const googlePlaceApi = AIzaSyDcyJ7s3Sv36hFGcU6QBvqS_9iS7BHF4fI000;
const googleGeminiApi = "AIzaSyDcyJ7s3Sv36hFGcU6QBvqS_9iS7BHF4fI";
const genAI = new GoogleGenerativeAI(googleGeminiApi);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate travel plan for location:  Las Vegas for 3 days for couple with cheap budget, Give me a hotels option with list with hotelName, hotel Address, price, hotel img Url, geo coordinates, reviews, ratings and description and suggest itinerary with placename, placeDetail, place img url, geo coordinates, ticket pricing, rating, time travel for location for 3 days with each day plan with best time to visit in JSON format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '## Las Vegas 3-Day Budget Trip for a Couple:\n\n**Hotels:**\n\n**Option 1:**  \n* **Hotel Name:**  Circus Circus Hotel & Casino\n* **Address:** 2880 Las Vegas Blvd S, Las Vegas, NV 89109\n* **Price:**  From $30/night\n* **Hotel Img Url:**  https://images.trvl-media.com/hotels/2000000/1980000/1975600/1975595/1975595_62.jpg\n* **Geo Coordinates:**  36.1251°, -115.1708°\n* **Reviews:** 3.5/5 stars\n* **Ratings:**  Good\n* **Description:**  Circus Circus Hotel & Casino offers budget-friendly rooms with an old-school Vegas vibe. It features an indoor theme park and carnival midway, ideal for couples looking for entertainment on a budget.\n\n**Option 2:**  \n* **Hotel Name:**  The D Las Vegas\n* **Address:** 301 Fremont St, Las Vegas, NV 89101\n* **Price:**  From $40/night\n* **Hotel Img Url:**  https://images.trvl-media.com/hotels/3000000/2980000/2977600/2977526/2977526_62.jpg\n* **Geo Coordinates:**  36.1693°, -115.1434°\n* **Reviews:** 4/5 stars\n* **Ratings:**  Very good\n* **Description:**  The D Las Vegas offers modern rooms and a convenient location on Fremont Street. It features a lively casino, a rooftop pool, and a variety of dining options.\n\n**Option 3:**\n* **Hotel Name:**  The Golden Nugget\n* **Address:** 129 E Fremont St, Las Vegas, NV 89101\n* **Price:**  From $60/night\n* **Hotel Img Url:**  https://images.trvl-media.com/hotels/1000000/990000/986800/986799/986799_62.jpg\n* **Geo Coordinates:**  36.1688°, -115.1418°\n* **Reviews:** 4.5/5 stars\n* **Ratings:**  Excellent\n* **Description:**  The Golden Nugget is known for its upscale rooms, a luxurious spa, and a famous shark tank. It offers a more sophisticated experience while still being budget-friendly compared to other casinos on the Strip.\n\n\n**Itinerary:**\n\n```json\n{\n  "day1": {\n    "morning": {\n      "placeName": "Fremont Street Experience",\n      "placeDetail": "Enjoy the vibrant atmosphere, live music, and dazzling light shows on the pedestrian-friendly Fremont Street Experience.  Have breakfast at a local cafe nearby.",\n      "placeImgURL": "https://www.visitlasvegas.com/media/2202/freemontstreet-experience.jpg",\n      "geoCoordinates": "36.1697°, -115.1436°",\n      "ticketPricing": "Free",\n      "rating": 4.5,\n      "timeTravel": "9:00 AM - 12:00 PM"\n    },\n    "afternoon": {\n      "placeName": "Neon Museum",\n      "placeDetail": "Explore the history of Las Vegas through its iconic neon signs at the Neon Museum.",\n      "placeImgURL": "https://www.visitlasvegas.com/media/11912/neon-museum.jpg",\n      "geoCoordinates": "36.1722°, -115.1356°",\n      "ticketPricing": "$25 per person",\n      "rating": 4.8,\n      "timeTravel": "1:00 PM - 4:00 PM"\n    },\n    "evening": {\n      "placeName": "Dinner at a Fremont Street Restaurant",\n      "placeDetail": "Enjoy a budget-friendly dinner at a restaurant on Fremont Street, like the Heart Attack Grill or Binion\'s Gambling Hall.",\n      "placeImgURL": "https://www.visitlasvegas.com/media/12056/heart-attack-grill.jpg",\n      "geoCoordinates": "36.1688°, -115.1427°",\n      "ticketPricing": "Varies",\n      "rating": 4,\n      "timeTravel": "7:00 PM - 9:00 PM"\n    }\n  },\n  "day2": {\n    "morning": {\n      "placeName": "Hoover Dam",\n      "placeDetail": "Take a day trip to Hoover Dam, one of the most iconic landmarks in the US.  A shuttle bus or a guided tour is recommended.",\n      "placeImgURL": "https://www.visitlasvegas.com/media/2820/hoover-dam-overview.jpg",\n      "geoCoordinates": "36.0136°, -114.9182°",\n      "ticketPricing": "Varies",\n      "rating": 5,\n      "timeTravel": "9:00 AM - 12:00 PM"\n    },\n    "afternoon": {\n      "placeName": "Las Vegas Strip",\n      "placeDetail": "Walk along the Las Vegas Strip and marvel at the dazzling resorts, casinos, and entertainment venues.  Enjoy the free shows offered by some resorts.",\n      "placeImgURL": "https://www.visitlasvegas.com/media/2057/las-vegas-strip.jpg",\n      "geoCoordinates": "36.1149°, -115.1726°",\n      "ticketPricing": "Free",\n      "rating": 4.5,\n      "timeTravel": "1:00 PM - 4:00 PM"\n    },\n    "evening": {\n      "placeName": "Bellagio Fountain Show",\n      "placeDetail": "Watch the spectacular Bellagio Fountain Show, a free water and music extravaganza.",\n      "placeImgURL": "https://www.visitlasvegas.com/media/2035/bellagio-fountains-show.jpg",\n      "geoCoordinates": "36.1146°, -115.1725°",\n      "ticketPricing": "Free",\n      "rating": 4.8,\n      "timeTravel": "8:00 PM - 9:00 PM"\n    }\n  },\n  "day3": {\n    "morning": {\n      "placeName": "Valley of Fire State Park",\n      "placeDetail": "Explore the beautiful red rock formations and stunning scenery at Valley of Fire State Park.",\n      "placeImgURL": "https://www.visitlasvegas.com/media/11916/valley-of-fire.jpg",\n      "geoCoordinates": "36.3305°, -114.8075°",\n      "ticketPricing": "$10 per vehicle",\n      "rating": 4.9,\n      "timeTravel": "9:00 AM - 12:00 PM"\n    },\n    "afternoon": {\n      "placeName": "Linq Promenade",\n      "placeDetail": "Enjoy the shops, restaurants, and attractions at the Linq Promenade, including the High Roller Observation Wheel.",\n      "placeImgURL": "https://www.visitlasvegas.com/media/12081/the-linq-promenade.jpg",\n      "geoCoordinates": "36.1193°, -115.1707°",\n      "ticketPricing": "Varies",\n      "rating": 4,\n      "timeTravel": "1:00 PM - 4:00 PM"\n    },\n    "evening": {\n      "placeName": "Farewell Dinner",\n      "placeDetail": "Enjoy a farewell dinner at one of the many affordable restaurants on the Strip or downtown.  Reflect on your trip.",\n      "placeImgURL": "https://www.visitlasvegas.com/media/2106/restaurants-las-vegas.jpg",\n      "geoCoordinates": "36.1146°, -115.1725°",\n      "ticketPricing": "Varies",\n      "rating": 4,\n      "timeTravel": "7:00 PM - 9:00 PM"\n    }\n  }\n}\n```\n\n**Important Notes:**\n\n* This itinerary is a suggestion, and you can adjust it to your preferences.\n* Always check the latest prices and schedules before booking.\n* Use public transportation or ride-sharing services to save money.\n* Take advantage of free activities, such as walking the Strip, exploring Fremont Street, and enjoying the Bellagio Fountain Show.\n* Pack light and avoid bringing unnecessary items. \n* Stay hydrated and use sunscreen in the desert climate.\n\nEnjoy your budget-friendly trip to Las Vegas!',
        },
      ],
    },
  ],
});
 
export const AI_PROMPT =
  "Generate travel plan for Location: {location} for {totaldays} days for {traveler} with {budget} budget, Give me a hotels option with list with hotelName, hotel Address, price, hotel img Url, geo coordinates, reviews, ratings and description and suggest itinerary with placename, placeDetail, place img url, geo coordinates, ticket pricing, rating, time travel for location for {totaldays} days with each day plan with best time to visit in json format";
