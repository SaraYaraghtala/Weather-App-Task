import { IFetchWeatherData } from "@/types/api/api.types";
import { getUserIpAddress } from "@/utils/api/detectUserIp";
import { fetchWeatherData } from "@/utils/api/getCurrentWeather";
import React, { FC, useEffect, useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { ImLocation2 } from "react-icons/im";

const Widget: FC = () => {
  const [location, setLocation] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<IFetchWeatherData | undefined>(
    undefined
  );
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
    <div className="bg-custom-background-image bg-cover h-screen w-full  2xl:xl:lg:rounded-2xl 2xl:xl:lg:w-[50%] ">
      <div className="flex flex-col items-center w-full gap-4 lg:w-full xl:w-full 2xl:w-full">
        <div className="flex flex-row items-center  justify-between mt-4 sm:w-[60%] md:w-[80%] md:justify-center lg:w-[100%] xl:w-[100%] 2xl:w-[100%]">
          <div className=" lg:h-[100%] xl:w-[100%] xl:h-[100%] xl:max-w-sm ">
            <select
              className="select select-info w-full  sm:w-full md:text-lg  lg:text-xl  xl:text-2xl 2xl:text-3xl "
              onChange={handleSelectChange}
              onClick={handleSearchClick}
            >
              <option>{location ? location : "Select city"}</option>
              <option>Amsterdam</option>
              <option>New York</option>
              <option>Moscow</option>
              <option>London</option>
            </select>
          </div>
          <div className="flex flex-row justify-center items-center ">
            <button
              onClick={() => {
                getWeather(selectedCity ? selectedCity : location);
              }}
            >
              <FiRefreshCw className=" ml-2 text-xl 2xl:xl:lg:md:text-2xl" />
            </button>
          </div>
        </div>
        {weatherData && (
          <div className="flex flex-col items-center justify-center  sm:-mt-2 md:m-0 lg:w-full 2xl:xl:lg:h-full 2xl:xl:lg:w-full">
            <h2 className="text-xl text-white font-semibold sm:text-2xl 2xl:xl:lg:md:text-3xl ">
              {weatherData.name}
            </h2>
            <div className="flex flex-row items-center justify-between">
              <img
                className="w-28 h-auto sm:w-44 2xl:xl:lg:md:w-50"
                src={`${process.env.NEXT_PUBLIC_OWM_IMAGE_API}${
                  weatherData?.weather[0]?.icon || ""
                }.png`}
                alt="weather icon"
              />
              <div className="flex flex-col justify-center items-center font-semibold">
                <p className="text-white sm:text-xl 2xl:xl:lg:md:text-2xl ">
                  {weatherData?.main?.temp} °C
                </p>
                <p className="text-white sm:text-xl 2xl:xl:lg:md:text-2xl">
                  {weatherData?.weather[0]?.main || ""}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 justify-center items-center gap-4  xl:gap-6 xl:items-center  ">
              <div className=" bg-white rounded-lg p-3  w-24 flex flex-row justify-between items-center  gap-2 sm:text-xl sm:w-32 2xl:xl:lg:md:w-56 2xl:xl:lg:md:h-auto  2xl:xl:lg:md:text-2xl   ">
                <p>Feels Like: {weatherData?.main?.feels_like}°C</p>
              </div>
              <div className=" bg-white rounded-lg p-3  w-24 flex flex-row justify-between items-center gap-2 sm:text-xl sm:w-32 2xl:xl:lg:md:w-56 2xl:xl:lg:md:h-auto  2xl:xl:lg:md:text-2xl  ">
                <p>Humidity: {weatherData?.main?.humidity}%</p>
              </div>
              <div className=" bg-white rounded-lg p-3 w-24  flex flex-row justify-between items-center gap-2 sm:text-xl sm:w-32 2xl:xl:lg:md:w-56 2xl:xl:lg:md:h-auto  2xl:xl:lg:md:text-2xl ">
                <p>Pressure: {weatherData?.main?.pressure}hPa</p>
              </div>
              <div className=" bg-white rounded-lg p-3 w-24  flex flex-row justify-between items-center gap-2 sm:text-xl sm:w-32 2xl:xl:lg:md:w-56 2xl:xl:lg:md:h-auto  2xl:xl:lg:md:text-2xl ">
                <p>Wind: {weatherData?.wind?.speed}m/s</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-row items-center justify-center absolute bottom-0 w-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <div className="flex flex-row items-center justify-center lg:items-center lg:flex  ">
          <ImLocation2 className="inline-block mr-2  lg:text-4xl" />
          <p className="text-athens-gray-900 text-xl ">
            {location ? location : "Loading..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Widget;
