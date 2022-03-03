import SearchBar from "./SearchBar";
import ToggleSwitch from "./ToggleSwitch";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav__container">
        <SearchBar />
        <ToggleSwitch />
      </div>
    </nav>
  );
};

export default Navbar;
