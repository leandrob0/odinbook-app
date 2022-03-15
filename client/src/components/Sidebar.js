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
  // Develop a mobile version with only the images.
  return (
    <aside className="bg-gray-500 flex flex-col items-start p-4">
      <div>
        <h2 className='sm:text-sm md:text-base font-bold py-2'>Friends:</h2>
      </div>
      <section className='flex flex-col items-start'>
        {testFriends.map((friend) => {
          return (
            <div className='flex my-2 items-center'>
              <div className='pr-1'>
                <div className="bg-white rounded-full h-5 w-5"></div>
              </div>
              <div className='pl-1'>
                <p className='text-sm xl:text-base'>{friend}</p>
              </div>
            </div>
          );
        })}
      </section>
    </aside>
  );
}

export default Sidebar;
