import React, { useEffect, useState } from "react";
import FirstHalf from "./FirstHalf";
import SecondHalf from "./SecondHalf";
import { showToast } from "./ToastContainer";
import ToastContainer from "./ToastContainer";

const geolocationApiKey = import.meta.env.VITE_GEOLOCATION_API_KEY;

const LandingPage = () => {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [weatherData, setWeatherData] = useState(null);
  const [cityInfo, setCityInfo] = useState({ city: "", country: "" });
  const [locationGranted, setLocationGranted] = useState(null);

  // Function to fetch weather data
  const fetchWeatherData = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,is_day,precipitation,rain,weather_code,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,weather_code,visibility&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=auto&forecast_days=14`
      );
      const data = await response.json();
      setWeatherData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };
  // Function to fetch city and country data
  const fetchCityInfo = async (lat, lon) => {
    try {
      const reverseGeocodingResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${geolocationApiKey} `
      );

      if (!reverseGeocodingResponse.ok) {
        throw new Error("Failed to fetch reverse geocoding data");
      }

      const reverseGeocodingData = await reverseGeocodingResponse.json();
      if (reverseGeocodingData.length > 0) {
        const { name: city, country } = reverseGeocodingData[0];
        setCityInfo({ city, country });
      } else {
        console.log("No location found for the entered coordinates");
      }
    } catch (error) {
      console.error("Error fetching reverse geocoding data:", error);
    }
  };

  // Function to fetch weather data by city name
  const fetchWeatherDataByCity = async (city) => {
    try {
      // Call the serverless function to get latitude and longitude for the city
      const geocodingResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${geolocationApiKey}`
      );

      if (!geocodingResponse.ok) {
        throw new Error("Failed to fetch geocoding data");
      }

      const geocodingData = await geocodingResponse.json();
      if (geocodingData.length > 0) {
        const { lat, lon } = geocodingData[0];
        await fetchWeatherData(lat, lon); // Fetch and log weather data
        fetchCityInfo(lat, lon); // Fetch city and country data
      } else {
        console.log("No location found for the entered city"); //error handling
        showToast("Enter valid city name/check for spelling errors :D");
      }
    } catch (error) {
      console.error("Error fetching geocoding data:", error);
      showToast("Failed to fetch weather data. Please try again.");
    }
  };

  // Use effect to get location and fetch weather data on mount
  useEffect(() => {
    const getLocation = async () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude });
          fetchWeatherData(latitude, longitude);
          fetchCityInfo(latitude, longitude);
          setLocationGranted(true);
        },
        (error) => {
          setLocationGranted(false);
          setLocation({ lat: 28.61, lon: 77.23 });
          fetchWeatherData(28.61, 77.23);
          fetchCityInfo(28.61, 77.23);

          showToast(
            "Provide location access for better accuracy and experience."
          );
        }
      );
    };
    getLocation();
  }, []);

  return (
    <div className="main">
      <ToastContainer />
      <SecondHalf
        fetchWeatherDataByCity={fetchWeatherDataByCity}
        setLocation={setLocation}
        weatherData={weatherData}
        cityInfo={cityInfo}
      />
      <FirstHalf
        setLocation={setLocation}
        fetchWeatherDataByCity={fetchWeatherDataByCity}
        weatherData={weatherData}
      />
    </div>
  );
};

export default LandingPage;
