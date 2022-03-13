import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './components/pages/Login';
import Homepage from './components/pages/Homepage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
