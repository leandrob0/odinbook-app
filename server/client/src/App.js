import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Homepage from './components/pages/Homepage';
import Timeline from './components/pages/Timeline';
import Profile from './components/pages/Profile';

function App() {
  return (
    <HashRouter>
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
    </HashRouter>
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
