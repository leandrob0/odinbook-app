import { NavLink } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/solid'
import { CogIcon } from '@heroicons/react/solid'
import { UserIcon } from '@heroicons/react/solid'

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-2 w-full bg-white shadow-md">
      <div>
        <NavLink to="/timeline"><HomeIcon className='h-7 w-7 text-blue-500 hover:text-blue-600 transition md:h-8 md:w-8'/></NavLink>
      </div>
      <div>
        <input
          type="text"
          placeholder='Search'
          className="w-44 md:w-auto rounded-2xl bg-gray-200 text-gray-600 p-2 hover:cursor-pointer hover:bg-gray-300 hover:text-gray-700 transition"
        />
      </div>
      <div className='flex'>
      <NavLink to="/"><UserIcon className='h-8 w-8 text-gray-500 hover:text-gray-600 transition md:h-8 md:w-8 mx-1' /></NavLink>
        <NavLink to="/"><CogIcon className='h-8 w-8 text-gray-500 hover:text-gray-600 transition md:h-8 md:w-8 mx-1' /></NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
