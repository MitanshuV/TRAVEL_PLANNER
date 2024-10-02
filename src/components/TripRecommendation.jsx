import React from "react";
import { Button } from "./ui/button";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Particles from "./ui/particles";
import BlurFade from "./ui/blur-fade";

const TripRecommendation = () => {
  return (
    <BlurFade delay={0.25 + 0.05} inView>
      <div
        className="relative p-6 rounded-lg w-full max-w-none bg-cover bg-center"
        style={{
          background: `url('/img.png') no-repeat center center`, // Set image with no repeat, centered
          backgroundSize: "cover", // Ensure the image covers the entire container
          width: "100%", // Set width for the container
          height: "500px", // Set height for the container
        }}
      >
        <div className="relative z-10 flex flex-col justify-center items-start h-full text-left ml-20">
          {" "}
          {/* Adjusted items alignment and added margin-left */}
          <div className="flex items-center mb-2">
            <span className="text-grey-200 text-sm font-medium">
              Powered by AI
            </span>
            <span className="ml-2 bg-white text-black text-xs font-bold px-2 py-1 rounded-lg shadow-md">
              BETA
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 mt-2">
            Get custom{" "}
            <span className="text-white bg-green-500 bg-opacity-30">
              Oculars
            </span>{" "}
            <br />
            for your next trip
          </h1>
          {/* Start Trip Button with Icon */}
          <Button className="relative bg-green-600 text-white hover:bg-black flex items-center justify-center gap-2 px-4 py-2 rounded-lg shadow-lg mt-4 transition duration-200 ease-in-out transform hover:scale-105">
            <Particles
              className="absolute inset-0 w-full h-full z-0"
              particleColor="#ffffff" // Set particle color to white
              particleSize={3} // Adjust particle size if needed
              numberOfParticles={50} // Adjust the number of particles as necessary
              style={{ filter: "blur(2px)" }} // Optional: add blur to particles
            />
            <MapPin className="w-5 h-5 z-10" />
            <Link to={"/create-trip"} className="relative z-10">
              Start a trip with AI
            </Link>
          </Button>
        </div>
      </div>
    </BlurFade>
  );
};

export default TripRecommendation;
