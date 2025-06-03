import Login from '@pages/Login';
import { Navigate, Route, Routes } from 'react-router';
import PrivateRoute from '@routes/PrivateRoute';
import { useAuth } from '@hooks/useAuth';
import ForgotPassword from '@pages/ForgotPassword';
import Users from '@pages/Users';
import AdminRoute from './AdminRoute';
import AppLayout from '@components/layout/AppLayout';
import PageNotFound from '@pages/PageNotFound';
import Vehicles from '@pages/Vehicles';
import ServiceTypes from '@pages/ServiceType';

export default function AppRoutes() {
  const isLogged = useAuth();
  return (
    <Routes>
      <Route
        path='/'
        element={<Navigate to={isLogged ? '/app/home' : '/login'} replace />}
      />

      <Route
        path='/login'
        element={isLogged ? <Navigate to='/app/home' replace /> : <Login />}
      />

      <Route path='forgot-password' element={<ForgotPassword />} />

      <Route
        path='/app'
        element={
          <PrivateRoute>
            <AppLayout />
          </PrivateRoute>
        }
      >
        <Route
          path='users'
          element={
            <AdminRoute>
              <Users />
            </AdminRoute>
          }
        />
        <Route
          path='home'
          element={
            <PrivateRoute>
              <div style={{ color: 'white' }}>Home</div>
            </PrivateRoute>
          }
        />
        <Route
          path='vehicles'
          element={
            <AdminRoute>
              <Vehicles />
            </AdminRoute>
          }
        />
        <Route
          path='servicestypes'
          element={
            <AdminRoute>
              <ServiceTypes />
            </AdminRoute>
          }
        />
      </Route>
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
}
