import React from 'react';
import { View } from 'react-native';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { Home, Info, LogOut } from 'lucide-react-native';
import { themeTokens } from '@repo/theme/tokens';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { ThemeToggle } from '@/components/ThemeToggle';
import { signOut } from '@/lib/auth-client';

export default function AppLayout() {
  const { colorScheme } = useColorScheme();
  const colors = colorScheme === 'dark' ? themeTokens.dark : themeTokens.light;

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.accent,
        headerRight: () => (
          <View className="flex-row items-center gap-2 mr-3">
            <ThemeToggle />
            <Button variant="outline" size="sm" onPress={() => signOut()} className="flex-row gap-1.5">
              <LogOut size={14} color={colors.text} />
              <Text className="text-xs">Выйти</Text>
            </Button>
          </View>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Главная',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'О проекте',
          tabBarIcon: ({ color, size }) => <Info color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
