import React, { useState, createContext, useEffect, useCallback } from "react";
import { convertDate } from "../utilities/Date";

const LocationContext = createContext();

const LocationProvider = (props) => {
  const [currentLoc, setCurrentLoc] = useState({ longitude: 0, latitude: 0 });
  const [fetchLoc, setFetchLoc] = useState({
    longitude: 0,
    latitude: 0,
    name: "",
  });
  const [dataType, setDataType] = useState("LOCAL");
  const [locationData, setLocationData] = useState({});
  const [tempUnit, setTempUnit] = useState("imperial");

  const searchWeather = useCallback((latitude, longitude, name, unit) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}&units=${unit}`
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setLocationData({
          data: json.results,
          weeklyForecast: json.daily,
          date: convertDate(json.current.dt),
          location: name !== "" ? name : json.timezone,
          temp: json.current.temp,
          temp_min: json.daily[0].temp.min,
          temp_max: json.daily[0].temp.max,
          status: json.current.weather[0].main,
          humidity: json.current.humidity,
          wind_speed: json.current.wind_speed,
          wind_direction: findWindDirection(json.current.wind_deg),
          visibility: json.current.visibility,
          air_pressure: json.current.pressure,
          icon: `http://openweathermap.org/img/wn/${json.current.weather[0].icon}.png`,
        });
      });
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let currentLon = position.coords.longitude;
        let currentLat = position.coords.latitude;
        console.log(`Getting Location: ${currentLat}, ${currentLon}`);
        setCurrentLoc({
          latitude: currentLat,
          longitude: currentLon,
        });
        setDataType("LOCAL");
        searchWeather(currentLat, currentLon, "", tempUnit);
      });
    } else {
      console.log("Error getting location data");
    }
  }, [tempUnit, searchWeather]);

  const findWindDirection = (degree) => {
    let direction = "";

    if (degree <= 15 || degree > 345) {
      direction = "N";
    } else if (degree > 15 && degree <= 75) {
      direction = "NE";
    } else if (degree > 75 && degree <= 105) {
      direction = "E";
    } else if (degree > 105 && degree <= 165) {
      direction = "SE";
    } else if (degree > 165 && degree <= 195) {
      direction = "S";
    } else if (degree > 195 && degree <= 255) {
      direction = "SW";
    } else if (degree > 255 && degree <= 285) {
      direction = "W";
    } else if (degree > 285 && degree <= 345) {
      direction = "NW";
    }

    return direction;
  };

  const toggleTempUnit = () => {
    // if (tempUnit === "imperial") {
    //   setTempUnit("metric");
    // } else {
    //   setTempUnit("imperial");
    // }
    let fetchUnit = tempUnit === "imperial" ? "metric" : "imperial";
    setTempUnit(fetchUnit);
    dataType === "LOCAL"
      ? searchWeather(currentLoc.latitude, currentLoc.longitude, "", fetchUnit)
      : searchWeather(
          fetchLoc.latitude,
          fetchLoc.longitude,
          fetchLoc.name,
          fetchUnit
        );
  };

  return (
    <LocationContext.Provider
      value={{
        currentLoc,
        locationData,
        tempUnit,
        setFetchLoc,
        setDataType,
        toggleTempUnit,
        searchWeather,
      }}
    >
      {props.children}
    </LocationContext.Provider>
  );
};

export { LocationProvider, LocationContext };
