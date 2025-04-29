import { useAuth, useIsAdmin } from '@hooks/useAuth';
import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function AdminRoute({ children }: PropsWithChildren) {
  const isLogged = useAuth();
  const isAdmin = useIsAdmin();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) navigate('/login', { replace: true });

    if (!isAdmin) navigate('/app/home', { replace: true });
  }, [isLogged, isAdmin]);

  return children;
}
