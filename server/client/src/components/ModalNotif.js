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
        <section className="flex flex-col max-h-80 overflow-y-scroll">
          {notifications.length === 0 ? (
            <p className="py-4 px-2">There are no notifications for you!</p>
          ) : (
            notifications.map((noti) => {
              return (
                <FriendRequest key={noti._id} id={noti._id} friend={noti} />
              );
            })
          )}
        </section>
      </div>
    </>
  );
};

export default ModalNotif;
