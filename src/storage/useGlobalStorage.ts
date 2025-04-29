import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { storageService } from '.';
import { GlobalState } from '@interfaces/storage';
import { IUser } from '@interfaces/user/user';

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (newUser: IUser | null) => set({ user: newUser }),
    }),
    {
      name: 'app-name-global-storage',
      storage: storageService,
    },
  ),
);
