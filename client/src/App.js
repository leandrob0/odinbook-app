import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Homepage from './components/pages/Homepage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
