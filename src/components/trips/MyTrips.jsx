import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase"; // Make sure to import your Firestore setup
import TripsGrid from "../trips/TripsGrid";
import BlurFade from "../ui/blur-fade";

const MyTrips = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const tripsCollection = collection(db, "trips");
        const tripsSnapshot = await getDocs(tripsCollection);
        const tripsList = tripsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Log the fetched trips data
        setTrips(tripsList);
      } catch (error) {
        setError("Failed to fetch trips. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    console.log(trips);

    fetchTrips();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <BlurFade delay={0.25 + 0.05} inView>
      <h2 className="text-3xl font-bold mb-6">My Trips</h2>
      <div className="trip-grid">
        {/* Display the fetched trips data */}
        {trips.map((trip, index) => (
          <div key={index}>
            <TripsGrid tripDetails={trip} />
          </div>
        ))}
      </div>
    </BlurFade>
  ); // Simple UI message
};

export default MyTrips;
