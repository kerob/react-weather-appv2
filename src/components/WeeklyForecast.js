import { useContext } from "react";
import { LocationContext } from "../context/LocationContext";
import { convertDateShort } from "../utilities/Date";

const WeeklyForecast = () => {
  const { locationData: data, tempUnit } = useContext(LocationContext);

  return (
    <div className="week">
      {data.weeklyForecast ? (
        data.weeklyForecast.map((day, index) => {
          return (
            <div className="week_item" key={index}>
              <div className="week_item-content">
                <div className="week_item-info">
                  <div className="week_item-text">
                    {index === 0 ? "Today" : convertDateShort(day.dt)}
                  </div>
                  <img
                    src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                    alt="Week Weather"
                  />
                  <div className="week_item-text">{day.weather[0].main}</div>
                </div>
                <div className="week_item-temps">
                  <div className="temperature">
                    {Math.round(day.temp.min)}
                    <span>&#176;</span>
                    {tempUnit === "imperial" ? "F" : "C"}
                  </div>
                  <div className="temperature">
                    {Math.round(day.temp.max)}
                    <span>&#176;</span>
                    {tempUnit === "imperial" ? "F" : "C"}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default WeeklyForecast;
