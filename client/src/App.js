import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

import { useDispatch } from 'react-redux';
import { setSocket } from './features/socket';

import Homepage from './components/pages/Homepage';
import Timeline from './components/pages/Timeline';
import Profile from './components/pages/Profile';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSocket(io('http://localhost:4004')));
  }, [dispatch]);
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
        <Route
          exact
          path="/profile/:id"
          element={
            <RequireAuth redirectTo="/">
              <Profile />
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
