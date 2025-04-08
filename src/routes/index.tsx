import Login from "@pages/Login";
import { Navigate, Route, Routes } from "react-router";
import PrivateRoute from "@routes/PrivateRoute";
import { useAuth } from "@hooks/useAuth";

export default function AppRoutes() {
  const isLogged = useAuth();
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <div style={{ color: "white" }}>Home</div>
          </PrivateRoute>
        }
      />

      <Route
        path="/login"
        element={isLogged ? <Navigate to="/home" replace /> : <Login />}
      />
    </Routes>
  );
}
