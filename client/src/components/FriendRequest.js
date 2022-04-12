import { CheckIcon, XIcon } from '@heroicons/react/solid';
import { useDispatch } from 'react-redux';

import { deleteNotification } from '../features/notifications';
import { addFriend } from '../features/user';
import { handleFriendRequest } from '../services/users';

const FriendRequest = ({ id, friend }) => {
  const dispatch = useDispatch();

  const notificationHandled = async (e, status) => {
    e.stopPropagation();

    const token = JSON.parse(localStorage.getItem('token'));
    
    dispatch(deleteNotification({ id }));
    const result = await handleFriendRequest(token, friend._id, status);

    if(result.msg) {
      alert(result.msg);
    } else {
      dispatch(addFriend(result.user));
    }
  };

  return (
    <div className="min-w-max">
      <div className="flex items-center">
        <div className="p-2">
          <img
            className="rounded-full h-10 w-10"
            alt="Friend"
            src={'/' + friend.profile_pic}
          />
        </div>
        <div className="p-2 flex flex-col justify-between">
          <p className="text-blue-600 font-serif font-semibold">
            {friend.first_name} {friend.last_name}
          </p>
          <p className="text-gray-800">Wants to be your friend!</p>
        </div>
        <div className="p-2 flex- flex-col">
          <CheckIcon
            onClick={(e) => notificationHandled(e, true)}
            className="h-6 w-6 text-green-600 hover:text-green-800 hover:cursor-pointer transition"
          />
          <XIcon
            onClick={(e) => notificationHandled(e, false)}
            className="h-6 w-6 text-red-600 hover:text-red-800 hover:cursor-pointer transition"
          />
        </div>
      </div>
    </div>
  );
};

export default FriendRequest;
