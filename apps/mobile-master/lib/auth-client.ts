import { createAuthClient } from 'better-auth/react';
import { expoClient } from '@better-auth/expo/client';
import * as SecureStore from 'expo-secure-store';

export const authClient = createAuthClient({
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000',
  plugins: [
    expoClient({
      scheme: 'freelancer-hub',
      storagePrefix: 'freelancer-hub',
      storage: SecureStore,
    }),
  ],
});

// Экспортируем готовые хуки для компонентов
export const { useSession, signIn, signUp, signOut } = authClient;
