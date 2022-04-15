const ModalSearch = ({ users, setModalSearch  }) => {

  const closeModalSearch = (e) => {
    e.stopPropagation();
    setModalSearch(false);
  };

  return (
    <>
      <div
        onClick={(e) => closeModalSearch(e)}
        className="absolute bottom-0 top-0 h-screen w-screen z-0"
      />
      <div className="bg-white shadow-md w-full rounded absolute left-0 top-full z-10">
        {users &&
          users.slice(0, 6).map((user) => {
            return (
              <a
                key={user._id}
                id={user._id}
                className="flex m-4 items-center"
                href={'/profile/' + user._id}
              >
                <img
                  alt="User profile"
                  src={user.profile_pic}
                  className="rounded-full w-7 h-7"
                />
                <p className="text-xs md:text-sm pl-3">{user.fullname}</p>
              </a>
            );
          })}
      </div>
    </>
  );
};

export default ModalSearch;
