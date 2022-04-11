import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import PageLayout from './components/PageLayout';
import Landing from './pages/Landing';
import Auth from './pages/Auth';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/auth' element={<Auth />} />
          <Route element={<PageLayout />}>
            <Route path='/' element={<Landing />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
