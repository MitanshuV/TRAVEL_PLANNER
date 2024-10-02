import React, { useEffect } from "react";
import { Input } from "@/components/ui/input"; // ShadCN input component
import { Label } from "@/components/ui/label"; // ShadCN label component
import { Button } from "@/components/ui/button"; // Button from ShadCN
import LoadingScreen from "./reusables/LoadingScreen"; // Import your Loading component
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AI_PROMPT, chatSession } from "../services/AiModal";
import { useGlobalContext } from "../context/context";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";
import { Link, useNavigate } from "react-router-dom";
import BlurFade from "./ui/blur-fade";
import LoadingDialog from "./reusables/LoadingDialog"; // Import LoadingDialog component

// BudgetOptions Component
const BudgetOptions = ({ selectedBudget, onSelect }) => {
  const budgets = [
    {
      value: "cheap",
      label: "💵 Cheap",
      description: "Stay conscious of costs",
    },
    {
      value: "moderate",
      label: "💰 Moderate",
      description: "Keep costs average",
    },
    {
      value: "luxury",
      label: "💎 Luxury",
      description: "Don’t worry about cost",
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">What is Your Budget?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {budgets.map(({ value, label, description }) => (
          <Card
            key={value}
            className={`cursor-pointer transition-transform transform ${
              selectedBudget === value
                ? "border-blue-500 scale-105"
                : "hover:scale-105"
            }`}
            onClick={() => onSelect("budget", value)}
          >
            <CardHeader>
              <CardTitle className="flex items-center text-lg font-semibold">
                {label}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// CompanionOptions Component
const CompanionOptions = ({ selectedCompanion, onSelect }) => {
  const companions = [
    {
      value: "justMe",
      label: "✈️ Just Me",
      description: "A solo traveler in exploration",
    },
    {
      value: "couple",
      label: "🥂 A Couple",
      description: "Two travelers in tandem",
    },
    {
      value: "family",
      label: "🏡 Family",
      description: "A group of adventurers",
    },
    {
      value: "friends",
      label: "⛵ Friends",
      description: "A bunch of thrill-seekers",
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">
        Who do you plan on traveling with?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {companions.map(({ value, label, description }) => (
          <Card
            key={value}
            className={`cursor-pointer transition-transform transform ${
              selectedCompanion === value
                ? "border-blue-500 scale-105"
                : "hover:scale-105"
            }`}
            onClick={() => onSelect("companion", value)}
          >
            <CardHeader>
              <CardTitle className="flex items-center text-lg font-semibold">
                {label}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// TravelPreferencesForm Component
const TravelPreferencesForm = () => {
  const { state, dispatch } = useGlobalContext();
  const { formData, loading } = state; // Removed tripPackage from state
  const [loadingDialog, setLoadingDialog] = React.useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "UPDATE_FORM_DATA",
      payload: { [name]: value },
    });
  };

  const handleOptionSelect = (name, value) => {
    dispatch({
      type: "UPDATE_FORM_DATA",
      payload: { [name]: value },
    });
  };

  const handleSubmit = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    setLoadingDialog(true); // Show loading dialog

    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData.destination)
      .replace("{totaldays}", formData.days)
      .replace("{totaldays}", formData.days)
      .replace("{traveler}", formData.companion)
      .replace("{budget}", formData.budget);

    console.log("Final Prompt:", FINAL_PROMPT);

    try {
      // Step 1: Generate trip details using the chat session
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const responseText = await result.response.text();
      console.log("Response Text:", responseText); // Log the raw response

      // Validate responseText before parsing
      if (typeof responseText !== "string" || !responseText.trim()) {
        throw new Error(
          "Received an empty or invalid response from the server."
        );
      }

      // Trim whitespace
      const trimmedResponse = responseText.trim();

      // Attempt to parse the JSON response
      let hotelData;
      try {
        hotelData = JSON.parse(trimmedResponse);
      } catch (parseError) {
        console.error("Error parsing response text:", parseError);
        console.error("Response was:", trimmedResponse); // Log the response for debugging
        throw new Error("Failed to parse response as JSON.");
      }

      // Initialize an array to hold URLs for all hotels
      const hotelUrls = [];
      // Count hotels and construct URLs
      let hotelCount = 0; // Initialize hotel count
      if (hotelData.hotels && Array.isArray(hotelData.hotels)) {
        hotelCount = hotelData.hotels.length; // Count the hotels
        hotelData.hotels.forEach((hotel) => {
          const hotelName = hotel.hotelName || "No name available";
          const hotelAddress = hotel.hotelAddress || "No address available";

          // Combine hotelName and hotelAddress using `+` instead of commas or spaces
          const hotelDetails = `${hotelName} ${hotelAddress}`.replace(
            /\s/g,
            "+"
          );

          // Construct hotel URL with the modified query
          const hotelUrl = `https://unlimited-google-maps.p.rapidapi.com/api/maps/advanced?zoom=13&query=${encodeURIComponent(
            hotelDetails
          )}`;
          hotelUrls.push(hotelUrl); // Add to the array

          console.log(
            `Hotel: ${hotelName}, Address: ${hotelAddress}, URL: ${hotelUrl}`
          );
        });
      } else {
        console.error("No hotels found in the response data.");
      }

      console.log(`Number of hotels found: ${hotelCount}`);
      console.log("Hotel URLs:", hotelUrls);

      // Inside TravelPreferencesForm component
      const getUrlDetails = async () => {
        try {
          const hotelDataMap = new Map(); // Map to track unique hotel names and their details

          for (const hotelUrl of hotelUrls) {
            console.log(`Fetching URL: ${hotelUrl}`); // Log the URL being fetched

            const response = await fetch(hotelUrl, {
              method: "GET",
              headers: {
                "x-rapidapi-host": "unlimited-google-maps.p.rapidapi.com",
                "x-rapidapi-key":
                  "1211178346msh6b1db6542b9548fp1c193djsnddca6fcc7694",
              },
            });

            if (!response.ok) {
              throw new Error(
                `Network response was not ok: ${response.statusText}`
              );
            }

            const data = await response.json();
            console.log("Data:", data); // Log the full response data

            if (data.items && Array.isArray(data.items)) {
              data.items.forEach((item) => {
                const hotelName = item.name;

                // Check if the hotel name is already in the map (avoiding duplicates)
                if (!hotelDataMap.has(hotelName)) {
                  // Only add new entries (avoid duplicates)
                  hotelDataMap.set(hotelName, {
                    name: hotelName,
                    address: item.address || "No address available",
                    photos: item.photos_sample || [],
                    // Add any other necessary hotel properties
                  });
                } else {
                  console.log(
                    `Duplicate hotel found: ${hotelName}. Ignoring duplicate.`
                  );
                }
              });
            } else {
              console.log("No items found in the response.");
            }
          }

          // Convert map to a plain object for easier handling later
          const hotelDetailsArray = Array.from(hotelDataMap.values());
          console.log("All unique hotel details:", hotelDetailsArray);
          return hotelDetailsArray; // Return the array of unique hotel details
        } catch (error) {
          console.error("Error fetching data:", error.message);
        }
      };

      const storeTripData = async () => {
        try {
          const hotelDetails = await getUrlDetails(); // Fetch the hotel details

          // Prepare hotel details in a flat structure
          const flattenedHotelDetails = hotelDetails.reduce(
            (acc, hotel, index) => {
              acc[`hotel_${index}`] = hotel; // Use hotel index or unique ID for keys
              return acc;
            },
            {}
          );

          // Prepare trip data and add flattened hotel details
          const tripData = {
            destination: formData.destination || "Not specified",
            days: formData.days,
            companion: formData.companion || "Not specified",
            budget: formData.budget || "Not specified",
            tripDetails: trimmedResponse || "No details available",
            hotelDetails: flattenedHotelDetails, // Use the flattened hotel details
            createdAt: new Date(),
          };

          console.log("Final Trip Data with Hotels:", tripData);

          // Add trip data to Firestore collection (replace 'trips' with your collection name)
          const docRef = await addDoc(collection(db, "trips"), tripData);
          setLoadingDialog(false); // Hide loading dialog after successful submission
          console.log("Trip data added with ID: ", docRef.id);
          navigate("/my-trips"); // Redirect to My Trips page after successful submission
        } catch (error) {
          console.error("Error adding document to Firestore: ", error);
        }
      };

      storeTripData();

      // Reset the form after successful submission
      dispatch({ type: "RESET_FORM_DATA" });
    } catch (error) {
      console.error("Error generating trip:", error);
      alert(`Failed to generate trip: ${error.message || "Please try again."}`);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  useEffect(() => {
    if (state.tripPackage) {
      console.log("Updated tripPackage:", state.tripPackage);
    }
  }, [state.tripPackage]);

  return (
    <>
      {loadingDialog && <LoadingDialog />}{" "}
      <BlurFade delay={0.25 + 0.05} inView>
        {loading && <LoadingScreen />}
        <div className="container mx-auto p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Tell us your travel preferences 🌅🌴
            </h1>
            <p className="text-gray-600">
              Provide some information for your customized itinerary.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="mb-6">
              <Label className="block text-lg font-bold text-black text-left">
                Select your destination...
              </Label>
              <Input
                type="text"
                name="destination"
                placeholder="Select your destination..."
                value={formData.destination}
                onChange={handleChange}
                className="mt-2 w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div className="mb-6">
              <Label className="block text-lg font-bold text-black text-left">
                How many days are you planning?
              </Label>
              <Input
                type="number"
                name="days"
                placeholder="Ex. 3"
                value={formData.days}
                onChange={handleChange}
                className="mt-2 w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <BudgetOptions
              selectedBudget={formData.budget}
              onSelect={handleOptionSelect}
            />
            <CompanionOptions
              selectedCompanion={formData.companion}
              onSelect={handleOptionSelect}
            />

            <div className="flex justify-center space-x-4">
              <Button
                className="bg-black text-white p-4 hover:bg-gray-800 transition"
                onClick={handleSubmit}
              >
                Generate Trip
              </Button>
              <Button className="bg-gray-200 text-black p-4 hover:bg-gray-300 transition">
                Back
              </Button>
              <Button>
                <Link to={"/my-trips"}>My Trips</Link>
              </Button>
            </div>
          </div>
        </div>
      </BlurFade>
    </>
  );
};

export default TravelPreferencesForm;
