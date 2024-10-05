import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

const PersonalizedTrip = () => {
  const [hotels, setHotels] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [tripDetails, setTripDetails] = useState({
    destination: "Paris, France",
    Days: "5 Days",
    Budget: "Luxury",
    travelers: 2,
  });

  // State to keep track of selected items day-wise
  const [itinerary, setItinerary] = useState({
    day1: { hotels: [], attractions: [], clubs: [] },
    day2: { hotels: [], attractions: [], clubs: [] },
    day3: { hotels: [], attractions: [], clubs: [] },
    day4: { hotels: [], attractions: [], clubs: [] },
    day5: { hotels: [], attractions: [], clubs: [] },
  });

  const [selectedDay, setSelectedDay] = useState("day1");

  useEffect(() => {
    const fetchHotelsFromDB = async () => {
      try {
        const hotelsCollectionRef = collection(db, "Hotels");
        const querySnapshot = await getDocs(hotelsCollectionRef);
        const hotelsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHotels(hotelsData);
      } catch (error) {
        console.error("Error fetching hotels from Firestore:", error);
      }
    };

    const fetchAttractionsFromFirestore = async () => {
      try {
        const attractionCollection = collection(db, "Attractions");
        const attractionSnapshot = await getDocs(attractionCollection);
        const attractionList = attractionSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAttractions(attractionList);
      } catch (error) {
        console.error("Error fetching attractions from Firestore:", error);
      }
    };

    const fetchClubsFromFirestore = async () => {
      try {
        const clubsCollection = collection(db, "Clubs");
        const clubsSnapshot = await getDocs(clubsCollection);
        const clubsList = clubsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClubs(clubsList);
      } catch (error) {
        console.error("Error fetching clubs from Firestore:", error);
      }
    };

    fetchHotelsFromDB();
    fetchAttractionsFromFirestore();
    fetchClubsFromFirestore();
  }, []);

  function handleHotel(hotel) {
    setItinerary((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        hotels: [...prev[selectedDay].hotels, hotel],
      },
    }));
  }

  function handleClub(club) {
    setItinerary((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        clubs: [...prev[selectedDay].clubs, club],
      },
    }));
  }

  function handleAtt(attraction) {
    setItinerary((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        attractions: [...prev[selectedDay].attractions, attraction],
      },
    }));
  }

  // Handle adding itinerary
  const handleIti = () => {
    console.log("Itinerary Created:", itinerary);
  };

  return (
    <div className="flex flex-wrap min-h-screen">
      {/* Left Container - Trip Details, Hotel, Attraction, and Club Cards */}
      <div className="w-full md:w-1/2 bg-blue-50 p-6 space-y-6">
        {/* Trip Details Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-2">Trip Details</h2>
          <div className="space-y-1">
            <div className="text-lg">
              <strong>Destination:</strong> {tripDetails.destination}
            </div>
            <div className="text-lg">
              <strong>Duration:</strong> {tripDetails.Days}
            </div>
            <div className="text-lg">
              <strong>Budget:</strong> {tripDetails.Budget}
            </div>
            <div className="text-lg">
              <strong>Travelers:</strong> {tripDetails.travelers}
            </div>
          </div>
        </div>

        {/* Day Selector */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Select Day:</h2>
          {Object.keys(itinerary).map((day) => (
            <Button
              key={day}
              className={`mr-2 ${
                selectedDay === day ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => setSelectedDay(day)}
            >
              {day.replace("day", "Day ")}
            </Button>
          ))}
        </div>

        {/* Hotels Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Hotels</h2>
          <div className="flex space-x-4 overflow-x-scroll scrollbar-hide pb-4">
            {hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="min-w-[280px] bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out p-6"
              >
                <h3 className="text-lg font-semibold mb-2">{hotel.name}</h3>
                <p className="text-gray-600 text-sm">{hotel.full_address}</p>
                <p className="text-gray-800 mt-3">
                  <span className="font-bold">{hotel.rating}</span> ⭐️ -{" "}
                  <span className="text-gray-500">
                    ({hotel.review_count} reviews)
                  </span>
                </p>
                <Button
                  className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => handleHotel(hotel)}
                >
                  Add Hotel
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Attractions Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Attractions</h2>
          <div className="flex space-x-4 overflow-x-scroll scrollbar-hide pb-4">
            {attractions.map((attraction) => (
              <div
                key={attraction.id}
                className="min-w-[280px] bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out p-6"
              >
                <h3 className="text-lg font-semibold mb-2">
                  {attraction.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {attraction.full_address}
                </p>
                <p className="text-gray-800 mt-3">
                  <span className="font-bold">{attraction.rating ||  "4.3"}</span> ⭐️ -{" "}
                  <span className="text-gray-500">
                    ({attraction.review_count || "200"} reviews)
                  </span>
                </p>
                <Button
                  className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => handleAtt(attraction)}
                >
                  Add Attraction
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Clubs Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Clubs</h2>
          <div className="flex space-x-4 overflow-x-scroll scrollbar-hide pb-4">
            {clubs.map((club) => (
              <div
                key={club.id}
                className="min-w-[280px] bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out p-6"
              >
                <h3 className="text-lg font-semibold mb-2">{club.name}</h3>
                <p className="text-gray-600 text-sm">{club.full_address}</p>
                <p className="text-gray-800 mt-3">
                  <span className="font-bold">{club.rating}</span> ⭐️ -{" "}
                  <span className="text-gray-500">
                    ({club.review_count} reviews)
                  </span>
                </p>
                <Button
                  className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => handleClub(club)}
                >
                  Add Club
                </Button>
              </div>
            ))}
          </div>
        </div>

        <Button
          className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white"
          onClick={handleIti}
        >
          Create Itinerary
        </Button>
      </div>

      {/* Right Container - Day-wise Itinerary */}
      <div className="w-full md:w-1/2 bg-white-100 p-6 overflow-auto">
        <h2 className="text-2xl font-bold mb-4">Your Itinerary</h2>
        {Object.keys(itinerary).map((day) => (
          <div key={day} className="mb-6 p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">
              {day.replace("day", "Day ")}
            </h3>
            <h4 className="text-lg font-semibold">Hotels:</h4>
            {itinerary[day].hotels.map((hotel) => (
              <div key={hotel.id} className="mt-2">
                <div className="p-4 border border-gray-300 rounded-lg">
                  <h4 className="text-lg font-semibold">{hotel.name}</h4>
                  <p className="text-gray-600">{hotel.full_address}</p>
                  <p className="text-gray-800">
                    Rating: <strong>{hotel.rating}</strong> ⭐️
                  </p>
                  <p>
                    Review: <strong>{hotel.review_count} Reviews</strong>
                  </p>
                </div>
              </div>
            ))}
            <h4 className="text-lg font-semibold mt-4">Attractions:</h4>
            {itinerary[day].attractions.map((attraction) => (
              <div key={attraction.id} className="mt-2">
                <div className="p-4 border border-gray-300 rounded-lg">
                  <h4 className="text-lg font-semibold">{attraction.name}</h4>
                  <p className="text-gray-600">{attraction.full_address}</p>
                  <p className="text-gray-800">
                    Rating: <strong>{attraction.rating}</strong> ⭐️
                  </p>
                </div>
              </div>
            ))}
            <h4 className="text-lg font-semibold mt-4">Clubs:</h4>
            {itinerary[day].clubs.map((club) => (
              <div key={club.id} className="mt-2">
                <div className="p-4 border border-gray-300 rounded-lg">
                  <h4 className="text-lg font-semibold">{club.name}</h4>
                  <p className="text-gray-600">{club.full_address}</p>
                  <p className="text-gray-800">
                    Rating: <strong>{club.rating}</strong> ⭐️
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalizedTrip;
