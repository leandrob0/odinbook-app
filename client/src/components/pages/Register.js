import { useState } from 'react';

const Register = ({ setModalOpen }) => {
  const [registerForm, setRegisterForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    /* const body = {
      ...registerForm,
    };

    // service to submit the post request.
    // On error i should display it with an error state. */
  };

  return (
    <div
      onClick={() => setModalOpen(false)}
      className="h-screen w-full bg-white bg-opacity-70 flex justify-center items-center absolute"
    >
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="m-4 border rounded bg-white shadow-md flex flex-col items-center"
      >
        <div className="flex flex-col items-start justify-center self-start m-4">
          <h2 className="font-bold text-xl">Register</h2>
          <p className="text-gray-500 text-sm">Quick and easy.</p>
        </div>
        <div className="border-b border-b-gray-300 w-full" />
        <fieldset>
          <input
            id="first_name"
            name="first_name"
            type="text"
            placeholder="First name"
            className="border rounded p-2 m-2 mr-4 w-36 lg:w-44"
            value={registerForm.first_name}
            onChange={(e) => handleChange(e)}
          />
          <input
            id="last_name"
            name="last_name"
            type="text"
            placeholder="Last name"
            className="border rounded p-2 m-2 ml-4 w-36 lg:w-44"
            value={registerForm.last_name}
            onChange={(e) => handleChange(e)}
          />
        </fieldset>
        <fieldset>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Your email (example@example.com)."
            className="border rounded p-2 m-2 w-80 lg:w-96"
            value={registerForm.email}
            onChange={(e) => handleChange(e)}
          />
        </fieldset>
        <fieldset>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Your password."
            className="border rounded p-2 m-2 w-80 lg:w-96"
            value={registerForm.password}
            onChange={(e) => handleChange(e)}
          />
        </fieldset>
        <button className="border-0 rounded p-2 m-2 mb-3 text-white font-bold shadow-md shadow-green-500/50 bg-green-500 hover:bg-green-600 transition w-80 lg:w-96">
          Create
        </button>
      </form>
    </div>
  );
};

export default Register;
