import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';

export default function AboutScreen() {
  return (
    <View className="flex-1 bg-background p-6 justify-center gap-3">
      <Text className="text-3xl font-bold text-foreground">О проекте (About)</Text>
      <Text className="text-muted-foreground text-base leading-6">
        Freelancer Hub — кроссплатформенное приложение в монорепозитории с единым бэкендом на
        Hono и tRPC, вебом на React и мобильным клиентом на React Native.
      </Text>
    </View>
  );
}
