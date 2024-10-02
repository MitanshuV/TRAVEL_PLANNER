import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Card } from "../ui/card";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa"; // Import star icon from react-icons
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const TripDetails = () => {
  const locationState = useLocation();

  const tripData = locationState.state || {}; // Get the state passed from the navigate

  // Ensure that required trip data is available
  const hasData = tripData.location && tripData.days && tripData.budget;
  console.log(tripData);

  // Parse the tripDetails field if available and is a valid JSON string
  let parsedTripDetails = {};
  if (tripData.tripDetails) {
    try {
      parsedTripDetails = JSON.parse(tripData.tripDetails.tripDetails);
      console.log("Parsed Trip Details:", parsedTripDetails);
    } catch (error) {
      console.error("Error parsing tripDetails:", error);
    }
  }

  return (
    <div>
      <div className="trip-details mb-10">
        <h1 className="text-left text-3xl font-bold my-4 capitalize">
          {tripData.location}
        </h1>
        <div className="flex justify-start space-x-4">
          <p className="text-md text-gray-600 bg-gray-100 h-10 w-[100px] rounded-2xl flex items-center justify-center shadow-md">
            📅 {tripData.days} Day
          </p>
          <p className="text-md text-gray-600 bg-gray-100 h-10 w-[100px] rounded-2xl flex items-center justify-center shadow-md">
            💰 {tripData.budget}
          </p>
          <p className="text-md text-gray-600 bg-gray-100 h-10 w-[100px] rounded-2xl flex items-center justify-center shadow-md">
            🍻 {tripData.tripDetails.companion}
          </p>
        </div>
      </div>

      {hasData ? (
        <div>
          <h1 className="text-left text-2xl font-bold my-2">
            Hotel Recommendations
          </h1>
          {/* Render parsed trip details if available */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-8">
            {parsedTripDetails.hotels.map((hotel, index) => (
              <Card
                key={index}
                className="group relative p-4 shadow-lg border rounded-lg flex flex-col overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
              >
                {/* Image Section */}
                <div className="relative overflow-hidden rounded-lg mb-3">
                  <img
                    className="rounded-lg object-cover h-56 w-full"
                    src="https://images.unsplash.com/photo-1657002865844-c4127d542c41?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt={hotel.hotelName}
                  />
                </div>

                {/* Hotel Information */}
                <div className="flex flex-col flex-1">
                  <h2 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                    {hotel.hotelName}
                  </h2>

                  <p className="text-sm text-gray-700 mb-1 flex items-center">
                    <FaMapMarkerAlt className="text-blue-500 mr-2" />
                    <span className="ml-1">{hotel.hotelAddress}</span>
                  </p>

                  <p className="text-sm text-gray-700 mb-2 flex items-center">
                    <FaMoneyBillWave className="text-green-500 mr-2" />
                    <span className="ml-1">Price: {hotel.price} per night</span>
                  </p>

                  {/* Ratings Section */}
                  <div className="flex items-center mb-2">
                    <FaStar className="text-yellow-500 mr-2" />
                    <span className="ml-1 text-sm text-gray-700">
                      {hotel.reviews} Reviews
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Render the itinerary dynamically */}
          {parsedTripDetails.itinerary && (
            <div className="itinerary-section my-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-xl">
              <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
                Itinerary
              </h2>
              <Accordion type="single" collapsible>
                {Object.keys(parsedTripDetails.itinerary).map((day, index) => {
                  const itineraryDay = parsedTripDetails.itinerary[day];
                  return (
                    <AccordionItem
                      key={index}
                      value={`day-${index}`}
                      className="mb-4"
                    >
                      <AccordionTrigger className="bg-white p-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                        <h3 className="text-2xl font-semibold capitalize text-gray-700">
                          {day.replace(/(\D+)(\d+)/, "$1 $2")}
                        </h3>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-6 mt-4">
                          {Object.keys(itineraryDay).map((timePeriod, idx) => {
                            const periodDetails = itineraryDay[timePeriod];
                            return (
                              <div
                                key={idx}
                                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6"
                              >
                                {/* Image Section on the left */}
                                <div className="flex-shrink-0 w-full md:w-32 h-32 rounded-lg overflow-hidden flex justify-center items-center">
                                  <img
                                    src="https://images.unsplash.com/photo-1707807562742-bf69e7feaf4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXR0cmFjdGlvbnN8ZW58MHx8MHx8fDA%3D"
                                    alt={periodDetails.placeName}
                                    className="object-cover w-full h-full"
                                  />
                                </div>

                                {/* Text and details on the right */}
                                <div className="w-full">
                                  {/* Title, hidden on mobile screens */}
                                  <h4 className="text-lg font-medium mb-2 text-gray-800 hidden md:block">
                                    {timePeriod.charAt(0).toUpperCase() +
                                      timePeriod.slice(1)}
                                  </h4>

                                  {/* Place Name */}
                                  {periodDetails.placeName && (
                                    <p className="text-gray-600 mb-2">
                                      <strong>Place Name:</strong>{" "}
                                      {periodDetails.placeName}
                                    </p>
                                  )}

                                  {/* Place Detail */}
                                  {periodDetails.placeDetail && (
                                    <p className="text-gray-600 mb-2">
                                      <strong>Place Detail:</strong>{" "}
                                      {periodDetails.placeDetail}
                                    </p>
                                  )}

                                  {/* Rating */}
                                  {periodDetails.rating != null &&
                                    !isNaN(periodDetails.rating) && (
                                      <div className="flex items-center mb-2">
                                        <strong className="mr-2 text-gray-800">
                                          Rating:
                                        </strong>
                                        {Array.from(
                                          {
                                            length: Math.floor(
                                              periodDetails.rating
                                            ),
                                          },
                                          (_, i) => (
                                            <FaStar
                                              key={i}
                                              className="text-yellow-500"
                                            />
                                          )
                                        )}
                                        {periodDetails.rating % 1 !== 0 && (
                                          <FaStarHalfAlt className="text-yellow-500" />
                                        )}
                                        {Array.from(
                                          {
                                            length:
                                              5 -
                                              Math.ceil(periodDetails.rating),
                                          },
                                          (_, i) => (
                                            <FaStar
                                              key={
                                                i +
                                                Math.floor(
                                                  periodDetails.rating
                                                ) +
                                                (periodDetails.rating % 1 !== 0
                                                  ? 1
                                                  : 0)
                                              }
                                              className="text-gray-300"
                                            />
                                          )
                                        )}
                                        <span className="ml-3 text-gray-600">
                                          {Number(periodDetails.rating).toFixed(
                                            1
                                          )}
                                        </span>
                                      </div>
                                    )}

                                  {/* Ticket Pricing */}
                                  {periodDetails.ticketPricing && (
                                    <p className="text-gray-600 mb-2">
                                      <strong>Ticket Pricing:</strong>{" "}
                                      {periodDetails.ticketPricing}
                                    </p>
                                  )}

                                  {/* Time Travel */}
                                  {periodDetails.timeTravel && (
                                    <p className="text-gray-600">
                                      <strong>Travel Time:</strong>{" "}
                                      {periodDetails.timeTravel}
                                    </p>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          )}
        </div>
      ) : (
        <p>No trip details available. Please try again.</p>
      )}
    </div>
  );
};

export default TripDetails;
