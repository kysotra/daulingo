import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Try to safely load AsyncStorage module
let safeAsyncStorage: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  safeAsyncStorage = require('@react-native-async-storage/async-storage').default;
} catch {
  // Fall back to null
}

const customStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    if (Platform.OS === 'web') {
      return localStorage.getItem(name);
    }
    if (safeAsyncStorage) {
      try {
        return await safeAsyncStorage.getItem(name);
      } catch {
        // Native module is null or error, fallback to SecureStore
        return await SecureStore.getItemAsync(name);
      }
    }
    return await SecureStore.getItemAsync(name);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    if (Platform.OS === 'web') {
      localStorage.setItem(name, value);
      return;
    }
    if (safeAsyncStorage) {
      try {
        await safeAsyncStorage.setItem(name, value);
        return;
      } catch {
        await SecureStore.setItemAsync(name, value);
        return;
      }
    }
    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    if (Platform.OS === 'web') {
      localStorage.removeItem(name);
      return;
    }
    if (safeAsyncStorage) {
      try {
        await safeAsyncStorage.removeItem(name);
        return;
      } catch {
        await SecureStore.deleteItemAsync(name);
        return;
      }
    }
    await SecureStore.deleteItemAsync(name);
  },
};

export const clearAppStorage = async () => {
  if (Platform.OS === 'web') {
    localStorage.removeItem('lingua-app-storage');
    return;
  }
  if (safeAsyncStorage) {
    try {
      await safeAsyncStorage.removeItem('lingua-app-storage');
      return;
    } catch {
      // Fallback
    }
  }
  await SecureStore.deleteItemAsync('lingua-app-storage');
};

interface AppState {
  selectedLanguageId: string | null;
  setSelectedLanguageId: (id: string | null) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      selectedLanguageId: null, // default to null to require selection
      setSelectedLanguageId: (id) => set({ selectedLanguageId: id }),
    }),
    {
      name: 'lingua-app-storage',
      storage: createJSONStorage(() => customStorage),
    }
  )
);
