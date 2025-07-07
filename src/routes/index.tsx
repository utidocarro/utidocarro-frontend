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
import HomeRedirect from '@routes/HomeRedirect';
import ServiceOrders from '@pages/ServiceOrder';
import PasswordRecovery from '@pages/PasswordRecovery';
import Profile from '@pages/Profile';

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

      <Route path='password-recovery' element={<PasswordRecovery />} />

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
              <HomeRedirect />
            </PrivateRoute>
          }
        />
        <Route
          path='vehicles'
          element={
            <PrivateRoute>
              <Vehicles />
            </PrivateRoute>
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
        <Route
          path='servicesorders'
          element={
            <AdminRoute>
              <ServiceOrders />
            </AdminRoute>
          }
        />
        <Route
          path='profile'
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Route>
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
}
