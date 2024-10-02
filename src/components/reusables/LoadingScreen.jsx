import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/Animation'; // Adjust the path as necessary
import { motion } from 'framer-motion';

const LoadingScreen = ({ isLoading }) => {
  const [shouldExit, setShouldExit] = useState(false);
  
  // Function to handle when the animation completes
  const handleAnimationComplete = () => {
    // Trigger fade out after a delay to ensure the animation plays fully
    setTimeout(() => {
      setShouldExit(true);
    }, 500); // Delay before exit transition starts
  };

  useEffect(() => {
    // Reset shouldExit when loading state changes
    if (!isLoading) {
      setShouldExit(false);
    }
  }, [isLoading]);

  if (!isLoading && !shouldExit) return null; // Don't render if not loading and not exiting

  return (
    <motion.div 
      className="loading-screen" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: shouldExit ? 0 : 1 }} 
      exit={{ opacity: 0 }} 
      transition={{ duration: 0.5 }}
    >
      <div className="loading-animation">
        <Lottie 
          animationData={loadingAnimation} 
          loop={false} // Make sure it doesn't loop
          onComplete={handleAnimationComplete} // Call this function when animation completes
          style={{ width: '300px', height: '300px' }} // Adjust size as necessary
        />
      </div>
      <motion.h2 
        className="loading-text" 
        initial={{ y: 0, opacity: 1 }} // Start visible
        animate={{ y: 0, opacity: 1 }} // Remain visible during loading
        exit={{ y: -20, opacity: 0 }} // Exit with upward motion and fade out
        transition={{ duration: 0.5 }}
      >
        Loading your adventure...
      </motion.h2>
    </motion.div>
  );
};

export default LoadingScreen;
