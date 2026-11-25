import React from 'react';
import { useColorScheme } from 'nativewind';
import { Moon, Sun } from 'lucide-react-native';
import { themeTokens } from '@repo/theme/tokens';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? themeTokens.dark : themeTokens.light;

  return (
    <Button variant="ghost" size="icon" onPress={toggleColorScheme}>
      {isDark ? (
        <Sun size={20} color={colors.foreground} />
      ) : (
        <Moon size={20} color={colors.foreground} />
      )}
    </Button>
  );
}
