import { motion } from "framer-motion";
import { MapPin, DollarSign } from "lucide-react"; // Lucide icons
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const TripCard = ({
  imageSrc,
  location,
  days,
  budget,
  budgetType,
  id,
  tripDetails,
}) => {
  const navigate = useNavigate(); // Use useNavigate

  const handleVisitClick = () => {
    // Navigate to the trip details page with the id as a URL parameter and pass data as state
    navigate(`/tripDetails/${encodeURIComponent(id)}`, {
      state: { location, days, budget, budgetType, imageSrc, tripDetails },
    });
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-105"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
    >
      <img
        src={imageSrc}
        alt={location}
        className="w-full h-48 object-cover"
        width={300}
        height={200}
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{location}</h3>
        <p className="text-gray-700 mb-4">
          <span className="font-medium">{days} Days</span> trip with{" "}
          <span>{budget} Budget</span>
        </p>
        <div className="flex items-center space-x-4 text-gray-600 mb-4">
          <MapPin className="w-5 h-5 text-red-500" />
          <span className="text-sm">{location}</span>
          <DollarSign className="w-5 h-5 text-green-500" />
          <span className="text-sm">{budgetType}</span>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
          onClick={handleVisitClick}
        >
          Visit
        </button>
      </div>
    </motion.div>
  );
};

const TripsGrid = ({ tripDetails }) => {
  const [img, setImg] = useState("");
  useEffect(() => {
    async function getImg() {
      const url = `https://unlimited-google-maps.p.rapidapi.com/api/maps/simple?query=${encodeURIComponent(
        tripDetails.destination
      )}`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "1211178346msh6b1db6542b9548fp1c193djsnddca6fcc7694",
          "x-rapidapi-host": "unlimited-google-maps.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setImg(result.items[0].photos_sample[0].photo_url_large);
      } catch (error) {
        console.error(error);
      }
    }
    getImg();
  }, [tripDetails]);

  console.log(tripDetails);
  const trips = [
    {
      imageSrc: img, // Replace with your images
      location: tripDetails.destination,
      days: tripDetails.days,
      budget: tripDetails.budget,
      budgetType: tripDetails.budget,
      id: tripDetails.id,
      tripDetails,
    },
  ];

  return (
    
    <div>
      {trips.map((trip, index) => (
        <div key={index}>
          <TripCard {...trip} />
        </div>
      ))}
    </div>
  );
};

export default TripsGrid;
