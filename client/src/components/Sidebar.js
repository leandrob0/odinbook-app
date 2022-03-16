import useWindowDimensions from '../hooks/useWindowDimensions';

function Sidebar() {
  const { width } = useWindowDimensions();
  const testFriends = [
    'Leandro Bovino',
    'Julio Dechert',
    'Bruno Pizzagalli',
    'Agustin Palomino',
    "Lucas D'unno",
    'Ezequiel Garcia',
    'Nicolas Pulti',
  ];

  return (
    <aside className="bg-gray-500 flex flex-col items-start p-2">
      <div>
        <h2 className="text-xs sm:text-sm md:text-base font-bold py-2">Friends:</h2>
      </div>
      {width <= 600 ? (
        <MobileFriends friends={testFriends} />
      ) : (
        <DesktopFriends friends={testFriends} />
      )}
    </aside>
  );
}

const MobileFriends = ({ friends }) => {
  return (
    <section className="flex flex-col items-center w-full">
      {friends.map((friend) => {
        return (
          <div key={friend} className="flex my-2 justify-center items-cente">
            <div>
              <div className="bg-white rounded-full h-6 w-6"></div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

const DesktopFriends = ({ friends }) => {
  return (
    <section className="flex flex-col items-start">
      {friends.map((friend) => {
        return (
          <div key={friend} className="flex my-2 items-center">
            <div className="pr-1">
              <div className="bg-white rounded-full h-5 w-5"></div>
            </div>
            <div className="pl-1">
              <p className="text-sm xl:text-base">{friend}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Sidebar;
