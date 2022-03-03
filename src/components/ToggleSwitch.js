import { useContext } from "react";
import { LocationContext } from "../context/LocationContext";

// const ToggleSwitch = () => {
//   const { toggleTempUnit } = useContext(LocationContext);
//   return (
//     <div className="temp-switch">
//       <input
//         type="checkbox"
//         name="temp-input"
//         onChange={toggleTempUnit}
//       ></input>
//     </div>
//   );
// };

const ToggleSwitch = () => {
  const { toggleTempUnit, tempUnit } = useContext(LocationContext);

  const unit = tempUnit === "imperial" ? "F" : "C";
  return (
    <label className="toggle-label">
      <input type="checkbox" className="toggle" onChange={toggleTempUnit} />
      <span>&#176; {unit}</span>
    </label>
  );
};

export default ToggleSwitch;
