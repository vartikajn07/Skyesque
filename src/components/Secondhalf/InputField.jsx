import React, { useState } from "react";
import travelicon from "../../assets/searchicon.png";

const inputField = ({ fetchWeatherDataByCity, cityInfo }) => {
  const [city, setCity] = useState("");

  const handleSearch = async (event) => {
    if (event.key === "Enter") {
      // function to fetch weather data by city
      await fetchWeatherDataByCity(city);
    }
  };
  return (
    <div className="search">
      <img
        className="searchicon"
        color="black"
        width="25px"
        src={travelicon}
        alt=""
      />
      <input
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleSearch}
        type="input"
        placeholder="Search city"
      />
    </div>
  );
};

export default inputField;
