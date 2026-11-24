import React from 'react';
import { useColorScheme } from 'nativewind';
import { Moon, Sun } from 'lucide-react-native';
import { Button } from './ui/button';

export function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Button variant="ghost" size="icon" onPress={toggleColorScheme}>
      {isDark ? (
        <Sun size={20} color="#fafafa" />
      ) : (
        <Moon size={20} color="#09090b" />
      )}
    </Button>
  );
}
