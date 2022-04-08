import { useContext } from "react";
import { LocationContext } from "../context/LocationContext";

const MainCard = () => {
  const { locationData: data, tempUnit } = useContext(LocationContext);

  return (
    <div className="main">
      <div className="main__info">
        <div className="main__left">
          <div className="main__icon">
            <img src={data.icon} alt="weather icon"></img>
          </div>
          <div className="main__temp">
            {data.temp}
            <span>&#176;</span>
            {tempUnit === "imperial" ? "F" : "C"}
          </div>
        </div>
        <div className="main__right">
          <div className="main__right-top">
            {" "}
            <div className="main__location">
              <i className="fas fa-map-marker-alt"></i>
              {" " + data.location}
            </div>
            <div className="main__date">{data.date}</div>
          </div>
          <div className="main__right-bot">{data.status}</div>
        </div>
      </div>
      <div className="main__highlights">
        <div className="main__highlight-item">
          Wind
          <h3>
            {data.wind_speed + " "}
            {tempUnit === "imperial" ? "mph" : "mps"}
          </h3>
          <h3>{data.wind_direction}</h3>
        </div>
        <div className="main__highlight-item">
          Humidity
          <h3>{data.humidity} %</h3>
        </div>
        <div className="main__highlight-item">
          Air Pressure
          <h3>{data.air_pressure} hPa</h3>
        </div>
        <div className="main__highlight-item">
          Visibility
          <h3>{data.visibility} meters</h3>
        </div>
      </div>
    </div>
  );
};

export default MainCard;
