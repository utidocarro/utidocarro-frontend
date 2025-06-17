// src/pages/HomeRedirect.tsx
import { useIsAdmin } from '@hooks/useAuth';
import AdminHomePage from '@pages/AdminHome/AdminHome';
import UserHomePage from '@pages/UserHomePage';

export default function HomeRedirect() {
  const isAdmin = useIsAdmin();

  return isAdmin ? <AdminHomePage /> : <UserHomePage />;
}
