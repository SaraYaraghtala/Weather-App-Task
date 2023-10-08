import React, { FC, useEffect, useState } from "react";
import { getUserIpAddress } from "@/utils/api/detectUserIp";
import { ImLocation2 } from "react-icons/im";
import { fetchWeatherData } from "@/utils/api/getCurrentWeather";

const Widget: FC = () => {
  const [location, setLocation] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<any>(undefined);
  


  const getWeather = async (cityName: string | null) => {
    if (cityName === null) {
      return;
    }
    try {
      const data = await fetchWeatherData(cityName);
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

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
              getWeather(city);

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
        <ImLocation2 className="inline-block mr-2 " />
        <p className="text-athens-gray-950 text-xl ">
          {location ? location : "Loading..."}
        </p>
      </div>
      {weatherData && (
        <div>
          <h2 className="text-xl font-semibold">
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Weather: {weatherData.weather[0].main}</p>
          <p>Pressure: {weatherData.main.pressure} hPa</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>Feels Like: {weatherData.main.feels_like} °C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
        </div>
      )}
    </div>
    
  );
};

export default Widget;
