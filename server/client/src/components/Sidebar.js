import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function Sidebar() {
  const [friends, setFriends] = useState([]);
  const friendsFetched = useSelector((state) => state.user.value.friends);

  useEffect(() => {
    if(friendsFetched.length > 7) {
      setFriends([...friendsFetched.slice(0,7)]);
    } else {
      setFriends([...friendsFetched]);
    }
  }, [friendsFetched])

  return (
    <aside className="flex flex-col items-start p-2 max-w-screen-md">
      <div>
        <h2 className="text-xs sm:text-sm md:text-base py-2 font-semibold">
          New Friends:
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
          <a key={friend._id} className="flex my-2 items-center hover:cursor-pointer" href={'/#/profile/'+friend._id}>
            <div className="pr-1 flex-shrink-0">
              <img alt="friend" src={friend.profile_pic} className="rounded-full h-7 w-7 "/>
            </div>
            <div className="pl-1">
              <p className="text-xs md:text-sm">{friend.first_name} {friend.last_name}</p>
            </div>
          </a>
        );
      })}
    </section>
  );
};

export default Sidebar;
