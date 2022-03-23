import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import Homepage from './components/pages/Homepage';
import Timeline from './components/pages/Timeline';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const socket = io('http://localhost:4004');
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <OnlyNotLogged redirectTo="/timeline">
              <Homepage />
            </OnlyNotLogged>
          }
        />
        <Route
          exact
          path="/timeline"
          element={
            <RequireAuth redirectTo="/">
              <Timeline />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

const RequireAuth = ({ children, redirectTo }) => {
  const user = useSelector((state) => state.user.value);

  return user.first_name !== '' ? children : <Navigate to={redirectTo} />;
};

const OnlyNotLogged = ({ children, redirectTo }) => {
  const user = useSelector((state) => state.user.value);

  return user.first_name === '' ? children : <Navigate to={redirectTo} />;
};

export default App;
