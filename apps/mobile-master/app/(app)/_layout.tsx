import React from 'react';
import { View } from 'react-native';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { Home, Info, LogOut } from 'lucide-react-native';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { ThemeToggle } from '@/components/ThemeToggle';
import { signOut } from '@/lib/auth-client';

export default function AppLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? '#09090b' : '#ffffff',
        },
        headerTintColor: isDark ? '#fafafa' : '#09090b',
        tabBarStyle: {
          backgroundColor: isDark ? '#09090b' : '#ffffff',
          borderTopColor: isDark ? '#27272a' : '#e4e4e7',
        },
        tabBarActiveTintColor: isDark ? '#fafafa' : '#09090b',
        headerRight: () => (
          <View className="flex-row items-center gap-2 mr-3">
            <ThemeToggle />
            <Button variant="outline" size="sm" onPress={() => signOut()} className="flex-row gap-1.5">
              <LogOut size={14} color={isDark ? '#fafafa' : '#09090b'} />
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
