import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import PageLayout from './components/PageLayout';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import { useFetch } from './hooks/useFetch';
import { useUser } from './hooks/useUser';


function App() {

  const url = 'http://localhost:5000/api/v1/auth/login/success';
  const options = {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    }
  };

  const {
    data: userData,
    error: userError,
    isPending: userIsPending,
  } = useFetch(url, options);

  const { authenticateUser } = useUser();

  useEffect(() => {
    if (!userData) {
      return;
    }
    authenticateUser(userData.user);
  }, [userData]);

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
