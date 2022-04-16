import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { PencilIcon } from '@heroicons/react/solid';

import checkFriend from '../helpers/checkIfFriend';
import { changeUserPhoto, sendFriendRequest } from '../services/users';
import { changePhoto } from '../features/user';

const SidebarProfile = ({ user }) => {
  const [requestStatus, setRequestStatus] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.user.value);

  const friendRequest = async () => {
    const response = await sendFriendRequest(
      JSON.parse(localStorage.getItem('token')),
      user._id
    );

    if (!response.msg.includes('Friend request sent')) {
      console.log(response.msg);
      setRequestStatus('There was an error!');
    } else {
      setRequestStatus('The friend request was sent!');
    }
  };

  const updatePhoto = async (target) => {
    const data = new FormData();
    data.append('name', target.files[0].name);
    data.append('file', target.files[0]);

    const result = await changeUserPhoto(
      JSON.parse(localStorage.getItem('token')),
      data
    );

    if (result.msg) {
      console.log(result.msg);
    } else {
      dispatch(changePhoto({ url: result.user.profile_pic }));
      return navigate(0);
    }
  };

  return (
    <aside className="flex flex-col items-center p-2 m-auto mt-5 mb-3">
      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            alt="User profile"
            className="h-20 w-20 md:h-32 md:w-32 m-2 rounded-full"
            src={user.profile_pic}
          />
          <label htmlFor="file" className="group">
            <PencilIcon className="absolute rotate-90 text-blue-700 h-7 w-7 p-1 right-1 bottom-1 md:right-3 md:bottom-3 border-0 bg-white rounded-full hover:cursor-pointer" />
          </label>
          <input
            name="file"
            id="file"
            type="file"
            className="hidden"
            onChange={(e) => updatePhoto(e.target)}
          />
        </div>
        <div className="text-center py-2">
          <h3>{user.first_name + ' ' + user.last_name}</h3>
        </div>
      </div>
      {loggedUser.id !== user._id &&
        !checkFriend(loggedUser.friends, user._id) &&
        user && (
          <div
            onClick={() => friendRequest()}
            className="p-2 m-4 text-green-600 border border-green-800 rounded bg-white shadow-sm shadow-green-900 transition hover:cursor-pointer hover:shadow-green-600"
          >
            Add friend
          </div>
        )}
      {requestStatus !== '' && <div>{requestStatus}</div>}
      <h1 className="font-bold m-4">Friends: </h1>
      <div className="flex flex-wrap justify-center items-center gap-4">
        {user.friends &&
          user.friends.map((friend) => {
            return (
              <a
                href={'/#/profile/' + friend._id}
                className="flex items-center justify-center hover:cursor-pointer hover:scale-105 transition"
                key={friend._id}
              >
                <img
                  alt="Friend profile"
                  className="w-12 h-12"
                  src={friend.profile_pic}
                />
                <h3 className="text-sm text-blue-600 hover:text-blue-800 transition">
                  {friend.first_name}
                  <br />
                  {friend.last_name}
                </h3>
              </a>
            );
          })}
      </div>
    </aside>
  );
};

export default SidebarProfile;
