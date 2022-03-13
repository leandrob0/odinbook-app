import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUserLocal } from "../../services/users";

const Login = () => {
    const [formValues, setFormValues] = useState({email: '', password: ''});

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    }

    const submitLogin = async (e) => {
        e.preventDefault();

        const body = {
            email: formValues.email,
            password: formValues.password
        }

        const response = await loginUserLocal(body);
        if(response.user) {
            // sets the user to local state with the token.
            console.log(response)
        } else {
            // Sets an error state to this message.
            console.log(response.msg);
        }
    }

    return (
        <div className="flex justify-center items-center flex-col">
            <h1>Login page</h1>
            <Link to="/">Homepage</Link>
            <form className="flex justify-center flex-col border" onSubmit={(e) => submitLogin(e)}>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" placeholder="youremail@email.com" value={formValues.email} onChange={(e) => handleChange(e)} />
                <label htmlFor="password">Password</label>
                <input id="password" type="password" name="password" value={formValues.password} onChange={(e) => handleChange(e)} />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Login;