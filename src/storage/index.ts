import { StorageService } from '@interfaces/storage';

const localStorage: StorageService = {
  getItem: <T>(key: string) => {
    const value = window.localStorage.getItem(key);
    if (value) {
      return JSON.parse(value) as T;
    }
    return null;
  },

  setItem: <T>(key: string, value: T) => {
    const stringValue = JSON.stringify(value);
    window.localStorage.setItem(key, stringValue);
  },

  removeItem: (key: string) => {
    window.localStorage.removeItem(key);
  },
};

export let storageService: StorageService = localStorage;
