import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Homepage from './components/pages/Homepage';

function App() {
  return (
    <BrowserRouter>
      <Homepage />
      {/* <Routes>
        <Route exact path="/register" element={<Register />} />
      </Routes> */}
    </BrowserRouter>
  );
}

export default App;
