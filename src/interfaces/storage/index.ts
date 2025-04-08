import { IUser } from "@interfaces/user/user";

export interface GlobalState {
  user: IUser | null;
  setUser: (newUser: IUser | null) => void;
}

export interface StorageService {
  getItem: <T>(key: string) => T | null;
  setItem: <T>(key: string, value: T) => void;
  removeItem: (key: string) => void;
}
