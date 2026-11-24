import '../global.css';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { PortalHost } from '@rn-primitives/portal';
import { useSession } from '@/lib/auth-client';

export default function RootLayout() {
  const { data: session, isPending } = useSession();
  const segments = useSegments();
  const router = useRouter();
  const { colorScheme } = useColorScheme();

  useEffect(() => {
    if (isPending) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!session && !inAuthGroup) {
      // Нет сессии -> отправляем на логин
      router.replace('/(auth)/login');
    } else if (session && inAuthGroup) {
      // Сессия есть, но пользователь на экране логина -> пускаем в приложение
      router.replace('/(app)');
    }
  }, [session, isPending, segments]);

  if (isPending) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className={`flex-1 ${colorScheme === 'dark' ? 'dark' : ''}`}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(app)" />
      </Stack>
      <PortalHost />
    </View>
  );
}
