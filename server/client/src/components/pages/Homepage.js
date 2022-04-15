import { useState } from 'react';
import Login from '../Login';
import Register from '../Register';

const Homepage = () => {
  const [modalOpen, setModalOpen] = useState(false);

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
          <div className="flex justify-center border-t-2">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="border-0 rounded p-2 m-2 mb-3 text-white font-bold shadow-md shadow-green-500/50 bg-green-500 hover:bg-green-600 transition w-72 lg:w-96"
            >
              Register
            </button>
          </div>
        </div>
      </div>
      <footer className="bg-white text-gray-500 text-xs absolute inset-x-0 bottom-0 flex flex-wrap justify-between items-center">
        <div className="p-1">
          This site was made with the sole purpose of learning, no pishing
          intended
        </div>
        <div className="p-1">
          Made by{' '}
          <a
            href="https://www.linkedin.com/in/lb0"
            rel="noreferrer"
            target="_blank"
          >
            Leandro Bovino
          </a>
        </div>
      </footer>
      {modalOpen && <Register setModalOpen={setModalOpen} />}
    </main>
  );
};

export default Homepage;
