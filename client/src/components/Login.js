import { useState } from 'react';
import { loginUserLocal, loginUserFacebook } from '../services/users';
import { useDispatch } from 'react-redux';
import { login } from '../features/user';
import logoFacebook from '../images/simbolo-de-la-aplicacion-de-facebook.png';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ msg: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setValues = (user, token) => {
    localStorage.setItem('token', JSON.stringify(token));
    dispatch(
      login({
        id: user._id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        profile_pic: user.profile_pic,
        friends: user.friends,
        friendRequests: user.friendRequests,
      })
    );
  };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const submitLogin = async (e) => {
    e.preventDefault();

    if (!formValues.email || !formValues.password) {
      setErrors({ msg: 'Both fields must be filled.' });
      return;
    }

    const body = {
      email: formValues.email,
      password: formValues.password,
    };

    const response = await loginUserLocal(body);
    if (response.user) {
      setValues(response.user, response.token);
      return navigate('/timeline');
    } else {
      setErrors({ msg: response.msg });
    }
  };

  const loginAsGuest = async () => {
    const response = await loginUserLocal({
      email: 'test@foto.com',
      password: 'test',
    });
    if (response.user) {
      setValues(response.user, response.token);
      return navigate('/timeline');
    } else {
      setErrors({ msg: response.msg });
    }
  };

  const loginFacebook = async (res) => {
    const response = await loginUserFacebook(res.accessToken);
    console.log(response.user.doc);
    if (response.user) {
      setValues(response.user.doc, response.token);
      return navigate('/timeline');
    } else {
      setErrors({ msg: response.msg });
    }
  };

  return (
    <>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={(e) => submitLogin(e)}
      >
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Your email here."
          className="border rounded p-2 m-4 w-72 lg:w-96"
          value={formValues.email}
          onChange={(e) => handleChange(e)}
        />
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Your password here."
          className="border rounded p-2 m-2 w-72 lg:w-96"
          value={formValues.password}
          onChange={(e) => handleChange(e)}
        />
        {errors.msg !== '' && (
          <p className="text-red-500 font-bold p-2">{errors.msg}</p>
        )}
        <button className="border-0 rounded p-2 m-2 text-white font-bold shadow-md shadow-blue-500/50 bg-blue-500 hover:bg-blue-600 transition w-72 lg:w-96">
          Log in
        </button>
      </form>
      <button
        onClick={() => loginAsGuest()}
        type="button"
        className="border-0 rounded p-2 m-2 text-white font-bold shadow-md shadow-orange-500/50 bg-orange-500 hover:bg-orange-600 transition w-72 lg:w-96"
      >
        Log in as guest
      </button>
      <FacebookLogin
        appId="3138121549841865"
        autoLoad={false}
        fields="name,email,picture"
        onClick={() => {}}
        callback={loginFacebook}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            className="border-2 rounded p-2 m-2 mb-3 text-black font-bold bg-white hover:shadow-md transition w-72 flex justify-center items-center hover:cursor-pointer lg:w-96"
          >
            <img
              className="w-4 h-4 mx-2"
              src={logoFacebook}
              alt="Facebook logo"
            />
            Log in with facebook
          </button>
        )}
      />
    </>
  );
};

export default Login;
