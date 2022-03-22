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
              <div
                key={user._id}
                id={user._id}
                onClick={(e) => console.log(e.target.id)}
                className="flex m-4 items-center"
              >
                <img
                  alt="User profile"
                  src={user.profile_pic}
                  className="rounded-full w-7 h-7"
                  onClick={(e) => {e.stopPropagation(); console.log(e.target.parentNode.id)}}
                />
                <p onClick={(e) => {e.stopPropagation(); console.log(e.target.parentNode.id)}} className="text-xs md:text-sm pl-3">{user.fullname}</p>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ModalSearch;
