import { NavLink, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  UserIcon,
  BellIcon,
  SearchIcon,
} from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/user';
import { addNotification } from '../features/notifications';
import { getAllUsers, getFriendsRequests } from '../services/users';
import { addFullname } from '../helpers/addFullname';

import ModalSearch from './ModalSearch';
import ModalUser from './ModalUser';
import ModalNotif from './ModalNotif';

const Navbar = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [modalSearch, setModalSearch] = useState(false);
  const [modalUser, setModalUser] = useState(false);
  const [modalNotif, setModalNotif] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const notifications = useSelector((state) => state.notification.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const loadFriendRequests = async () => {
      const requests = await getFriendsRequests(
        JSON.parse(localStorage.getItem('token'))
      );
      if (notifications.length !== requests.requests.friendRequests.length) {
        setNotificationCount(requests.requests.friendRequests.length - notifications.length);
        for(let i = notifications.length; i < requests.requests.friendRequests.length; i++) {
          dispatch(addNotification({user: requests.requests.friendRequests[i], type:'request'}));
        }
      }
    };
    loadFriendRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const notifModal = (e) => {
    e.stopPropagation();
    setNotificationCount(0);
    setModalNotif(!modalNotif);
  }

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
        <div className="relative hover:cursor-pointer">
          <BellIcon onClick={(e) => notifModal(e)} className="h-7 w-7 text-gray-500 hover:text-gray-600 transition relative md:h-7 md:w-7 mx-1" />
          {notificationCount > 0 && <div onClick={(e) => notifModal(e)} className='absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex justify-center items-center'>{notificationCount}</div>}
          {modalNotif && <ModalNotif closeModalNotif={notifModal}/>}
        </div>
        <div className="relative">
          <UserIcon
            onClick={(e) => userOptions(e)}
            className="h-7 w-7 text-gray-500 hover:text-gray-600 transition md:h-7 md:w-7 mx-1 hover:cursor-pointer"
          />
          {modalUser && <ModalUser closeModalUser={userOptions} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
