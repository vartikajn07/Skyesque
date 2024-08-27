import React from "react";
import moon from "../../assets/CardsIcons/crescent-moon.png";
import sun from "../../assets/CardsIcons/sunicon.png";

const Cards = ({ weatherData }) => {
  const time = weatherData?.hourly?.time || [];
  const temperature = weatherData?.hourly?.temperature_2m || [];

  const weatherIcons = {
    night: moon,
    day: sun,
  };

  const getIconForTime = (time) => {
    const hour = new Date(time).getHours();
    if (hour >= 6 && hour < 18) {
      return weatherIcons.day;
    } else {
      return weatherIcons.night;
    }
  };

  const getFilteredData = () => {
    const filteredData = [];
    for (let i = 0; i < time.length; i += 3) {
      filteredData.push({
        time: time[i],
        temperature: temperature[i],
      });
    }
    return filteredData;
  };

  // filtered weather data with a maximum of 8 cards
  const filteredWeatherData = getFilteredData().slice(0, 8);

  return (
    <>
      {filteredWeatherData.map((item, index) => (
        <div className="card" key={index}>
          <h1 className="card-time">
            {new Date(item.time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </h1>
          <div className="card-img">
            <img src={getIconForTime(item.time)} alt="Weather icon" />
          </div>

          <h1 className="card-temp">
            {item.temperature !== undefined
              ? Math.floor(item.temperature)
              : "N/A"}
            &deg;
          </h1>
        </div>
      ))}
    </>
  );
};

export default Cards;
