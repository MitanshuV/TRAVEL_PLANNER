import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavigation = (path) => {
    setLoading(true); // Show loading screen
    setTimeout(() => {
      navigate(path);
      setLoading(false); // Hide loading screen after navigation
    }, 3000); // Simulate loading time
  };

  return (
    <>
      {loading && <LoadingScreen isLoading={loading} />}{" "}
      {/* Pass loading state */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-500 ease-in-out ${
          scrolled
            ? "bg-white-500 backdrop-blur-md text-gray-700 shadow-md"
            : "bg-white text-gray-700 shadow-md"
        }`}
      >
        <div className="container mx-auto p-4 flex items-center justify-between">
          <div className="text-2xl font-bold">
            <button onClick={() => handleNavigation("/")}>
              <span className="text-blue-500 text-3xl">Ocu</span>
              <span className="text-3xl">lar</span>
            </button>
          </div>
          <div className="space-x-4 font-bold text-black">
            <button
              onClick={() => handleNavigation("/")}
              className="hover:text-blue-500"
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation("/create-trip")}
              className="hover:text-blue-500"
            >
              Create Trip
            </button>
            <button
              onClick={() => handleNavigation("/my-trips")}
              className="hover:text-blue-500"
            >
              My Trips
            </button>
            <button
              onClick={() => handleNavigation("/contact")}
              className="hover:text-blue-500"
            >
              Contact
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
