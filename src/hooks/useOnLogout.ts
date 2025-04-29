import { useGlobalStore } from '@/storage/useGlobalStorage';
import { useNavigate } from 'react-router';

export default function useOnLogout() {
  const navigate = useNavigate();
  const { setUser } = useGlobalStore();
  return () => {
    setUser(null);
    localStorage.clear();
    navigate('/login', { replace: true });
  };
}
