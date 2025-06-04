import { storageService } from '@/storage';
import { useGlobalStore } from '@/storage/useGlobalStorage';
import { EUserType } from '@interfaces/user/user';
import dayjs from 'dayjs';

export function formatDate(date: string) {
  if (!date) return '';
  return dayjs(date).format('DD/MM/YYYY HH:mm');
}

export function formatBoolean(value: boolean) {
  return Boolean(value) ? 'Sim' : 'Não';
}

export function formatUserType(value: EUserType) {
  const userTypes = {
    [EUserType.ADMIN]: 'Administrador',
    [EUserType.USER]: 'Usuário',
  };

  return userTypes[value] || 'Desconhecido';
}

export function resetAllStore() {
  const { user: initUser } = useGlobalStore.getInitialState();
  const { setUser } = useGlobalStore.getState();

  setUser(initUser);
  storageService.removeAll();
}
