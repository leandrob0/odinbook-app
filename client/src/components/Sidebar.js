function Sidebar() {
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
    <aside className="flex flex-col items-start p-2 max-w-screen-md">
      <div>
        <h2 className="text-xs sm:text-sm md:text-base py-2 font-semibold">
          Friends:
        </h2>
      </div>
      <DesktopFriends friends={testFriends} />
    </aside>
  );
}

const DesktopFriends = ({ friends }) => {
  return (
    <section className="flex flex-col items-start">
      {friends.map((friend) => {
        return (
          <div key={friend} className="flex my-2 items-center">
            <div className="pr-1">
              <div className="bg-blue-600 rounded-full h-5 w-5"></div>
            </div>
            <div className="pl-1">
              <p className="text-xs md:text-sm">{friend}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Sidebar;
