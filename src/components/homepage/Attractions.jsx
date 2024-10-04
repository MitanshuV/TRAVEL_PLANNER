import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/firebase"; // Firestore setup
import { FaStar } from "react-icons/fa"; // Import icons
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import BlurFade from "../ui/blur-fade";

const AttractionCard = ({ attraction }) => {
  if (!attraction) return null; // Add null check to avoid rendering without data
  return (
    <div className="w-[250px] bg-white rounded-lg shadow-lg p-4">
      <img
        src={
          attraction.photos_sample?.[0]?.photo_url_large || "placeholder.jpg"
        }
        alt={attraction.name}
        className="rounded-lg h-32 w-full object-cover"
      />
      <h2 className="text-xl font-semibold mt-2">{attraction.name}</h2>
      <p className="text-sm text-gray-700">{attraction.short_description}</p>
      <p className="text-sm text-gray-800">Rating: {attraction.rating}</p>
      <p className="text-sm text-gray-800">
        Number: {attraction.phone_numbers?.[0] || "No numbers available"}
      </p>
      <p className="text-sm text-gray-800">
        Location: {attraction.full_address}
      </p>
    </div>
  );
};

const Attractions = () => {
  const [attractions, setAttractions] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [submittedText, setSubmittedText] = useState("");
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [fetchedAttraction, setAttraction] = useState(null); // State to hold attraction

  useEffect(() => {
    const fetchAttractionsFromFirestore = async () => {
      try {
        const attractionCollection = collection(db, "Attractions");
        const attractionSnapshot = await getDocs(attractionCollection);
        const attractionList = attractionSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Fetched attractions from Firestore:", attractionList);
        setAttractions(attractionList);
      } catch (error) {
        console.error("Error fetching attractions from Firestore:", error);
      }
    };

    fetchAttractionsFromFirestore();
  }, []);

  useEffect(() => {
    const fetchAutocomplete = async () => {
      if (searchText.length < 2) {
        setAutocompleteResults([]);
        return;
      }

      const url = `https://google-place-autocomplete-and-place-info.p.rapidapi.com/maps/api/place/autocomplete/json?input=${searchText}`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "f6615b4a07msh5d8f2482b153b70p1d9b3ajsnc00c5e79f418", // Replace with your actual key
          "x-rapidapi-host":
            "google-place-autocomplete-and-place-info.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        
        setAutocompleteResults(result.predictions || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAutocomplete();
  }, [searchText]);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const handleSuggestionClick = async (suggestion) => {
    setSearchText(suggestion.description);
    setAutocompleteResults([]);
    setSubmittedText(suggestion.description);

    const url = `https://unlimited-google-maps.p.rapidapi.com/api/maps/simple?query=${encodeURIComponent(
      suggestion.description
    )}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "f6615b4a07msh5d8f2482b153b70p1d9b3ajsnc00c5e79f418", // Replace with your actual key
        "x-rapidapi-host": "unlimited-google-maps.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setAttraction(result.items[0]); // Store fetched attraction
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BlurFade delay={0.25 + 0.05} inView>
      <div className="mb-8">
        <motion.div
          className="explore-attractions mb-2 mt-5 px-4 py-6 bg-gray-50 rounded-lg shadow-lg flex justify-between items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold">Explore Attraction</h2>
          <button
            onClick={openDialog}
            className="bg-purple-600 text-white rounded-md py-2 px-4 hover:bg-purple-500 transition duration-200"
          >
            Search
          </button>
        </motion.div>

        {/* Attraction Cards */}
        <div className="relative overflow-x-auto scrollbar-hide scroll-smooth px-4">
          <motion.div
            className="flex space-x-4 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {attractions.map((attraction) => (
              <motion.article
                key={attraction.id}
                className="w-[250px] flex-shrink-0 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
              >
                <section className="flex flex-col h-full">
                  <header className="p-4">
                    <div className="h-12 flex items-center justify-center">
                      <h2 className="text-xl font-semibold text-center text-gray-900 line-clamp-2">
                        {attraction.name}
                      </h2>
                    </div>

                    <img
                      src={attraction.photos?.[0]?.src || "placeholder.jpg"}
                      alt={attraction.name}
                      className="rounded-lg my-2 object-cover h-32 w-full"
                    />
                  </header>

                  <div className="flex-grow p-4">
                    <p className="text-sm text-gray-700 mb-3">
                      {attraction.description}
                    </p>
                    <div className="flex items-center">
                      <FaMapMarkerAlt
                        className="text-blue-500 mr-2"
                        aria-label="Location"
                      />
                      <p className="text-sm text-gray-800">{attraction.city}</p>
                    </div>
                  </div>

                  <footer className="p-4">
                    <Link to={attraction.place_link}>
                      <Button className="bg-blue-500 text-white w-full py-2 rounded-md hover:bg-blue-600 transition duration-200">
                        View
                      </Button>
                    </Link>
                  </footer>
                </section>
              </motion.article>
            ))}
          </motion.div>
        </div>

        {/* Dialog (Modal) for Search */}
        {isDialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={closeDialog}
                className="absolute top-0 right-2 text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>

              <form className="flex flex-col mt-3 mb-4">
                <input
                  type="text"
                  placeholder="Search attractions..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {autocompleteResults.length > 0 && (
                  <ul className="border border-gray-300 rounded-lg mt-2 max-h-48 overflow-y-auto">
                    {autocompleteResults.map((result) => (
                      <li
                        key={result.place_id}
                        onClick={() => handleSuggestionClick(result)}
                        className="cursor-pointer hover:bg-gray-200 p-2"
                      >
                        {result.description}
                      </li>
                    ))}
                  </ul>
                )}
              </form>

              {fetchedAttraction && (
                <AttractionCard attraction={fetchedAttraction} />
              )}
            </motion.div>
          </div>
        )}
      </div>
    </BlurFade>
  );
};

export default Attractions;
