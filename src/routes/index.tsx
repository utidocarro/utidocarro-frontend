import Login from '@pages/Login';
import { Navigate, Route, Routes } from 'react-router';
import PrivateRoute from '@routes/PrivateRoute';
import { useAuth } from '@hooks/useAuth';
import ForgotPassword from '@pages/ForgotPassword';

export default function AppRoutes() {
    const isLogged = useAuth();
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Navigate to={isLogged ? '/home' : '/login'} replace />
                }
            />

            <Route
                path="/login"
                element={isLogged ? <Navigate to="/home" replace /> : <Login />}
            />

            <Route path="forgot-password" element={<ForgotPassword />} />

            <Route
                path="/home"
                element={
                    <PrivateRoute>
                        <div style={{ color: 'white' }}>Home</div>
                    </PrivateRoute>
                }
            />
        </Routes>
    );
}
