import { Link } from 'react-router-dom';
import Login from './Login';
import logoFacebook from '../../images/simbolo-de-la-aplicacion-de-facebook.png';

const Homepage = () => {
  return (
    <main className="h-screen w-full flex justify-center items-center bg-gray-200">
      <div className="flex justify-center items-center gap-x-11 flex-wrap">
        <div className="m-4">
          <h1 className="p-3  text-5xl lg:text-6xl text-blue-600 font-bold">
            Odinbook
          </h1>
          <p className="p-3 text-lg lg:text-xl ">
            Welcome to this facebook clone!
          </p>
        </div>
        <div className="m-4 border rounded bg-white shadow-md flex flex-col items-center">
          <Login />
          <a href='http://localhost:4004/api/users/login/facebook' className='border-2 rounded p-2 m-2 mb-3 text-black font-bold bg-white w-72 flex justify-center items-center hover:cursor-pointer lg:w-96'>
              <img className='w-4 h-4 mx-2' src={logoFacebook} alt='Facebook logo' />
              Log in with facebook
            </a>
          <div className='flex justify-center border-t-2'>
            <Link to="/register" className='border rounded p-2 m-4 mb-3 text-white font-bold bg-green-500 text-center lg:w-24'>Register</Link>
          </div>
        </div>
      </div>
      <footer className='bg-white text-gray-500 text-xs absolute inset-x-0 bottom-0 flex flex-wrap justify-between items-center'>
        <div className='p-1'>This site was made with the sole purpose of learning, no pishing intended</div>
        <div className='p-1'>Made by <a href='https://www.linkedin.com/in/lb0' target='_blank'>Leandro Bovino</a> and <a href="https://www.linkedin.com/in/julio-luis-dechert-196182213/" target="_blank">Julio Detchert</a></div>
      </footer>
    </main>
  );
};

export default Homepage;
