import { useGlobalStore } from "@/storage/useGlobalStorage";

export const useAuth = () => {
  const { user } = useGlobalStore();
  return Boolean(user);
};
