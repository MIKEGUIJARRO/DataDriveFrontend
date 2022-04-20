import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import PageLayout from './components/PageLayout';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

import { useFetch } from './hooks/useFetch';
import { useUser } from './hooks/useUser';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';


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
    if (!userData?.user) {
      return;
    }
    authenticateUser(userData.user);
  }, [userData]);

  console.log('user:', userData, 'pending:', userIsPending, 'error:', userError);
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          {/* Pages with footer and Navbar */}
          <Route element={<PageLayout />}>
            {/* Public routes */}
            <Route index path='/' element={<Landing />} />
            <Route path='/landing' element={<Landing />} />
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path='/home' element={<Home />} />
              <Route path='/profile' element={<Profile />} />
            </Route>
          </Route>
          {/* Pages without any general structure */}
          <Route path='/auth' element={userData?.user ? <Navigate to={'/home'} /> : <Auth />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
