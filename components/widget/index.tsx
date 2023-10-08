import React, { FC, useEffect, useState } from "react";
import { getUserIpAddress } from "@/utils/api/detectUserIp";
import { ImLocation2 } from "react-icons/im";


const Widget: FC = () => {
    const [location, setLocation] = useState<string | null>(null);
  



    useEffect(() => {
        getUserIpAddress()
          .then((userIpAddress) => {
            if (userIpAddress) {
              const apiUrl = `${process.env.NEXT_PUBLIC_GET_LOCATION}${userIpAddress}?access_key=${process.env.NEXT_PUBLIC_GET_LOCATION_KEY}`;
    
              fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => {
                  // Extract the location information
                  const { city, country_name } = data;
               
    
                  // Create a formatted location string
                  const formattedLocation = `${city}, ${country_name}`;
    
                  // Update the component's state with the location
                  setLocation(formattedLocation);
                })
                .catch((error) => {
                  console.error("Error fetching location:", error);
                });
            }
          })
          .catch((error) => {
            console.error("Error getting user IP address:", error);
          });
      }, []);
  return (
    <div className="bg-custom-background-image bg-cover   w-[90%] h-[90%] m-[5%] absolute rounded-2xl">


<div className="flex flex-row items-center justify-center ">
          <ImLocation2 className="inline-block mr-2 animate-beat" />
          <p className="text-athens-gray-950 text-xl sm:text-2xl">
            {location ? location : "Loading..."}
          </p>
        </div>
    </div>
  );
};

export default Widget;
