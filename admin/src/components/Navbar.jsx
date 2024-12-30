import PropTypes from "prop-types";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-4 px-[4%] justify-between">
      <h1 className="text-3xl font-bold text-black">
        <span className="text-[var(--Pink)]">Craftsy </span> Admin Dashboard
      </h1>
      <button
        onClick={() => setToken("")}
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-sm sm:text-lg"
      >
        Logout
      </button>
    </div>
  );
};

Navbar.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Navbar;
