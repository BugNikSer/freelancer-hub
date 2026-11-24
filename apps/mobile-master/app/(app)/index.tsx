import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { useSession } from '@/lib/auth-client';

export default function HomeScreen() {
  const { data: session } = useSession();

  return (
    <View className="flex-1 bg-background p-6 justify-center gap-3">
      <Text className="text-3xl font-bold text-foreground">
        Привет, {session?.user.name}!
      </Text>
      <Text className="text-muted-foreground text-base">
        Вы находитесь на защищённой главной странице мобильного приложения.
      </Text>
    </View>
  );
}
