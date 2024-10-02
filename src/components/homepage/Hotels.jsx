import React, { useEffect, useState } from "react";
import { db } from "../../firebase"; // Import your Firestore configuration
import { addDoc, collection, getDocs } from "firebase/firestore"; // Import Firestore methods
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaPhoneAlt, FaStar } from "react-icons/fa";
import { Button } from "../ui/button";
import BlurFade from "../ui/blur-fade";

// HotelCard Component to display individual hotel details
const HotelCard = ({ hotel }) => {
  return (
    <div className="w-[250px] bg-white rounded-lg shadow-lg p-4">
      <img
        src={hotel.photos_sample[0]?.photo_url}
        alt={hotel.name}
        className="rounded-lg h-32 w-full object-cover"
      />
      <h2 className="text-xl font-semibold mt-2">{hotel.name}</h2>
      <p className="text-sm text-gray-700">{hotel.short_description}</p>
      <p className="text-sm text-gray-800">Rating: {hotel.rating}</p>
      <p className="text-sm text-gray-800">
        Number: {hotel.phone_numbers[0] || "No numbers available"}
      </p>
      <p className="text-sm text-gray-800">Location: {hotel.full_address}</p>
    </div>
  );
};

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [submittedText, setSubmittedText] = useState("");
  const [fetchedHotel, setFetchedHotel] = useState(null); // State to hold fetched hotel data

  // Fetch hotels from Firestore
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
        console.log(hotelsData);
      } catch (error) {
        console.error("Error fetching hotels from Firestore:", error);
      }
    };

    fetchHotelsFromDB();
  }, []);

  // Open/Close Dialog
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => {
    setSearchText("");
    setAutocompleteResults([]);
    setSubmittedText("");
    setFetchedHotel(null); // Reset fetched hotel when dialog is closed
    setIsDialogOpen(false);
  };

  // Fetch autocomplete suggestions on input change
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
            "294b89f91cmsha7e8f918caa956fp18c66djsn3c69d1bdbeeb", // Replace with your actual key
          "x-rapidapi-host":
            "google-place-autocomplete-and-place-info.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setAutocompleteResults(result.predictions || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAutocomplete();
  }, [searchText]);

  // Handle suggestion click
  const handleSuggestionClick = async (suggestion) => {
    setSearchText(suggestion.description);
    setAutocompleteResults([]);
    setSubmittedText(suggestion.description);
    console.log("Searching for:", suggestion.description);

    // Fetch data for the submitted text
    const url = `https://unlimited-google-maps.p.rapidapi.com/api/maps/simple?query=${encodeURIComponent(
      suggestion.description
    )}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "1ef1dc9277msh89ab270fe74a7f7p1abcd9jsn8a50e59e5b0b", // Replace with your actual key
        "x-rapidapi-host": "unlimited-google-maps.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json(); // Assuming the response is in JSON format
      console.log(result); // Log the fetched result

      // Set the fetched hotel data
      setFetchedHotel(result.items[0]); // Set the first item or adapt as needed
    } catch (error) {
      console.error(error); // Log any errors
    }
  };

  // Render data
  return (
    <BlurFade delay={0.25 + 0.05} inView>
      <div className="mb-8">
        <motion.div
          className="explore-hotels mb-2 mt-5 px-4 py-6 bg-gray-50 rounded-lg shadow-lg flex justify-between items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold">Explore Hotels</h2>
          <button
            onClick={openDialog}
            className="bg-purple-600 text-white rounded-md py-2 px-4 hover:bg-purple-500 transition duration-200"
          >
            Search
          </button>
        </motion.div>

        <div className="relative overflow-x-auto scrollbar-hide scroll-smooth px-4">
          <motion.div
            className="flex space-x-4 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {hotels.map((hotel) => (
              <motion.article
                key={hotel.id}
                className="w-[250px] flex-shrink-0 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
              >
                <section className="flex flex-col h-full">
                  <header className="p-4">
                    <div className="h-12 flex items-center justify-center">
                      <h2 className="text-xl font-semibold text-center text-gray-900 line-clamp-2">
                        {hotel.name}
                      </h2>
                    </div>

                    <img
                      src={hotel.photos[0].src}
                      alt={hotel.name}
                      className="rounded-lg my-2 object-cover h-32 w-full"
                    />
                  </header>

                  <div className="flex-grow p-4">
                    <p className="text-sm text-gray-700 mb-3">
                      {hotel.description}
                    </p>
                    <div className="flex items-center mb-2">
                      <FaPhoneAlt
                        className="text-green-500 mr-2"
                        aria-label="Phone"
                      />
                      <p className="text-sm text-gray-800">
                        {hotel.phone_number || "No number available"}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <FaMapMarkerAlt
                        className="text-blue-500 mr-2"
                        aria-label="Location"
                      />
                      <p className="text-sm text-gray-800">{hotel.city}</p>
                    </div>
                    <div className="flex justify-start items-center mt-2">
                      {[...Array(5)].map((star, index) => (
                        <FaStar
                          key={index}
                          className={`${
                            index < hotel.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          aria-label={`${hotel.rating} out of 5 stars`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        ({hotel.rating}) ({hotel.review_count})
                      </span>
                    </div>
                  </div>

                  <footer className="p-4">
                    <Link
                      to={hotel.place_link}
                      aria-label={`View details of ${hotel.name}`}
                    >
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
                  placeholder="Search hotels..."
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

              {/* Display the fetched hotel card if data is available */}
              {fetchedHotel && <HotelCard hotel={fetchedHotel} />}
            </motion.div>
          </div>
        )}
      </div>
    </BlurFade>
  );
};

export default Hotels;
