import React, { useState } from "react";
import InputField from "../components/Secondhalf/InputField";
import weatherDescriptions from "./weatherDescriptions";
import location from "../assets/location-icon.png";
import calender from "../assets/calendar.png";

const SecondHalf = ({
  setLocation,
  weatherData,
  fetchWeatherDataByCity,
  cityInfo,
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long", // Full weekday name
      month: "long", // Full month name
      day: "numeric", // Day of the month
    });
  };
  const date = weatherData?.daily?.time[0];

  // Format the extracted date
  const formattedDate = date ? formatDate(date) : "";
  return (
    <div className="secondhalf">
      <div className="top">
        <InputField
          fetchWeatherDataByCity={fetchWeatherDataByCity}
          setLocation={setLocation}
        />
        <div className="middle">
          <h1>Now</h1>
          <div
            className="temp"
            style={{ display: "flex", alignItems: "center" }}
          >
            <h1>
              {weatherData
                ? Math.floor(weatherData.current.temperature_2m)
                : ""}
              <span>&deg;C</span>
            </h1>
            <img
              className="main-weather"
              src={
                weatherData
                  ? weatherDescriptions.icon[weatherData.current.weather_code]
                  : ""
              }
              alt=""
            />
          </div>
          <h1 className="weatherdesc">
            {weatherData
              ? weatherDescriptions.desc[weatherData.current.weather_code]
              : ""}
          </h1>
        </div>
        <div className="dateplace">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <img
              style={{ width: "16px", marginLeft: "2px" }}
              src={calender}
              alt=""
            />
            <h1>
              {formattedDate.split(",")[0]},
              <span style={{ color: "#A4A6AC" }}>
                {formattedDate.split(",")[1]}
              </span>
            </h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img style={{ width: "20px" }} src={location} alt="" />
            <h1>
              {cityInfo.city}, {cityInfo.country}
            </h1>
          </div>
        </div>
        <div className="skyesque-div" style={{ position: "relative" }}>
          <h1 className="img-text">skyesque</h1>
          <img
            className="skyesque-img"
            src="https://images.unsplash.com/photo-1724269964916-0b4e11542083?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default SecondHalf;
