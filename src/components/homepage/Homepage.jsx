import React from "react";
import Hotels from "./Hotels";
import Clubs from "./Clubs";
import Attractions from "./Attractions";
import TripRecommendation from "../TripRecommendation";

const Homepage = () => {
  return (
    <div className="container mx-auto p-4">
      <TripRecommendation />
      <Hotels />
      <Clubs />
      <Attractions />
    </div>
  );
};

export default Homepage;
