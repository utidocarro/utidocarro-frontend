import { useAuth } from "@hooks/useAuth";
import { PropsWithChildren } from "react";
import { Navigate } from "react-router";

export default function PrivateRoute({ children }: PropsWithChildren) {
  const isLogged = useAuth();
  return isLogged ? children : <Navigate to="/login" />;
}
