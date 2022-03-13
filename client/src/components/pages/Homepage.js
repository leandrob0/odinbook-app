import { Link } from "react-router-dom";

const Homepage = () => {
    return (
        <div className="flex justify-center items-center flex-col h-screen">
            <h1>Welcome to the homepage</h1>
            <Link to="/login">Login!</Link>
        </div>
    )
}

export default Homepage;