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

    if (!response.msg.includes("Friend request sent")) {
      console.log(response.msg);
      setRequestStatus('There was an error!');
    } else {
      setRequestStatus('The friend request was sent!');
    }
  };

  return (
    <aside className="flex flex-col items-center p-2 w-80 mt-5 mb-3 m-auto">
      <div className="flex flex-col items-center">
        <div>
          <img
            alt="User profile"
            className="h-20 w-20 md:h-32 md:w-32 rounded-full"
            src={'/' + user.profile_pic}
          />
        </div>
        <div className="text-center py-2">
          <h3>{user.first_name + ' ' + user.last_name}</h3>
        </div>
      </div>
      {loggedUser.id !== user._id &&
        !checkFriend(loggedUser.friends, user.email) &&
        user && (
          <div
            onClick={() => friendRequest()}
            className="p-2 m-4 text-green-600 border border-green-800 rounded bg-white shadow-sm shadow-green-900 transition hover:cursor-pointer hover:shadow-green-600"
          >
            Add friend
          </div>
        )}
      {requestStatus !== '' && <div>{requestStatus}</div>}
      <div className="flex flex-wrap">
        {user.friends &&
          user.friends.forEach((friend) => {
            return (
              <div className="relative">
                <img
                  alt="Friend profile"
                  className="absolute w-full h-full z-0"
                  src={friend.profile_pic}
                />
                <h3 className="fixed bottom-0 left-0 right-0 z-10">
                  {friend.first_name + ' ' + friend.last_name}
                </h3>
              </div>
            );
          })}
      </div>
    </aside>
  );
};

export default SidebarProfile;
