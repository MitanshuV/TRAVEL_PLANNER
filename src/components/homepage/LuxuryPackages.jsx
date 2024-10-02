import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // import framer-motion 
import ScrollContainer from "../reusables/ScrollContainer.jsx"; // Import ScrollContainer
import { FaSuitcaseRolling } from "react-icons/fa"; // Import Icon
import { collection, getDocs } from "firebase/firestore"; 
import { db } from "../../firebase.jsx"; // Your Firebase configuration

const LuxuryPackages = () => {
  const [packages, setPackages] = useState([]); // State to hold fetched packages

  // Function to fetch luxury packages from Firestore
  const fetchLuxuryPackages = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "luxuryPackages"));
      const fetchedPackages = querySnapshot.docs.map(doc => ({
        id: doc.id, ...doc.data()
      }));
      setPackages(fetchedPackages);
    } catch (error) {
      console.error("Error fetching luxury packages: ", error);
    }
  };

  // Fetch luxury packages when the component mounts
  useEffect(() => {
    fetchLuxuryPackages();
  }, []);

  // Card component for displaying each package
  const Card = ({ title, description }) => (
    <motion.div
      className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="font-semibold text-lg">{title}</h3>
      <p>{description}</p>
    </motion.div>
  );

  return (
    <motion.div
      className="luxury-packages mb-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-2">
        <FaSuitcaseRolling className="inline mr-2" />
        Luxury Packages by Us
      </h2>
      <ScrollContainer>
        {packages.map((pkg) => (
          <Card key={pkg.id} title={pkg.name} description={pkg.description} />
        ))}
      </ScrollContainer>
    </motion.div>
  );
};

export default LuxuryPackages;
