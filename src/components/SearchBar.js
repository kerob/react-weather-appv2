import { useState, useEffect, useContext } from "react";
import { LocationContext } from "../context/LocationContext";

let cities = require("../utilities/data/city.list.json");

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [locationSearch, setLocationSearch] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const { searchWeather, currentLoc, setFetchLoc, setDataType, tempUnit } =
    useContext(LocationContext);
  const [locationHistory, setLocationHistory] = useState([]);

  useEffect(() => {
    let savedHistoryFromLocalStorage = localStorage.getItem("locationHistory");
    if (savedHistoryFromLocalStorage) {
      setLocationHistory(JSON.parse(savedHistoryFromLocalStorage));
    }
  }, []);

  useEffect(() => {
    let currentHistory = JSON.stringify(locationHistory);
    localStorage.setItem("locationHistory", currentHistory);
  }, [locationHistory]);

  const searchHistoryHandler = (text) => {
    let matches = [];
    let filteredMatches = [];

    const reducerMatches = (accumulatedArray, currentValue) => {
      if (
        !accumulatedArray.find(
          (city) =>
            city.state === currentValue.state &&
            city.country === currentValue.country &&
            city.name === currentValue.name
        )
      ) {
        accumulatedArray.push(currentValue);
      }
      return accumulatedArray;
    };

    if (text.length >= 3) {
      matches = cities.filter((city) => {
        const regex = new RegExp(`${text}`, "gi");
        return city.name.match(regex);
      });

      const tempMatches = matches.reduce(reducerMatches, []);

      filteredMatches = tempMatches.reduce((acc, city) => {
        //Another reduce function to push US cities to top of search list
        if (city.state !== "") {
          return [city, ...acc];
        }
        return [...acc, city];
      }, []);
    }

    console.log(filteredMatches);
    setLocationSearch(filteredMatches);
  };

  // const testFunc = useCallback((e) => {
  //   e.preventDefault();
  //   console.log("test");
  // }, []);

  // const buildLocationItem = (location) => {
  //   return (
  //     <li
  //       className="search-item"
  //       key={location.id}
  //       onClick={() => console.log("tester")}
  //     >
  //       <i className="fas fa-map-marker-alt"></i>{" "}
  //       {location.state
  //         ? location.name + ", " + location.state
  //         : location.name + ", " + location.country}
  //     </li>
  //   );
  // };

  const updateLocationHistory = (location) => {
    let newId = location.id;
    let isCityInHistory = [];
    let tempHistory = locationHistory;

    isCityInHistory = tempHistory.filter((city) => {
      return city.id === newId;
    });

    let newHistory = [location, ...locationHistory];

    if (isCityInHistory.length === 0) {
      setLocationHistory(newHistory);
    }
  };

  const LocationItem = (props) => {
    const locationName = props.location.state
      ? props.location.name + ", " + props.location.state
      : props.location.name + ", " + props.location.country;

    return (
      <li
        className="search-item"
        // key={props.location.id}
        onMouseDown={() => {
          setFetchLoc({
            latitude: props.location.coord.lat,
            longitude: props.location.coord.lon,
            name: locationName,
          });
          setDataType("FETCH");
          searchWeather(
            props.location.coord.lat,
            props.location.coord.lon,
            locationName,
            tempUnit
          );
          updateLocationHistory(props.location);
        }} //OnMouseDown rather than OnClick so it triggers before onBlur makes item Unclickable
      >
        {locationName}
        <i className="fas fa-map-marker-alt"></i>
      </li>
    );
  };

  const LocationList = () => {
    if (locationSearch.length === 0) {
      return (
        <ul className="locationList">
          <li
            className="current-location"
            onMouseDown={() => {
              setDataType("LOCAL");
              searchWeather(
                currentLoc.latitude,
                currentLoc.longitude,
                "",
                tempUnit
              );
            }}
          >
            Current Location
            <i className="fas fa-home"></i>
          </li>
          <li className="search-history-title">Previous Search History</li>
          {locationHistory.map((item, index) => {
            // return buildLocationItem(item);
            return <LocationItem key={item.id} location={item} />;
          })}
        </ul>
      );
    }
    return (
      <ul className="locationList">
        {locationSearch.map((item, index) => {
          // return buildLocationItem(item);
          return <LocationItem key={item.id} location={item} />;
        })}
      </ul>
    );
  };

  return (
    <div className="search-container">
      <div className="searchbox-container">
        <input
          id="search"
          type="text"
          placeholder="Search for Location"
          value={searchInput}
          autoComplete="off"
          onFocus={() => setSearchVisible(true)}
          onBlur={() => setSearchVisible(false)}
          onChange={(e) => {
            setSearchInput(e.target.value);
            searchHistoryHandler(e.target.value);
          }}
        ></input>
        <i className="fas fa-search"></i>
      </div>

      <div
        className={`search-results ${
          searchVisible ? "search-results-visible" : ""
        }`}
      >
        <LocationList />
      </div>
    </div>
  );
};

export default SearchBar;
