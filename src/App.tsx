import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import './App.css'
import Cookies from 'js-cookie';
import AuthProvider from './providers/AuthProvider';
import { ACCESS_TOKEN } from './utils/constants';

import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Account from './pages/Account';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={ <Navigate to='/home' /> } />
          <Route 
            path='/home'
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path='/account/settings/:id'
            element={
              <RequireAuth>
                <Account />
              </RequireAuth>
            }
          />
          <Route
            path='/tasks/:id/done'
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
            />
          <Route
            path='/tasks/:id/edit'
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path='/tasks/:id/delete'
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path='/tasks/create'
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}


function RequireAuth({ children }: { children: React.JSX.Element }) {

  const token = Cookies.get(ACCESS_TOKEN);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children;
}

export default App;
