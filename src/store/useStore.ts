import { create } from 'zustand';
import { persist, StateStorage, createJSONStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const customStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    if (Platform.OS === 'web') {
      return localStorage.getItem(name);
    }
    return await SecureStore.getItemAsync(name);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    if (Platform.OS === 'web') {
      localStorage.setItem(name, value);
      return;
    }
    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    if (Platform.OS === 'web') {
      localStorage.removeItem(name);
      return;
    }
    await SecureStore.deleteItemAsync(name);
  },
};

interface AppState {
  selectedLanguageId: string | null;
  setSelectedLanguageId: (id: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      selectedLanguageId: 'es', // default to Spanish
      setSelectedLanguageId: (id) => set({ selectedLanguageId: id }),
    }),
    {
      name: 'lingua-app-storage',
      storage: createJSONStorage(() => customStorage),
    }
  )
);
