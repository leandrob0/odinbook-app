import { useSelector } from 'react-redux';
import FriendRequest from './FriendRequest';

const ModalNotif = ({ closeModalNotif }) => {
  const notifications = useSelector((state) => state.notification.value);

  return (
    <>
      <div
        onClick={(e) => closeModalNotif(e)}
        className="fixed w-screen h-screen inset-0 z-0"
      />
      <div
        className="bg-white shadow-md rounded absolute top-full right-0 z-10"
        id="dropdown-notif"
      >
        <section className="flex flex-col">
          {notifications.length === 0 ? (
            <p>There are no notifications for you!</p>
          ) : (
            notifications.map((noti) => {
              if (noti.type === 'request') {
                return <FriendRequest />;
              }
            })
          )}
          <p className="block text-sm py-1 px-4 w-full hover:bg-gray-100 hover:cursor-pointer transition">
            Profile
          </p>
          <p className="block text-sm py-1 px-4 w-full hover:bg-gray-100 hover:cursor-pointer transition">
            Settings
          </p>
          <p className="block text-sm py-1 px-4 w-full hover:bg-gray-100 hover:cursor-pointer transition">
            Logout
          </p>
        </section>
      </div>
    </>
  );
};

export default ModalNotif;
