import React, { useState } from "react";
import NextDays from "./Secondhalf/NextDays";
import Cards from "./Firsthalf/Cards";
import humidity from "../assets/humidity.png";
import wind from "../assets/wind.png";
import uvindex from "../assets/uvindex.png";
import daynight from "../assets/day-and-night.png";
import sun from "../assets/sea.png";
import celsius from "../assets/celsius.png";

const FirstHalf = ({ weatherData }) => {
  const [view, setView] = useState("today");

  // Handle button clicks to toggle views
  const handleViewChange = (newView) => {
    setView(newView);
  };
  return (
    <div className="firsthalf">
      <div className="buttons">
        <button
          className={`${view === "today" ? "active" : ""}`}
          onClick={() => handleViewChange("today")}
        >
          Today
        </button>
        <button
          onClick={() => handleViewChange("week")}
          className={`${view === "today" ? "" : "active"}`}
        >
          Week
        </button>
      </div>
      <div className="card-container">
        {view === "today" ? (
          <Cards weatherData={weatherData} />
        ) : (
          <NextDays weatherData={weatherData} />
        )}
      </div>

      <div className="lower">
        <h1 className="lower-heading">Today's highlights</h1>
        <div className="lower-cards">
          <div className="current-card">
            <h1 className="daily-heading">Humidity</h1>
            <h1 className="daily-info">
              {weatherData ? weatherData.current.relative_humidity_2m : ""}
              <span style={{ marginLeft: "6px", fontSize: "16px" }}>%</span>
            </h1>
            <img src={humidity} alt="" />
          </div>
          <div className="current-card">
            <h1 className="daily-heading">Wind Speed</h1>
            <h1 className="daily-info">
              {weatherData ? weatherData.current.wind_speed_10m : ""}
              <span style={{ marginLeft: "6px", fontSize: "16px" }}>km/h</span>
            </h1>
            <img src={wind} alt="" />
          </div>
          <div className="current-card">
            <h1 className="daily-heading">Feels Like</h1>
            <h1 className="daily-info">
              {weatherData ? weatherData.current.temperature_2m : ""}
              <span className="degree-sign">&deg;C</span>
            </h1>
            <img src={celsius} alt="" />
          </div>
          <div className="current-card">
            <h1 className="daily-heading">UV Index</h1>
            <h1 className="daily-info">
              {weatherData ? weatherData.daily.uv_index_max[0] : ""}
            </h1>
            <img src={uvindex} alt="" />
          </div>
          <div className="current-card">
            <h1 className="daily-heading">Day/Night</h1>
            <h1 className="daily-info">
              {weatherData
                ? weatherData.current.is_day === 1
                  ? "Day"
                  : "Night"
                : ""}
            </h1>
            <img src={daynight} alt="" />
          </div>
          <div className="current-card">
            <h1 className="daily-heading">Sunrise & Sunset</h1>
            <div className="sunrise">
              <h1>
                {weatherData ? weatherData.daily.sunrise[0].split("T")[1] : ""}
                <span> AM</span>
              </h1>
              <h1>
                {weatherData ? weatherData.daily.sunset[0].split("T")[1] : ""}
                <span> PM</span>
              </h1>
            </div>
            <img src={sun} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstHalf;
