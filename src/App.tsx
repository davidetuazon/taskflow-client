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
import { Toaster } from 'react-hot-toast';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Account from './pages/Account';
import Project from './pages/Project';
import ProjectTasks from './pages/ProjectTasks';


function App() {
  return (
    <BrowserRouter>
    <Toaster
      toastOptions={{
        success: {duration: 500},
        error: {duration: 4000},
        style: {
          background: '#E5E7EB',
          fontFamily: 'Poppins-Light',
          width: 'fit-content',
          maxWidth: '500px',
          whiteSpace: 'pre-wrap'
        }
      }}
    />
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
            path='/projects'
            element={
              <RequireAuth>
                <Project />
              </RequireAuth>
            }
          />
          <Route
            path='/projects/:slug/tasks'
            element={
              <RequireAuth>
                <ProjectTasks key={location.pathname} />
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
