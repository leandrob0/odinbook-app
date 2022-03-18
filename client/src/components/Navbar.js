import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  UserIcon,
  BellIcon,
  SearchIcon,
} from '@heroicons/react/solid';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-2 w-full bg-white shadow-md">
      <div>
        <NavLink to="/timeline">
          <HomeIcon className="h-7 w-7 text-blue-500 hover:text-blue-600 transition md:h-7 md:w-7" />
        </NavLink>
      </div>
      <div className="flex justify-center items-center w-44 md:w-auto rounded-2xl bg-gray-200 text-gray-600 hover:cursor-pointer hover:bg-gray-300 hover:text-gray-700 transition">
        <label htmlFor="search">
          <SearchIcon className="h-7 w-7 text-gray-500 hover:text-gray-600 transition md:h-7 md:w-7 mx-1" />
        </label>
        <input
          id="search"
          name="search"
          type="text"
          placeholder="Search"
          autoComplete='off'
          className="bg-gray-200 text-gray-600 rounded-2xl p-2 hover:cursor-pointer hover:bg-gray-300 hover:text-gray-700 transition w-full outline-none"
        />
      </div>
      <div className="flex">
        <NavLink to="/">
          <BellIcon className="h-7 w-7 text-gray-500 hover:text-gray-600 transition md:h-7 md:w-7 mx-1" />
        </NavLink>
        <NavLink to="/">
          <UserIcon className="h-7 w-7 text-gray-500 hover:text-gray-600 transition md:h-7 md:w-7 mx-1" />
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
