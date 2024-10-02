    /*const getData = async () => {
      // This section is for fetching hotel data from the API
      // The RapidAPI request fetches hotels near a specific location
      // Commented out below is the code used for making the API request.
      
      const url =
        "https://maps-data.p.rapidapi.com/searchmaps.php?query=hotels&limit=10&country=us&lang=en&lat=51.5072&lng=0.12&offset=0&zoom=13";
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "1211178346msh6b1db6542b9548fp1c193djsnddca6fcc7694",
          "x-rapidapi-host": "maps-data.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json(); // Parse the response data as JSON
        console.log(result.data); // Log the data fetched from the API
        setHotels(result.data); // Update state with the fetched data

        // Send the fetched hotels data to Firestore
        const hotelsCollectionRef = collection(db, "Hotels"); // Firestore collection reference
        const promises = result.data.map(hotel => addDoc(hotelsCollectionRef, hotel)); // Add each hotel document to Firestore

        await Promise.all(promises); // Wait for all the hotels to be added to Firestore
        console.log('All hotels successfully added to Firestore!');

      } catch (error) {
        console.error("Error fetching or sending data:", error);
      }
  
    }; */

    // getData(); // Call the function

    294b89f91cmsha7e8f918caa956fp18c66djsn3c69d1bdbeeb



    <!-- clubs -->
    /*const getData = async () => {
      // API request to fetch clubs data
      const url =
        "https://maps-data.p.rapidapi.com/searchmaps.php?query=clubs&limit=10&country=in&lang=en&offset=0&zoom=13";
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "1211178346msh6b1db6542b9548fp1c193djsnddca6fcc7694",
          "x-rapidapi-host": "maps-data.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json(); // Parse response data
        const clubsData = result.data; // Extract the clubs data

        console.log("Fetched clubs data from API:", clubsData);

        // Send fetched data to Firestore
        const clubsCollectionRef = collection(db, "Clubs"); // Firestore collection reference
        const promises = clubsData.map((club) =>
          addDoc(clubsCollectionRef, club)
        ); // Add each club to Firestore
        await Promise.all(promises);

        console.log("All clubs successfully added to Firestore!");
      } catch (error) {
        console.error("Error fetching or sending data:", error);
      }
    };*/

    photos_sample[0].photo_url_large
