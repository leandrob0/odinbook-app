import { useSelector } from 'react-redux';

const SidebarProfile = ({user}) => {
  const id = useSelector((state) => state.user.value.id);

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
      {/* I shoud check also if the user is a friend already. TODO. */}
      {id !== user._id && <div>Add friend</div>}
      <div className='flex flex-wrap'>
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
