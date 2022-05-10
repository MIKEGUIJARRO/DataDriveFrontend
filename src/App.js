import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import PageLayout from './components/PageLayout';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { Help } from './pages/Help';
import Profile from './pages/Profile';

import { useFetch } from './hooks/useFetch';
import { useUser } from './hooks/useUser';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedRouteLogged from './components/ProtectedRouteLogged';
import File from './pages/File';


function App() {
  const url = 'https://datadrivebackend.herokuapp.com/api/v1/auth/login/success';
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
    if (!userData?.user) {
      return;
    }
    authenticateUser(userData.user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  console.log('user:', userData, 'pending:', userIsPending, 'error:', userError);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Pages with Footer and Navbar */}
          <Route element={<PageLayout />}>
            {/* Public routes */}
            <Route index path='/' element={<Landing />} />
            <Route path='/landing' element={<Landing />} />
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path='/home' element={<Home />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/help' element={<Help />} />
              <Route path='/file/:fileId' element={<File />} />
            </Route>
          </Route>
          {/* Pages without any Footer or Navbar */}
          <Route element={<ProtectedRouteLogged />}>
            <Route path='/auth' element={<Auth />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
