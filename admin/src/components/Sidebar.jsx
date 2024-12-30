import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faPlusCircle,
  faList,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          to="/orders"
        >
          <FontAwesomeIcon className="w-5 h-5" icon={faTachometerAlt} />
          <p className="hidden md:block">Dashboard</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          to="/add"
        >
          <FontAwesomeIcon className="w-5 h-5" icon={faPlusCircle} />
          <p className="hidden md:block">Add Products</p>
        </NavLink>

        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          to="/list"
        >
          <FontAwesomeIcon className="w-5 h-5" icon={faList} />
          <p className="hidden md:block">Products List</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
