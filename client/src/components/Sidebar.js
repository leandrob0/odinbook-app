import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function Sidebar() {
  const [friends, setFriends] = useState([]);
  const friendsFetched = useSelector((state) => state.user.value.friends);

  useEffect(() => {
    if(friendsFetched.length > 7) {
      setFriends(friendsFetched.reverse().slice(0,7));
    } else {
      setFriends(friendsFetched.reverse());
    }
  }, [friendsFetched])

  return (
    <aside className="flex flex-col items-start p-2 max-w-screen-md">
      <div>
        <h2 className="text-xs sm:text-sm md:text-base py-2 font-semibold">
          Friends:
        </h2>
      </div>
      {friends.length > 0 ? <DesktopFriends friends={friends} /> : <div>Add friends!</div>}
    </aside>
  );
}

const DesktopFriends = ({ friends }) => {
  return (
    <section className="flex flex-col items-start">
      {friends.map((friend) => {
        return (
          <div key={friend._id} className="flex my-2 items-center">
            <div className="pr-1">
              <div className="bg-blue-600 rounded-full h-5 w-5"></div>
            </div>
            <div className="pl-1">
              <p className="text-xs md:text-sm">{friend.first_name} {friend.last_name}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Sidebar;
