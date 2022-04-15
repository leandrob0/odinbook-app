import { useState } from 'react';
import { useSelector } from 'react-redux';
import checkFriend from '../helpers/checkIfFriend';
import { sendFriendRequest } from '../services/users';

const SidebarProfile = ({ user }) => {
  const [requestStatus, setRequestStatus] = useState('');
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

  return (
    <aside className="flex flex-col items-center p-2 m-auto mt-5 mb-3">
      <div className="flex flex-col items-center">
        <div>
          <img
            alt="User profile"
            className="h-20 w-20 md:h-32 md:w-32 m-2 rounded-full"
            src={user.profile_pic}
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
              <a href={"/profile/"+friend._id} className="flex items-center justify-center hover:cursor-pointer hover:scale-105 transition" key={friend._id}>
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
