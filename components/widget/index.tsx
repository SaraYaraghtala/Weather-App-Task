import { getUserIpAddress } from "@/utils/api/detectUserIp";
import { fetchWeatherData } from "@/utils/api/getCurrentWeather";
import React, { FC, useEffect, useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { ImLocation2 } from "react-icons/im";

const Widget: FC = () => {
  const [location, setLocation] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<any>(undefined);
  const [selectedCity, setSelectedCity] = useState<string>("");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedCity(selectedValue);
  };

  const handleSearchClick = async () => {
    if (selectedCity) {
      await getWeather(selectedCity);
    }
  };

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
    <div className="bg-custom-background-image bg-cover  w-[90%] h-[90%] m-[5%] absolute rounded-2xl ">
      <div>
        <div>
          <div>
            <select onChange={handleSelectChange} onClick={handleSearchClick}>
              <option>{location ? location : "Select city"}</option>
              <option>Amsterdam</option>
              <option>New York</option>
              <option>Moscow</option>
              <option>London</option>
            </select>
          </div>
        </div>

        {weatherData && (
          <div>
            <h2>{weatherData.name}</h2>
            <div>
              <img
                src={`${process.env.NEXT_PUBLIC_OWM_IMAGE_API}${
                  weatherData?.weather[0]?.icon || ""
                }.png`}
                alt="weather icon"
              />
              <div>
                <p>{weatherData?.main?.temp} °C</p>
                <p>{weatherData?.weather[0]?.main || ""}</p>
              </div>
            </div>
            <div>
              <div>
                <p>Feels Like: {weatherData?.main?.feels_like}°C</p>
              </div>
              <div>
                <p>Humidity: {weatherData?.main?.humidity}%</p>
              </div>
              <div>
                <p>Pressure: {weatherData?.main?.pressure}hPa</p>
              </div>
              <div>
                <p>Wind: {weatherData?.wind?.speed}m/s</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        <div>
          <ImLocation2 />
          <p>{location ? location : "Loading..."}</p>
        </div>
      </div>
    </div>
  );
};

export default Widget;
