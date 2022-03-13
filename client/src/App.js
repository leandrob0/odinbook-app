import { BrowserRouter, Routes, Route } from 'react-router-dom';
/* import { useSelector } from "react-redux"; */

import Homepage from './components/pages/Homepage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage />}/>
      </Routes>
    </BrowserRouter>
  );
}

/* const RequireAuth = ({ children, redirectTo }) => {
  const user = useSelector((state) => state.user.value);

  const isAuthenticated = (user) => {
    return user.first_name !== '';
  };

  return isAuthenticated(user) ? children : <Navigate to={redirectTo} />;
}; */

export default App;
