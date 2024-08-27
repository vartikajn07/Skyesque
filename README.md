# 🌞Skyesque
Skyesque is a simple weather app. It allows users to get the weather forecast of their place and lets them search for a location as well. 

[skyesque.vercel.app](https://skyesque.vercel.app/)

![Skyesque-interface](https://github.com/user-attachments/assets/1d08ac4b-ae63-40de-9338-9720566fb9bd)

## Features
1. Users are asked for location access for weather forecast of their location. They can deny access as well, in that case the app will display weather data of a default location.
2. They can search for a location on their own.
3. Current Weather forecasts of the place are generated which include Humidity percentage, Wind speed, UV Index, time of sunrise and sunset and more.
4. Hourly forecasts (3-hour span) are generated as well.
5. 7-days future forecasts are also provided for that location.
6. Error handling is implemented for invalid location searches or failed API requests.
7. Responsive design for a seamless experience across different devices.

## API Implementation
- Skyesque uses a combination of two APIs:
  - Open-Meteo weather API: Open-Meteo is an open-source weather API and offers free access for non-commercial use. It doesn't require an API key. Read the Open-Meteo Documentation [here.](https://open-meteo.com/)
  - Geocoding API from OpenWeather: Geocoding API converts any location's name into geographical coordinates. It allows both Direct and Reverse GeoCoding methods, both of which are used in Skyesque. Read about Geocoding API [here.](https://openweathermap.org/api/geocoding-api) 

## Tech Used 
- React
- Vite (build tool)
- CSS for styling
- Responsive Design.

### Icons/PNG images 
- All images/icons are used from [Flaticon.](https://www.flaticon.com/)

### Font used: 
- Sofia Pro Light

 Hosted on [Vercel](https://vercel.com/)

