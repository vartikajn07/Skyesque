import React from "react";
import weatherDescriptions from "../weatherDescriptions";

const NextDays = ({ weatherData }) => {
  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  const dailyData = weatherData?.daily || {};

  const days = dailyData.time.slice(1, 8); // next 7 days
  const maxTemps = dailyData.temperature_2m_max.slice(1, 8);
  const minTemps = dailyData.temperature_2m_min.slice(1, 8);
  const weatherCodes = dailyData.weather_code.slice(1, 8);

  return (
    <>
      {days.map((date, index) => (
        <div className="card next-days" key={index}>
          <h1 className="day-name">{getDayOfWeek(date)}</h1>
          <div className="card-img next-img">
            <img
              src={
                weatherData ? weatherDescriptions.icon[weatherCodes[index]] : ""
              }
              alt="Weather icon"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <h1 className="day-maxtemp ">
              {Math.floor(maxTemps[index])}
              &deg;
            </h1>
            <h1 className="day-mintemp">
              {Math.floor(minTemps[index])}
              &deg;
            </h1>
          </div>
        </div>
      ))}
    </>
  );
};

export default NextDays;
