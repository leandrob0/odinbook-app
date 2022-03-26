import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/user';

const ModalUser = ({ closeModalUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile = (e) => {
    e.stopPropagation();
    return navigate(`/profile/${JSON.parse(localStorage.getItem('user')).id}`);
  };

  const logoutClick = (e) => {
    e.stopPropagation();
    dispatch(logout());
    return navigate('/');
  };
  return (
    <>
      <div
        onClick={(e) => closeModalUser(e)}
        className="fixed w-screen h-screen inset-0 z-0"
      />
      <div
        className="bg-white shadow-md rounded absolute top-full right-0 z-10"
        id="dropdown"
      >
        <section className="flex flex-col">
          <p
            onClick={(e) => profile(e)}
            className="block text-sm py-1 px-4 w-full hover:bg-gray-100 hover:cursor-pointer transition"
          >
            Profile
          </p>
          <p
            onClick={(e) => console.log('Under development')}
            className="block text-sm py-1 px-4 w-full hover:bg-gray-100 hover:cursor-pointer transition"
          >
            Settings
          </p>
          <p
            onClick={(e) => logoutClick(e)}
            className="block text-sm py-1 px-4 w-full hover:bg-gray-100 hover:cursor-pointer transition"
          >
            Logout
          </p>
        </section>
      </div>
    </>
  );
};

export default ModalUser;
