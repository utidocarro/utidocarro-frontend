import { useGlobalStore } from '@/storage/useGlobalStorage';
import { EUserType } from '@interfaces/user/user';

export const useAuth = () => {
  const { user } = useGlobalStore();
  return Boolean(user);
};

export const useIsAdmin = () => {
  const { user } = useGlobalStore();
  return user?.tipo === EUserType['ADMIN'];
};
