import { Navbar } from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'

import Landing from './pages/Landing';
import Auth from './pages/Auth';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/auth' element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
