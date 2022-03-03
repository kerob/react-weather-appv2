import { LocationProvider } from "./context/LocationContext";
import MainCard from "./components/MainCard";
import Navbar from "./components/Navbar";
import WeeklyForecast from "./components/WeeklyForecast";
import "./css/style.css";

function App() {
  return (
    <div className="App">
      <LocationProvider>
        <Navbar />
        <MainCard />
        <WeeklyForecast />
      </LocationProvider>
    </div>
  );
}

export default App;
