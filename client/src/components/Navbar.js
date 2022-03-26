import { NavLink, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  UserIcon,
  BellIcon,
  SearchIcon,
} from '@heroicons/react/solid';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/user';
import { getAllUsers } from '../services/users';
import { addFullname } from '../helpers/addFullname';

import ModalSearch from './ModalSearch';
import ModalUser from './ModalUser';

const Navbar = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [modalSearch, setModalSearch] = useState(false);
  const [modalUser, setModalUser] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Every time the user clicks on the search bar, every user available in the db, will be saved to an state, to lated filter on user search.
  const getUsers = async () => {
    const response = await getAllUsers(
      JSON.parse(localStorage.getItem('token'))
    );

    if (response.msg) {
      alert('Your session expired, please log in again.');
      dispatch(logout());
      return navigate('/');
    }

    const users = addFullname(response.users);
    setAllUsers(users);
  };

  // When the input value changes, it filters the users array according to the user search value. Shows only 5 users.
  const filterUsers = (e) => {
    const newArr = allUsers.filter((user) =>
      user.fullname.toLowerCase().includes(e.toLowerCase())
    );
    setFiltered(newArr);
  };

  const openModalSearch = (e) => {
    e.stopPropagation();
    setModalSearch(true);
  };

  const userOptions = (e) => {
    e.stopPropagation();
    setModalUser(!modalUser);
  };

  return (
    <nav className="flex justify-between items-center p-2 w-full bg-white shadow-md">
      <div>
        <NavLink to="/timeline">
          <HomeIcon className="h-7 w-7 text-blue-500 hover:text-blue-600 transition md:h-7 md:w-7" />
        </NavLink>
      </div>
      <div
        onClick={(e) => openModalSearch(e)}
        className="flex justify-center items-center w-44 md:w-auto rounded-2xl bg-gray-200 text-gray-600 hover:cursor-pointer hover:bg-gray-300 hover:text-gray-700 transition relative"
      >
        <label htmlFor="search">
          <SearchIcon className="h-7 w-7 text-grafilterUsersy-500 hover:text-gray-600 transition md:h-7 md:w-7 mx-1" />
        </label>
        <input
          id="search"
          name="search"
          type="text"
          placeholder="Search"
          onChange={(e) => filterUsers(e.target.value)}
          onClick={() => getUsers()}
          autoComplete="off"
          className="bg-gray-200 text-gray-600 rounded-2xl p-2 hover:cursor-pointer hover:bg-gray-300 hover:text-gray-700 transition w-full outline-none"
        />
        {modalSearch && (
          <ModalSearch users={filtered} setModalSearch={setModalSearch} />
        )}
      </div>
      <div className="flex">
        <NavLink to="/">
          <BellIcon className="h-7 w-7 text-gray-500 hover:text-gray-600 transition md:h-7 md:w-7 mx-1" />
        </NavLink>
        <div className="relative">
          <UserIcon
            onClick={(e) => userOptions(e)}
            className="h-7 w-7 text-gray-500 hover:text-gray-600 transition md:h-7 md:w-7 mx-1"
          />
          {modalUser && <ModalUser closeModalUser={userOptions}/>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
