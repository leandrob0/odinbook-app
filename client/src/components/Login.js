import { useState } from 'react';
import { loginUserLocal } from '../services/users';

const Login = () => {
  const [formValues, setFormValues] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const submitLogin = async (e) => {
    e.preventDefault();

    const body = {
      email: formValues.email,
      password: formValues.password,
    };
    
    const response = await loginUserLocal(body);
    if (response.user) {
      // sets localstate with the token and the redux state with the user (and the token prob).
      console.log(response);
    } else {
      // Sets an error state to this message.
      console.log(response.msg);
    }
  };

  return (
    <>
      <form className="flex flex-col justify-center items-center" onSubmit={(e) => submitLogin(e)}>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Your email here."
          className='border rounded p-2 m-4 w-72 lg:w-96'
          value={formValues.email}
          onChange={(e) => handleChange(e)}
        />
        <input
          id="password"
          type="password"
          name="password"
          placeholder='Your password here.'
          className='border rounded p-2 m-2 w-72 lg:w-96'
          value={formValues.password}
          onChange={(e) => handleChange(e)}
        />
        <button className='border-0 rounded p-2 m-2 text-white font-bold shadow-md shadow-blue-500/50 bg-blue-500 hover:bg-blue-600 transition w-72 lg:w-96'>Log in</button>
      </form>
    </>
  );
};

export default Login;
